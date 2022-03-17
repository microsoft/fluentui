# Fluent UI Web

[![Build Status](https://img.shields.io/azure-devops/build/uifabric/fabricpublic/164/master?style=flat-square)](https://dev.azure.com/uifabric/fabricpublic/_build?definitionId=164) ![GitHub contributors](https://img.shields.io/github/contributors/microsoft/fluentui?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/microsoft/fluentui?style=flat-square) [![Twitter Follow](https://img.shields.io/twitter/follow/fluentui?logo=twitter&style=flat-square)](https://twitter.com/FluentUI?ref_src=twsrc%5Etfw)

> :tada: :tada: :tada: **Version 8 of `@fluentui/react` is now available on npm!** :tada: :tada: :tada:
>
> See the [v8 release notes](https://github.com/microsoft/fluentui/wiki/Version-8-release-notes) for more info, and please file an issue if you have any problems.

Fluent UI web represents a collection of utilities, React components, and web components for building web applications.

This repo is home to 3 separate projects today. Mixing components between projects is not currently supported. The goal of these projects is to dedupe functionality and enable interoperability over time. For now, choose the project that best suits your needs.

The following table will help you navigate the 3 projects and understand their differences.

<!-- prettier-ignore-start -->
|   | React | React Northstar | Web Components |
|---| ----- | --------------- | -------------- |
| **Overview**    | Mature, refreshing with new concepts from react-northstar. | Newer, has concepts we're iterating on. | Web Component implementation of Fluent UI. |
| **Used By**     | Office| Teams | Edge |
| **Read Me**     | [README.md](/packages/react/README.md) | [README.md](/packages/fluentui/README.md) | [README.md](/packages/web-components/README.md) |
| **Changelog** | [CHANGELOG.md](/packages/react/CHANGELOG.md) | [CHANGELOG.md](/packages/fluentui/CHANGELOG.md) | [CHANGELOG.md](/packages/web-components/CHANGELOG.md) |
| **Repo**        | [./packages/react](/packages/react) | [./packages/fluentui/react-northstar](/packages/fluentui/react-northstar) | [./packages/web-components](/packages/web-components) |
| **Quick Start** | [Quick Start](https://developer.microsoft.com/en-us/fluentui#/get-started/web) | [Quick Start](https://fluentsite.z22.web.core.windows.net/quick-start) | [See README.md](https://github.com/microsoft/fluentui/tree/master/packages/web-components/README.md) |
| **Docs**        | [aka.ms/fluentui-react](https://aka.ms/fluentui-react) | [aka.ms/fluentui-react-northstar](https://aka.ms/fluentui-react-northstar) | [aka.ms/fluentui-web-components](https://aka.ms/fluentui-web-components) |
| **NPM**         | `@fluentui/react` | `@fluentui/react-northstar` | `@fluentui/web-components` |
| **Version**     | [![npm version](https://img.shields.io/npm/v/@fluentui/react?style=flat-square)](https://www.npmjs.com/package/@fluentui/react) | [![npm version](https://img.shields.io/npm/v/@fluentui/react-northstar?style=flat-square)](https://www.npmjs.com/package/@fluentui/react-northstar) | [![npm version](https://img.shields.io/npm/v/@fluentui/web-components?style=flat-square)](https://www.npmjs.com/package/@fluentui/web-components) |
| **Issues**      | [![Fluent UI React GitHub Issues](https://img.shields.io/github/issues/microsoft/fluentui/Fluent%20UI%20react%20(v8)?label=issues&style=flat-square)](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+label%3A%22Fluent+UI+react+(v8)%22) | [![Fluent UI React Northstar GitHub Issues](https://img.shields.io/github/issues/microsoft/fluentui/Fluent%20UI%20react-northstar?label=issues&style=flat-square)](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+label%3A%22Fluent+UI+react-northstar%22) | [![Fluent UI Web Components GitHub Issues](https://img.shields.io/github/issues/microsoft/fluentui/web-components?label=issues&style=flat-square)](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+label%3A%22web-components%22) |
<!-- prettier-ignore-end -->

> Why are there two React versions? See the [FAQ on Fabric and Stardust](https://github.com/microsoft/fluentui/wiki/FAQ---Fabric-and-Stardust-to-Fluent-UI).

## Licenses

All files on the Fluent UI React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Fluent UI React is subject to the terms of the [assets license agreement](https://aka.ms/fluentui-assets-license).

## Changelog

You can view the complete list of additions, fixes, and changes in the CHANGELOG.md file for each package.

## Looking for Office UI Fabric React?

The **Office UI Fabric React** project has evolved to **Fluent UI**.

The `office-ui-fabric-react` repo is now this repo (`fluentui` in the Microsoft organization)! The name change should not disrupt any current Fabric usage, repo clones, pull requests or issue reporting. Links should redirect to the new location. The library formerly known as `office-ui-fabric-react` is now available as `@fluentui/react` (see above table for more information).

We have a lot in store for Fluent UI - [Read our announcement here.](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)

---

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
