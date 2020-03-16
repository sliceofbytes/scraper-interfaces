import axios from "axios";
import https from "https";
import cheerio from "cheerio";
import UserAgent from "user-agents";

import { DataSource } from "../../DataSource";
import { SourceType } from "../../../definitions/sources/SourceType";
import { SourceData, SourceLocalityDataPoint } from "../../../definitions/sources/SourceData";
import { SourceFeatures } from "../../../definitions/sources/SourceFeatures";
import { NumericalUtilities } from "../../../utilities/NumericalUtilities";

const { OVERRIDE_NEW_YORK_SOURCE_URL } = process.env;

const NEW_YORK_SOURCE_URL = "https://health.ny.gov/diseases/communicable/coronavirus/";

const EXPECTED_HEADER = ["County", "Positive Cases"];
const FILTERED_LOCALITIES = ["New York State (Outside of NYC)"];

const NEW_YORK_FEATURES: SourceFeatures = {
  cases: true,
  deaths: false,
  serious: false,
  critical: false,
  recovered: false,
  unresolved: false,
  pui: false,
  tested: false,
  updateEpoch: true
};

/**
 * NewYorkGovernmentDataSource Suite
 * @author GUH <contact@covid19.fyi>
 */
export class NewYorkGovernmentSource extends DataSource {
  public constructor() {
    super(SourceType.GOVERNMENT, NEW_YORK_FEATURES);
  }

  async getPageContent(): Promise<string> {
    const options = {
      headers: {
        "Host": "health.ny.gov",
        "User-Agent": new UserAgent().toString(),
        "Referer": "https://health.ny.gov/contact/contact_information/",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    const response = await axios.get(OVERRIDE_NEW_YORK_SOURCE_URL || NEW_YORK_SOURCE_URL, options);
    return response.data;
  }

  async parsePageContent(pageContentHtml: string): Promise<SourceData> {
    const page = cheerio.load(pageContentHtml);

    const tableRows = page("tbody").children().get().map(row => cheerio(row).children().get());
    const targetTable = tableRows.map(row => row.map(column => cheerio(column).text()));

    const headerRow = targetTable.shift();
    if (headerRow?.join(",") !== EXPECTED_HEADER.join(",")) throw Error(`Unexpected header row [${headerRow?.join(",")}]`);

    const parsedCounties: Array<SourceLocalityDataPoint> = targetTable.reduce((countyData: any, tableRow) => {
      if (!FILTERED_LOCALITIES.includes(tableRow[0])) {
        countyData.push({ localityName: tableRow[0], cases: NumericalUtilities.parseNumber(tableRow[1]) });
      }
      return countyData;
    }, []);

    const totalRowIdx = parsedCounties.findIndex(dataPoint => dataPoint.localityName === "Total Positive Cases (Statewide)");
    const totalRow = parsedCounties.splice(totalRowIdx, 1)[0];

    return { total: { cases: totalRow.cases }, localities: parsedCounties };
  }
}
