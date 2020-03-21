
import cheerio from "cheerio";
import UserAgent from "user-agents";
import * as cloudscraper from "cloudscraper";

import { DataSource } from "../../DataSource";
import { SourceType } from "../../../definitions/sources/SourceType";
import { SourceData, SourceLocalityDataPoint } from "../../../definitions/sources/SourceData";
import { SourceFeatures } from "../../../definitions/sources/SourceFeatures";
import { NumericalUtilities } from "../../../utilities/NumericalUtilities";

const WISCONSIN_SOURCE_URL = "https://www.dhs.wisconsin.gov/outbreaks/index.htm";

const EXPECTED_HEADER = [
    "Wisconsin County",
    "Total Cases as of", 
    "Total Deaths as of"
];

const WISCONSIN_FEATURES: SourceFeatures = {
  cases: true,
  deaths: true,
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
export class WisconsinGovernmentSource extends DataSource {
  public constructor() {
    super(SourceType.GOVERNMENT, WISCONSIN_FEATURES);
  }

  protected async loadPageContent(): Promise<string> {
    return cloudscraper.get({
      url: WISCONSIN_SOURCE_URL,
      headers: {
        "Host": "dhs.wisconsin.gov",
        "User-Agent": new UserAgent().toString(),
      }
    });
  }

  public async loadSourceData(): Promise<SourceData> {
    const pageContentHtml = await this.loadPageContent();
    const page = cheerio.load(pageContentHtml);

    const tableRows = page("#covid-county-table table tbody").children().get().map(row => cheerio(row).children().get());
    const targetTable = tableRows.map(row => row.map(column => cheerio(column).text()));
    debugger;
    const headerRow = targetTable.shift();
    if (headerRow?.join(",")?.replace(/\s?\d{1,2}\/\d{1,2}\/\d{4}/gm,'') !== EXPECTED_HEADER.join(",")) throw Error(`Unexpected header row [${headerRow?.join(",")}]`);

    const parsedCounties: Array<SourceLocalityDataPoint> = targetTable.reduce((countyData: any, tableRow) => {
      countyData.push({ localityName: tableRow[0], cases: NumericalUtilities.parseNumber(tableRow[1]), deaths:NumericalUtilities.parseNumber(tableRow[2])  });
      return countyData;
    }, []);

    let totalCases = 0;
    let totalDeaths = 0;
    parsedCounties.forEach((z:SourceLocalityDataPoint)=> {
        if(z.cases)
            totalCases += z.cases;
        if(z.deaths)
            totalDeaths += z.deaths;
    });

    return { total: { cases: totalCases, deaths:totalDeaths }, localities: parsedCounties };
  }
}
