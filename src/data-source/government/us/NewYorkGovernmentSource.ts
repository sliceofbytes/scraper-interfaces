import axios from "axios";
import https from "https"
import UserAgent from "user-agents";
// import cheerio from "cheerio";

import { DataSource } from "../../DataSource";
import { SourceType } from "../../../definitions/sources/SourceType";
import { SourceData } from "../../../definitions/sources/SourceData";
import { SourceFeatures } from "../../../definitions/sources/SourceFeatures";

const { OVERRIDE_NEW_YORK_SOURCE_URL } = process.env;

const NEW_YORK_SOURCE_URL = "https://health.ny.gov/diseases/communicable/coronavirus/";

const NEW_YORK_FEATURES: SourceFeatures = {
  cases: true,
  deaths: true,
  serious: false,
  critical: false,
  recovered: false,
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
    super(OVERRIDE_NEW_YORK_SOURCE_URL || NEW_YORK_SOURCE_URL, SourceType.GOVERNMENT, NEW_YORK_FEATURES);
  }

  async getPageContent(): Promise<string> {
    console.log(this.url);
    const options = {
      headers: {
        "Host": "health.ny.gov",
        "User-Agent": new UserAgent().toString(),
        "Referer": "https://health.ny.gov/contact/contact_information/",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    console.log(options);
    return axios.get(this.url, options);
  }

  async parsePageContent(pageContentHtml: string): Promise<SourceData> {
    return {};
  }
}
