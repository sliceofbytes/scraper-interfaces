# Scraper Interfaces &middot; [![GitHub license](https://img.shields.io/github/license/COVID19-FYI/scraper-interfaces)](https://github.com/COVID19-FYI/scraper-interfaces/blob/master/LICENSE) [![NPM Version](https://img.shields.io/npm/v/@covid19/scraper-interfaces?color=%230B7CBC)](https://www.npmjs.com/package/@covid19/scraper-interfaces) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/COVID19-FYI/scraper-interfaces/pulls)

COVID19 Scraper Interfaces

* **Normalized:** This library makes it painless to pull normalized data about COVID19. This library addressed a key issue
with data aggregators on the web today. The manner in which they obtain and parse their data is not clear to the public.
It is the opinion of our team that your data is only as good as the way it was obtained and processed. Inviting the broader community
to contribute to our efforts enables us to incorporate more sources and to be fully transparent about how we get our data.
* **Tested:** All additions to this library require automated testing. Fortunately the way the interfaces are designed, lends itself
to easy automated testing and external validation. All pull requests require integration with our testing framework.
* **Modular:** This library is designed to allow developers to use one data source, or all of them; whatever your needs are.
We have a registry class that you can pull specific source types and regions from. The library is designed to scale up to hundreds
of different sources, so make a PR today!

## Sources
If you're interested in viewing our sources you may do so [here](https://docs.google.com/spreadsheets/d/1Uw6RPRejs0lg-2F8VrWgY8ZX_8f4YHt38-KmJrXYcb0/edit?usp=sharing). If you have a suggestion for a source please [open an issue](https://github.com/COVID19-OSS/scraper-interfaces/issues/new). We ask that if you're going to suggest a source that you only submit 1st-party government sources at this time; we are not looking for other websites or aggregators. Thank you for your help!

## Installation
```shell script
git clone git@github.com:covid19-oss/scraper-interfaces.git
cd scraper-interfaces
nvm use 12 # optional
npm install
```

## Contributing
#### How to add a source to our SDK:
1. Create a class in the `src/data-source` folder under the proper source type and geo-locality (if applicable).
2. Ensure your class inherits the `DataSource` base class.
3. Implement the `loadPageContent` (which can return an object, an array objects or a string (html)).
4. Implement the `loadSourceData` method which will call the `loadPageContent` and return normalized data.
5. Create a source name in `src/definitions/DataSourceName`.
6. Create a mapping entry in the registry `src/data-source/DataSourceRegistry`
7. Implement a rudimentary unit test for your DataSource
8. Run tests and the linter so you can correct anything that's not quite right.
9. Prepare a PR for us to review using the guide below.
10. Accept our gratitude for your amazing contribution!

See [CONTRIBUTING](./CONTRIBUTING.md) for details on submitting patches and the contribution workflow.

## Code of Conduct

## License

This library is [GPL-3.0 Licensed](./LICENSE)
