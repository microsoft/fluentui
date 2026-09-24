# Change Log - @fluentui/react-headless-components-preview

<!-- This log was last generated on Thu, 24 Sep 2026 09:53:10 GMT and should not be manually modified. -->

<!-- Start content -->

## [0.3.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.3.1)

Thu, 24 Sep 2026 09:53:10 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.3.0..@fluentui/react-headless-components-preview_v0.3.1)

### Patches

- fix: allow changing the root element for PopoverSurface ([PR #36789](https://github.com/microsoft/fluentui/pull/36789) by dmytrokirpa@microsoft.com)

## [0.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.3.0)

Wed, 23 Sep 2026 11:35:06 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.5..@fluentui/react-headless-components-preview_v0.3.0)

### Minor changes

- feat: add headless CounterBadge and PresenceBadge ([PR #36674](https://github.com/microsoft/fluentui/pull/36674) by dmytrokirpa@microsoft.com)
- fix: narrow positioning prop to the headless PositioningShorthand ([PR #36623](https://github.com/microsoft/fluentui/pull/36623) by vgenaev@gmail.com)
- feat!: add Combobox filtering and root state attributes ([PR #36580](https://github.com/microsoft/fluentui/pull/36580) by dmytrokirpa@microsoft.com)

### Patches

- fix: use the valid nomemory focusgroup token for TabList ([PR #36560](https://github.com/microsoft/fluentui/pull/36560) by dmytrokirpa@microsoft.com)
- fix: export context providers from the avatar and avatar-group subpaths, and context readers/providers from the button and link subpaths ([PR #36670](https://github.com/microsoft/fluentui/pull/36670) by array.knight@gmail.com)
- fix: let a consumer-supplied popover attribute win over the default on the PopoverSurface, MenuPopover and Listbox slots ([PR #36665](https://github.com/microsoft/fluentui/pull/36665) by array.knight@gmail.com)
- feat: export toDataAttributeValue from the utils entry point ([PR #36596](https://github.com/microsoft/fluentui/pull/36596) by dmytrokirpa@microsoft.com)
- feat: expose the Avatar and AvatarGroup context readers from the headless entry points ([PR #36659](https://github.com/microsoft/fluentui/pull/36659) by vgenaev@gmail.com)
- fix: remove unused react-dom and @types/react-dom peer dependencies, mark @types/react as optional ([PR #36559](https://github.com/microsoft/fluentui/pull/36559) by martinhochel@microsoft.com)
- feat: add data-* state attributes to Nav components and forward AvatarGroup size through context ([PR #36712](https://github.com/microsoft/fluentui/pull/36712) by dmytrokirpa@microsoft.com)
- fix: allow overriding NavDrawerBody role ([PR #36772](https://github.com/microsoft/fluentui/pull/36772) by dmytrokirpa@microsoft.com)
- feat: expose ToastTitle intent state via data attribute ([PR #36640](https://github.com/microsoft/fluentui/pull/36640) by dmytrokirpa@microsoft.com)
- feat: add badge support for Avatar ([PR #36694](https://github.com/microsoft/fluentui/pull/36694) by dmytrokirpa@microsoft.com)
- fix: add native focus navigation and pause timeouts while focus is in a toast stack ([PR #36638](https://github.com/microsoft/fluentui/pull/36638) by dmytrokirpa@microsoft.com)
- fix: preserve focus when opening non-modal Popover surfaces ([PR #36774](https://github.com/microsoft/fluentui/pull/36774) by dmytrokirpa@microsoft.com)
- refactor: collapse redundant headless type, render, and hook wrappers to direct re-exports ([PR #36572](https://github.com/microsoft/fluentui/pull/36572) by vgenaev@gmail.com)
- fix: MenuSplitGroup provides its context to descendants via a new exported useMenuSplitGroupContextValues hook ([PR #36669](https://github.com/microsoft/fluentui/pull/36669) by array.knight@gmail.com)
- fix: renderTooltip applies state.arrowClassName to the arrow element instead of silently discarding it ([PR #36668](https://github.com/microsoft/fluentui/pull/36668) by array.knight@gmail.com)
- feat: expose Dropdown invalid and clear button visibility data attributes ([PR #36571](https://github.com/microsoft/fluentui/pull/36571) by vgenaev@gmail.com)
- add missing root export map entry ([PR #36615](https://github.com/microsoft/fluentui/pull/36615) by martinhochel@microsoft.com)
- fix: default aria-hidden on NavCategoryItem's expandIcon slot ([PR #36690](https://github.com/microsoft/fluentui/pull/36690) by array.knight@gmail.com)
- fix: correct component subpath exports ([PR #36606](https://github.com/microsoft/fluentui/pull/36606) by dmytrokirpa@microsoft.com)
- fix: forward default options from the headless Toaster to toast state ([PR #36633](https://github.com/microsoft/fluentui/pull/36633) by dmytrokirpa@microsoft.com)
- feat: add development-time types for focusgroup attributes ([PR #36568](https://github.com/microsoft/fluentui/pull/36568) by dmytrokirpa@microsoft.com)
- fix: use global focusgroup typing for MenuListState instead of a local intersection ([PR #36608](https://github.com/microsoft/fluentui/pull/36608) by dmytrokirpa@microsoft.com)
- fix: remove focusgroup arrow key navigation from Nav and NavDrawerBody in favor of tab navigation ([PR #36609](https://github.com/microsoft/fluentui/pull/36609) by dmytrokirpa@microsoft.com)

## [0.2.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.5)

Wed, 12 Aug 2026 13:26:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.4..@fluentui/react-headless-components-preview_v0.2.5)

### Patches

- feat: add color picker controls ([PR #36518](https://github.com/microsoft/fluentui/pull/36518) by dmytrokirpa@microsoft.com)
- Add `module` export condition so node-targeted bundlers resolve ESM (tree-shaking) while bare Node stays CommonJS; emit fully-specified .js import paths ([PR #36327](https://github.com/microsoft/fluentui/pull/36327) by martinhochel@microsoft.com)
- feat: add headless SplitButton ([PR #36525](https://github.com/microsoft/fluentui/pull/36525) by vgenaev@gmail.com)
- Ship ESM-first (type:module): valid ESM under lib/, CommonJS under lib-commonjs/*.cjs, and drop the `node` export condition - bare-Node `import` resolves ESM, `require` resolves CJS; node-targeted bundlers tree-shake. ([PR #36327](https://github.com/microsoft/fluentui/pull/36327) by martinhochel@microsoft.com)
- feat: add swatch picker components ([PR #36535](https://github.com/microsoft/fluentui/pull/36535) by dmytrokirpa@microsoft.com)
- feat: expose missing resolved state through additive data attributes ([PR #36480](https://github.com/microsoft/fluentui/pull/36480) by vgenaev@gmail.com)
- fix: use custom renderTagPicker function for TagPicker component to avoid pulling Portal ([PR #36553](https://github.com/microsoft/fluentui/pull/36553) by dmytrokirpa@microsoft.com)
- feat: add headless CompoundButton ([PR #36531](https://github.com/microsoft/fluentui/pull/36531) by vgenaev@gmail.com)

## [0.2.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.4)

Sat, 01 Aug 2026 15:19:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.3..@fluentui/react-headless-components-preview_v0.2.4)

### Patches

- fix: preserve the headless Tooltip state API after adding overflow visibility handling to react-tooltip ([PR #36386](https://github.com/microsoft/fluentui/pull/36386) by paulmardling@microsoft.com)
- fix: export useFieldContext and useFieldControlProps hooks ([PR #36452](https://github.com/microsoft/fluentui/pull/36452) by dmytrokirpa@microsoft.com)
- fix: fix multiple anchors support on the same element ([PR #36454](https://github.com/microsoft/fluentui/pull/36454) by dmytrokirpa@microsoft.com)
- feat: add AvatarGroup, AvatarGroupItem, and AvatarGroupPopover components ([PR #36350](https://github.com/microsoft/fluentui/pull/36350) by dmytrokirpa@microsoft.com)
- feat: export Drawer context utilities ([PR #36479](https://github.com/microsoft/fluentui/pull/36479) by vgenaev@gmail.com)
- feat: add headless TagPicker ([PR #36285](https://github.com/microsoft/fluentui/pull/36285) by vgenaev@gmail.com)

## [0.2.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.3)

Mon, 29 Jun 2026 18:34:05 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.2..@fluentui/react-headless-components-preview_v0.2.3)

### Patches

- feat: add headless MenuButton ([PR #36320](https://github.com/microsoft/fluentui/pull/36320) by vgenaev@gmail.com)

## [0.2.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.2)

Wed, 24 Jun 2026 14:52:03 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.1..@fluentui/react-headless-components-preview_v0.2.2)

### Patches

- fix: fix Tooltip, Dialog, Menu, and Popover trigger components ([PR #36335](https://github.com/microsoft/fluentui/pull/36335) by dmytrokirpa@microsoft.com)

## [0.2.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.1)

Fri, 19 Jun 2026 13:52:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.2.0..@fluentui/react-headless-components-preview_v0.2.1)

### Patches

- fix: export useSkeletonContextValues from Skeleton ([PR #36303](https://github.com/microsoft/fluentui/pull/36303) by dmytrokirpa@microsoft.com)
- feat: add headless Overflow component ([PR #36305](https://github.com/microsoft/fluentui/pull/36305) by vgenaev@gmail.com)
- fix: export useRadioGroupContextValues from RadioGroup ([PR #36311](https://github.com/microsoft/fluentui/pull/36311) by dmytrokirpa@microsoft.com)

## [0.2.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.2.0)

Thu, 11 Jun 2026 13:26:43 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.1.2..@fluentui/react-headless-components-preview_v0.2.0)

### Minor changes

- feat: remove _unstable suffixes from Dialog functions and hooks exports ([PR #36302](https://github.com/microsoft/fluentui/pull/36302) by dmytrokirpa@microsoft.com)

### Patches

- fix: add missing @fluentui/react-jsx-runtime dependency ([PR #36301](https://github.com/microsoft/fluentui/pull/36301) by dmytrokirpa@microsoft.com)

## [0.1.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.1.2)

Thu, 11 Jun 2026 10:14:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.1.1..@fluentui/react-headless-components-preview_v0.1.2)

### Patches

- fix: export useContextValues for headless components requiring context in render functions ([PR #36300](https://github.com/microsoft/fluentui/pull/36300) by dmytrokirpa@microsoft.com)

## [0.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.1.1)

Tue, 09 Jun 2026 21:25:23 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.1.0..@fluentui/react-headless-components-preview_v0.1.1)

### Patches

- feat: add headless Tags components ([PR #36230](https://github.com/microsoft/fluentui/pull/36230) by vgenaev@gmail.com)
- feat: add headless TeachingPopover composed on top of the headless Popover and the v9 react-teaching-popover base hooks ([PR #36205](https://github.com/microsoft/fluentui/pull/36205) by viktorgenaev@microsoft.com)
- feat: add Toast component ([PR #36059](https://github.com/microsoft/fluentui/pull/36059) by dmytrokirpa@microsoft.com)
- fix: remove redundant use no memo directives, and add justification to valid ones ([PR #36224](https://github.com/microsoft/fluentui/pull/36224) by martinhochel@microsoft.com)
- feat: use AriaLiveAnnouncer for Toast component and update tests ([PR #36261](https://github.com/microsoft/fluentui/pull/36261) by dmytrokirpa@microsoft.com)
- feat: export BadgeSlots, ComboboxSlots, useMenuListContextValues to complete consumer-side composition surface ([PR #36267](https://github.com/microsoft/fluentui/pull/36267) by dmytrokirpa@microsoft.com)

## [0.1.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.1.0)

Wed, 27 May 2026 11:54:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.0.4..@fluentui/react-headless-components-preview_v0.1.0)

### Minor changes

- feat: add InfoLabel component and stories ([PR #36220](https://github.com/microsoft/fluentui/pull/36220) by dmytrokirpa@microsoft.com)
- feat(react-headless-components-preview): add trapFocus prop to Popover for modal focus-trap via native dialog API ([PR #36123](https://github.com/microsoft/fluentui/pull/36123) by vgenaev@gmail.com)

### Patches

- feat: add Nav component and stories ([PR #36213](https://github.com/microsoft/fluentui/pull/36213) by dmytrokirpa@microsoft.com)
- fix: descendant clicks no longer trigger Dialog backdrop dismissal ([PR #36245](https://github.com/microsoft/fluentui/pull/36245) by vgenaev@gmail.com)
- feat: add headless Menu components ([PR #36110](https://github.com/microsoft/fluentui/pull/36110) by vgenaev@gmail.com)
- fix: update non-modal dialog implementation to use popover API ([PR #36244](https://github.com/microsoft/fluentui/pull/36244) by dmytrokirpa@microsoft.com)
- fix: update useMenuTriggerBase hook signature ([PR #36237](https://github.com/microsoft/fluentui/pull/36237) by dmytrokirpa@microsoft.com)

## [0.0.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.0.4)

Mon, 18 May 2026 09:35:35 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.0.3..@fluentui/react-headless-components-preview_v0.0.4)

### Patches

- feat: add Combobox component ([PR #36114](https://github.com/microsoft/fluentui/pull/36114) by dmytrokirpa@microsoft.com)
- feat: add Dropdown component ([PR #36101](https://github.com/microsoft/fluentui/pull/36101) by dmytrokirpa@microsoft.com)
- fix(headless): fix Popover flipping behavior ([PR #36197](https://github.com/microsoft/fluentui/pull/36197) by vgenaev@gmail.com)
- feat: add Label component export, tests and stories ([PR #36208](https://github.com/microsoft/fluentui/pull/36208) by dmytrokirpa@microsoft.com)
- fix(positioning): fix positioning types and performance issues ([PR #36192](https://github.com/microsoft/fluentui/pull/36192) by vgenaev@gmail.com)

## [0.0.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.0.3)

Wed, 06 May 2026 23:32:44 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.0.2..@fluentui/react-headless-components-preview_v0.0.3)

### Patches

- feat: add Tooltip component ([PR #36079](https://github.com/microsoft/fluentui/pull/36079) by dmytrokirpa@microsoft.com)
- feat: add Image component ([PR #36099](https://github.com/microsoft/fluentui/pull/36099) by dmytrokirpa@microsoft.com)
- fix: set popover=auto on surface via jsx defaults ([PR #36090](https://github.com/microsoft/fluentui/pull/36090) by vgenaev@gmail.com)
- feat: add ToolbarRadioButton component ([PR #36100](https://github.com/microsoft/fluentui/pull/36100) by dmytrokirpa@microsoft.com)
- feat: add Persona component ([PR #36102](https://github.com/microsoft/fluentui/pull/36102) by dmytrokirpa@microsoft.com)

## [0.0.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.0.2)

Mon, 04 May 2026 11:47:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-headless-components-preview_v0.0.1..@fluentui/react-headless-components-preview_v0.0.2)

### Patches

- feat: add drawer components ([PR #36043](https://github.com/microsoft/fluentui/pull/36043) by dmytrokirpa@microsoft.com)
- feat: add headless Popover' ([PR #36006](https://github.com/microsoft/fluentui/pull/36006) by vgenaev@gmail.com)
- feat: add Card component ([PR #36005](https://github.com/microsoft/fluentui/pull/36005) by dmytrokirpa@microsoft.com)
- Bump @fluentui/react-aria to v9.17.11 ([PR #36083](https://github.com/microsoft/fluentui/pull/36083) by beachball)
- Bump @fluentui/react-context-selector to v9.2.16 ([PR #36083](https://github.com/microsoft/fluentui/pull/36083) by beachball)

## [0.0.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-headless-components-preview_v0.0.1)

Mon, 27 Apr 2026 14:47:52 GMT

### Patches

- chore: initial release ([PR #36062](https://github.com/microsoft/fluentui/pull/36062) by dmytrokirpa@microsoft.com)
- chore: update project nx tag ([PR #36063](https://github.com/microsoft/fluentui/pull/36063) by dmytrokirpa@microsoft.com)
