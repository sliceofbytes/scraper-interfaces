import { DataSourceName, DataSourceRegistry } from "../../src";

/**
 * HopkinsAggregatorSource Test Suite
 * @author GUH <contact@covid19.fyi>
 */
describe("HopkinsAggregatorSource", () => {
  test("Should fetch and parse", async () => {
    const dataSource = DataSourceRegistry.getDataSource(DataSourceName.JOHNS_HOPKINS);
    const json = await dataSource.getPageContent();
    await dataSource.parsePageContent(json);
  });
});