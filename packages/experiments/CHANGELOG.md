# Change Log - @uifabric/experiments

This log was last generated on Thu, 07 Mar 2019 13:32:46 GMT and should not be manually modified.

## 6.63.0
Thu, 07 Mar 2019 13:32:46 GMT

### Minor changes

- Removing Card component from experiments package.

### Patches

- folder cover ux cleaned up
- Signals: changes icon color of `follow` signal.

## 6.62.2
Wed, 06 Mar 2019 13:27:18 GMT

### Patches

- Clean up a few imports.

## 6.62.1
Tue, 05 Mar 2019 17:33:41 GMT

### Patches

- Add type annotations based on update to "styled"

## 6.62.0
Tue, 05 Mar 2019 04:25:07 GMT

### Minor changes

- remove Announced

### Patches

- add yellowDark as required

## 6.61.0
Thu, 28 Feb 2019 13:29:07 GMT

### Minor changes

- Card: Exporting Card from experiments.

## 6.60.0
Tue, 26 Feb 2019 13:31:28 GMT

### Minor changes

- move Text component from experiments -> OUFR

## 6.59.2
Mon, 25 Feb 2019 13:31:08 GMT

### Patches

- Stack: Making doc block in `Stack.ts` in the `experiments` package so that @deprecated is recognized.

## 6.59.1
Fri, 22 Feb 2019 13:31:09 GMT

### Patches

- Button: Fixing focus outline and border on circular buttons.
- Fix RTL handling in SignalsField

## 6.59.0
Thu, 21 Feb 2019 13:32:08 GMT

### Minor changes

- Button: Adding split property to get Split Buttons.
- Fluent folder: positioned signal-icon on the right

## 6.58.0
Wed, 20 Feb 2019 21:57:24 GMT

### Minor changes

- Add render-prop pattern to Tile and FolderCover components

### Patches

- Stack: Reexporting component from experiments package.

## 6.57.1
Mon, 18 Feb 2019 13:38:29 GMT

### Patches

- to useFluentIcon prop to change top padding in style
- Text: Fix 'as' prop circular reference

## 6.57.0
Fri, 15 Feb 2019 17:41:16 GMT

### Minor changes

- Stack: Removing component from experiments package.

## 6.56.0
Thu, 14 Feb 2019 13:34:54 GMT

### Minor changes

- Card: Adding first prototype for Basic Card component.
- Experiments: Removed form control

### Patches

- fluent folder cover; updated metadata font color; added yellowDark color variable

## 6.55.0
Wed, 13 Feb 2019 13:36:45 GMT

### Minor changes

- Stack: Renaming preventShrink to disableShrink in Stack and StackItem. Removing defaultProps from StackStatics.

### Patches

- Fix id usage in examples

## 6.54.4
Tue, 12 Feb 2019 13:36:42 GMT

### Patches

- Stack: Modifying StackItem so that it can render multiple children.

## 6.54.3
Fri, 08 Feb 2019 13:37:21 GMT

### Patches

- Fixed the VerticalPersona not wrapping text properly in IE

## 6.54.2
Mon, 04 Feb 2019 13:36:12 GMT

### Patches

- CollapsibleSectionTitle: Use new factoryOptions prop. Name factory wrappers.

## 6.54.1
Thu, 31 Jan 2019 20:10:48 GMT

### Patches

- Remove Slots/Tokens Foundation implementation.

## 6.54.0
Thu, 31 Jan 2019 13:36:13 GMT

### Minor changes

- Stack: Making 'gap' prop be able to take two values, one for horizontal gap and one for vertical gap, and removing 'verticalGap' prop.

### Patches

-  Fixing shrinking issues in component examples after shrinkItems was replaced with preventShrink.

## 6.53.2
Wed, 30 Jan 2019 13:36:21 GMT

### Patches

- Change slot render function signature for increased flexibility.
- Stack: Fixing IE11 wrapping bug reproed in 'Horizontal Stack - Wrapping - Nested' example.

## 6.53.1
Tue, 29 Jan 2019 13:35:55 GMT

### Patches

- Stack: Removing 'whiteSpace: noWrap' from children styles and improving API comments.

## 6.53.0
Mon, 28 Jan 2019 13:35:27 GMT

### Minor changes

- Stack: Updating API based on feedback from review.
- Stack: Removing 'top' and 'bottom' from accepted values for 'verticalAlign' prop and updating examples and tests using them.

## 6.52.0
Fri, 25 Jan 2019 13:38:07 GMT

### Minor changes

- Stack: Adding 'reversed' prop, updating styles, and adding examples, snapshot tests and vr-tests.

### Patches

- Minor fixes to Toggle and CollapsibleSection.

## 6.51.2
Wed, 23 Jan 2019 22:53:12 GMT

### Patches

- Stack: Removing unneeded children logic used to calculate classnames.
- Use button element for Tile when there is no href
- Bundle improvement for Tile click fix
- Use CSS object-fit in the Image component in capable browsers

## 6.51.1
Mon, 21 Jan 2019 13:36:01 GMT

### Patches

- Add typing helpers missed in #7711.

## 6.51.0
Fri, 18 Jan 2019 13:38:05 GMT

### Minor changes

- Introduce tokens for vertical variant of Persona

### Patches

- Add helper return types to mitigate TS function return type widening.

## 6.50.7
Thu, 17 Jan 2019 13:34:42 GMT

### Patches

- Added azure themes to demo page
- Foundation API improvements.

## 6.50.6
Wed, 16 Jan 2019 13:38:44 GMT

### Patches

- Update Foundation typings to require Tokens.
- Icon: removing aria-hidden attribute.

## 6.50.5
Tue, 15 Jan 2019 13:36:45 GMT

### Patches

- Convert all compoenents to use Slots. Add experimental Tokens feature.

## 6.50.4
Fri, 11 Jan 2019 05:00:46 GMT

### Patches

- Made message bar visible in High Contrast

## 6.50.3
Tue, 08 Jan 2019 13:34:49 GMT

### Patches

- Stack: Adding documentation for the Overview, Do's and Dont's sections of the component page.
- VirtualizedList: fix componentDidUpdate usage

## 6.50.2
Mon, 07 Jan 2019 13:34:37 GMT

### Patches

- Stack: Consolidating vr-tests into single Stack.stories file instead of separate VerticalStack.stories and HorizontalStack.stories files.

## 6.50.1
Fri, 04 Jan 2019 13:36:07 GMT

### Patches

- Stack: Adding vertical stack wrapping test to vr-tests.

## 6.50.0
Tue, 01 Jan 2019 13:36:37 GMT

### Minor changes

- Adds PersonaCoin and VerticalPersona

## 6.49.1
Mon, 31 Dec 2018 13:37:56 GMT

### Patches

- Stack: Implementing wrapping of vertical stacks and adding examples for it, fixing bugs in wrapping of horizontal stacks.

## 6.49.0
Tue, 18 Dec 2018 22:17:52 GMT

### Minor changes

- Pagination: Add unit tests for control and fix button styles.

## 6.48.2
Mon, 17 Dec 2018 13:36:58 GMT

### Patches

- Form: fix wrong imports from OUFR dependency.

## 6.48.1
Fri, 14 Dec 2018 13:35:30 GMT

### Patches

- Change type usage for consistency. Fix Stack styling bug.

## 6.48.0
Thu, 13 Dec 2018 13:37:01 GMT

### Minor changes

- remove references to ITypography

### Patches

- Stack: Renaming horizontalAlignment, verticalAlignment, fillHorizontal and fillVertical to horizontalAlign, verticalAlign, horizontalFill and verticalFill respectively.

## 6.47.0
Tue, 11 Dec 2018 13:36:20 GMT

### Minor changes

- Using single Stack component with 'horizontal' prop instead of separate HorizontalStack and VerticalStack components.

### Patches

- Add new Slots feature. Convert Button to use. Add Slots page with examples.

## 6.46.0
Fri, 07 Dec 2018 13:35:16 GMT

### Minor changes

- Pagination: Exported component from top level export

## 6.45.0
Tue, 04 Dec 2018 13:36:40 GMT

### Minor changes

- DevExp: const enums are replaced with constants, this allows the use of isolatedModules mode of compilation

## 6.44.1
Mon, 03 Dec 2018 13:37:07 GMT

### Patches

- Lifting the resolution of default and user provided style variables to Utilities.

## 6.44.0
Fri, 30 Nov 2018 13:37:17 GMT

### Minor changes

- Pagination: Initial check-in of pagination control into experiments package.

### Patches

- Add missing depenencies

## 6.43.0
Thu, 29 Nov 2018 19:34:12 GMT

### Minor changes

- Re-export Signals from package root
- update snapshots from semantic slot value updates
- Toggle: Refining style variables approach in Toggle and adding examples passing interface and function.

## 6.42.0
Thu, 22 Nov 2018 13:36:17 GMT

### Minor changes

- Add initializeFolderCovers pathway to override CDN for FolderCover

### Patches

- Stack: remove display: none styling on empty children

## 6.41.1
Wed, 21 Nov 2018 13:34:56 GMT

### Patches

- Toggle: Reetructured Toggle to use style variables.

## 6.41.0
Thu, 08 Nov 2018 04:17:34 GMT

### Minor changes

- Converting existing Toggle component to use Foundation.

### Patches

- added bookmark signal icons

## 6.40.3
Fri, 02 Nov 2018 18:11:37 GMT

*Version update only*

## 6.40.2
Fri, 02 Nov 2018 12:28:55 GMT

*Version update only*

## 6.40.1
Wed, 31 Oct 2018 12:32:41 GMT

### Patches

- Add theme provider helper and replace usage of scheme prop with theme provider.

## 6.40.0
Mon, 29 Oct 2018 12:31:29 GMT

### Minor changes

- Announced: add initial component prototype and examples

## 6.39.5
Thu, 25 Oct 2018 12:30:06 GMT

*Version update only*

## 6.39.4
Wed, 24 Oct 2018 12:28:58 GMT

### Patches

- fix breaking changes for odsp

## 6.39.3
Tue, 23 Oct 2018 12:32:16 GMT

### Patches

- Fix an issue with the demo site not being able to load (in npm start or aka.ms/fabricdemo).

## 6.39.2
Mon, 22 Oct 2018 12:29:57 GMT

### Patches

- Move theme definitions to theme-samples package. Remove Fluent styles page.
- Use fluent-theme package customizations.

## 6.39.1
Thu, 18 Oct 2018 20:22:36 GMT

### Patches

- Remove api-extractor.disabled.json
- Fluent: Updating fluent styles for ChoiceGroup plus addressing feedback on Breadcrumb, Checkbox and Dropdown.

## 6.39.0
Wed, 17 Oct 2018 12:29:40 GMT

### Minor changes

- Breadcrumb: fluent updates to breadcrumb styles.

### Patches

- revert PR 6258 for signal icon issues

## 6.38.1
Wed, 17 Oct 2018 01:29:55 GMT

### Patches

- Updated Readme
- Fix FluentStylesPage by wrapping a Customizer around each example

## 6.38.0
Tue, 16 Oct 2018 12:28:48 GMT

### Minor changes

- Fluent: updates the styles of Dropdown and CheckBox to follow fluent specs.

### Patches

- Add customizations for component examples. Remove redundant customizations from Button example.

## 6.37.1
Mon, 15 Oct 2018 12:29:12 GMT

### Patches

- updating snapshot tests in experiments package
- Added font theme setting to Button, ChicletCard, CollapsibleSection, Shimmer, ShimmerCircle, ShimmerElementsGroup, ShimmerGap, ShimmerLine, HorizontalStack, Text. Snapshots updated in VerticalStack, Stack.
- Improve BaseState typing and fix use by experimental components.

## 6.37.0
Wed, 10 Oct 2018 12:29:05 GMT

### Minor changes

- Separator: change text size and add theming example

## 6.36.1
Mon, 08 Oct 2018 19:25:44 GMT

### Patches

- Sidebar: added index export

## 6.36.0
Mon, 08 Oct 2018 12:24:15 GMT

### Minor changes

- Sidebar: Added new component

### Patches

- Moving tslint/prettier dependencies 
- Fix a11y violations in Fluent ContextualMenu examples
- Sidebar: Fixed filename and imports

## 6.35.0
Fri, 05 Oct 2018 23:29:26 GMT

### Minor changes

- Sidebar: Added new component

## 6.34.2
Thu, 04 Oct 2018 12:26:48 GMT

*Version update only*

## 6.34.1
Wed, 03 Oct 2018 12:28:46 GMT

*Version update only*

## 6.34.0
Tue, 02 Oct 2018 12:28:04 GMT

### Minor changes

- Separator: new experimental component

### Patches

- Changes to support Foundation interface refactoring.

## 6.33.0
Mon, 01 Oct 2018 12:27:24 GMT

### Minor changes

- Adding Button experiment, initial refactoring of BaseState component

## 6.32.4
Fri, 28 Sep 2018 12:27:38 GMT

### Patches

- HorizontalStack: remove padding as a fix for collapsing margins, remove unnecessary calc() calls

## 6.32.3
Thu, 27 Sep 2018 12:27:48 GMT

*Version update only*

## 6.32.2
Tue, 25 Sep 2018 12:28:12 GMT

### Patches

- Stack: update styles to account for all margin collapsing on wrapped HorizontalStacks

## 6.32.1
Fri, 21 Sep 2018 14:25:46 GMT

### Patches

- Adding a version stamp file
- Example modification to highlight scheming capability.

## 6.32.0
Wed, 19 Sep 2018 12:27:48 GMT

### Minor changes

- Stack: add wrapping for HorizontalStack, support themed gap and padding, support native HTML properties, refactor StackItem so that its child does not require a class
- StackItem: add fillHorizontal and fillVertical props

## 6.31.0
Tue, 18 Sep 2018 12:26:03 GMT

### Minor changes

- Stack: add wrapping for HorizontalStack, support themed gap and padding, support native HTML properties, refactor StackItem so that its child does not require a class

## 6.30.2
Mon, 17 Sep 2018 12:27:05 GMT

### Patches

- Changes to support Foundation refactoring.
- nav fix
- improve nav per designer feedback

## 6.30.1
Fri, 14 Sep 2018 01:55:02 GMT

### Patches

- Fluent: Fix issue with background color on primary buttons using the wrong values

## 6.30.0
Wed, 12 Sep 2018 12:26:41 GMT

### Minor changes

- Add motion to the Fluent experiment

## 6.29.1
Tue, 11 Sep 2018 02:54:40 GMT

### Patches

- update missing metadata signal icon
- Tiles: Fix on hover underline issue for signal icon in Tiles view

## 6.29.0
Fri, 07 Sep 2018 22:04:50 GMT

### Minor changes

- Adjusting foundation usage, using new React 16 context.

## 6.28.3
Fri, 07 Sep 2018 16:29:48 GMT

*Version update only*

## 6.28.2
Wed, 05 Sep 2018 10:29:25 GMT

### Patches

- nav fix
- improve nav per designer feedback

## 6.28.1
Thu, 30 Aug 2018 19:26:04 GMT

*Version update only*

## 6.28.0
Thu, 30 Aug 2018 10:32:49 GMT

### Minor changes

- TagPicker added as a Form input component.
- Update Shared palette colors

### Patches

- Corrected some Checkbox implementations - should use 'aria-labelledby' instead of 'aria-describedby'

## 6.27.1
Tue, 28 Aug 2018 10:23:58 GMT

### Patches

- Experiments: Add theming examples page for documentation and to prep for testing schemes.

## 6.27.0
Fri, 24 Aug 2018 17:02:14 GMT

### Minor changes

- Reverting Customizer React 16 context change.

## 6.26.0
Fri, 24 Aug 2018 10:26:08 GMT

### Minor changes

- Text: now defaults to the default variant, added support for more styling options, adjusted how color is pulled, updated example.

### Patches

- Replace usage of deprecated onChanged prop with onChange

## 6.25.0
Thu, 23 Aug 2018 10:28:17 GMT

### Minor changes

- Adjusting foundation usage, using new React 16 context.

## 6.24.3
Tue, 21 Aug 2018 20:36:27 GMT

### Patches

- Adding required validator support for the FormDropdown in multi-select mode.

## 6.24.2
Tue, 21 Aug 2018 10:28:16 GMT

### Patches

- Experiments: fix TextPage require path after a file extension change.

## 6.24.1
Mon, 20 Aug 2018 10:26:10 GMT

*Version update only*

## 6.24.0
Thu, 16 Aug 2018 10:26:16 GMT

### Minor changes

- Adding support for drop-downs with multiple selection to the FormDropdown component.

## 6.23.3
Tue, 14 Aug 2018 10:27:33 GMT

### Patches

- disabling codepen task

## 6.23.2
Tue, 14 Aug 2018 00:01:11 GMT

*Version update only*

## 6.23.1
Mon, 13 Aug 2018 03:43:25 GMT

### Patches

- Remove utilities index file.

## 6.23.0
Fri, 10 Aug 2018 10:26:08 GMT

### Minor changes

- Stack: render vertically by default, add horizontalAlignment, verticalAlignment, fillHorizontal, fillVertical properties
- Updating `Text` component with fixes to make it usable.

### Patches

- Inject customizations into Foundation. Add contextual theming and styling examples.

## 6.22.6
Wed, 08 Aug 2018 10:25:07 GMT

### Patches

- Fix bad imports that break AMD.
- Implement base state class and controlled vs. uncontrolled behavior.
- Stack: merge the className of a StackItem with the className of its first child

## 6.22.5
Mon, 06 Aug 2018 10:27:53 GMT

### Patches

- Fixing Stack to allow for classNames through Stack.Item

## 6.22.4
Fri, 03 Aug 2018 10:25:59 GMT

### Patches

- Added export to index

## 6.22.3
Thu, 02 Aug 2018 10:23:19 GMT

### Patches

- Updated border color on rest state of button, added borders to other states and reverted change to radio button selection dot.

## 6.22.2
Wed, 01 Aug 2018 10:25:51 GMT

### Patches

- Improvements to CollapsibleSection and new examples.

## 6.22.1
Mon, 30 Jul 2018 10:27:11 GMT

### Patches

- FormDropdown: allow options prop to flow to the underlying Dropdown component.

## 6.22.0
Fri, 27 Jul 2018 10:25:39 GMT

### Minor changes

- Added TextField to FluentStyles

### Patches

- added export for collapsible section and foundation

## 6.21.0
Thu, 26 Jul 2018 10:28:51 GMT

### Minor changes

- Updates Fluent styles for Dialog and ComoboBox

## 6.20.0
Wed, 25 Jul 2018 03:20:34 GMT

### Minor changes

- Make stack grow be more flexible

## 6.19.1
Tue, 24 Jul 2018 10:24:36 GMT

*Version update only*

## 6.19.0
Mon, 23 Jul 2018 10:28:08 GMT

### Minor changes

- Text: use existing theming
- Addressing bad imports.

## 6.18.3
Fri, 20 Jul 2018 10:25:21 GMT

*Version update only*

## 6.18.2
Thu, 19 Jul 2018 21:25:32 GMT

*Version update only*

## 6.18.1
Thu, 19 Jul 2018 19:04:38 GMT

*Version update only*

## 6.18.0
Thu, 19 Jul 2018 10:23:34 GMT

### Minor changes

- Fluent Styles for ComboBox and Dialog

## 6.17.0
Wed, 18 Jul 2018 10:25:50 GMT

### Minor changes

- Fix typing errors

## 6.16.0
Tue, 17 Jul 2018 10:28:40 GMT

### Minor changes

- Removing most `@customizable` decorator usage. This change should reduce extra React dom elements from being created. Also updating `componentRef` resolution to support `React.createRef()` usage.

## 6.15.1
Mon, 16 Jul 2018 10:27:18 GMT

*Version update only*

## 6.15.0
Fri, 13 Jul 2018 21:32:37 GMT

### Minor changes

- Reverting the TypeScript bump, to un
- Card: disable dragging of card everywhere but title bar
- Added FluentStyles for Panel, TextField, ContextualMenu, and ComboBox
- Moved nav, recommendation and card to m365-admin package

## 6.13.6
Thu, 12 Jul 2018 10:29:30 GMT

### Patches

- Consume horizontal bar chart in card, fix bad import 

## 6.13.5
Tue, 10 Jul 2018 21:54:07 GMT

### Patches

- Update to latest Fluent depths/shadows

## 6.13.4
Mon, 09 Jul 2018 18:08:32 GMT

### Patches

- Remove createComponent utility and use Foundation package.
- changing imports for charts in react DashboardCard to point to correct package
- Update to latest Fluent depths

## 6.13.2
Fri, 06 Jul 2018 10:23:46 GMT

### Patches

- css changes for action bar

## 6.13.1
Tue, 03 Jul 2018 17:41:15 GMT

### Patches

- Minor tweak to FormDropdown component to make it compatible with tightened Dropdown API

## 6.13.0
Tue, 03 Jul 2018 10:23:19 GMT

### Minor changes

- Stack: clean up file structure

## 6.12.2
Mon, 02 Jul 2018 10:21:36 GMT

### Patches

- css changes for action bar

## 6.12.1
Fri, 29 Jun 2018 10:24:05 GMT

### Patches

- TileList: Adds a fading out overlay over the Shimmer Tiles.

## 6.12.0
Wed, 27 Jun 2018 23:59:19 GMT

### Minor changes

- Change toggle style values from ems to px

## 6.11.0
Wed, 27 Jun 2018 17:22:20 GMT

### Minor changes

- fluent style updates per design feedback
- Revert toggle border-width to pre-Fluent width
- Prototype of Stack and Text components

### Patches

- CardDidMount callback for making api calls, additional ref incase there is a use case where there is no state, compoundButtonStack  size variation and gridList component v1.1 changes

## 6.10.1
Tue, 26 Jun 2018 10:27:47 GMT

### Patches

- Re-export ShimmerTile in its original location for 5.0 compat

## 6.10.0
Fri, 22 Jun 2018 16:21:15 GMT

### Minor changes

- Toggle component fluent example set up in experiments
- M365 Common Recommendation control including examples with Image Illustration and Data Viz

## 6.9.0
Thu, 21 Jun 2018 19:27:25 GMT

### Minor changes

- Add Fluent type ramp, update color names

### Patches

- CardDidMount callback for making api calls, additional ref incase there is a use case where there is no state, compoundButtonStack  size variation and gridList component v1.1 changes

## 6.8.0
Wed, 20 Jun 2018 23:33:29 GMT

### Minor changes

- Updated ChoiceGroup FluentStyles to include 'checked' style prop
- Added Checkbox and ChoiceGroup to Fluent Styles Page
- label fluentstyles
- Added examples for Rating and Slider to FluentStyles page - no style changes
- expose Nav to teams not using npm

## 6.7.0
Wed, 20 Jun 2018 10:25:55 GMT

### Minor changes

- Experiments/Nav component: Fix to display nav group header on show more

### Patches

- Prettier fixes

## 6.6.0
Tue, 19 Jun 2018 10:26:26 GMT

### Minor changes

- Added Fluent Styles Page
- Update Fluent colors
- Update Fluent colors and theme

## 6.5.0
Mon, 18 Jun 2018 16:57:14 GMT

### Minor changes

- Dashboard Card Component for Admin Portals Dashboard which will be hosted inside react-grid-layout. 
- Add GridList component into the existing Dashboard Card Component

### Patches

- Add alias to CommandBar to final version
- Fix import mistakes

## 6.4.0
Fri, 08 Jun 2018 18:34:17 GMT

### Minor changes

- add style arg to customizable

## 6.3.0
Thu, 07 Jun 2018 16:35:34 GMT

### Minor changes

- Create CollapsibleSection component and createComponent utility.
- Tweaked the lint rules.

### Patches

- Code format changes

## 6.2.0
Tue, 05 Jun 2018 10:23:03 GMT

### Minor changes

- Experiment/Nav component: hide nav group header if the links under it are hidden
- ShimmerTile: Moves ShimmerTile to Tile component as it's only purpose is create a mock for a tile and itself alone never renders a Shimmer animation.

## 6.1.2
Tue, 05 Jun 2018 00:44:30 GMT

### Patches

- Added Prettier

## 6.1.1
Mon, 04 Jun 2018 10:16:13 GMT

### Patches

- Updating react typings.
- Fixed tests to be compatible with jest 23

## 6.1.0
Fri, 01 Jun 2018 10:18:43 GMT

### Minor changes

- Experiments/Nav component: display "show more" link only if there is atleast one hidden link
- Shimmer: Shimmer refactor to use new props and deprecate others. Build more examples of Shimmer use.

## 6.0.0
Wed, 30 May 2018 20:28:33 GMT

### Breaking changes

- Command Bar: Promoted to main office-ui-fabric-react package.
- Minimum React version is now 16.3.2.

## 5.44.0
Mon, 28 May 2018 10:23:24 GMT

### Minor changes

- Shimmer: Refactors and enhances Shimmer with more features.

## 5.43.0
Fri, 25 May 2018 21:30:43 GMT

### Minor changes

- Experiments/Nav component: Enable auto expand until the next manual expand disables the auto expand

## 5.42.0
Fri, 25 May 2018 16:53:46 GMT

### Minor changes

- Experiments/Nav component: Auto select/expand based on the selectedKey prop
- Keyboard support for the slim version of experiments/Nav component and added aria attributes

## 5.41.0
Tue, 22 May 2018 10:29:12 GMT

### Minor changes

- Implementation of the Chiclet component

## 5.40.0
Mon, 21 May 2018 10:29:16 GMT

### Minor changes

- Screen reader support for the toggle nav menu and made the toggle nav menu customizable through props

## 5.39.0
Wed, 16 May 2018 00:05:17 GMT

### Minor changes

- Experiments/Nav: accessibility changes

### Patches

- use better icon for MalwareDetectedSignal

## 5.38.2
Fri, 11 May 2018 04:21:29 GMT

### Patches

- Fix Fluent palette color names

## 5.38.1
Thu, 10 May 2018 10:27:25 GMT

### Patches

- Update Fluent theme to use relative imports

## 5.38.0
Tue, 08 May 2018 10:17:01 GMT

### Minor changes

- Adds a Fluent theme experiment

## 5.37.0
Fri, 04 May 2018 15:58:38 GMT

### Minor changes

- Edit link to customize experiments/Nav component and show more/less link to toggle hidden nav links

### Patches

- Updating React build version.

## 5.36.0
Wed, 02 May 2018 23:55:40 GMT

### Minor changes

- Remove Keytips from experiments package

## 5.35.0
Tue, 01 May 2018 10:23:32 GMT

### Minor changes

- remove extendedPicker, floatingPicker, and selectedItemsList from experiments
- Command bar accessibility: one tab stop with aria label

## 5.34.0
Mon, 30 Apr 2018 10:16:44 GMT

### Minor changes

- Nav: Refactored out a NavLink component.

## 5.33.1
Wed, 25 Apr 2018 05:32:09 GMT

### Patches

- Fix bad aria-label prop in Tile

## 5.33.0
Mon, 23 Apr 2018 10:24:54 GMT

### Minor changes

- Updating the focus styling to use the generalized `ms-Fabric--isFocusVisibl

### Patches

- Fix code in @uifabric/experiments such that it adheres to same tslint rules as the main office-ui-fabric-react package.
- Fix index import

## 5.32.0
Fri, 20 Apr 2018 23:06:06 GMT

### Minor changes

- Add delete callback, expose item change methods on SelectedItemsList
- Shimmer: adding two new props and deprecating another one.

## 5.31.4
Thu, 19 Apr 2018 18:25:59 GMT

### Patches

- Update createRef to match React.createRef api

## 5.31.3
Wed, 18 Apr 2018 10:15:04 GMT

### Patches

- Experiments: NavPage bad imports fixed.

## 5.31.2
Tue, 17 Apr 2018 18:47:11 GMT

### Patches

- Fix improper imports from index files

## 5.31.1
Mon, 16 Apr 2018 10:23:25 GMT

### Patches

- prefer const, instead of let, for extendedpicker, floatingpicker, and selecteditemlists
- M365Nav component as an experiment
- Removing module entry temporarily. (Will be added back in 6.0.)
- Updating build to React 16.3.1.
- Shimmer: Changes casing on enums in Shimmer.types
- Experiments: fixing imports for example pages for better user understanding.
- Shimmer: adding two more examples as per designers request.
- Shimmer: imports audited

## 5.31.0
Thu, 12 Apr 2018 10:15:54 GMT

### Minor changes

- Refactoring Shimmer and adding ShimmerTile + Implements Shimmer in TilesList.

### Patches

- Shimmerline import was not correct, fixing import.
- Shimmer: Application example modified to reflect changes in DetailsList

## 5.30.0
Tue, 10 Apr 2018 17:37:28 GMT

### Minor changes

- FloatingPicker: add show/hide picker call backs, fix double resolve when queryString is the same 

### Patches

- Tile: exporting an enum to use the values in creating a PlaceholderTile in Shimmer component.

## 5.29.1
Thu, 05 Apr 2018 10:15:39 GMT

### Patches

- fix suggestion header/footer for more flexibile rendering
- Align Tiles in last row with previous rows

## 5.29.0
Tue, 03 Apr 2018 10:16:05 GMT

### Minor changes

- Sets up an example of Shimmer used with DetailsList Component.

## 5.28.2
Sat, 31 Mar 2018 17:40:00 GMT

### Patches

- We need to temporarily remove `sideEffects: false` flag from package.json which will disable w
- Fix flex styling for SignalField
- Pass all props to Signal Icon elements

## 5.28.1
Wed, 28 Mar 2018 21:50:01 GMT

### Patches

- Remove root imports of office-ui-fabric-react

## 5.28.0
Tue, 27 Mar 2018 20:22:53 GMT

### Minor changes

- Create new pattern for suggestions for BaseFloatingPicker

### Patches

- Fix errors in Signals styles

## 5.27.0
Sun, 25 Mar 2018 03:08:03 GMT

### Minor changes

- Add missing icons to Signals and fix colors
- Updating to webpack 4 for producting bundles. Adding appropriate `module` and `sideEffects` fl

### Patches

- Update componentRef types

## 5.26.1
Thu, 22 Mar 2018 10:14:03 GMT

### Patches

- Removes @autobind for arrow functions

## 5.26.0
Tue, 20 Mar 2018 10:27:37 GMT

### Minor changes

- Changes in the props and naming.
- Adds a new Shimmer Component to experiments package.

## 5.25.1
Mon, 19 Mar 2018 10:27:55 GMT

### Patches

- Use arrow function properties instead of @autobind

## 5.25.0
Mon, 12 Mar 2018 06:29:20 GMT

### Minor changes

- Adds a new Shimmer Component to experiments package.

## 5.24.1
Thu, 08 Mar 2018 11:27:23 GMT

### Patches

- Add Keytip and KeytipLayer to experiments export

## 5.24.0
Wed, 07 Mar 2018 11:16:50 GMT

### Minor changes

- add clearInput on BaseExtendedPicker

## 5.23.1
Tue, 06 Mar 2018 02:06:59 GMT

### Patches

- Add Keytip and KeytipLayer to experiments export
- Replaced PureComponent with Component to appease website's UHF react version.

## 5.23.0
Mon, 05 Mar 2018 11:16:58 GMT

### Minor changes

- Converting Image SCSS to MergeStyles step 2 - style conversion (snapshots updated)

## 5.22.0
Fri, 02 Mar 2018 11:25:35 GMT

### Minor changes

- BaseExtendedPicker: Create component to wrap the rendered item, so users get contextual menu if certain props are present, get rid of loading state, fix autofocus on input after suggestion selection

### Patches

- Add initial set of Keytip work

## 5.21.0
Fri, 16 Feb 2018 11:23:28 GMT

### Minor changes

- Removing Coachmark

### Patches

- Hook up onPaste for BaseExtendedPicker

## 5.20.0
Wed, 14 Feb 2018 22:10:49 GMT

### Minor changes

- Use new "use current input" command in Suggestions

## 5.19.0
Wed, 07 Feb 2018 11:23:59 GMT

### Minor changes

- Added a fillHorizontal mode to TilesList

## 5.18.0
Tue, 06 Feb 2018 11:14:36 GMT

### Minor changes

- change persona pill css

### Patches

- BasePicker: Use correct autofillnow

## 5.17.0
Fri, 02 Feb 2018 11:24:16 GMT

### Minor changes

- allow editing of selected items in selected people list

### Patches

- consume BlockedSite icon for malware detected signal

## 5.16.1
Wed, 31 Jan 2018 11:11:59 GMT

### Patches

- Make Selection optional (create default seleciton fallback), change render typedef to any, to allow use in lower versions of types/react"

## 5.16.0
Mon, 29 Jan 2018 11:23:40 GMT

### Minor changes

- Add overflowMenuProps to Experiments CommandBar

## 5.15.0
Thu, 25 Jan 2018 11:23:06 GMT

### Minor changes

- add optional title element to extendedPicker, css changes to have selected items flow on the same row as input

## 5.14.0
Mon, 22 Jan 2018 11:14:27 GMT

### Minor changes

- Add callbacks for onDataReduced and onDataGrown

### Patches

- Minor visual alignment for FolderCover text

## 5.13.0
Fri, 12 Jan 2018 20:03:21 GMT

### Minor changes

- Add demo of size 64 file type icons

## 5.12.0
Wed, 10 Jan 2018 11:23:36 GMT

### Minor changes

- Add search throttle to floating picker

## 5.11.1
Tue, 19 Dec 2017 11:22:47 GMT

### Patches

- Broaden the range of allowed prop-type versions

## 5.11.0
Sat, 16 Dec 2017 05:07:22 GMT

### Minor changes

- Updated build to newest React version and typings. Updated tests and made various tweaks to the code to remove React warnings and keep Enzyme

## 5.10.1
Fri, 15 Dec 2017 11:22:38 GMT

### Patches

- Remove padding and border for suggestions and add callout width prop in floating picker

## 5.10.0
Thu, 14 Dec 2017 11:23:17 GMT

### Minor changes

- Add remeasure public method to CommandBar

## 5.9.2
Tue, 12 Dec 2017 02:08:36 GMT

### Patches

- add link ref in tile

## 5.9.1
Fri, 08 Dec 2017 18:09:44 GMT

### Patches

- Experiments: Fix build breaks in master

## 5.9.0
Mon, 04 Dec 2017 17:27:54 GMT

### Minor changes

- Add experiments page for file type icons

## 5.8.0
Fri, 01 Dec 2017 11:11:16 GMT

### Minor changes

- Revise Signals and provide example page

### Patches

- Fixes the external signal component

## 5.7.0
Wed, 29 Nov 2017 11:24:05 GMT

### Minor changes

- Updating TypeScript to 2.6.2.

## 5.6.1
Thu, 23 Nov 2017 11:10:13 GMT

### Patches

- Apply props.className in ResizeGroup. Add snapshot for ResizeGroup. Pass className from experiments CommandBarTests. Update experiments CommandBar snapshot

## 5.6.0
Fri, 17 Nov 2017 17:36:36 GMT

### Minor changes

- Add external signal

### Patches

- Make sure commands get added/removed in the correct order

## 5.5.2
Thu, 16 Nov 2017 11:20:34 GMT

### Patches

- Fix experiment imports for FloatingPicker and ExtendedPicker components

## 5.5.1
Wed, 08 Nov 2017 11:11:27 GMT

### Patches

- Fix alignment with trending icon

## 5.5.0
Wed, 08 Nov 2017 06:05:34 GMT

### Minor changes

- added ATP signal

## 5.4.0
Thu, 02 Nov 2017 18:20:18 GMT

### Minor changes

- Added SelectedItemsList, change ExtendedPicker from extending BasePicker to be new component utilizing SelectedItemsList and FloatingPicker

### Patches

- Fix import that was causing build error

## 5.3.1
Tue, 24 Oct 2017 10:21:08 GMT

### Patches

- Switch to .svg files for FolderCover images

## 5.3.0
Fri, 20 Oct 2017 18:42:08 GMT

### Minor changes

- Add modal selection behavior to TilesList

## 5.2.0
Wed, 18 Oct 2017 10:21:25 GMT

### Minor changes

- Add Form control

## 5.1.0
Tue, 17 Oct 2017 17:17:41 GMT

### Minor changes

- Create BaseExtendedPicker which extends current BasePicker to experiment with adding new functionality and create BaseFloatingPicker support @mention like scenarios, respectively

## 5.0.5
Fri, 13 Oct 2017 01:36:01 GMT

### Patches

- Fix visibility of Tile descenders

## 5.0.4
Fri, 06 Oct 2017 10:18:41 GMT

### Patches

- TSConfig: update to use preserveConstEnums so that certain builds s ystems don't break when importing const enums

## 5.0.3
Wed, 04 Oct 2017 22:40:22 GMT

*Version update only*

## 5.0.2
Sat, 30 Sep 2017 01:26:37 GMT

### Patches

- Code cleanup after move to MergeStyles

## 5.0.1
Wed, 27 Sep 2017 00:20:58 GMT

### Patches

- Updated for Fabric 5.0.

## 0.10.0
Thu, 21 Sep 2017 06:23:58 GMT

### Minor changes

- Adjust Tile and FolderCover alignments and behaviors

### Patches

- Consume Check hover behavior in Tile

## 0.9.0
Tue, 19 Sep 2017 10:08:55 GMT

### Minor changes

- LayoutGroup: Changed gap to layoutGap and updated docs

## 0.8.0
Mon, 18 Sep 2017 10:18:23 GMT

### Minor changes

- Add accessibility hooks for Tile, TilesList, and FolderCover

## 0.7.1
Fri, 15 Sep 2017 10:19:50 GMT

### Patches

- Add folder cover shadows

## 0.7.0
Thu, 14 Sep 2017 00:34:57 GMT

### Minor changes

- Add support for folder cover signals

## 0.6.0
Tue, 12 Sep 2017 17:41:25 GMT

### Minor changes

- Added LayoutGroup, FolderCover, Tile and TilesList to exports

## 0.5.1
Fri, 08 Sep 2017 10:16:28 GMT

### Patches

- Fix alignment of Tile foreground and background using flexbox
- Add breakpoint size support to Tile

## 0.5.0
Thu, 07 Sep 2017 10:09:51 GMT

### Minor changes

- Removed global fabric export
- Add presentation hooks for Tile and FolderCover
- Support auto-focus for TilesList

### Patches

- Fix minor alignment issues with SignalField

## 0.4.0
Mon, 04 Sep 2017 10:16:56 GMT

### Minor changes

- Add size pre-computation support to Tile and FolderCover

## 0.3.0
Tue, 29 Aug 2017 20:55:35 GMT

### Minor changes

- Implement FolderCover component

### Patches

- Adjusted build to produce sourcemaps with correct sourceRoot.

## 0.2.1
Tue, 29 Aug 2017 10:20:56 GMT

### Patches

- Fix Selection module reference in Tile modules

## 0.2.0
Sat, 26 Aug 2017 00:52:38 GMT

### Minor changes

- Separate Selection out from TilesList and fix minor TilesList bugs

## 0.1.7
Fri, 25 Aug 2017 20:31:51 GMT

### Patches

- Adding back sourcemap content to .map files, which should alleviate "../src/* missing" issues when using webpack.

## 0.1.6
Fri, 25 Aug 2017 19:27:18 GMT

*Version update only*

## 0.1.5
Thu, 24 Aug 2017 10:20:20 GMT

*Version update only*

## 0.1.4
Thu, 24 Aug 2017 05:38:14 GMT

### Patches

- Inserted disable jsx-ban-props lines to experiments pkg to pass tslint

## 0.1.3
Wed, 23 Aug 2017 19:04:55 GMT

### Patches

- Removed suppression of tslint max line length rule from Experiments package, and broke up large lines or inserted tslint:disable comments to pass tslint
- Removed suppression of tslint unused variables rule from Experiments package and removed unused variables to pass tslint
- Removed suppression of tslint self-close rule from Experiments package and self-closed all empty elements to pass tslint
- Added missing typedefs to call signatures in experiments, re-enable tslint rulefor typedef

## 0.1.2
Tue, 22 Aug 2017 10:09:55 GMT

*Version update only*

## 0.1.1
Mon, 21 Aug 2017 10:19:29 GMT

### Patches

- Updating project dependencies.

## 0.1.0
Fri, 18 Aug 2017 16:32:33 GMT

### Minor changes

- Added commandbar as ExperimentCommandBar

### Patches

- Fix underflow for TilesList with stack grids

## 0.0.2
Wed, 16 Aug 2017 10:11:43 GMT

*Version update only*

## 0.0.1
Tue, 15 Aug 2017 10:19:22 GMT

*Initial release*

