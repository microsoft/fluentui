# @fluentui/react-charting

[![npm version](https://badge.fury.io/js/@fluentui%2Freact-charting.svg)](https://badge.fury.io/js/@fluentui%2Freact-charting) [![Build Status](https://img.shields.io/azure-devops/build/uifabric/fabricpublic/164/master?style=flat-square)](https://dev.azure.com/uifabric/fabricpublic/_build?definitionId=164)

**Overview**

[Fluent UI React](https://developer.microsoft.com/en-us/fluentui)
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) charts is a set of modern, accessible, interactive and highly customizable visualization library representing the Microsoft design system.

The charting library is built using [D3 (Data Driven Documents)](https://github.com/d3/d3) and other fluent UI controls.

These charts are used across different products in Microsoft. They are ready to be used in a production environment.

This library is also supported for fluent UI [v7](https://github.com/microsoft/fluentui/tree/7.0).

## Using the library

Examples and code snippets for the charting library are available on the [demo site](https://aka.ms/fluentcharting).
The code snippets can be used as usage guide for all the props and chart variations. Click on 'Show code' on the demo site to access demo for each variant.

The library is published as a npm package to public npm feed. To install the package

```js
npm install @fluentui/react-charting
```

To import charting components:

```js
import { ComponentName } from '@fluentui/react-charting/lib/ComponentName';
```

## Contact

The charting project is actively funded by a small feature team. The team responds within 1-2 business days for any queries or doubts.
You can reach out to the charting team by tagging `@microsoft/charting-team` in [discussion](https://github.com/microsoft/fluentui/discussions) items.

You could also create issues under the [charting](https://github.com/microsoft/fluentui/labels/Package:%20charting) tag.

## Resources

Several resources are available to know more details about the charting project.

Published roadmap [here](https://aka.ms/fluentChartingRoadmap)

Detailed [wiki](https://aka.ms/fluentChartingWiki) (Internal to Microsoft Employees currently)

Join our [discord server](https://aka.ms/FluentCharting/discord) for realtime conversation and schedule to our regular office hours.

Official codepen account - Coming soon

Figma design guidance - Coming soon

## Contributing

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-1EAEDB)]()

Refer the main fluentui [wiki](https://github.com/microsoft/fluentui/wiki) for detailed instructions on setup and contributing to the package.

A comprehensive contributor guide is available in our internal [wiki](https://aka.ms/fluentChartingWiki). Available to share publically on request.

## Testing

![Static Badge](https://img.shields.io/badge/coverage-87%25-brightgreen)

The library has a wide variety of tests to ensure quality of the library.
The tests range from component tests, unit tests, visual regression tests, accessibility tests, integration tests and manual tests.
The test automations aim to ensure over 90% code coverage across the library.

Further details available in the wiki

Run `yarn test` from within the package to run all the tests.

## Accessibility

Our charts have elaborate accessibility support. The charts are WCAG 2.1 MAS C compliant for accessibility.

More details are covered in the wiki.

## Performance

Performance is a key success criteria for the charting library.
Performance is measured and has been improved for the following scenarios.
|**S No**| **Scenario** | **Lighthouse Score** |
|:------:|:------------------------------------------------: | :----------------------: |
| 1. | 1 LineChart of 1 series with 30,000 datapoints | 79.2 |
| 2. | 6 LineCharts of 1 series with 100 datapoints each | 98.8 |
| 3. | 18 LineCharts of 1 series with 5 datapoints | 98 |
| 4. | 50 Linecharts of 1 Series with 10 datapoints each | 89.6 |
| 5. | 1 Linechart of 2 series with 500 datapoints each | 98.6 |
| 6. |10 Linecharts of 1 series with 1000 datapoints each| 94.4 |
| 7. | 1 Areachart with 30,000 datapoints | 49 |
| 8. | 6 Areacharts of 1 series with 100 datapoints each | 95.4 |
| 9. |18 Areacharts of 1 series with 5 data points each | 96.8 |

More details are covered in the wiki.

## Versioning and changelog

We use SemVer for versioning. For the versions available, see the [tags](https://github.com/microsoft/fluentui/tags) on this repository.

Refer to the [changelog](https://github.com/microsoft/fluentui/blob/master/packages/react-charting/CHANGELOG.md) for details about changes made in each version.

## Coding Guidelines

Refer fluent [Coding guidelines](https://github.com/microsoft/fluentui/wiki/Coding-Style)

## Technical details

Refer [this](https://github.com/microsoft/fluentui/blob/master/packages/react-charting/docs/TechnicalDetails.md) document for details on color palette, theming, types of axis supported and more.
