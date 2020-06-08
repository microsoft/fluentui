# Change Log - @fluentui/react-focus

This log was last generated on Thu, 21 May 2020 12:34:43 GMT and should not be manually modified.

<!-- Start content -->

## [7.12.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.12.0)

Thu, 21 May 2020 12:34:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.11.5..@fluentui/react-focus_v7.12.0)

### Minor changes

- FocusZone: Adding shouldRaiseClicks prop to allow for opt-in/opt-out way to invoke clicks on focusable elements. ([PR #12478](https://github.com/microsoft/fluentui/pull/12478) by humbertomakotomorimoto@gmail.com)

### Patches

- FocusZone: Defaulting to false for the preventDefaultWhenHandled prop to maintain old behavior. ([PR #13256](https://github.com/microsoft/fluentui/pull/13256) by humbertomakotomorimoto@gmail.com)

## [7.11.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.11.5)

Fri, 15 May 2020 05:52:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.11.2..@fluentui/react-focus_v7.11.5)

### Patches

- Updating build tool dependencies. ([PR #13103](https://github.com/microsoft/fluentui/pull/13103) by dzearing@microsoft.com)

## [7.11.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.11.2)

Wed, 13 May 2020 12:33:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.11.0..@fluentui/react-focus_v7.11.2)

### Patches

- Adding `@fluentui/keyboard-key` as a dependency. ([PR #13123](https://github.com/microsoft/fluentui/pull/13123) by dzearing@microsoft.com)

## [7.11.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.11.0)

Fri, 08 May 2020 12:35:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.10.2..@fluentui/react-focus_v7.11.0)

### Minor changes

- FocusZone: Converging defaultTabbableElement/defaultActiveElement and bringing shouldFocusInnerElementWhenReceivedFocus to v7. ([PR #12853](https://github.com/microsoft/fluentui/pull/12853) by Humberto.Morimoto@microsoft.com)

### Patches

- Adding keyboard-key to FocusZone. ([PR #12339](https://github.com/microsoft/fluentui/pull/12339) by humbertomakotomorimoto@gmail.com)

## [7.10.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.10.2)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.10.1..@fluentui/react-focus_v7.10.2)

### Patches

- Addressing commonjs imports. ([PR #13031](https://github.com/microsoft/fluentui/pull/13031) by dzearing@microsoft.com)

## [7.10.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.10.1)

Wed, 06 May 2020 12:32:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.10.0..@fluentui/react-focus_v7.10.1)

### Patches

- Fix pagingSupportDisabled handling in FocusZone ([PR #12997](https://github.com/microsoft/fluentui/pull/12997) by jukapsia@microsoft.com)

## [7.10.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.10.0)

Tue, 05 May 2020 12:34:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.9.0..@fluentui/react-focus_v7.10.0)

### Minor changes

- FocusZone: Adding pagingSupportDisabled prop to provide a way to opt out of paging support via the Page Up and Page Down keys. ([PR #12448](https://github.com/microsoft/fluentui/pull/12448) by humbertomakotomorimoto@gmail.com)

### Patches

- Adding missing changes due to move from IPoint to Point. ([PR #12993](https://github.com/microsoft/fluentui/pull/12993) by humbertomakotomorimoto@gmail.com)

## [7.9.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.9.0)

Mon, 04 May 2020 12:33:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.8.0..@fluentui/react-focus_v7.9.0)

### Minor changes

- FocusZone: Bringing preventFocusRestoration functionality to v7. ([PR #12615](https://github.com/microsoft/fluentui/pull/12615) by humbertomakotomorimoto@gmail.com)

## [7.8.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.8.0)

Fri, 01 May 2020 00:19:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.7.0..@fluentui/react-focus_v7.8.0)

### Minor changes

- FocusZone: Using v0 prop names for props where names differed and deprecating old ones. ([PR #12484](https://github.com/microsoft/fluentui/pull/12484) by humbertomakotomorimoto@gmail.com)

## [7.7.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.7.0)

Tue, 28 Apr 2020 12:34:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.6.0..@fluentui/react-focus_v7.7.0)

### Minor changes

- Updating IPoint, x and y references to Point, left and top respectively. ([PR #12722](https://github.com/microsoft/fluentui/pull/12722) by humbertomakotomorimoto@gmail.com)

## [7.6.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.6.0)

Mon, 27 Apr 2020 12:33:11 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.5.0..@fluentui/react-focus_v7.6.0)

### Minor changes

- FocusZone: Bringing shouldResetActiveElementWhenTabFromZone to v7. ([PR #12593](https://github.com/microsoft/fluentui/pull/12593) by Humberto.Morimoto@microsoft.com)

### Patches

- FocusZone: Adding check to see if element has editable content in Home and End keystroke scenarios. ([PR #12456](https://github.com/microsoft/fluentui/pull/12456) by humbertomakotomorimoto@gmail.com)

## [7.5.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.5.0)

Thu, 23 Apr 2020 12:32:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.4.0..@fluentui/react-focus_v7.5.0)

### Minor changes

- FocusZone: Adding preventDefaultWhenHandled to v7 version. ([PR #12636](https://github.com/microsoft/fluentui/pull/12636) by humbertomakotomorimoto@gmail.com)

### Patches

- FocusZone: Updating comment for preventDefaultWhenHandled prop. ([PR #12830](https://github.com/microsoft/fluentui/pull/12830) by Humberto.Morimoto@microsoft.com)

## [7.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.4.0)

Thu, 16 Apr 2020 12:37:31 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.3.1..@fluentui/react-focus_v7.4.0)

### Minor changes

- FocusZone: Bringing shouldFocusOnMount prop from v0 to v7. ([PR #12709](https://github.com/microsoft/fluentui/pull/12709) by humbertomakotomorimoto@gmail.com)

### Patches

- undefined ([PR #12709](https://github.com/microsoft/fluentui/pull/12709) by humbertomakotomorimoto@gmail.com)

## [7.3.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.3.1)

Thu, 16 Apr 2020 05:06:13 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.3.0..@fluentui/react-focus_v7.3.1)

### Patches

- FocusZone: Replacing use of 'on' helper with native eventing. ([PR #12710](https://github.com/microsoft/fluentui/pull/12710) by humbertomakotomorimoto@gmail.com)

## [7.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-focus_v7.3.0)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-focus_v7.1.13..@fluentui/react-focus_v7.3.0)

### Minor changes

- FocusZone: Adding focusLast imperative method to v7. ([PR #12600](https://github.com/microsoft/fluentui/pull/12600) by humbertomakotomorimoto@gmail.com)

### Patches

- FocusZone: Updating comment of allowFocusRoot to be more descriptive of its functionality. ([PR #12666](https://github.com/microsoft/fluentui/pull/12666) by humbertomakotomorimoto@gmail.com)

## 7.1.12
Mon, 30 Mar 2020 19:10:08 GMT

### Patches

- Fix repository URL (elcraig@microsoft.com)
- react-focus: Updating README to reflect package purpose. (humbertomakotomorimoto@gmail.com)
## 7.1.10
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Changing references of Fabric to Fluent (mgodbolt@microsoft.com)
## 7.1.1
Mon, 02 Mar 2020 12:25:44 GMT

### Patches

- FocusZone: When parking focus needs to be detected, IE11 returns `null` for `activeElement`, causing focus to not be restored. We now check for `null` to ensure the feature works correctly in this environment. (dzearing@microsoft.com)
## 7.1.0
Tue, 25 Feb 2020 12:25:39 GMT

### Minor changes

- Updating deprecated ReactType to non-deprecated ElementType. (Humberto.Morimoto@microsoft.com)
### Patches

- Move examples to examples package (elcraig@microsoft.com)
## 0.0.6
Thu, 20 Feb 2020 12:20:16 GMT

### Patches

- React-focus: Enabling storybook in new package. (Humberto.Morimoto@microsoft.com)
## 0.0.2
Thu, 13 Feb 2020 23:22:22 GMT

### Patches

- react-focus package being added to move out focus utilities from the main package. (dzearing@microsoft.com)
