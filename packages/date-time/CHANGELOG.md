# Change Log - @uifabric/date-time

This log was last generated on Tue, 26 Nov 2019 12:32:11 GMT and should not be manually modified.

## 7.7.0
Tue, 26 Nov 2019 12:32:11 GMT

### Minor changes

- applying a custom ref callback for days in the calendardaygrid to allow consumers to specify their own properties directly on the dom element (jolore@microsoft.com)
## 7.6.0
Mon, 25 Nov 2019 12:31:13 GMT

### Minor changes

- Accessibility fixes for date-time Calendar, adding new strings for new aria labels and fixing aria-live regions (jolore@microsoft.com)
## 7.5.7
Thu, 21 Nov 2019 12:30:32 GMT

### Patches

- updating work week hover state to match the actual days that are going to be selected. The mouse over state still takes the whole week into account (jolore@microsoft.com)
## 7.5.6
Fri, 08 Nov 2019 12:30:07 GMT

### Patches

- Change files (betrue@microsoft.com)
## 7.5.5
Wed, 30 Oct 2019 19:36:52 GMT

### Patches

- Fixed accessibility of today in date-time package (betrue@microsoft.com)
## 7.5.4
Thu, 24 Oct 2019 12:31:42 GMT

### Patches

- undefined (phtucker@microsoft.com)
## 7.5.3
Tue, 22 Oct 2019 12:32:05 GMT

### Patches

- Fix getDerivedStateFromProps signatures (elcraig@microsoft.com)
## 7.5.2
Thu, 03 Oct 2019 23:14:46 GMT

### Patches

- Fixes publish issue from beachball (odbuild@microsoft.com)
## 7.5.0
Mon, 30 Sep 2019 12:35:16 GMT

### Minor changes

- undefined (jolore@microsoft.com)
- initial commit of multi-day day view implementation. Lots of style updates to allow the hover states to work- previously hover states were always static, but now the classes have to update dynamically as the mouse moves over days (jolore@microsoft.com)
## 7.4.8
Wed, 25 Sep 2019 12:34:56 GMT

### Patches

- fixing focus outline in IE11. The outline in IE11 does not show if it overflows the div it's in unless we explicitly set overflow: visible on the div (other browsers have this as the default). (jolore@microsoft.com)
## 7.4.7
Tue, 24 Sep 2019 12:35:43 GMT

### Patches

- Remove codepen-loader usage (elcraig@microsoft.com)
## 7.4.6
Mon, 23 Sep 2019 12:33:15 GMT

### Patches

- Icon Accessibility updates: update aria-hidden to pull aria-labelledBy from root and imageProps and removed role presentation - should not apply when a label is provided. (marygans@microsoft.com)
## 7.4.5
Mon, 16 Sep 2019 12:34:47 GMT

### Patches

- DatePicker: call custom text field onChange handler if it exists in default onChange handler (naethell@microsoft.com)
## 7.4.4
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.4.3
Thu, 29 Aug 2019 12:30:00 GMT

### Patches

- small bug fixes. Fix overflow issue in firefox, fix mouse hover issue in all, fix perf issue in month view rendering of Calendar (jolore@microsoft.com)
## 7.4.2
Mon, 26 Aug 2019 12:30:49 GMT

### Patches

- Updating snapshots. (dzearing@hotmail.com)
## 7.4.1
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.4.0
Thu, 15 Aug 2019 12:30:43 GMT

### Minor changes

- Rename deprecated React lifecycle functions to prevent development mode warnings in React 16.9. (jagore@microsoft.com)

## 7.3.0
Thu, 08 Aug 2019 12:32:41 GMT

### Minor changes

- Moves aria-label to same element as role=combobox on the datepicker as required by the aria docs (susunda@microsoft.com)

## 7.2.1
Tue, 06 Aug 2019 12:32:07 GMT

### Patches

- fixing broken IE11 by removing findIndex call, fixing the weeklydaypicker not rerendering when passed new initial date (jolore@microsoft.com)

## 7.2.0
Fri, 02 Aug 2019 12:33:29 GMT

### Minor changes

- finishing up the slide animation to apply to calendar and month and year pickers, and allow consumer to specify direction (jolore@microsoft.com)

## 7.1.7
Mon, 22 Jul 2019 12:28:42 GMT

### Patches

- fixing issue where buttons don't hide if they have focus, adding touch for navigation (jolore@microsoft.com)
- Improve how to get the min query string (elcraig@microsoft.com)

## 7.1.6
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.1.4
Thu, 04 Jul 2019 12:29:39 GMT

### Patches

- fix date conversion for weeklydaypicker (jolore@microsoft.com)

## 7.1.3
Mon, 01 Jul 2019 18:51:42 GMT

### Patches

- adds react-app-polyfill

## 7.1.2
Wed, 26 Jun 2019 12:23:41 GMT

### Patches

- update snapshots

## 7.1.1
Thu, 20 Jun 2019 12:27:38 GMT

### Patches

- fixing min/max date being ignored

## 7.1.0
Mon, 17 Jun 2019 12:26:51 GMT

### Minor changes

- adding new weekdaypicker component, refactoring calendardaygrid out of calendarday to share with new component

## 7.0.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 7.0.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 6.3.3
Wed, 12 Jun 2019 00:42:26 GMT

### Patches

- Re-export shared date utilities rather than duplicating
- Render demo app with Markdown instead of PageMarkdown
- Update and dedupe React deps.

## 6.3.2
Tue, 11 Jun 2019 12:21:35 GMT

### Patches

- upgrade to api-extractor 7.1.6

## 6.3.1
Mon, 10 Jun 2019 12:23:59 GMT

### Patches

- Snapshot updates to components for adding aria-hidden to icon component conditionally

## 6.3.0
Fri, 07 Jun 2019 12:21:48 GMT

### Minor changes

- styling updates for datetime calendar

## 6.2.1
Wed, 05 Jun 2019 12:22:30 GMT

### Patches

- add tooltips to Calendar buttons without text and fix text overflow bug in calendar header button with long names
- TextField: adds aria-labelledby to input

## 6.2.0
Mon, 03 Jun 2019 12:23:18 GMT

### Minor changes

- Updating DatePicker and Calendar accessibility

### Patches

- passing through props as the api expects them to be

## 6.1.2
Tue, 21 May 2019 12:20:44 GMT

### Patches

- Use shared demo app bootstrapping code
- DatePicker: keep validation errors after noop

## 6.1.1
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 6.1.0
Wed, 08 May 2019 12:37:40 GMT

### Minor changes

- adding DatePicker component and examples

## 6.0.4
Sat, 04 May 2019 00:01:53 GMT

### Patches

- CalendarDay: adjust styles to center align the selected days and months.

## 6.0.3
Tue, 30 Apr 2019 12:31:36 GMT

### Patches

- Use new getFocusStyle helper

## 6.0.2
Tue, 16 Apr 2019 12:32:59 GMT

### Patches

- Add Calendar to top level export

## 6.0.1
Mon, 15 Apr 2019 12:33:42 GMT

### Patches

- Bump to create first major release

## 0.3.5
Tue, 02 Apr 2019 00:38:14 GMT

### Patches

- fixing keros errors and some accessibility semantic issues with grids
- Use ^ ranges instead of >=

## 0.3.4
Wed, 27 Mar 2019 12:34:02 GMT

### Patches

- update api file generated by api-extractor 7]

## 0.3.3
Fri, 15 Mar 2019 12:34:06 GMT

### Patches

- Use codepen loader in examples

## 0.3.2
Tue, 12 Mar 2019 12:31:43 GMT

### Patches

- updating calendaryear to work when react version upgrades

## 0.3.1
Tue, 05 Mar 2019 17:33:41 GMT

### Patches

- Add type annotations based on update to "styled"

## 0.3.0
Thu, 28 Feb 2019 13:29:07 GMT

### Minor changes

- cherry picking restricted dates functionality to date-time package calendar

## 0.2.2
Tue, 12 Feb 2019 13:36:42 GMT

### Patches

- Calendar: adding type="button" in Calendar buttons so they don't submit by default inside forms

## 0.2.1
Wed, 16 Jan 2019 13:38:44 GMT

### Patches

- Port year-picking to date-time package

## 0.2.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- Creating the initial date-time package, including the first stage of the Calendar component css-in-js refactor, and creating the example page.

