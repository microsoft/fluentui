# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.6.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.5.0...@microsoft/fast-components-msft@1.6.0) (2020-07-23)


### Bug Fixes

* address nested styling issues and provide a more intuitive API for nesting ([#3528](https://github.com/Microsoft/fast/issues/3528)) ([4fe0dd3](https://github.com/Microsoft/fast/commit/4fe0dd38ce8f2b43be0f13c7efac2f12ada6cd78))
* ensure setAttribute is not called during construction ([#3523](https://github.com/Microsoft/fast/issues/3523)) ([a0b8658](https://github.com/Microsoft/fast/commit/a0b86589317127d1b541cd10e087f9aaf93a0c5f))
* move text field and text area appearances from foundation to components ([#3540](https://github.com/Microsoft/fast/issues/3540)) ([ca8ac76](https://github.com/Microsoft/fast/commit/ca8ac760cdf666fc79a47ba9a21c5f964556dbab))
* rollup minify selectors should retain spaces ([#3524](https://github.com/Microsoft/fast/issues/3524)) ([cbdfc45](https://github.com/Microsoft/fast/commit/cbdfc45c2543fe9f94e0edc7687cc9f04a38e118))
* update nested to be observable and set isNestedItem method to readonly ([#3539](https://github.com/Microsoft/fast/issues/3539)) ([9e67f52](https://github.com/Microsoft/fast/commit/9e67f52a8fd3e1736e3882ef7e2fa3f25e63a396))


### Features

* adds direction property to design system ([#3535](https://github.com/Microsoft/fast/issues/3535)) ([492f5e7](https://github.com/Microsoft/fast/commit/492f5e766610a6cae51c9c90a18b83252a67f9d3))





# [1.5.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.4.0...@microsoft/fast-components-msft@1.5.0) (2020-07-14)


### Bug Fixes

* move setAttribute calls for proxy elements to connectedCallback ([#3494](https://github.com/Microsoft/fast/issues/3494)) ([cdaf0ba](https://github.com/Microsoft/fast/commit/cdaf0bae4de3c995611e2e02313cc19e8e259b27))
* removed extra padding around fast card component ([#3441](https://github.com/Microsoft/fast/issues/3441)) ([f3f06ed](https://github.com/Microsoft/fast/commit/f3f06ed25f288b884f6e6c31af2b8489ef8886c1))
* removing un-needed nbsp; in slider-label and radio-group templates ([#3506](https://github.com/Microsoft/fast/issues/3506)) ([7cd003e](https://github.com/Microsoft/fast/commit/7cd003e5877d34ad926ee8268852176158cafc4b))
* tree view and tree view item not exported ([#3487](https://github.com/Microsoft/fast/issues/3487)) ([2b9c9ec](https://github.com/Microsoft/fast/commit/2b9c9ec093cff99ea6486dc64aa2359d53bd8d2b))


### Features

* adds menu and menu item styling to MSFT web component package ([#3484](https://github.com/Microsoft/fast/issues/3484)) ([13b883d](https://github.com/Microsoft/fast/commit/13b883d91b28acdd9fe397d4751a6d6133152303))
* adds mixin to support global aria-* attributes for components delegating focus ([#3470](https://github.com/Microsoft/fast/issues/3470)) ([054c890](https://github.com/Microsoft/fast/commit/054c89000d8931d9e203cb7f831c1e7f11c9038a))
* move appearance attributes of anchor and button out of fast-foundation ([#3420](https://github.com/Microsoft/fast/issues/3420)) ([069e1ee](https://github.com/Microsoft/fast/commit/069e1ee000fc2f8e184919b16df0cb84bc610838))
* simplify rollup configs and compress tagged template literals ([#3452](https://github.com/Microsoft/fast/issues/3452)) ([7533e92](https://github.com/Microsoft/fast/commit/7533e927f2467dd6f8dd46c1d3cef6c0df773fc4))
* update typescript version and remove utility types dependencies for react packages ([#3422](https://github.com/Microsoft/fast/issues/3422)) ([09d07b5](https://github.com/Microsoft/fast/commit/09d07b580cda3bcc5d28f83d3568521f710c9576))





# [1.4.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.3.0...@microsoft/fast-components-msft@1.4.0) (2020-07-02)


### Bug Fixes

* add createColorPalette to rollup exports ([#3417](https://github.com/Microsoft/fast/issues/3417)) ([95c5d61](https://github.com/Microsoft/fast/commit/95c5d6123a674c55991aadca61956f08770ff407))
* slider thumb does not respond to touch events, vertical sliders track parameters incorrect after scrolling page ([#3414](https://github.com/Microsoft/fast/issues/3414)) ([02f9ac4](https://github.com/Microsoft/fast/commit/02f9ac4306031aab1702e98083effc0ce858dec5))


### Features

* add tree-vew and tree-item components ([#3240](https://github.com/Microsoft/fast/issues/3240)) ([57eaa83](https://github.com/Microsoft/fast/commit/57eaa83293358383d03cbd3c5b6a9e6ffa797254))





# [1.3.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.2.1...@microsoft/fast-components-msft@1.3.0) (2020-06-26)


### Bug Fixes

* correct css selector for dialog control ([#3398](https://github.com/Microsoft/fast/issues/3398)) ([f9aff7c](https://github.com/Microsoft/fast/commit/f9aff7cf2c455fb132b6dbcc02e451edb628c1aa))
* ensure button control height matches wc root height ([#3340](https://github.com/Microsoft/fast/issues/3340)) ([3c9429e](https://github.com/Microsoft/fast/commit/3c9429e28b8c1008f1971a12d36646e57b85a576))
* selected tab becoming undefined when tab slot pass anything except icon or text node ([#3350](https://github.com/Microsoft/fast/issues/3350)) ([eda1aef](https://github.com/Microsoft/fast/commit/eda1aef79aeb612b05ea73b3861a93f5241c382f))


### Features

* export parseColorString from components and components-msft ([#3356](https://github.com/Microsoft/fast/issues/3356)) ([c4db7b8](https://github.com/Microsoft/fast/commit/c4db7b832c3787be1ec6181e39b79f1304c5cae9))





## [1.2.1](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.2.0...@microsoft/fast-components-msft@1.2.1) (2020-06-17)


### Bug Fixes

* inherit font size and line height in hypertext styles ([#3320](https://github.com/Microsoft/fast/issues/3320)) ([98348cb](https://github.com/Microsoft/fast/commit/98348cbfceb35f95cfdba4f9a1706ad985a60540))
* outline button should use outline color recipes ([#3327](https://github.com/Microsoft/fast/issues/3327)) ([70330e4](https://github.com/Microsoft/fast/commit/70330e443e6cc470a3a8d7fa0948d9eaf45127c3))
* remove hypertext styles from button ([#3319](https://github.com/Microsoft/fast/issues/3319)) ([788e299](https://github.com/Microsoft/fast/commit/788e299ffed8fe965212079a01dd53d42a80b894))





# [1.2.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.1.2...@microsoft/fast-components-msft@1.2.0) (2020-06-15)


### Bug Fixes

* correct anchor and button stylesheets ([#3308](https://github.com/Microsoft/fast/issues/3308)) ([78feda2](https://github.com/Microsoft/fast/commit/78feda2460f814c7995f0168a5180bfe54913a5b))
* ensure all component internals have part names ([#3306](https://github.com/Microsoft/fast/issues/3306)) ([95360a7](https://github.com/Microsoft/fast/commit/95360a76ccb4ec40b2623dc01b55ea123d522b62))
* remove inherited height from lightweight button and anchor ([#3281](https://github.com/Microsoft/fast/issues/3281)) ([3aa506e](https://github.com/Microsoft/fast/commit/3aa506e4074f156db2e2eaa29fff8fa956fed53d))
* update progress from accent fill to accent foreground ([#3277](https://github.com/Microsoft/fast/issues/3277)) ([447c5a3](https://github.com/Microsoft/fast/commit/447c5a3a71e99a6fcfb7cc2ef2e332027c01d96d))


### Features

* adds accordion config to component explorer ([#3276](https://github.com/Microsoft/fast/issues/3276)) ([5e972ca](https://github.com/Microsoft/fast/commit/5e972caed89201aecabb861eb49705458b1385eb))
* design-system-provider now paints CSS color and background color ([#3278](https://github.com/Microsoft/fast/issues/3278)) ([8e97ac4](https://github.com/Microsoft/fast/commit/8e97ac4aae18c8b17b90e61e139ad3fb0b7f7c3d))
* export styles and utils from fast-components-msft ([#3304](https://github.com/Microsoft/fast/issues/3304)) ([54881c0](https://github.com/Microsoft/fast/commit/54881c0ad8ddca25c44b7d7f87c0407d8a12b1d0))
* provides access to the CSS variable created by CSSCustomProprtyBehaviors ([#3256](https://github.com/Microsoft/fast/issues/3256)) ([391f029](https://github.com/Microsoft/fast/commit/391f029da2d5a5502ee484af10aaef771d3c297c))





## [1.1.1](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.1.0...@microsoft/fast-components-msft@1.1.1) (2020-06-09)

**Note:** Version bump only for package @microsoft/fast-components-msft





# [1.1.0](https://github.com/Microsoft/fast/compare/@microsoft/fast-components-msft@1.0.0...@microsoft/fast-components-msft@1.1.0) (2020-06-05)


### Bug Fixes

* outline on flipper ([#3204](https://github.com/Microsoft/fast/issues/3204)) ([a703703](https://github.com/Microsoft/fast/commit/a7037032b8c5c9abc43e98eb115383b792a145a4))
* slider vertical navigation and value setting bugs ([#3176](https://github.com/Microsoft/fast/issues/3176)) ([f46d87d](https://github.com/Microsoft/fast/commit/f46d87d8d7dfe9101e0d1d8bec7d8a08097751bb))


### Features

* add accordion web component ([#3067](https://github.com/Microsoft/fast/issues/3067)) ([f551378](https://github.com/Microsoft/fast/commit/f55137803551711bef9eeb2c55c8d6f01a3eb74f))





# 1.0.0 (2020-05-18)


### Bug Fixes

* focus visuals and style clean up ([#3145](https://github.com/Microsoft/fast/issues/3145)) ([34063c9](https://github.com/Microsoft/fast/commit/34063c98a7c4261f9e234d32202c8a8be1803c21))
* remove fast-components dependency in fast-components-msft ([#3157](https://github.com/Microsoft/fast/issues/3157)) ([81d0ec3](https://github.com/Microsoft/fast/commit/81d0ec3945ac0010bebf96b0d54adbd6e07539b9))


### Features

* **web-components:** new build/test/docs setup ([#3156](https://github.com/Microsoft/fast/issues/3156)) ([51d909a](https://github.com/Microsoft/fast/commit/51d909ad6a616cb63f7c62defe1ee1f3d2abaf02))
* add fast-components-msft as a new package ([#3096](https://github.com/Microsoft/fast/issues/3096)) ([0515fff](https://github.com/Microsoft/fast/commit/0515fff5a1b7163e6f63f609e1efdba338e773c7))
* update badge API and styles ([#3147](https://github.com/Microsoft/fast/issues/3147)) ([23eca38](https://github.com/Microsoft/fast/commit/23eca38c0c0ca4ac0d219315fcc1308e093f3363))


### BREAKING CHANGES

* fundamentally changes and breaks the badge component API and styles
