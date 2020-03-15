import { SourceType } from "../definitions/sources/SourceType";
import { SourceData } from "../definitions/sources/SourceData";
import { SourceFeatures } from "../definitions/sources/SourceFeatures";

/**
 * DataSource Parent Class
 * @author GUH <contact@covid19.fyi>
 */
export abstract class DataSource {
  protected readonly url: string;
  public readonly type: SourceType;
  public readonly features: SourceFeatures;

  protected constructor(url: string, type: SourceType, features: SourceFeatures) {
    this.url = url;
    this.type = type;
    this.features = features;
  }

  /**
   * Validate the source data against the source features.
   */
  public validate(data: SourceData): boolean {
    /* TODO: Make this robust, integer validation, etc. */
    return true;
  }

  /**
   * Utilize some method to fetch the page and return its content.
   * @returns {string} html
   */
  public abstract async getPageContent(): Promise<string>;

  /**
   * Parse the page content from HTML into a normalized format.
   * @returns {SourceData}
   */
  public abstract async parsePageContent(pageContentHtml: string): Promise<SourceData>;
}