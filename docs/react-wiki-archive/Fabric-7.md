Fabric 7 introduces Microsoft's new Fluent design language by default. There are a variety of adjustments, described below. We've also taken a dependency on **React 16.8.1**, which will allow for future bundle size improvements as we can move much of our redundant state management over to hooks.

We've also taken a minbar dependency on **TypeScript 3.5**, which includes improved type safety features we need to avoid breaking partners.

## What about Fabric 6? (or 5?)

We will continue to support both Fabric 5 and 6. These versions will live within the `5.0` and `6.0` branches respectively. Please make sure to target the appropriate branch if make PRs for those versions.

We do not plan on cherrypicking all Fabric 7 fixes into 6.0. We will certainly cherrypick any severe bugs or impactful low-risk performance improvements. The same release pipeline running for 6.0 today (releasing each day if changes have been made) will still continue.

## Upgrade Path (Migrations and Breaking Changes)

Fabric 7 is shipping the package `@uifabric/migration` which will ease the transition from Fabric 6 to Fabric 7.

Before upgrading to Fabric 7 run the command below in your source code directory to identify changes that need to be made before upgrading. Run the command with the `-w` option to have the script automatically update your code with these suggestions. Beware that the `-w` option will modify files in-place, so ensure that files are committed to source control beforehand.

```bash
# note to use 7.0.0, not the current release number
npx @uifabric/migration 7.0.0
```

_For a complete list of breaking changes, see [@uifabric-migration](@uifabric-migration)._

## Changes related to the Fluent theme

To learn more about Microsoft's Fluent design language, visit our [Fluent design website](https://www.microsoft.com/design/fluent/#/).

### Font size and weight changes

As part of the Fluent by default strategy, we have a new type ramp. The change will affect text content on a page that was styled using `FontSizes` from `@uifabric.styling` package or `theme.fonts` object provided by the default theme. All font sizes except the largest one will shift by at most a single pixel. Many font weights change as well, with the most significant changes in the larger half of the ramp, changing from `light` to `semibold`. These changes are backwards compatible.

Below is a comparison table between Fabric 6 and 7:

| Variable name           | Current (pre-Fluent) font size/weight | Fluent font size/weight |
| :---------------------- | :------------------------------------ | :---------------------- |
| `tiny`                  | 10px / **semibold**                   | 10px / **regular**      |
| `xSmall`                | **11px** / regular                    | **10px** / regular      |
| `small`                 | 12px / regular                        | 12px / regular          |
| `smallPlus`             | **13px** / regular                    | **12px** / regular      |
| `medium`                | 14px / regular                        | 14px / regular          |
| `mediumPlus`            | **15px** / regular                    | **16px** / regular      |
| `large`                 | **17px** / **semilight**              | **18px** / **regular**  |
| `xLarge`                | **21px** / **light**                  | **20px** / **semibold** |
| `xLargePlus` **\*new**  | **21px** / **light** (back-ported)    | **24px** / **semibold** |
| `xxLarge`               | 28px / **light**                      | 28px / **semibold**     |
| `xxLargePlus` **\*new** | **28px** / **light** (back-ported)    | **32px** / **semibold** |
| `superLarge`            | 42px / **light**                      | 42px / **semibold**     |
| `mega`                  | **72px** / **light**                  | **68px** / **semibold** |

# Changelog

## office-ui-fabric-react

### Breaking changes

- ComboBox: _Breaking Change_ deprecated props `value` and `onChanged` removed ([`ff16255`](https://github.com/OfficeDev/office-ui-fabric-react/commit/ff162559fc3d8e8a7eedc3101ae6f9f2eb283b68)) [migration provided](https://github.com/OfficeDev/office-ui-fabric-react/blob/fabric-7/packages/migration/src/mods/7.0.0/comboboxValuePropChange.ts)
- DetailsList, DetailsRow, DetailsRowFields: remove deprecated props, logic and styles related to `Shimmer`. ([`e3080da`](https://github.com/OfficeDev/office-ui-fabric-react/commit/e3980da346f82e29100462934bfc0cee25600d42))
- Dropdown: className should be applied to the root
- Rating: _Breaking change_ is `rating` prop is passed, control will reflect value always. ([`2ffdd29`](https://github.com/OfficeDev/office-ui-fabric-react/commit/2ffdd290a40c70017cb23cea55818c266720c2ec))
- Remove use of deprecated @autobind decorator ([`d7dd099`](https://github.com/OfficeDev/office-ui-fabric-react/commit/d7dd09998172855cfd005aa2ec901a575b838619)) [migration provided](https://github.com/OfficeDev/office-ui-fabric-react/blob/fabric-7/packages/migration/src/mods/7.0.0/warnAutobindRemoved.ts)
- SearchBox: pass event to onChange ([`a41bd00`](https://github.com/OfficeDev/office-ui-fabric-react/commit/a41bd0018eb07f1713a2a533ef16f8219cba00ed)) [migration provided](https://github.com/OfficeDev/office-ui-fabric-react/blob/fabric-7/packages/migration/src/mods/7.0.0/searchBoxPropsArgs.ts)
- ShimmerDetailsList: remove deprecated props and style props. ([`baa1060`](https://github.com/OfficeDev/office-ui-fabric-react/commit/baa1060c5d3579d3bb51fcd77a00126ce51629e8))
- TextField: Strict controlled/uncontrolled behavior ([`04983f3`](https://github.com/OfficeDev/office-ui-fabric-react/commit/04983f31fedbf04c33f7cfd2395e58b5a9a7d03a))
- Moved Router utility to `@uifabric/example-app-base`. Please consider a different routing solution for production applications.

### Minor changes

- Changes to support slots API refactoring. ([`14b1d77`](https://github.com/OfficeDev/office-ui-fabric-react/commit/14b1d77fc97fffb1c333a3601d62c3e30c4cf3b0))
- Do not export Foundation package. ([`5cfbccb`](https://github.com/OfficeDev/office-ui-fabric-react/commit/5cfbccb1d6a8f130b4c40c5ceeb20d2e7490a201))
- Stack: Adding relevant Stack and StackItem tokens. ([`77a9195`](https://github.com/OfficeDev/office-ui-fabric-react/commit/77a91958ee5e37fb6c2991fd22275ec379f4c914))
- Support slots API changes. ([`37a5246`](https://github.com/OfficeDev/office-ui-fabric-react/commit/37a52465422d2622d52b7339ac2f9b2f234300da))

## @uifabric/experiments

### Breaking changes

- Remove `Shimmer` control. ([`615c8a6`](https://github.com/OfficeDev/office-ui-fabric-react/commit/615c8a68a2ce6cb866974aca07b06f808f2e5798))

### Minor changes

- Add FloatingSuggestions (FloatingPeoplePicker without inheritence) ([`4717372`](https://github.com/OfficeDev/office-ui-fabric-react/commit/47173727698850e1a13820d3ad14a0ac40203f20))
- Button: Adding allowDisabledFocus prop and adding @docCategory tags on exports. ([`44be390`](https://github.com/OfficeDev/office-ui-fabric-react/commit/44be390505c024b84f6031eb9f564102736b9fa0))
- Button: Adding keytips to new Button. ([`c4507e4`](https://github.com/OfficeDev/office-ui-fabric-react/commit/c4507e4bfb50076f51febafb4c6d238465b4c8b6))
- Button: Adding toggle/checked functionality to Button. ([`65d3dec`](https://github.com/OfficeDev/office-ui-fabric-react/commit/65d3dece099cf1ae247de1d761992f8265e23294))
- Button: Adding uniqueId prop. ([`8815262`](https://github.com/OfficeDev/office-ui-fabric-react/commit/88152626b21e2f8c5ebf3f1c0750fbc6ac6917b8))
- Button: Changing style of all variants to be Fluent by default and removing use of palette in favor of semantic slots. ([`2faffcc`](https://github.com/OfficeDev/office-ui-fabric-react/commit/2faffcc51ec77341b3f1d796ea8d9e7440ecf0f7))
- Button: Making all MenuButton props optional. ([`8d6c7c4`](https://github.com/OfficeDev/office-ui-fabric-react/commit/8d6c7c460cf9f9fa5e7985205fc9b602a678dd7f))
- Changes to support slots API refactoring. ([`14b1d77`](https://github.com/OfficeDev/office-ui-fabric-react/commit/14b1d77fc97fffb1c333a3601d62c3e30c4cf3b0))
- Convert foundation components that have state to hooks. ([`5f4051f`](https://github.com/OfficeDev/office-ui-fabric-react/commit/5f4051fd8cad5ebd5f5b88c418093b879efbec9a))
- SelectedItemsList: Add reworked Selected Items (no inheritence + hooks) ([`69ea4ba`](https://github.com/OfficeDev/office-ui-fabric-react/commit/69ea4ba3a0a3f50ad54e3b187be4dbc7014d7353))
- SplitButton: Adding ability to use Alt+Down key combination from first focus stop and cleaning up API. ([`3e3bc89`](https://github.com/OfficeDev/office-ui-fabric-react/commit/3e3bc89d8de0580dce51dc285c54010635ba1710))
- SplitButton: Improving screenreader narration for secondary action and fixing styling in fabric 7 branch. ([`f815723`](https://github.com/OfficeDev/office-ui-fabric-react/commit/f81572376bc29b57a53a34f359b799e1be519844))
- Support slots API changes. ([`37a5246`](https://github.com/OfficeDev/office-ui-fabric-react/commit/37a52465422d2622d52b7339ac2f9b2f234300da))

## @uifabric/fabric-website

### Minor changes

- Changes to support slots API refactoring ([`14b1d77`](https://github.com/OfficeDev/office-ui-fabric-react/commit/14b1d77fc97fffb1c333a3601d62c3e30c4cf3b0))

## @uifabric/file-type-icons

### Breaking changes

- Update file type icons to use new Fluent assets by default ([`5e46b40`](https://github.com/OfficeDev/office-ui-fabric-react/commit/5e46b402ec5ecc8326451b06cf07a0ab95246f45))n/a

## @uifabric/foundation

### Minor changes

- Enable API verification and export legacy styled. ([`5cfbccb`](https://github.com/OfficeDev/office-ui-fabric-react/commit/5cfbccb1d6a8f130b4c40c5ceeb20d2e7490a201))
- Evolve create component API to separate out view and make options bag optional. ([`20b09cc`](https://github.com/OfficeDev/office-ui-fabric-react/commit/20b09cc417500b205e6007538cb6f04ffee208eb))
- Foundation: Convert state components to hooks. ([`5f4051f`](https://github.com/OfficeDev/office-ui-fabric-react/commit/5f4051fd8cad5ebd5f5b88c418093b879efbec9a))
- Slots: Move slot options from individual props to new slots prop object. ([`37a5246`](https://github.com/OfficeDev/office-ui-fabric-react/commit/37a52465422d2622d52b7339ac2f9b2f234300da))
- Slots: Refactor API and add slot options object. ([`14b1d77`](https://github.com/OfficeDev/office-ui-fabric-react/commit/14b1d77fc97fffb1c333a3601d62c3e30c4cf3b0))
- Updating IComponent typings for ease of use in tests. ([`f97b56f`](https://github.com/OfficeDev/office-ui-fabric-react/commit/f97b56f0a62e4c99e4ed26b8df588e5fc8d5e9bb))

## @uifabric/merge-styles

### Minor changes

- Changin borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius and borderTopRightRadius to be of type ICSSPixelUnitRule, like borderRadius, instead of type string. ([`2faffcc`](https://github.com/OfficeDev/office-ui-fabric-react/commit/2faffcc51ec77341b3f1d796ea8d9e7440ecf0f7))

## @uifabric/migration

### Minor changes

- Non-destructive run by default, show affected files. ([`9dd16b5`](https://github.com/OfficeDev/office-ui-fabric-react/commit/9dd16b5d5317ca28df279ef7c5fbfa0392370291))

## @uifabric/react-cards

### Minor changes

- Card: Improving CardItem and adding CardSection to allow Card children to fill the Card's margins. ([`77a9195`](https://github.com/OfficeDev/office-ui-fabric-react/commit/77a91958ee5e37fb6c2991fd22275ec379f4c914))

## @uifabric/styling

### Minor changes

- Extend `getFocusStyle` to include named parameters. ([`73f2ff2`](https://github.com/OfficeDev/office-ui-fabric-react/commit/73f2ff26c052d1833fe49590660edf78a4cdf634))
- Remap existing font variables and add new ones. ([`31d3fd9`](https://github.com/OfficeDev/office-ui-fabric-react/commit/31d3fd9455c8ba205ef775461463175a78ff6f92))

## @uifabric/utilities

### Breaking changes

- Remove deprecated `autobind` decorator. ([`d7dd099`](https://github.com/OfficeDev/office-ui-fabric-react/commit/d7dd09998172855cfd005aa2ec901a575b838619)) [migration provided](https://github.com/OfficeDev/office-ui-fabric-react/blob/fabric-7/packages/migration/src/mods/7.0.0/warnAutobindRemoved.ts)
- createRef: removed (use React.createRef instead) ([`d7dff28`](https://github.com/OfficeDev/office-ui-fabric-react/commit/d7dff286902cc947fceba7048150e76927143fdb)) [migration provided](https://github.com/OfficeDev/office-ui-fabric-react/blob/fabric-7/packages/migration/src/mods/7.0.0/createRefFromReact.ts)
