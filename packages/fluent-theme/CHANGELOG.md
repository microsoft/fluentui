# Change Log - @uifabric/fluent-theme

This log was last generated on Wed, 04 Sep 2019 04:09:58 GMT and should not be manually modified.

## 7.1.4
Wed, 04 Sep 2019 04:09:58 GMT

### Patches

- fix version file (kchau@microsoft.com)
## 7.1.3
Fri, 23 Aug 2019 12:35:28 GMT

### Patches

- Update npmignores, delete unused jest setup files (elcraig@microsoft.com)
- Fix up readme and package.json descriptions (elcraig@microsoft.com)

## 7.1.2
Tue, 20 Aug 2019 12:31:26 GMT

### Patches

- Nav: update to latest redlines (phkuo@microsoft.com)

## 7.1.1
Tue, 13 Aug 2019 12:31:12 GMT

### Patches

- Updating snpashots and styles which use $ syntax. (dzearing@microsoft.com)

## 7.1.0
Wed, 07 Aug 2019 12:32:28 GMT

### Minor changes

- Updating styles to not use $ syntax. (dzearing@microsoft.com)

## 7.0.4
Wed, 17 Jul 2019 18:58:57 GMT

### Patches

- Adding @types/react and @types/react-dom to package.json that have peer dependencies on react and react-dom. (makotom@microsoft.com)

## 7.0.3
Wed, 10 Jul 2019 12:28:00 GMT

### Patches

- Button: Fixing CompoundButton and SplitButton high contrast mode styling. (humbertomakotomorimoto@gmail.com)

## 7.0.2
Fri, 14 Jun 2019 12:26:30 GMT

### Patches

- Fix missing assets in production build.

## 7.0.1
Thu, 13 Jun 2019 00:24:48 GMT

### Patches

- Initial release of Fabric 7

## 0.16.11
Wed, 12 Jun 2019 00:42:26 GMT

### Patches

- Update DatePicker import path
- Nav, Calendar, and DatePicker move into office-ui-fabric-react

## 0.16.10
Tue, 21 May 2019 12:20:44 GMT

### Patches

- IconButton: change the background color when in diabled state

## 0.16.9
Tue, 14 May 2019 07:50:30 GMT

### Patches

- Update Fabric assets link

## 0.16.8
Tue, 14 May 2019 01:56:43 GMT

### Patches

- Update border colors during rest state for certain components

## 0.16.7
Tue, 30 Apr 2019 12:31:36 GMT

### Patches

-  Use new getFocusStyle signature

## 0.16.6
Tue, 23 Apr 2019 12:32:00 GMT

### Patches

- CommandBarButton: Update expanded and expanded hover color
- Fix selector for ms-Button-icon in CommandBarButton

## 0.16.5
Mon, 22 Apr 2019 12:32:06 GMT

### Patches

- Update Fluent styles for CommandBar and CommandBarButton

## 0.16.4
Tue, 02 Apr 2019 00:38:14 GMT

### Patches

- Use ^ ranges instead of >=

## 0.16.3
Wed, 27 Mar 2019 12:34:02 GMT

### Patches

- IconButton style fixes and removing the SwatchColorPicker styles.

## 0.16.2
Tue, 19 Mar 2019 12:36:45 GMT

### Patches

- TeachingBubble: fixes bug were the styles for TeachingBubbleContent were not applied properly when not used directly.
- Fixes the scope name of `ListPeoplePicker` inside of `FluentCustomizations` object.

## 0.16.1
Fri, 15 Mar 2019 12:34:06 GMT

### Patches

- Breadcrumb: fixed last-child styling

## 0.16.0
Wed, 27 Feb 2019 01:28:58 GMT

### Minor changes

- Cleans up the `fluent-theme` styles of hard coded values for colors. Replaces the `borderRadius` and `boxShadow` styles with values from theme.

## 0.15.1
Mon, 25 Feb 2019 13:31:08 GMT

### Patches

- Update DetailsList Fluent styles

## 0.15.0
Wed, 20 Feb 2019 13:30:29 GMT

### Minor changes

- Panel: adds fluent styles overrides.

### Patches

- Breadcrumb: fixes issue where the last child was not bolded if not clickable to align design toolkit redlines.

## 0.14.2
Mon, 18 Feb 2019 13:38:30 GMT

### Patches

- Dialog: Adjust right padding of title

## 0.14.1
Fri, 15 Feb 2019 13:33:05 GMT

### Patches

- Remove unnecessary theme colors

## 0.14.0
Tue, 12 Feb 2019 13:36:43 GMT

### Minor changes

- Pickers: adds minor adjustments to align to new fluent style patterns.

## 0.13.4
Mon, 28 Jan 2019 13:35:27 GMT

### Patches

- Dropdown: fixes a misalignment of some items in the dropdown.

## 0.13.3
Fri, 25 Jan 2019 13:38:07 GMT

### Patches

- TeachingBubble: split the styles in two different regions to take into account when the TeachingBubbleContent is used as a standalone component.

## 0.13.2
Thu, 10 Jan 2019 04:58:48 GMT

### Patches

- Rating: Use palette colors where possible

## 0.13.1
Tue, 08 Jan 2019 13:34:49 GMT

### Patches

- Replacing references to 'office-ui-fabric-react/lib/Styling' with references to '@uifabric/styling' in fluent-theme package.

## 0.13.0
Mon, 24 Dec 2018 13:33:49 GMT

### Minor changes

- Export animations as strings instead of objects
- Add Facepile styles to theme

## 0.12.0
Fri, 14 Dec 2018 13:35:30 GMT

### Minor changes

- Add dependency to @uifabric/styling.  Fix imports for FluentTheme.ts

## 0.11.2
Thu, 13 Dec 2018 13:37:01 GMT

### Patches

- Default Button: Update hover background color

## 0.11.1
Tue, 11 Dec 2018 13:36:20 GMT

### Patches

- Removing Fabric component dependency. For scss-based components, added Fabric component wrappers in their stories but for non-scss based components, we'll have to see if we can accept them as new changes.

## 0.11.0
Fri, 07 Dec 2018 13:35:16 GMT

### Minor changes

- Add styles for Persona to theme

## 0.10.0
Fri, 30 Nov 2018 13:37:17 GMT

### Minor changes

- Add styles for TeachingBubble

### Patches

- Add types to all component style functions

## 0.9.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- DetailsList fluent styles added.
- semantic slot updates

## 0.8.0
Thu, 22 Nov 2018 13:36:17 GMT

### Minor changes

- Add Callout styles (also used by Tooltip)
- CommandBar: Add fluent changes.
- Modal: Add shadow and rounded corners. Remove the global className selector from Dialog.

## 0.7.0
Tue, 20 Nov 2018 13:32:17 GMT

### Minor changes

- HoverCard: Add fluent styles to ExpandingCard and PlainCard.

## 0.6.0
Wed, 14 Nov 2018 13:34:01 GMT

### Minor changes

- SwatchColorPicker: add fluent styles.

### Patches

- Add styles for ColorPicker

## 0.5.0
Tue, 13 Nov 2018 13:30:53 GMT

### Minor changes

- ComboBox: added fluent styles.

### Patches

- DatePicker: adds fluent styles.

## 0.4.1
Mon, 12 Nov 2018 13:31:40 GMT

### Patches

- Reduce top padding of Dialog

## 0.4.0
Fri, 09 Nov 2018 13:32:57 GMT

### Minor changes

- ContextualMenu: add fluent styles.
- Pivot: add fluent styles.

### Patches

- Update Dialog styles

## 0.3.0
Wed, 07 Nov 2018 13:31:00 GMT

### Minor changes

- Export all Fluent styles

### Patches

- Add Fluent button styles

## 0.2.0
Thu, 01 Nov 2018 12:31:45 GMT

### Minor changes

- SpinButton: add SpinButton fluent styles.

## 0.1.7
Mon, 29 Oct 2018 12:31:29 GMT

### Patches

- TextField, Breadcrumb: Updating some font weight for Breadcrumb and border color for TextField

## 0.1.6
Thu, 25 Oct 2018 12:30:06 GMT

### Patches

- Fluent theme: Update Slider colors

## 0.1.5
Wed, 24 Oct 2018 12:28:58 GMT

### Patches

- Fluent experiment: Change the color of disabled Labels
- Fluent theme: Update Toggle font weight and hover color
- Rating: adds fluent style updates.

## 0.1.4
Tue, 23 Oct 2018 12:32:16 GMT

### Patches

- Toggle: Update Fluent experiment to match latest designs
- Fluent theme: Update Toggle font weight and hover color
- TextField: update the fluent styles.
- Link: updating the fluent styles for Link component.

## 0.1.3
Mon, 22 Oct 2018 12:29:57 GMT

### Patches

- Use variants addVariants utility function.

## 0.1.2
Fri, 19 Oct 2018 12:29:20 GMT

### Patches

- Create new package for housing Fluent customizations.

