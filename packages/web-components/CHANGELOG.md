# Change Log - @fluentui/web-components

This log was last generated on Wed, 07 Jul 2021 07:32:54 GMT and should not be manually modified.

<!-- Start content -->

## [1.0.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v1.0.1)

Wed, 07 Jul 2021 07:32:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v1.0.0..@fluentui/web-components_v1.0.1)

### Patches

- removes duplicate styles for expand-collapse-glyph on tree item causing specificity/ordering issues ([PR #18828](https://github.com/microsoft/fluentui/pull/18828) by chhol@microsoft.com)

## [1.0.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v1.0.0)

Fri, 02 Jul 2021 23:15:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.22.1..@fluentui/web-components_v1.0.0)

### Major changes

- add directional stylesheet, css partials, and default slotted content for vNext components ([PR #18275](https://github.com/microsoft/fluentui/pull/18275) by chhol@microsoft.com)
- undefined ([PR #18187](https://github.com/microsoft/fluentui/pull/18187) by chhol@microsoft.com)
- create recipes and tokens on DI and update components to leverage tokens ([PR #18226](https://github.com/microsoft/fluentui/pull/18226) by chhol@microsoft.com)
- migrate DSP to design tokens ([PR #18578](https://github.com/microsoft/fluentui/pull/18578) by nicholasrice@users.noreply.github.com)

### Minor changes

- Updated Card color handling for new design tokens Updated fill-color handling in design-system-provider Added neutral-fill-layer-rest-delta to design-system-provider Updated use of fluent-design-system-provider in samples Cleaned up styles and sorted imports ([PR #18631](https://github.com/microsoft/fluentui/pull/18631) by 47367562+bheston@users.noreply.github.com)
- Updated the neutral fill card color recipe to always be lighter or equal to the container, instead of flipping to go darker over white. ([PR #18444](https://github.com/microsoft/fluentui/pull/18444) by 47367562+bheston@users.noreply.github.com)
- Migrated recipes from DI to Design Tokens Renamed neutralForeground back to neutralForegroundRest Removed the "L" from layer names Added some typing and made `RGB` type imports less specific ([PR #18561](https://github.com/microsoft/fluentui/pull/18561) by 47367562+bheston@users.noreply.github.com)
- correct tabs font size and line height ([PR #18240](https://github.com/microsoft/fluentui/pull/18240) by chhol@microsoft.com)
- add support for sub menus to menu ([PR #18233](https://github.com/microsoft/fluentui/pull/18233) by jes@microsoft.com)
- Removed old color recipes and moved vNext. ([PR #18732](https://github.com/microsoft/fluentui/pull/18732) by 47367562+bheston@users.noreply.github.com)
- Standardized remaining design token recipe types ([PR #18602](https://github.com/microsoft/fluentui/pull/18602) by 47367562+bheston@users.noreply.github.com)
- Rename and clean up of design tokens and recipe: - neutralContrastFill -> neutralFillInverse - neutralFillToggle -> neutralFillContrast - neutralFocus -> focusStrokeOuter - neutralFocusInnerAccent -> focusStrokeInner - outline -> stroke - Removed 'selected' colors ([PR #18410](https://github.com/microsoft/fluentui/pull/18410) by 47367562+bheston@users.noreply.github.com)
- add color-vNext folder with recipes and update specs ([PR #18199](https://github.com/microsoft/fluentui/pull/18199) by chhol@microsoft.com)
- update web component corner radius token value to 4 ([PR #18231](https://github.com/microsoft/fluentui/pull/18231) by chhol@microsoft.com)
- Fixed foregroundOnAccent recipe to work in all states ([PR #18765](https://github.com/microsoft/fluentui/pull/18765) by 47367562+bheston@users.noreply.github.com)

### Patches

- update typings for context and definition, export base classes ([PR #18716](https://github.com/microsoft/fluentui/pull/18716) by chhol@microsoft.com)
- Updated type ramp to latest values. ([PR #16927](https://github.com/microsoft/fluentui/pull/16927) by brheston@microsoft.com)
- fix a bug where the bottom border for select and comobox would visually disappear on active states ([PR #18348](https://github.com/microsoft/fluentui/pull/18348) by chhol@microsoft.com)
- Removed accent fill direction handling to standardize foreground text color ([PR #18789](https://github.com/microsoft/fluentui/pull/18789) by 47367562+bheston@users.noreply.github.com)

## [0.22.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.22.1)

Tue, 08 Jun 2021 07:32:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.22.0..@fluentui/web-components_v0.22.1)

### Patches

- set pointer event none on children content ([PR #18473](https://github.com/microsoft/fluentui/pull/18473) by khamu@microsoft.com)

## [0.22.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.22.0)

Fri, 04 Jun 2021 07:37:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.21.2..@fluentui/web-components_v0.22.0)

### Minor changes

- Updated the neutral fill card color recipe to always be lighter or equal to the container, instead of flipping to go darker over white. ([PR #18432](https://github.com/microsoft/fluentui/pull/18432) by 47367562+bheston@users.noreply.github.com)

## [0.21.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.21.2)

Thu, 20 May 2021 07:41:54 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.21.1..@fluentui/web-components_v0.21.2)

### Patches

- add active state on accent button for high contrast ([PR #18246](https://github.com/microsoft/fluentui/pull/18246) by khamu@microsoft.com)

## [0.21.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.21.1)

Mon, 17 May 2021 07:33:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.21.0..@fluentui/web-components_v0.21.1)

### Patches

- moved disabled styles from pattern styles to button styles ([PR #18195](https://github.com/microsoft/fluentui/pull/18195) by khamu@microsoft.com)
- only show flippers on horizontal scroll when control is hovered ([PR #17460](https://github.com/microsoft/fluentui/pull/17460) by robarb@microsoft.com)

## [0.21.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.21.0)

Fri, 30 Apr 2021 07:42:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.20.3..@fluentui/web-components_v0.21.0)

### Minor changes

- content-visibility ([PR #17907](https://github.com/microsoft/fluentui/pull/17907) by qinshuoli@microsoft.com)

## [0.20.3](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.20.3)

Wed, 21 Apr 2021 07:31:50 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.20.2..@fluentui/web-components_v0.20.3)

### Patches

- add pointer-events none for slotted svgs in buttons and anchors to prevent focus rect on click ([PR #17750](https://github.com/microsoft/fluentui/pull/17750) by chhol@microsoft.com)

## [0.20.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.20.2)

Thu, 01 Apr 2021 07:33:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.20.1..@fluentui/web-components_v0.20.2)

### Patches

- update filled style on textfield textarea and numberfield ([PR #17595](https://github.com/microsoft/fluentui/pull/17595) by khamu@microsoft.com)

## [0.20.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.20.1)

Mon, 29 Mar 2021 07:30:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.20.0..@fluentui/web-components_v0.20.1)

### Patches

- correct outline color for number field to ensure alignment w/ other inputs ([PR #17576](https://github.com/microsoft/fluentui/pull/17576) by chhol@microsoft.com)

## [0.20.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.20.0)

Fri, 26 Mar 2021 07:32:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.19.1..@fluentui/web-components_v0.20.0)

### Minor changes

- create a separate css block for filled appearance and add appearanceBehavior ([PR #17565](https://github.com/microsoft/fluentui/pull/17565) by khamu@microsoft.com)

## [0.19.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.19.1)

Thu, 25 Mar 2021 07:33:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.19.0..@fluentui/web-components_v0.19.1)

### Patches

- removed SVGs to use the default ([PR #17527](https://github.com/microsoft/fluentui/pull/17527) by khamu@microsoft.com)

## [0.19.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.19.0)

Tue, 23 Mar 2021 07:31:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.18.0..@fluentui/web-components_v0.19.0)

### Minor changes

- add appearance style sheet behavior ([PR #17516](https://github.com/microsoft/fluentui/pull/17516) by jes@microsoft.com)

### Patches

- remove whitespace causing focus issue on button and anchor controls ([PR #17515](https://github.com/microsoft/fluentui/pull/17515) by chhol@microsoft.com)

## [0.18.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.18.0)

Fri, 19 Mar 2021 07:32:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.17.0..@fluentui/web-components_v0.18.0)

### Minor changes

- created and add number-field files ([PR #17494](https://github.com/microsoft/fluentui/pull/17494) by khamu@microsoft.com)

## [0.17.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.17.0)

Thu, 18 Mar 2021 20:15:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.16.2..@fluentui/web-components_v0.17.0)

### Minor changes

- update fixture, storybook and styles for tooltip and anchor region ([PR #16399](https://github.com/microsoft/fluentui/pull/16399) by khamu@microsoft.com)

### Patches

- Exporting FluentHorizontalScroll ([PR #17470](https://github.com/microsoft/fluentui/pull/17470) by robarb@microsoft.com)

## [0.16.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.16.2)

Wed, 17 Mar 2021 07:35:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.16.1..@fluentui/web-components_v0.16.2)

### Patches

- Adding horizontal scroll component ([PR #17460](https://github.com/microsoft/fluentui/pull/17460) by robarb@microsoft.com)

## [0.16.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.16.1)

Tue, 16 Mar 2021 07:32:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.16.0..@fluentui/web-components_v0.16.1)

### Patches

- add force-colors backgroundStyles and set a few HC colors on button styles ([PR #17231](https://github.com/microsoft/fluentui/pull/17231) by khamu@microsoft.com)

## [0.16.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.16.0)

Fri, 12 Mar 2021 20:04:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.15.0..@fluentui/web-components_v0.16.0)

### Minor changes

- add data grid as a new web component ([PR #17390](https://github.com/microsoft/fluentui/pull/17390) by chhol@microsoft.com)

## [0.15.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.15.0)

Sun, 07 Mar 2021 23:34:51 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.14.2..@fluentui/web-components_v0.15.0)

### Minor changes

- add menuitemcheckbox and menuitemradio styling to menu-item ([PR #17305](https://github.com/microsoft/fluentui/pull/17305) by chhol@microsoft.com)
- add combobox as a new web component ([PR #17307](https://github.com/microsoft/fluentui/pull/17307) by chhol@microsoft.com)

## [0.14.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.14.2)

Thu, 25 Feb 2021 01:15:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.14.1..@fluentui/web-components_v0.14.2)

### Patches

- update card background color attribute to reflect from view ([PR #17162](https://github.com/microsoft/fluentui/pull/17162) by chhol@microsoft.com)
- undefined ([PR #17162](https://github.com/microsoft/fluentui/pull/17162) by chhol@microsoft.com)

## [0.14.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.14.1)

Mon, 22 Feb 2021 12:26:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.14.0..@fluentui/web-components_v0.14.1)

### Patches

- remove hard coded background color in favor of default design system behavior ([PR #17070](https://github.com/microsoft/fluentui/pull/17070) by chhol@microsoft.com)

## [0.14.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.14.0)

Fri, 12 Feb 2021 12:26:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.13.1..@fluentui/web-components_v0.14.0)

### Minor changes

- Improved support for design system neutral color - Added a neutralBaseColor property in the design system - Update neutralPalette and accentPalette when respective baseColor changes - Updated Card to base background color on local neutralPalette - Updated Card stories to illustrate use cases ([PR #16899](https://github.com/microsoft/fluentui/pull/16899) by brheston@microsoft.com)

## [0.13.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.13.1)

Thu, 11 Feb 2021 02:38:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.13.0..@fluentui/web-components_v0.13.1)

### Patches

- remove duplicate color export from web components package ([PR #16941](https://github.com/microsoft/fluentui/pull/16941) by chhol@microsoft.com)

## [0.13.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.13.0)

Tue, 09 Feb 2021 00:56:52 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.12.1..@fluentui/web-components_v0.13.0)

### Minor changes

- add neutral-contrast-fill recipe ([PR #16824](https://github.com/microsoft/fluentui/pull/16824) by khamu@microsoft.com)

### Patches

- fix: export missing parseColorString util ([PR #16876](https://github.com/microsoft/fluentui/pull/16876) by chhol@microsoft.com)

## [0.12.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.12.1)

Mon, 08 Feb 2021 12:23:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.12.0..@fluentui/web-components_v0.12.1)

### Patches

- correct focus visible outline on accent button and anchor styles ([PR #16833](https://github.com/microsoft/fluentui/pull/16833) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.12.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.12.0)

Wed, 03 Feb 2021 05:51:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.11.0..@fluentui/web-components_v0.12.0)

### Minor changes

- feat: move color recipes into fluent web component package ([PR #16755](https://github.com/microsoft/fluentui/pull/16755) by chhol@microsoft.com)

## [0.11.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.11.0)

Tue, 26 Jan 2021 12:33:19 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.6..@fluentui/web-components_v0.11.0)

### Minor changes

- fix: change accordion item region to display block ([PR #16571](https://github.com/microsoft/fluentui/pull/16571) by jes@microsoft.com)

### Patches

- set margin on separator slot ([PR #16575](https://github.com/microsoft/fluentui/pull/16575) by khamu@microsoft.com)

## [0.10.6](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.6)

Thu, 21 Jan 2021 12:36:12 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.5..@fluentui/web-components_v0.10.6)

### Patches

-  Updating dev dependencies. ([PR #16548](https://github.com/microsoft/fluentui/pull/16548) by dzearing@microsoft.com)

## [0.10.5](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.5)

Wed, 20 Jan 2021 12:22:46 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.4..@fluentui/web-components_v0.10.5)

### Patches

- Fixes content shifting when anchor has focus due to 2px bottom border ([PR #16538](https://github.com/microsoft/fluentui/pull/16538) by robarb@microsoft.com)

## [0.10.4](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.4)

Fri, 15 Jan 2021 12:30:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.3..@fluentui/web-components_v0.10.4)

### Patches

- fix: add hover state for expand collapse button in tree-item ([PR #16375](https://github.com/microsoft/fluentui/pull/16375) by jes@microsoft.com)
- fix slider disabled and readonly cursor ([PR #16374](https://github.com/microsoft/fluentui/pull/16374) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.10.3](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.3)

Tue, 12 Jan 2021 12:36:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.2..@fluentui/web-components_v0.10.3)

### Patches

- update svg fill to use currentcolor so svg defaults to text color, change some currentColor to currentcolor ([PR #16379](https://github.com/microsoft/fluentui/pull/16379) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.10.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.2)

Tue, 05 Jan 2021 12:29:33 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.1..@fluentui/web-components_v0.10.2)

### Patches

- add height clamp and box sizing for select ([PR #16347](https://github.com/microsoft/fluentui/pull/16347) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- add select indicator css selector to fix indicator sizing ([PR #16349](https://github.com/microsoft/fluentui/pull/16349) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- add padding for focus overlap of state in accordion item ([PR #16350](https://github.com/microsoft/fluentui/pull/16350) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- add switch label margin and cursor pointer ([PR #16351](https://github.com/microsoft/fluentui/pull/16351) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- move text-field label__hidden styles below main label styles for proper order ([PR #16355](https://github.com/microsoft/fluentui/pull/16355) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- add inline start margin for rtl to slider ([PR #16356](https://github.com/microsoft/fluentui/pull/16356) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)
- update start and end to remove fixed width and height ([PR #16359](https://github.com/microsoft/fluentui/pull/16359) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.10.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.1)

Fri, 18 Dec 2020 12:27:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.10.0..@fluentui/web-components_v0.10.1)

### Patches

- fix: focus styling inconsistencies ([PR #16265](https://github.com/microsoft/fluentui/pull/16265) by jes@microsoft.com)

## [0.10.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.10.0)

Thu, 17 Dec 2020 12:30:15 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.9.2..@fluentui/web-components_v0.10.0)

### Minor changes

- add icon only anchor support, update fast packages ([PR #16248](https://github.com/microsoft/fluentui/pull/16248) by chhol@microsoft.com)

### Patches

- fix: broken rtl scenerios ([PR #16247](https://github.com/microsoft/fluentui/pull/16247) by jes@microsoft.com)

## [0.9.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.9.2)

Wed, 16 Dec 2020 12:27:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.9.1..@fluentui/web-components_v0.9.2)

### Patches

- update style on aria-current item and adjust margin on last item ([PR #16238](https://github.com/microsoft/fluentui/pull/16238) by khamu@microsoft.com)

## [0.9.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.9.1)

Wed, 09 Dec 2020 12:27:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.9.0..@fluentui/web-components_v0.9.1)

### Patches

- set FieldText color on label and status-message ([PR #16106](https://github.com/microsoft/fluentui/pull/16106) by khamu@microsoft.com)

## [0.9.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.9.0)

Wed, 02 Dec 2020 12:37:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.8.1..@fluentui/web-components_v0.9.0)

### Minor changes

- add a class to button in shadow DOM when default slotted content is only an svg icon ([PR #16112](https://github.com/microsoft/fluentui/pull/16112) by chhol@microsoft.com)

## [0.8.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.8.1)

Sat, 21 Nov 2020 02:00:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.8.0..@fluentui/web-components_v0.8.1)

### Patches

- add forced color adjust to host selector ([PR #16009](https://github.com/microsoft/fluentui/pull/16009) by khamu@microsoft.com)
- update fast packages to latest minor versions ([PR #16012](https://github.com/microsoft/fluentui/pull/16012) by chhol@microsoft.com)
- ensure all web components leverage the body font design token ([PR #16013](https://github.com/microsoft/fluentui/pull/16013) by chhol@microsoft.com)
- feat: add select and related styles ([PR #16021](https://github.com/microsoft/fluentui/pull/16021) by jes@microsoft.com)

## [0.8.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.8.0)

Wed, 18 Nov 2020 12:30:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.7.2..@fluentui/web-components_v0.8.0)

### Minor changes

- fix: radio group orientation vertical broken ([PR #15953](https://github.com/microsoft/fluentui/pull/15953) by jes@microsoft.com)

## [0.7.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.7.2)

Tue, 17 Nov 2020 12:36:24 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.7.1..@fluentui/web-components_v0.7.2)

### Patches

- moved high contrast work into common button styles file ([PR #15916](https://github.com/microsoft/fluentui/pull/15916) by khamu@microsoft.com)

## [0.7.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.7.1)

Thu, 05 Nov 2020 12:29:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.7.0..@fluentui/web-components_v0.7.1)

### Patches

- flipper cursor should be pointer on hover ([PR #15824](https://github.com/microsoft/fluentui/pull/15824) by chhol@microsoft.com)

## [0.7.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.7.0)

Thu, 29 Oct 2020 12:34:59 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.6.3..@fluentui/web-components_v0.7.0)

### Minor changes

- add hover and focus-within elevation change for card ([PR #15751](https://github.com/microsoft/fluentui/pull/15751) by chhol@microsoft.com)

### Patches

- ensure elevated corner radius is applied to dialog ([PR #15752](https://github.com/microsoft/fluentui/pull/15752) by chhol@microsoft.com)

## [0.6.3](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.6.3)

Wed, 14 Oct 2020 20:26:08 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.6.2..@fluentui/web-components_v0.6.3)

### Patches

- operate dialog in open mode to ensure accessible focus behavior is supported ([PR #15502](https://github.com/microsoft/fluentui/pull/15502) by chhol@microsoft.com)
- remove un-necessary palette generation ([PR #15509](https://github.com/microsoft/fluentui/pull/15509) by nicholasrice@users.noreply.github.com)

## [0.6.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.6.2)

Fri, 09 Oct 2020 18:03:19 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.6.1..@fluentui/web-components_v0.6.2)

### Patches

- removes palette generation for every card and adds better null checking to avoid runtime errors ([PR #15429](https://github.com/microsoft/fluentui/pull/15429) by nicholasrice@users.noreply.github.com)

## [0.6.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.6.1)

Fri, 09 Oct 2020 12:23:45 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.6.0..@fluentui/web-components_v0.6.1)

### Patches

- fix: ensure font properties are inherited to control and start/end content ([PR #15435](https://github.com/microsoft/fluentui/pull/15435) by chhol@microsoft.com)

## [0.6.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.6.0)

Wed, 07 Oct 2020 12:24:30 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.5.0..@fluentui/web-components_v0.6.0)

### Minor changes

- close shadow roots of all web components ([PR #15382](https://github.com/microsoft/fluentui/pull/15382) by nicholasrice@users.noreply.github.com)
- add skeleton as a new component ([PR #15397](https://github.com/microsoft/fluentui/pull/15397) by chhol@microsoft.com)

## [0.5.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.5.0)

Fri, 02 Oct 2020 12:28:46 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.4.0..@fluentui/web-components_v0.5.0)

### Minor changes

- export DesignSystem interface ([PR #15313](https://github.com/microsoft/fluentui/pull/15313) by chhol@microsoft.com)

## [0.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.4.0)

Thu, 24 Sep 2020 00:46:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.3.1..@fluentui/web-components_v0.4.0)

### Minor changes

- Feat: adds automatic card background color calculation ([PR #15126](https://github.com/microsoft/fluentui/pull/15126) by jes@microsoft.com)

### Patches

- center align the start and end slot on tabs ([PR #14852](https://github.com/microsoft/fluentui/pull/14852) by 37851220+khamudom@users.noreply.github.com)

## [0.3.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.3.1)

Wed, 23 Sep 2020 12:27:48 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.3.0..@fluentui/web-components_v0.3.1)

### Patches

- update sizing on indeterminate indicator ([PR #14836](https://github.com/microsoft/fluentui/pull/14836) by 37851220+khamudom@users.noreply.github.com)

## [0.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.3.0)

Thu, 17 Sep 2020 23:15:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.2.0..@fluentui/web-components_v0.3.0)

### Minor changes

- fix design system properties inheritance ([PR #15106](https://github.com/microsoft/fluentui/pull/15106) by jes@microsoft.com)

## [0.2.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.2.0)

Thu, 17 Sep 2020 12:25:04 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.8..@fluentui/web-components_v0.2.0)

### Minor changes

- Feat: convert card to be design system provider ([PR #15068](https://github.com/microsoft/fluentui/pull/15068) by jes@microsoft.com)

## [0.1.8](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.8)

Tue, 01 Sep 2020 12:27:02 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.7..@fluentui/web-components_v0.1.8)

### Patches

- update fast packages and add font-family inherit to controls of button and accordion-item ([PR #14828](https://github.com/microsoft/fluentui/pull/14828) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.1.7](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.7)

Tue, 18 Aug 2020 07:58:00 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.5..@fluentui/web-components_v0.1.7)

### Patches

- fix: apply badge appearance styling to control not host element ([PR #14539](https://github.com/microsoft/fluentui/pull/14539) by chhol@microsoft.com)
- update fast element version to leverage latest changes ([PR #14573](https://github.com/microsoft/fluentui/pull/14573) by chhol@microsoft.com)
- fixing publish ([PR #14566](https://github.com/microsoft/fluentui/pull/14566) by kchau@microsoft.com)

## [0.1.5](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.5)

Thu, 13 Aug 2020 12:41:58 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.4..@fluentui/web-components_v0.1.5)

### Patches

- fix: add full width to text-area and text-field controls to expand properly with component ([PR #14492](https://github.com/microsoft/fluentui/pull/14492) by sethdonohue@Admins-MBP.guest.corp.microsoft.com)

## [0.1.4](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.4)

Wed, 12 Aug 2020 18:34:18 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.3..@fluentui/web-components_v0.1.4)

### Patches

- fix: ensure radio control does not shrink ([PR #14473](https://github.com/microsoft/fluentui/pull/14473) by chhol@microsoft.com)

## [0.1.3](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.3)

Tue, 11 Aug 2020 05:47:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.2..@fluentui/web-components_v0.1.3)

### Patches

- fix: tab should have pointer as cursor ([PR #14421](https://github.com/microsoft/fluentui/pull/14421) by chhol@microsoft.com)

## [0.1.2](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.2)

Mon, 10 Aug 2020 06:19:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.1..@fluentui/web-components_v0.1.2)

### Patches

- Fix min-width to be equals to thumb size ([PR #14400](https://github.com/microsoft/fluentui/pull/14400) by barahonajm@outlook.com)

## [0.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.1)

Thu, 06 Aug 2020 22:49:13 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/web-components_v0.1.0..@fluentui/web-components_v0.1.1)

### Patches

- fix: update rollup config and incorrect readme import ([PR #14392](https://github.com/microsoft/fluentui/pull/14392) by chhol@microsoft.com)

## [0.1.0](https://github.com/microsoft/fluentui/tree/@fluentui/web-components_v0.1.0)

Thu, 06 Aug 2020 00:30:40 GMT

### Minor changes

- feat: update package namespace and update control names to prefix with fluent ([PR #14345](https://github.com/microsoft/fluentui/pull/14345) by chhol@microsoft.com)

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
