
import { DataSource } from "./DataSource";
import { DataSourceName } from "..";

import { NewYorkGovernmentSource } from "./government";
import { WisconsinGovernmentSource } from "./government";
import { ColombiaGovernmentSource } from "./government";
import { HopkinsAggregatorSource } from "./aggregator/HopkinsAggregatorSource";

/**
 * DataSourceRegistry Class
 * @author GUH <contact@covid19.fyi>
 */
export class DataSourceRegistry {
  /**
   * Build a mapping of source name to handler classes
   * @return {Map<DataSourceName, DataSource>}
   */
  private static getDataSourceRegistry(): Map<DataSourceName, DataSource> {
    const mapping = new Map<DataSourceName, DataSource>();
    mapping.set(DataSourceName.NEW_YORK_GOV, NewYorkGovernmentSource.prototype);
    mapping.set(DataSourceName.COLOMBIA_GOV, ColombiaGovernmentSource.prototype);
    mapping.set(DataSourceName.JOHNS_HOPKINS, HopkinsAggregatorSource.prototype);
    mapping.set(DataSourceName.WISCONSIN_GOV, WisconsinGovernmentSource.prototype)
    return mapping;
  }

  /**
   * Get a DataSource for the requested name
   * @param sourceName {string}
   * @throws if there is not a handler for the sourceName provided
   * @return {DataSource}
   */
  public static getDataSource(sourceName: DataSourceName): DataSource {
    const registry = this.getDataSourceRegistry();

    const DataSourceForName = registry.get(sourceName);
    if (!DataSourceForName) throw Error(`DataSource handler not found for ${sourceName}`);

    const ReflectedDataSource = Object.create(DataSourceForName);
    return new ReflectedDataSource.constructor();
  }
}
