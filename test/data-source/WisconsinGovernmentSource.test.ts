import { DataSourceName, DataSourceRegistry } from "../../src";

/**
 * WisconsinGovernmentDataSource Test Suite
 * @author sliceofbytes <sliceofbytes@gmail.com>
 */
describe("WisconsinGovernmentSource", () => {
  test("Should fetch and parse", async () => {
    try {
      const dataSource = DataSourceRegistry.getDataSource(DataSourceName.WISCONSIN_GOV);
      let data = await dataSource.loadSourceData();
      console.log(data);

    }
    catch (e) {
      console.error(e);
    }
  });
});
