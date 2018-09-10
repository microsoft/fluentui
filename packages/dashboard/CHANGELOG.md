# Change Log - @uifabric/dashboard

This log was last generated on Mon, 10 Sep 2018 10:24:57 GMT and should not be manually modified.

## 0.22.1
Mon, 10 Sep 2018 10:24:57 GMT

### Patches

- Update Recommendation card header text font size/line height settings

## 0.22.0
Fri, 07 Sep 2018 22:04:50 GMT

### Minor changes

- create base class for dashboard layout 
- Adding necessary override styles to scale hovercard size as per content. Introducing time delay without which override is not possible.  This is temporary solution suggested by Fabric folks until they fix the bug in hovercard component.

### Patches

- updating card title line height
- Changing color of card title upon hover and active state
- ContentArea is croped in Edge browser

## 0.21.0
Fri, 07 Sep 2018 16:29:48 GMT

### Minor changes

- allow dashboard section control to take JSX elements as child member
- add save prop to edit sections control

### Patches

- fix example for horizontalBarChart

## 0.20.0
Thu, 06 Sep 2018 10:28:35 GMT

### Minor changes

- add export
- changing fabric icons to SVG's.

### Patches

- gird list text overflow css issue 
- patch
- Fix content area clipping in card because of overflow set to hidden
- merge donut and piechart and added in dashboard package

## 0.19.0
Wed, 05 Sep 2018 10:29:25 GMT

### Minor changes

- Adding hover behaviour for Multicount component and onClick listener on each row of the Multicount component

### Patches

- css issues for card
- Added 19px lineHeight to card header text
- fix leftNav styles per PM feedback
- revert the change for expand behavior
- Update Recommendation Header text resize mechanism and description text line height

## 0.18.0
Tue, 04 Sep 2018 10:27:15 GMT

### Minor changes

- Add edit section common control and examples

## 0.17.6
Fri, 31 Aug 2018 20:48:42 GMT

### Patches

- Removed hover effect from dashboard card title when dragging is disabled

## 0.17.5
Fri, 31 Aug 2018 17:27:00 GMT

### Patches

- css issues for card
- change datapoints for line chart

## 0.17.4
Fri, 31 Aug 2018 10:27:35 GMT

### Patches

- Fixes the usage of renamed variable
- change datapoint for horizontal bar chart 

## 0.17.3
Thu, 30 Aug 2018 19:26:04 GMT

### Patches

- fix leftNav styles per PM feedback
- revert the change for expand behavior

## 0.17.2
Thu, 30 Aug 2018 10:32:49 GMT

### Patches

- Add Donut chart with legends

## 0.17.1
Tue, 28 Aug 2018 10:23:58 GMT

### Patches

- css fixes for card component in dashboard package

## 0.17.0
Fri, 24 Aug 2018 10:26:08 GMT

### Minor changes

- Making changes to dashboard card component to consume stacked bar chart with new data point.

## 0.16.0
Thu, 23 Aug 2018 18:39:08 GMT

### Minor changes

- Add an example dashboard with collasable sections.

### Patches

- Rolling back primary action funtionality of action bar

## 0.15.8
Thu, 23 Aug 2018 10:28:17 GMT

### Patches

- font changes for card components
- header css fix
- fix leftNav styles per PM feedback
- revert the change for expand behavior

## 0.15.7
Wed, 22 Aug 2018 05:10:19 GMT

### Patches

- css fixes for card

## 0.15.6
Tue, 21 Aug 2018 20:36:27 GMT

### Patches

- fix leftNav styles per PM feedback

## 0.15.5
Mon, 20 Aug 2018 10:26:10 GMT

### Patches

- Replaced the OverflowSet with IconButton and removed the paddingBottom css in ThumbnailList added the  marign Bottom css.
- minor css changes to body text and recommendation styles

## 0.15.4
Fri, 17 Aug 2018 10:26:39 GMT

### Patches

- ThumbnailList click target size issue fix

## 0.15.3
Thu, 16 Aug 2018 10:26:16 GMT

### Patches

- Various styling fixes for Dashboard cards
- update leftNav style change
- fix leftNav styling bugs
- patch leftNav styling per PM feedback

## 0.15.2
Wed, 15 Aug 2018 10:26:31 GMT

### Patches

- Changing font for components in card

## 0.15.1
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 0.15.0
Tue, 14 Aug 2018 00:01:11 GMT

### Minor changes

- Implement new design for StackedBarChart, New components MultiStackedBarChart and Legend. Update Card component to render new components

## 0.14.1
Mon, 13 Aug 2018 03:43:25 GMT

### Patches

- update leftNav style change
- fix leftNav styling bugs

## 0.14.0
Fri, 10 Aug 2018 10:26:08 GMT

### Minor changes

- Fix dashboard card height to match red lines

### Patches

- update leftNav style change

## 0.13.0
Wed, 08 Aug 2018 10:25:07 GMT

### Minor changes

- Adding multiple line chart to charting package. Consuming the multiple line chart in the dashboard Card.

### Patches

- Fix bad imports that break AMD.
- Update Auto-FontSize package to 1.0.9

## 0.12.0
Tue, 07 Aug 2018 10:22:32 GMT

### Minor changes

- Adding props that take colors for icon and content in each cell of gridlist

## 0.11.0
Mon, 06 Aug 2018 10:27:53 GMT

### Minor changes

- passing down card width and height down to charts

### Patches

- Fixing the type of onLayoutChange to fix build

## 0.10.0
Fri, 03 Aug 2018 10:25:59 GMT

### Minor changes

- Adding custom font size and color props to Multicount. Changes to the precision logic

### Patches

- Integrate Auto-FontSize to Recommendation Card header text
- Updated package.json to use react and react-dom in peer dependencies

## 0.9.0
Thu, 02 Aug 2018 10:23:19 GMT

### Minor changes

- Consuming donut,pie,stacked bar chart and mulicount into card.

### Patches

- Adding auto-fontsize dependency.

## 0.8.0
Wed, 01 Aug 2018 10:25:51 GMT

### Minor changes

- Multicount dataviz containing body text and annotation text

## 0.7.1
Tue, 31 Jul 2018 10:25:18 GMT

### Patches

- Fix bad import.

## 0.7.0
Wed, 25 Jul 2018 03:20:34 GMT

### Minor changes

- Fix dashboard package webpack issue

## 0.6.1
Tue, 24 Jul 2018 10:24:36 GMT

*Version update only*

## 0.6.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- Added disable drag prop to card to allow recommendation card to be non draggable
- Addressing bad imports.

## 0.5.0
Fri, 20 Jul 2018 10:25:21 GMT

### Minor changes

- Brought in drag api for dashboard grid layout, which enables adding elements from outside the grid into the grid layout

## 0.4.5
Thu, 19 Jul 2018 21:25:32 GMT

*Version update only*

## 0.4.4
Thu, 19 Jul 2018 19:04:38 GMT

*Version update only*

## 0.4.3
Thu, 19 Jul 2018 10:23:34 GMT

*Version update only*

## 0.4.2
Wed, 18 Jul 2018 10:25:50 GMT

*Version update only*

## 0.4.1
Tue, 17 Jul 2018 10:28:40 GMT

*Version update only*

## 0.4.0
Mon, 16 Jul 2018 10:27:18 GMT

### Minor changes

- DGL card shadow, card title href and styling fixes

## 0.3.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Created new package dashboard and moved Recommendation, card and nav to it 

## 0.2.0
Tue, 03 Jul 2018 17:41:15 GMT

### Minor changes

- Fixing loading of css stylesheets from rgl using style-loader

## 0.1.1
Fri, 29 Jun 2018 10:24:05 GMT

### Patches

- Fixed the style loading in dashboard grid layout
- Initial publish.

## 0.1.0
Thu, 21 Jun 2018 19:27:25 GMT

*Initial release*

