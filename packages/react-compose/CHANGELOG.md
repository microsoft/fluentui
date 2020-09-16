# Change Log - @fluentui/react-compose

This log was last generated on Tue, 15 Sep 2020 12:26:06 GMT and should not be manually modified.

<!-- Start content -->

## [0.19.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.19.0)

Tue, 15 Sep 2020 12:26:06 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.18.2..@fluentui/react-compose_v0.19.0)

### Minor changes

- Updated mergeProps to makeMergeProps, which can be configured with options. ([PR #14985](https://github.com/microsoft/fluentui/pull/14985) by dzearing@hotmail.com)

## [0.18.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.18.2)

Mon, 07 Sep 2020 12:26:26 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.18.1..@fluentui/react-compose_v0.18.2)

### Patches

- getSlots: handles empty definitions and defaults 'as' to 'span'. Note this will change in an upcoming update, as we move to `components` rather than `as`. ([PR #14889](https://github.com/microsoft/fluentui/pull/14889) by dzearing@microsoft.com)

## [0.18.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.18.1)

Wed, 02 Sep 2020 12:26:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.17.1..@fluentui/react-compose_v0.18.1)

### Patches

- Fixing undefined merging, adding tests for mergeProps. ([PR #14856](https://github.com/microsoft/fluentui/pull/14856) by dzearing@hotmail.com)

## [0.17.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.17.1)

Thu, 20 Aug 2020 12:37:22 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.16.0..@fluentui/react-compose_v0.17.1)

### Patches

- Remove references to React global (add explicit imports) ([PR #14613](https://github.com/microsoft/fluentui/pull/14613) by elcraig@microsoft.com)

## [0.16.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.16.0)

Tue, 18 Aug 2020 07:58:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.14.3..@fluentui/react-compose_v0.16.0)

### Minor changes

- Updating readme. ([PR #14518](https://github.com/microsoft/fluentui/pull/14518) by dzearing@hotmail.com)

### Patches

- fixing publish ([PR #14566](https://github.com/microsoft/fluentui/pull/14566) by kchau@microsoft.com)

## [0.14.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.14.3)

Tue, 11 Aug 2020 05:47:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.14.2..@fluentui/react-compose_v0.14.3)

### Patches

- Adding null check in mergeProps. ([PR #14018](https://github.com/microsoft/fluentui/pull/14018) by humbertomakotomorimoto@gmail.com)

## [0.14.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.14.2)

Mon, 10 Aug 2020 18:27:32 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.14.1..@fluentui/react-compose_v0.14.2)

### Patches

- next mergeProps: adding type check ([PR #14435](https://github.com/microsoft/fluentui/pull/14435) by dzearing@hotmail.com)

## [0.14.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.14.1)

Mon, 10 Aug 2020 15:56:27 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.14.0..@fluentui/react-compose_v0.14.1)

### Patches

- next mergeProps: adding type check ([PR #14435](https://github.com/microsoft/fluentui/pull/14435) by dzearing@hotmail.com)

## [0.14.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.14.0)

Mon, 10 Aug 2020 06:19:21 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.13.0..@fluentui/react-compose_v0.14.0)

### Minor changes

- Adding a re-worked compose helper under /lib/next. This should not modify the public api in any way, but will simply let us try the updates before we buy into them. ([PR #14268](https://github.com/microsoft/fluentui/pull/14268) by dzearing@microsoft.com)

## [0.13.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.13.0)

Thu, 06 Aug 2020 12:40:48 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.12.1..@fluentui/react-compose_v0.13.0)

### Minor changes

- Adding a re-worked compose helper under /lib/next. This should not modify the public api in any way, but will simply let us try the updates before we buy into them. ([PR #14268](https://github.com/microsoft/fluentui/pull/14268) by dzearing@microsoft.com)

## [0.12.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.12.0)

Thu, 09 Jul 2020 21:59:04 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.8..@fluentui/react-compose_v0.12.0)

### Minor changes

- Adding ComponentProps types which includes as and className. ([PR #13812](https://github.com/microsoft/fluentui/pull/13812) by humbertomakotomorimoto@gmail.com)

## [0.11.8](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.8)

Thu, 02 Jul 2020 12:42:11 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.7..@fluentui/react-compose_v0.11.8)

### Patches

- Make __PRIVATE_PROPS optional to avoid assignment requirement ([PR #13845](https://github.com/microsoft/fluentui/pull/13845) by olfedias@microsoft.com)
- Revert "resolveSlotProps: when slot/shorthand prop has JSX element as children, slot should be completely replaced by it (#13827)" ([PR #13882](https://github.com/microsoft/fluentui/pull/13882) by xgao@microsoft.com)

## [0.11.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.7)

Tue, 30 Jun 2020 12:33:36 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.6..@fluentui/react-compose_v0.11.7)

### Patches

- fix(compose): update types to provide better infers ([PR #13841](https://github.com/microsoft/fluentui/pull/13841) by olfedias@microsoft.com)

## [0.11.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.6)

Mon, 29 Jun 2020 12:36:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.5..@fluentui/react-compose_v0.11.6)

### Patches

- resolveSlotProps: Making change so that if slot/shorthand prop has JSX element as children, slot is completely replaced by it. ([PR #13827](https://github.com/microsoft/fluentui/pull/13827) by xgao@microsoft.com)

## [0.11.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.4)

Thu, 25 Jun 2020 12:50:17 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.2..@fluentui/react-compose_v0.11.4)

### Patches

- provide correct props to children function as slot ([PR #13576](https://github.com/microsoft/fluentui/pull/13576) by xgao@microsoft.com)
- Include typings for slots and slotProps in mergeProps typing ([PR #13571](https://github.com/microsoft/fluentui/pull/13571) by xgao@microsoft.com)

## [0.11.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.2)

Tue, 16 Jun 2020 12:40:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.11.0..@fluentui/react-compose_v0.11.2)

### Patches

- Pass forwarded ref as param in state option ([PR #13570](https://github.com/microsoft/fluentui/pull/13570) by xgao@microsoft.com)

## [0.11.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.11.0)

Fri, 12 Jun 2020 18:29:07 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.9.0..@fluentui/react-compose_v0.11.0)

### Minor changes

- Compose: Adding replaceable state as part of compose. ([PR #13521](https://github.com/microsoft/fluentui/pull/13521) by humbertomakotomorimoto@gmail.com)

## [0.9.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.9.0)

Mon, 08 Jun 2020 12:34:34 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.8.0..@fluentui/react-compose_v0.9.0)

### Minor changes

- Updating mergeProps to not use getNativeElementProps. ([PR #13474](https://github.com/microsoft/fluentui/pull/13474) by dzearing@microsoft.com)

### Patches

- compose: update classes option to allow array ([PR #13493](https://github.com/microsoft/fluentui/pull/13493) by xgao@microsoft.com)

## [0.8.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.8.0)

Fri, 05 Jun 2020 05:09:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.7.0..@fluentui/react-compose_v0.8.0)

### Minor changes

- Updating signature to createClassResolver to cache most of the resolution logic upfront. ([PR #13448](https://github.com/microsoft/fluentui/pull/13448) by dzearing@microsoft.com)

### Patches

- Adjusting class resolution to parse enums using conventions. ([PR #13472](https://github.com/microsoft/fluentui/pull/13472) by dzearing@microsoft.com)

## [0.7.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.7.0)

Tue, 02 Jun 2020 12:36:30 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.6.1..@fluentui/react-compose_v0.7.0)

### Minor changes

- Adding `mergeProps` helper to package, to help resolving slots and slotProps given state and compose options. This decouples the props processing from compose, and adds more robustness by resolving slotProps, mixing native props into root, handling `as`, shorthand props, and merging classes. ([PR #13360](https://github.com/microsoft/fluentui/pull/13360) by dzearing@microsoft.com)

## [0.6.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.6.1)

Thu, 28 May 2020 12:42:08 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.6.0..@fluentui/react-compose_v0.6.1)

### Patches

- Typescript generic argument names cleaned up, removed react-is unlisted dependency usage, no breaking changes. Also split utils.ts into separate files. Each of these functions should have some unit tests. ([PR #13354](https://github.com/microsoft/fluentui/pull/13354) by dzearing@microsoft.com)

## [0.6.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.6.0)

Wed, 27 May 2020 12:40:00 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.5.1..@fluentui/react-compose_v0.6.0)

### Minor changes

- Adding createClassResolver to help with auto resolving class names given class map and props. ([PR #13330](https://github.com/microsoft/fluentui/pull/13330) by dzearing@microsoft.com)

## [0.5.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.5.1)

Tue, 26 May 2020 12:46:29 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.5.0..@fluentui/react-compose_v0.5.1)

### Patches

- fix: allow ParentProps in ComposeOptions ([PR #13316](https://github.com/microsoft/fluentui/pull/13316) by olfedias@microsoft.com)

## [0.5.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.5.0)

Wed, 20 May 2020 12:31:10 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.4.1..@fluentui/react-compose_v0.5.0)

### Minor changes

- feat(compose): expose __self slot ([PR #13115](https://github.com/microsoft/fluentui/pull/13115) by olfedias@microsoft.com)

### Patches

- add shorthand config ([PR #13240](https://github.com/microsoft/fluentui/pull/13240) by mnajdova@gmail.com)

## [0.4.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.4.1)

Tue, 19 May 2020 12:34:06 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.4.0..@fluentui/react-compose_v0.4.1)

### Patches

- fix(compose): fix type for `React.Ref` generic ([PR #13209](https://github.com/microsoft/fluentui/pull/13209) by olfedias@microsoft.com)

## [0.4.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.4.0)

Fri, 15 May 2020 12:42:20 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.3.0..@fluentui/react-compose_v0.4.0)

### Minor changes

- Adding classes resolution to compose. ([PR #13096](https://github.com/microsoft/fluentui/pull/13096) by dzearing@microsoft.com)

## [0.3.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.3.0)

Fri, 15 May 2020 00:07:39 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.11..@fluentui/react-compose_v0.3.0)

### Minor changes

- Adding `classes` option to compose options. ([PR #13101](https://github.com/microsoft/fluentui/pull/13101) by dzearing@microsoft.com)

## [0.2.11](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.2.11)

Thu, 07 May 2020 01:06:55 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.10..@fluentui/react-compose_v0.2.11)

### Patches

- Addressing commonjs imports. ([PR #13031](https://github.com/microsoft/fluentui/pull/13031) by dzearing@microsoft.com)

## [0.2.10](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.2.10)

Tue, 28 Apr 2020 12:34:09 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.9..@fluentui/react-compose_v0.2.10)

### Patches

- added slots and slotProps ([PR #12858](https://github.com/microsoft/fluentui/pull/12858) by mnajdova@gmail.com)

## [0.2.9](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.2.9)

Thu, 23 Apr 2020 12:32:40 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.7..@fluentui/react-compose_v0.2.9)

### Patches

- improving compose API ([PR #12745](https://github.com/microsoft/fluentui/pull/12745) by olfedias@microsoft.com)

## [0.2.7](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.2.7)

Mon, 20 Apr 2020 15:55:12 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.6..@fluentui/react-compose_v0.2.7)

### Patches

- removed deprecated_className ([PR #12765](https://github.com/microsoft/fluentui/pull/12765) by mnajdova@gmail.com)

## [0.2.6](https://github.com/microsoft/fluentui/tree/@fluentui/react-compose_v0.2.6)

Thu, 16 Apr 2020 04:01:45 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compose_v0.2.4..@fluentui/react-compose_v0.2.6)

### Patches

- Update package description ([PR #12508](https://github.com/microsoft/fluentui/pull/12508) by elcraig@microsoft.com)
- fix(compose): add className as static and fix handling of handledProps ([PR #12677](https://github.com/microsoft/fluentui/pull/12677) by olfedias@microsoft.com)
- renamed className to deprecated_className ([PR #12702](https://github.com/microsoft/fluentui/pull/12702) by mnajdova@gmail.com)

## 0.2.4
Mon, 30 Mar 2020 19:10:08 GMT

### Patches

- fix options merging in compose() (olfedias@microsoft.com)
## 0.2.3
Wed, 25 Mar 2020 12:30:04 GMT

### Patches

- Update docs: Fabric to Fluent (micahgodbolt@gmail.com)
## 0.2.2
Mon, 23 Mar 2020 12:28:29 GMT

### Patches

- Replace OfficeDev/office-ui-fabric-react with microsoft/fluentui (elcraig@microsoft.com)
## 0.2.1
Thu, 19 Mar 2020 12:29:37 GMT

### Patches

- Update `@fluentui/react` references to `@fluentui/react-northstar` (elcraig@microsoft.com)
## 0.2.0
Wed, 18 Mar 2020 12:24:00 GMT

### Minor changes

- feat(compose): add compose() & scaffold react-compose-next (olfedias@microsoft.com)
