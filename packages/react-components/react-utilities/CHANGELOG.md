# Change Log - @fluentui/react-utilities

This log was last generated on Thu, 05 May 2022 18:26:28 GMT and should not be manually modified.

<!-- Start content -->

## [9.0.0-rc.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.8)

Thu, 05 May 2022 18:26:28 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.7..@fluentui/react-utilities_v9.0.0-rc.8)

### Changes

- feat: add time element on nativeElementMap ([PR #22848](https://github.com/microsoft/fluentui/pull/22848) by bsunderhus@microsoft.com)
- Bump @fluentui/keyboard-keys to v9.0.0-rc.6 ([PR #22857](https://github.com/microsoft/fluentui/pull/22857) by beachball)

## [9.0.0-rc.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.7)

Wed, 04 May 2022 13:26:36 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.6..@fluentui/react-utilities_v9.0.0-rc.7)

### Changes

- Bump @fluentui/keyboard-keys to v9.0.0-rc.5 ([PR #22786](https://github.com/microsoft/fluentui/pull/22786) by beachball)

## [9.0.0-rc.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.6)

Tue, 19 Apr 2022 19:17:05 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.5..@fluentui/react-utilities_v9.0.0-rc.6)

### Changes

- Removing star exports at src/index.ts ([PR #22367](https://github.com/microsoft/fluentui/pull/22367) by Humberto.Morimoto@microsoft.com)

## [9.0.0-rc.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.5)

Fri, 04 Mar 2022 05:17:32 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.4..@fluentui/react-utilities_v9.0.0-rc.5)

### Changes

- Adding explicit export maps on all consumer packages for FUIR 8 and 9. ([PR #21508](https://github.com/microsoft/fluentui/pull/21508) by dzearing@microsoft.com)
- Adding helper type to define slot class names. ([PR #21933](https://github.com/microsoft/fluentui/pull/21933) by email not defined)
- fix(shouldPreventDefaultOnKeyDown): return false for events that are default prevented ([PR #21905](https://github.com/microsoft/fluentui/pull/21905) by lingfangao@hotmail.com)
- Bump @fluentui/keyboard-keys to v9.0.0-rc.4 ([PR #21947](https://github.com/microsoft/fluentui/pull/21947) by beachball)

## [9.0.0-rc.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.4)

Tue, 01 Mar 2022 02:17:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.3..@fluentui/react-utilities_v9.0.0-rc.4)

### Changes

- Ignore prefix in useId() when it is falsey. ([PR #21848](https://github.com/microsoft/fluentui/pull/21848) by seanmonahan@microsoft.com)
- Add fieldset to getNativeElementProps ([PR #21835](https://github.com/microsoft/fluentui/pull/21835) by behowell@microsoft.com)

## [9.0.0-rc.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.3)

Fri, 18 Feb 2022 13:35:37 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-rc.1..@fluentui/react-utilities_v9.0.0-rc.3)

### Changes

- fix: Source maps contain original source code ([PR #21690](https://github.com/microsoft/fluentui/pull/21690) by lingfangao@hotmail.com)
- Bump @fluentui/keyboard-keys to v9.0.0-rc.3 ([PR #21800](https://github.com/microsoft/fluentui/pull/21800) by beachball)

## [9.0.0-rc.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-rc.1)

Thu, 10 Feb 2022 08:50:32 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-beta.4..@fluentui/react-utilities_v9.0.0-rc.1)

### Changes

- Rename component hooks add the suffix _unstable, as their API has not been finalized yet ([PR #21365](https://github.com/microsoft/fluentui/pull/21365) by behowell@microsoft.com)
- getSlots: remove slotNames param, and infer from state.components instead ([PR #21134](https://github.com/microsoft/fluentui/pull/21134) by behowell@microsoft.com)
- add useTriggerElement() hook ([PR #21225](https://github.com/microsoft/fluentui/pull/21225) by olfedias@microsoft.com)
- Removes nullRender from react-utilities ([PR #21576](https://github.com/microsoft/fluentui/pull/21576) by bsunderhus@microsoft.com)
- update applyTriggerPropsToChildren() to return React.ReactElement or null ([PR #21609](https://github.com/microsoft/fluentui/pull/21609) by olfedias@microsoft.com)
- Refactor component Slot typings ([PR #21518](https://github.com/microsoft/fluentui/pull/21518) by behowell@microsoft.com)
- Adding ComponentSlotProps to allow ref to be passed in composite components. ([PR #20890](https://github.com/microsoft/fluentui/pull/20890) by Humberto.Morimoto@microsoft.com)
- Renaming most *Shorthand* composition types to *SlotProps* so they better reflect what the types do. ([PR #20891](https://github.com/microsoft/fluentui/pull/20891) by Humberto.Morimoto@microsoft.com)
- Bump Fluent UI packages to 9.0.0-rc ([PR #21623](https://github.com/microsoft/fluentui/pull/21623) by lingfangao@hotmail.com)
- Update trigger utilities to handle nested triggers ([PR #21495](https://github.com/microsoft/fluentui/pull/21495) by behowell@microsoft.com)
- [breaking] Remove useControllableValue hook (use useControllableState instead) ([PR #20865](https://github.com/microsoft/fluentui/pull/20865) by elcraig@microsoft.com)
- Bump @fluentui/keyboard-keys to v9.0.0-rc.1 ([commit](https://github.com/microsoft/fluentui/commit/e6c855f6d9019d6c73668d15fc9bc3a13291a6c8) by beachball)

## [9.0.0-beta.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-beta.4)

Thu, 25 Nov 2021 08:34:09 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-beta.3..@fluentui/react-utilities_v9.0.0-beta.4)

### Changes

- Update utility types to support specifying a primary slot other than root ([PR #20617](https://github.com/microsoft/fluentui/pull/20617) by behowell@microsoft.com)

## [9.0.0-beta.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-beta.3)

Fri, 12 Nov 2021 13:25:10 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-beta.2..@fluentui/react-utilities_v9.0.0-beta.3)

### Changes

- Updated beta and RC components to ES2019 ([PR #20405](https://github.com/microsoft/fluentui/pull/20405) by gcox@microsoft.com)

## [9.0.0-beta.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-beta.2)

Wed, 27 Oct 2021 12:14:24 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-beta.1..@fluentui/react-utilities_v9.0.0-beta.2)

### Changes

- remove compat utilities and types ([PR #20255](https://github.com/microsoft/fluentui/pull/20255) by olfedias@microsoft.com)
- fix(getNativeElementPrps): Add support for `onAuxClick` ([PR #20343](https://github.com/microsoft/fluentui/pull/20343) by lingfangao@hotmail.com)

## [9.0.0-beta.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-beta.1)

Wed, 06 Oct 2021 10:37:22 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.56..@fluentui/react-utilities_v9.0.0-beta.1)

### Changes

- Bump all v9 components to beta prerelease tag ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by lingfangao@hotmail.com)
- Bump @fluentui/keyboard-keys to v9.0.0-beta.1 ([PR #20106](https://github.com/microsoft/fluentui/pull/20106) by beachball)

## [9.0.0-alpha.56](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.56)

Tue, 05 Oct 2021 09:28:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.55..@fluentui/react-utilities_v9.0.0-alpha.56)

### Changes

- Add and use ForwardRefComponent helper type ([PR #20081](https://github.com/microsoft/fluentui/pull/20081) by elcraig@microsoft.com)

## [9.0.0-alpha.55](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.55)

Fri, 01 Oct 2021 14:13:08 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.53..@fluentui/react-utilities_v9.0.0-alpha.55)

### Changes

- Bump v9 prerelease versions to rerelease ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by lingfangao@hotmail.com)
- Bump @fluentui/keyboard-keys to v9.0.0-alpha.5 ([PR #20069](https://github.com/microsoft/fluentui/pull/20069) by beachball)

## [9.0.0-alpha.53](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.53)

Mon, 27 Sep 2021 08:06:00 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.52..@fluentui/react-utilities_v9.0.0-alpha.53)

### Changes

- Updates ComponentState on custom props ([PR #19981](https://github.com/microsoft/fluentui/pull/19981) by bsunderhus@microsoft.com)

## [9.0.0-alpha.52](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.52)

Fri, 24 Sep 2021 09:17:17 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.51..@fluentui/react-utilities_v9.0.0-alpha.52)

### Changes

- Add as prop to properties allowed with getNativeElementProps ([PR #19950](https://github.com/microsoft/fluentui/pull/19950) by andredias@microsoft.com)

## [9.0.0-alpha.51](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.51)

Thu, 23 Sep 2021 08:21:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.50..@fluentui/react-utilities_v9.0.0-alpha.51)

### Changes

- Adding clamp and getRTLSafeKey utilities. ([commit](https://github.com/microsoft/fluentui/commit/95682da34c48813f7658032ae490d21d2f363b90) by czearing@outlook.com)

## [9.0.0-alpha.50](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.50)

Wed, 22 Sep 2021 10:10:07 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.49..@fluentui/react-utilities_v9.0.0-alpha.50)

### Changes

- Moved from interfaces to types per RFC ([commit](https://github.com/microsoft/fluentui/commit/bc3f1ec72fc7784a558b0dd6598ee0662f4649c1) by gcox@microsoft.com)

## [9.0.0-alpha.49](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.49)

Fri, 17 Sep 2021 07:35:26 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.48..@fluentui/react-utilities_v9.0.0-alpha.49)

### Changes

- Refactoring out functionality that applies trigger props to children as a utility. ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by Humberto.Morimoto@microsoft.com)
- Removes ExtractRef Typings ([PR #19840](https://github.com/microsoft/fluentui/pull/19840) by bsunderhus@microsoft.com)

## [9.0.0-alpha.48](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.48)

Thu, 16 Sep 2021 07:38:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.47..@fluentui/react-utilities_v9.0.0-alpha.48)

### Changes

- Fix IntrinsicShorthandProps used in the root slot with multiple possible `as` values ([PR #19815](https://github.com/microsoft/fluentui/pull/19815) by behowell@microsoft.com)

## [9.0.0-alpha.47](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.47)

Tue, 14 Sep 2021 20:09:02 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.46..@fluentui/react-utilities_v9.0.0-alpha.47)

### Changes

- Adds ExtractRef typings to react-utilities to extract reference from props ([PR #19155](https://github.com/microsoft/fluentui/pull/19155) by bsunderhus@microsoft.com)

## [9.0.0-alpha.46](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.46)

Fri, 10 Sep 2021 16:31:53 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.45..@fluentui/react-utilities_v9.0.0-alpha.46)

### Changes

- chore(v9): Move all internal v9 dependencies from caret to fixed version ([PR #19748](https://github.com/microsoft/fluentui/pull/19748) by lingfangao@hotmail.com)

## [9.0.0-alpha.45](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.45)

Fri, 10 Sep 2021 07:39:51 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.44..@fluentui/react-utilities_v9.0.0-alpha.45)

### Changes

- Add IntrinsicShorthandProps for slots that use intrinsic elements like div or span ([PR #19642](https://github.com/microsoft/fluentui/pull/19642) by behowell@microsoft.com)

## [9.0.0-alpha.44](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.44)

Mon, 06 Sep 2021 07:34:53 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.43..@fluentui/react-utilities_v9.0.0-alpha.44)

### Changes

- feat(react-utilities): use `event.key` for keyboard events ([PR #19640](https://github.com/microsoft/fluentui/pull/19640) by lingfangao@hotmail.com)

## [9.0.0-alpha.43](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.43)

Wed, 01 Sep 2021 07:39:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.42..@fluentui/react-utilities_v9.0.0-alpha.43)

### Changes

- Update implementation to handle 'root' as a slot ([PR #19483](https://github.com/microsoft/fluentui/pull/19483) by bsunderhus@microsoft.com)

## [9.0.0-alpha.42](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.42)

Tue, 31 Aug 2021 07:37:47 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.41..@fluentui/react-utilities_v9.0.0-alpha.42)

### Changes

- fix(useOnClickOutside): Treat right click/context menu as outside click ([PR #19556](https://github.com/microsoft/fluentui/pull/19556) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.41](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.41)

Tue, 24 Aug 2021 07:34:48 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.40..@fluentui/react-utilities_v9.0.0-alpha.41)

### Changes

- Updating TypeScript type-only imports/exports to use import/export type syntax. ([PR #19471](https://github.com/microsoft/fluentui/pull/19471) by dzearing@hotmail.com)

## [9.0.0-alpha.40](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.40)

Fri, 20 Aug 2021 07:37:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.39..@fluentui/react-utilities_v9.0.0-alpha.40)

### Changes

- Update .npmignore ([PR #19441](https://github.com/microsoft/fluentui/pull/19441) by elcraig@microsoft.com)

## [9.0.0-alpha.39](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.39)

Thu, 19 Aug 2021 07:41:35 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.38..@fluentui/react-utilities_v9.0.0-alpha.39)

### Changes

- Slot null rendering refactor ([PR #19273](https://github.com/microsoft/fluentui/pull/19273) by bsunderhus@microsoft.com)

## [9.0.0-alpha.38](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.38)

Fri, 06 Aug 2021 07:35:14 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.37..@fluentui/react-utilities_v9.0.0-alpha.38)

### Changes

- Deletes descendants API ([PR #19189](https://github.com/microsoft/fluentui/pull/19189) by bsunderhus@microsoft.com)

## [9.0.0-alpha.37](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.37)

Tue, 03 Aug 2021 07:39:30 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.36..@fluentui/react-utilities_v9.0.0-alpha.37)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.3 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)
- Bump @fluentui/keyboard-key to v0.3.4 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #19169](https://github.com/microsoft/fluentui/pull/19169) by behowell@microsoft.com)

### Changes

- Copying useMount and useUnmount hooks into the react-utilities package. ([PR #19196](https://github.com/microsoft/fluentui/pull/19196) by czearing@outlook.com)

## [9.0.0-alpha.36](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.36)

Mon, 02 Aug 2021 07:36:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.35..@fluentui/react-utilities_v9.0.0-alpha.36)

### Changes

- feat(useOnClickOutside): Handle clicks into an iframe ([PR #19204](https://github.com/microsoft/fluentui/pull/19204) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.35](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.35)

Fri, 23 Jul 2021 07:38:19 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.34..@fluentui/react-utilities_v9.0.0-alpha.35)

### Changes

- Improve type safety of the onlyChild function ([PR #18610](https://github.com/microsoft/fluentui/pull/18610) by behowell@microsoft.com)

## [9.0.0-alpha.34](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.34)

Thu, 22 Jul 2021 07:36:55 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.33..@fluentui/react-utilities_v9.0.0-alpha.34)

### Changes

- Move useTimeout into react-utilities and add tests ([PR #19023](https://github.com/microsoft/fluentui/pull/19023) by behowell@microsoft.com)

## [9.0.0-alpha.33](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.33)

Thu, 15 Jul 2021 07:36:18 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.32..@fluentui/react-utilities_v9.0.0-alpha.33)

### Changes

- Fix bugs on getSlots to follow with RFC ([PR #18861](https://github.com/microsoft/fluentui/pull/18861) by bsunderhus@microsoft.com)
- feat(useControllableState): deprecate useControlledValue with new hook ([PR #18881](https://github.com/microsoft/fluentui/pull/18881) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.32](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.32)

Fri, 09 Jul 2021 07:39:31 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.31..@fluentui/react-utilities_v9.0.0-alpha.32)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.2 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)
- Bump @fluentui/keyboard-key to v0.3.3 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18808](https://github.com/microsoft/fluentui/pull/18808) by martinhochel@microsoft.com)

## [9.0.0-alpha.31](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.31)

Fri, 02 Jul 2021 23:15:55 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.30..@fluentui/react-utilities_v9.0.0-alpha.31)

### Changes

- Add new prop mergin mechanism ([PR #18721](https://github.com/microsoft/fluentui/pull/18721) by bsunderhus@microsoft.com)
- chore(Menu): use capture event to handle outside click ([PR #18792](https://github.com/microsoft/fluentui/pull/18792) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.30](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.30)

Fri, 02 Jul 2021 07:37:06 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.29..@fluentui/react-utilities_v9.0.0-alpha.30)

### Changes

- Rename typings and getSlots to have the Compat Suffix ([PR #18796](https://github.com/microsoft/fluentui/pull/18796) by bsunderhus@microsoft.com)

## [9.0.0-alpha.29](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.29)

Tue, 15 Jun 2021 07:40:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.28..@fluentui/react-utilities_v9.0.0-alpha.29)

### Changes

- Remove boolean from ShorthandProps type ([PR #18521](https://github.com/microsoft/fluentui/pull/18521) by behowell@microsoft.com)

## [9.0.0-alpha.28](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.28)

Mon, 07 Jun 2021 07:38:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.27..@fluentui/react-utilities_v9.0.0-alpha.28)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.1 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)
- Bump @fluentui/keyboard-key to v0.3.2 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18437](https://github.com/microsoft/fluentui/pull/18437) by martinhochel@microsoft.com)

## [9.0.0-alpha.27](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.27)

Fri, 04 Jun 2021 07:37:23 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.26..@fluentui/react-utilities_v9.0.0-alpha.27)

### Changes

- Moving onlyChild to @fluentui/react-utilities and adding tests. ([PR #18168](https://github.com/microsoft/fluentui/pull/18168) by Humberto.Morimoto@microsoft.com)

## [9.0.0-alpha.26](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.26)

Fri, 28 May 2021 07:33:57 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.25..@fluentui/react-utilities_v9.0.0-alpha.26)

### Changes

- useOnScrollOutside hook to detect scroll outside a component ([PR #18312](https://github.com/microsoft/fluentui/pull/18312) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.25](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.25)

Wed, 26 May 2021 07:35:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.24..@fluentui/react-utilities_v9.0.0-alpha.25)

### Changes

- useOnClickOutside, workaround for facebook/react#20074 ([PR #18323](https://github.com/microsoft/fluentui/pull/18323) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.24](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.24)

Fri, 21 May 2021 07:34:54 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.23..@fluentui/react-utilities_v9.0.0-alpha.24)

### Changes

- Refactor ComponentState to remove ref template parameter ([PR #18259](https://github.com/microsoft/fluentui/pull/18259) by behowell@microsoft.com)

## [9.0.0-alpha.23](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.23)

Thu, 20 May 2021 07:41:54 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.22..@fluentui/react-utilities_v9.0.0-alpha.23)

### Patches

- Bump @fluentui/eslint-plugin to v1.3.0 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)
- Bump @fluentui/keyboard-key to v0.3.1 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)

### Changes

- ComponentState: fix shadowing and doc syntax for type params ([PR #18024](https://github.com/microsoft/fluentui/pull/18024) by elcraig@microsoft.com)

## [9.0.0-alpha.22](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.22)

Wed, 19 May 2021 07:34:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.21..@fluentui/react-utilities_v9.0.0-alpha.22)

### Changes

- chore: add more Babel plugins ([PR #18037](https://github.com/microsoft/fluentui/pull/18037) by olfedias@microsoft.com)
- Support custom `contains` check ([PR #18148](https://github.com/microsoft/fluentui/pull/18148) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.21](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.21)

Mon, 03 May 2021 07:45:19 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.20..@fluentui/react-utilities_v9.0.0-alpha.21)

### Changes

- useOnClickOutside can be disabled ([PR #18005](https://github.com/microsoft/fluentui/pull/18005) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.20](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.20)

Fri, 30 Apr 2021 07:42:23 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.19..@fluentui/react-utilities_v9.0.0-alpha.20)

### Patches

- Bump @fluentui/eslint-plugin to v1.2.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)
- Bump @fluentui/keyboard-key to v0.3.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)

### Changes

- Upgrade to ts 4.0 ([PR #17932](https://github.com/microsoft/fluentui/pull/17932) by joschect@microsoft.com)
- update useId() to be safe for SSR ([PR #17924](https://github.com/microsoft/fluentui/pull/17924) by olfedias@microsoft.com)

## [9.0.0-alpha.19](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.19)

Fri, 23 Apr 2021 07:37:10 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.18..@fluentui/react-utilities_v9.0.0-alpha.19)

### Patches

- Bump @fluentui/eslint-plugin to v1.1.1 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)
- Bump @fluentui/keyboard-key to v0.2.17 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17894](https://github.com/microsoft/fluentui/pull/17894) by olfedias@microsoft.com)

## [9.0.0-alpha.18](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.18)

Thu, 22 Apr 2021 07:33:28 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.17..@fluentui/react-utilities_v9.0.0-alpha.18)

### Changes

- dedupe isSSR definitions ([PR #17897](https://github.com/microsoft/fluentui/pull/17897) by olfedias@microsoft.com)
- Remove default document in useOnClickOutside ([PR #17898](https://github.com/microsoft/fluentui/pull/17898) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.17](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.17)

Wed, 21 Apr 2021 07:31:50 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.16..@fluentui/react-utilities_v9.0.0-alpha.17)

### Changes

- Rename ax() to mergeClasses() ([PR #17875](https://github.com/microsoft/fluentui/pull/17875) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.16](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.16)

Fri, 16 Apr 2021 18:08:21 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.15..@fluentui/react-utilities_v9.0.0-alpha.16)

### Changes

- Extract usePrevious from descendants ([PR #17794](https://github.com/microsoft/fluentui/pull/17794) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.15](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.15)

Thu, 01 Apr 2021 20:13:37 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.14..@fluentui/react-utilities_v9.0.0-alpha.15)

### Changes

- Adds isSSR method to react-utilities ([PR #17651](https://github.com/microsoft/fluentui/pull/17651) by bsunderhus@microsoft.com)

## [9.0.0-alpha.14](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.14)

Wed, 31 Mar 2021 00:53:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.13..@fluentui/react-utilities_v9.0.0-alpha.14)

### Patches

- Bump @fluentui/eslint-plugin to v1.1.0 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)
- Bump @fluentui/keyboard-key to v0.2.16 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17568](https://github.com/microsoft/fluentui/pull/17568) by elcraig@microsoft.com)

### Changes

- Add ComponentState helper type; improve type checking for makeMergeProps ([PR #17508](https://github.com/microsoft/fluentui/pull/17508) by behowell@microsoft.com)
- Add shouldPreventDefaultOnKeyDown utility function to detect keyboard clicks ([PR #17572](https://github.com/microsoft/fluentui/pull/17572) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.13](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.13)

Tue, 30 Mar 2021 07:34:45 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.12..@fluentui/react-utilities_v9.0.0-alpha.13)

### Changes

- chore: restore "sideEffects" to enable treeshaking ([PR #17584](https://github.com/microsoft/fluentui/pull/17584) by olfedias@microsoft.com)

## [9.0.0-alpha.12](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.12)

Fri, 26 Mar 2021 07:32:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.11..@fluentui/react-utilities_v9.0.0-alpha.12)

### Changes

- Add descendants utility ([PR #17524](https://github.com/microsoft/fluentui/pull/17524) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.11](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.11)

Thu, 25 Mar 2021 07:33:24 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.10..@fluentui/react-utilities_v9.0.0-alpha.11)

### Changes

- Move descendants to react-utilities ([PR #17528](https://github.com/microsoft/fluentui/pull/17528) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.10](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.10)

Tue, 23 Mar 2021 07:31:43 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.9..@fluentui/react-utilities_v9.0.0-alpha.10)

### Changes

- Add useCallbackRef and useFirstMount hooks ([PR #17339](https://github.com/microsoft/fluentui/pull/17339) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.9](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.9)

Thu, 18 Mar 2021 20:15:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.8..@fluentui/react-utilities_v9.0.0-alpha.9)

### Changes

- Add onUseClickOutside hook ([PR #17387](https://github.com/microsoft/fluentui/pull/17387) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.8)

Mon, 15 Mar 2021 07:36:20 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.7..@fluentui/react-utilities_v9.0.0-alpha.8)

### Changes

- Remove set-version references ([PR #17381](https://github.com/microsoft/fluentui/pull/17381) by elcraig@microsoft.com)

## [9.0.0-alpha.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.7)

Wed, 10 Mar 2021 07:34:39 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.6..@fluentui/react-utilities_v9.0.0-alpha.7)

### Changes

- useControllableValue should behave natively ([PR #17293](https://github.com/microsoft/fluentui/pull/17293) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.6)

Fri, 05 Mar 2021 20:30:59 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.5..@fluentui/react-utilities_v9.0.0-alpha.6)

### Changes

- useIsomorphicLayout effect with useEventCallback ([PR #17273](https://github.com/microsoft/fluentui/pull/17273) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.5](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.5)

Wed, 03 Mar 2021 00:10:09 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.4..@fluentui/react-utilities_v9.0.0-alpha.5)

### Patches

- Bump @fluentui/jest-serializer-merge-styles to v8.0.2 ([PR #17246](https://github.com/microsoft/fluentui/pull/17246) by elcraig@microsoft.com)

### Changes

- Remove set-version dependency from converged components ([PR #17211](https://github.com/microsoft/fluentui/pull/17211) by miroslav.stastny@microsoft.com)

## [9.0.0-alpha.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.4)

Tue, 02 Mar 2021 07:24:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.3..@fluentui/react-utilities_v9.0.0-alpha.4)

### Changes

- remove dependency on @fluentui/utilities ([PR #17197](https://github.com/microsoft/fluentui/pull/17197) by olfedias@microsoft.com)

## [9.0.0-alpha.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.3)

Fri, 26 Feb 2021 01:16:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.2..@fluentui/react-utilities_v9.0.0-alpha.3)

### Patches

- Bump @fluentui/eslint-plugin to v1.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/jest-serializer-merge-styles to v8.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/set-version to v8.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)
- Bump @fluentui/utilities to v8.0.1 ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)

### Changes

- Update references to major-bumped packages ([PR #17169](https://github.com/microsoft/fluentui/pull/17169) by elcraig@microsoft.com)

## [9.0.0-alpha.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.2)

Thu, 25 Feb 2021 01:15:27 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v9.0.0-alpha.1..@fluentui/react-utilities_v9.0.0-alpha.2)

### Changes

- Remove dep array from useEventCallback ([PR #17113](https://github.com/microsoft/fluentui/pull/17113) by lingfan.gao@microsoft.com)

## [9.0.0-alpha.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v9.0.0-alpha.1)

Wed, 24 Feb 2021 00:05:29 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.4.0..@fluentui/react-utilities_v9.0.0-alpha.1)

### Changes

- bump version to v9 ([PR #17093](https://github.com/microsoft/fluentui/pull/17093) by olfedias@microsoft.com)

## [0.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.4.0)

Mon, 22 Feb 2021 12:26:22 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.3.1..@fluentui/react-utilities_v0.4.0)

### Minor changes

- Breaks dependency on react-hooks for convergence ([PR #17091](https://github.com/microsoft/fluentui/pull/17091) by lingfan.gao@microsoft.com)

### Patches

- align typings for shorthands ([PR #17061](https://github.com/microsoft/fluentui/pull/17061) by olfedias@microsoft.com)

### Changes

- Bump @fluentui/jest-serializer-merge-styles to v8.0.0-beta.7 ([PR #17061](https://github.com/microsoft/fluentui/pull/17061) by elcraig@microsoft.com)
- Bump @fluentui/utilities to v8.0.0-beta.15 ([PR #17061](https://github.com/microsoft/fluentui/pull/17061) by elcraig@microsoft.com)

## [0.3.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.3.1)

Thu, 18 Feb 2021 19:38:50 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.3.0..@fluentui/react-utilities_v0.3.1)

### Patches

- Allow React 17 in peerDependencies ([PR #17048](https://github.com/microsoft/fluentui/pull/17048) by elcraig@microsoft.com)

### Changes

- Bump @fluentui/utilities to v8.0.0-beta.14 ([PR #17048](https://github.com/microsoft/fluentui/pull/17048) by elcraig@microsoft.com)

## [0.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.3.0)

Thu, 18 Feb 2021 12:27:34 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.2.4..@fluentui/react-utilities_v0.3.0)

### Minor changes

- include all utils from fluentui/react-utils ([PR #16970](https://github.com/microsoft/fluentui/pull/16970) by olfedias@microsoft.com)

### Changes

- Bump @fluentui/eslint-plugin to v1.0.0-beta.2 ([PR #16975](https://github.com/microsoft/fluentui/pull/16975) by elcraig@microsoft.com)
- Bump @fluentui/utilities to v8.0.0-beta.13 ([PR #16975](https://github.com/microsoft/fluentui/pull/16975) by elcraig@microsoft.com)
- Bump @fluentui/jest-serializer-merge-styles to v8.0.0-beta.6 ([PR #16975](https://github.com/microsoft/fluentui/pull/16975) by elcraig@microsoft.com)
- Bump @fluentui/set-version to v8.0.0-beta.2 ([PR #16975](https://github.com/microsoft/fluentui/pull/16975) by elcraig@microsoft.com)
- Bump @fluentui/scripts to v1.0.0 ([PR #16975](https://github.com/microsoft/fluentui/pull/16975) by elcraig@microsoft.com)

## [0.2.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.2.4)

Mon, 01 Feb 2021 12:23:48 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.2.4-4..@fluentui/react-utilities_v0.2.4)

### Patches

- add prerelease in disallowed change type for version packages and fix current versioning. ([PR #16696](https://github.com/microsoft/fluentui/pull/16696) by xgao@microsoft.com)

## [0.2.4-4](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.2.4-4)

Thu, 28 Jan 2021 12:25:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.2.4-3..@fluentui/react-utilities_v0.2.4-4)

### Changes

- Updating to webpack 5, latest typings, latest loaders and plugins. ([PR #16447](https://github.com/microsoft/fluentui/pull/16447) by dzearing@microsoft.com)

## [0.2.4-3](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.2.4-3)

Thu, 21 Jan 2021 12:36:12 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.2.3..@fluentui/react-utilities_v0.2.4-3)

### Changes

-  Updating dev dependencies. ([PR #16548](https://github.com/microsoft/fluentui/pull/16548) by dzearing@microsoft.com)

## [0.2.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.2.3)

Fri, 23 Oct 2020 03:26:15 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-utilities_v0.2.2..@fluentui/react-utilities_v0.2.3)

### Patches

- Rename @uifabric/set-version to @fluentui/set-version ([PR #15616](https://github.com/microsoft/fluentui/pull/15616) by ololubek@microsoft.com)

### Changes

- Add missing version.ts; Remove unneeded package dependencies. ([PR #15456](https://github.com/microsoft/fluentui/pull/15456) by xgao@microsoft.com)
- Remove react-dom from peerDependencies ([PR #15634](https://github.com/microsoft/fluentui/pull/15634) by elcraig@microsoft.com)

## [0.1.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-utilities_v0.1.1)

Tue, 18 Aug 2020 07:58:00 GMT

### Patches

- Scaffolding @fluentui/react-utilities package. ([PR #14571](https://github.com/microsoft/fluentui/pull/14571) by dzearing@hotmail.com)
