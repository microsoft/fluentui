## FocusZone Changelog

This is a list of changes made to this Stardust copy of FocusZone in comparison with the original [Fabric FocusZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusZone/FocusZone.tsx).

### Converge `FocusZone` with v7's version
- chore(FocusZone): Using the same DOM utilities in v0 that we use in v7. ([#12192](https://github.com/OfficeDev/office-ui-fabric-react/pull/12192))
- feat(FocusZone): Adding wrapping and Page Up/Down functionality. ([#12448](https://github.com/microsoft/fluentui/pull/12448))
- chore(FocusZone): Adding read only check in `shouldInputLoseFocus`. ([#12457](https://github.com/microsoft/fluentui/pull/12457))
- fix(FocusZone): Fixing tab keystroke not handling `bidirectionalDomOrder direction`. ([#12459](https://github.com/microsoft/fluentui/pull/12459))
- feat(FocusZone): Adding implementation for `tryInvokeClickForFocusable` function. ([#12478](https://github.com/microsoft/fluentui/pull/12478))
- chore(FocusZone): Updating some const names used in tests and some comments to bring v0 and v7 versions closer together. ([#12484](https://github.com/microsoft/fluentui/pull/12484))
- feat(FocusZone): Changing `restoreFocusFromRoot` to `preventFocusRestoration` to make default value be false. [#12615](https://github.com/microsoft/fluentui/pull/12615)

### Fixes
- fix(Accessibility): When parking focus needs to be detected, IE11 returns `null` for `activeElement`, causing focus to not be restored. We now check for `null` to ensure the feature works correctly in this environment.
- fix(Accessibility): Always handle provided onKeyDown event be propagated in inner zone ([#2140](https://github.com/microsoft/fluent-ui-react/pull/2140/files))
- With `defaultTabbableElement` prop set tab indexes are not updated accordingly ([#342](https://github.com/stardust-ui/react/pull/342))
- Remove unused prop `componentRef` ([#397](https://github.com/stardust-ui/react/pull/397))
- Fix `defaultTabbableElement` prop to be as a function ([#450](https://github.com/stardust-ui/react/pull/450))
- Remove role="presentation" @sophieH29 ([#530](https://github.com/stardust-ui/react/pull/530))
- Respect `defaultTabbable` element when FocusZone container receives focus @sophieH29 ([#637](https://github.com/stardust-ui/react/pull/637))
- Fix `FocusZone` - add `shouldResetActiveElementWhenTabFromZone` prop @sophieH29 ([#614](https://github.com/stardust-ui/react/pull/614))
- Make `FocusZoneTabbableElements` a usual enum @layershifter ([#867](https://github.com/stardust-ui/react/pull/867))
- Update tabindexes and focus alignment when item is focused programatically @sophieH29 ([#1098](https://github.com/stardust-ui/react/pull/1098))
- `FocusZone` should respect elements with `contenteditable` attribute on Home/End key press @sophieH29 ([#1749](https://github.com/stardust-ui/react/pull/1749))
- Fix bidirectional `FocusZone` to land focus correctly on DOWN key press after series of UP arrow keys @sophieH29 ([#1794](https://github.com/stardust-ui/react/pull/1794))
- Use always `getDocument` to correctly define current document object @sophieH29 ([#1820](https://github.com/stardust-ui/react/pull/1820))
- Fix element reference memory leaks - Fabric PR 11618 @jurokapsiar ([#2270](https://github.com/microsoft/fluent-ui-react/pull/2270))
- Adding aria-hidden to bumper elements so that they are not read by screen readers @khmakoto ([#14376](https://github.com/microsoft/fluentui/pull/14376))
- Added `shouldIgnoreNotFocusable` to props to skip `onFocus` event for elements with `data-is-focusable="false"` @assuncaocharles ([#18297](https://github.com/microsoft/fluentui/pull/18297))
- Fix useAccesibility and FocusZone to properly pass refs @chpalac ([#20556](https://github.com/microsoft/fluentui/pull/20556))

### Features
- Add embed mode for FocusZone and new Chat behavior ([#233](https://github.com/stardust-ui/react/pull/233))
    - Replaced `onFocusNotification` with a regular `onFocus` event callback to pass unit tests with embed.
    - Replaced `ref={this.setRef}` with `this.setRef(this)` in `componentDidMount` to support functional components, which is needed to pass unit tests with embed.
    - Renamed `defaultActiveElement` to `defaultTabbableElement` and changed behavior:
        - Changed to query only descendants of the focus zone instead of the whole document, which enables to write simpler selectors. Note that we do not lose any functionality by this, because selecting elements outside of focus zone had no effect.
        - Changed not to call `this.focus()` on component mount (this was causing issues e.g., in docsite, where every change in source code would refocus the mounted component). Instead, you can now use a new property `shouldFocusOnMount`.
- Enable RTL @sophieH29 ([#646](https://github.com/stardust-ui/react/pull/646))

- Add `shouldFocusFirstElementWhenReceivedFocus` prop, which forces focus to first element when container receives focus @sophieH29 ([#469](https://github.com/stardust-ui/react/pull/469))
- Handle keyDownCapture based on `shouldHandleKeyDownCapture` prop @sophieH29 ([#563](https://github.com/stardust-ui/react/pull/563))
- Add `bidirectionalDomOrder` direction allowing arrow keys navigation following DOM order @sophieH29 ([#1637](https://github.com/stardust-ui/react/pull/1647))
- FocusZone: Adding `forceAlignment` attribute to `focusElement` to set focus alignment according to the element provided @khmakoto ([#14911](https://github.com/microsoft/fluentui/pull/14911))

### Upgrade `FocusZone` to the latest version from `fabric-ui` @sophieH29 ([#1772](https://github.com/stardust-ui/react/pull/1772))
- Restore focus on removing item ([OfficeDev/office-ui-fabric-react#7818](https://github.com/OfficeDev/office-ui-fabric-react/pull/7818))
- `onActiveItemChanged` now fires ([OfficeDev/office-ui-fabric-react#7958](https://github.com/OfficeDev/office-ui-fabric-react/pull/7958))
- Reduce global event listeners ([OfficeDev/office-ui-fabric-react#8421](https://github.com/OfficeDev/office-ui-fabric-react/pull/8421))
- Track innerzones correctly ([OfficeDev/office-ui-fabric-react#8560](https://github.com/OfficeDev/office-ui-fabric-react/pull/8560))
- Check for no wrap fix ([OfficeDev/office-ui-fabric-react#9542](https://github.com/OfficeDev/office-ui-fabric-react/pull/9542))


#### feat(FocusZone): Implement FocusZone into renderComponent [#116](https://github.com/stardust-ui/react/pull/116)
- Prettier and linting fixes, e.g., removing semicolons, removing underscores from private methods.
- Moved `IS_FOCUSABLE_ATTRIBUTE` and others to `focusUtilities.ts`.
- Added prop types, default props, and handled props.
- Added `preventDefaultWhenHandled` property and method, added to `_onKeyDown`.
- Renamed boolean callback properties to better reflect their purpose.
- Renamed `elementType` to `as`.
- Removed deprecated properties.
- Removed `shouldWrapFocus` functionality as it is not necessary for Stardust now and maybe never will.
- In order to handle custom components in `as`, the `ref` and `_root` were changed to rely on `ReactDOM.findDOMNode` which seems to be necessary because of react-hot-loader. Please see the corresponding [issue #964 at react-hot-loader](https://github.com/gaearon/react-hot-loader/issues/964).
- Added better typings so that FocusZone passes strict type checks.
- Fixed `focusLast` mistakes: added it to `FocusZone.types.ts`, fixed a return value, and fixed its comment.
- Replaced Fabric dependencies accordingly:
    - `BaseComponent` removed.
    - `EventGroup` replaced with vanilla JS approach.
    - `KeyCodes` replaced with `keyboard-key` functionality.
    - `css` replaced with `classnames` functionality.
    - `htmlElementProperties`, `elementContains`, and `shouldWrapFocus` all removed as the no wrapping functionality was removed.
    - `getDocument` replaced with vanilla JS approach.
    - `getId` replaced with `_.uniqueId`.
    - `getNativeProps` replaced with `getUnhandledProps`.
    - `getParent` replaced with vanilla JS approach.
    - `getRTL` replaced with an `isRtl` property.
    - `createRef` replaced with a custom object and a callback which is necessary anyway because of custom component handling, see above for details.
    - Focus related utilities moved to `focusUtilities.ts`.

## FocusTrapZone Changelog

This is a list of changes made to the Stardust copy of FocusTrapZone in comparison with the original [Fabric FocusTrapZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusTrapZone/FocusTrapZone.tsx).

### BREAKING CHANGES
- Allow using `firstFocusableSelector` for all type of selectors, not only class names @sophieH29 ([#1732](https://github.com/stardust-ui/react/pull/1732))
- Do not force focus inside focus trap zone on outside focus @sophieH29 ([#1930](https://github.com/stardust-ui/react/pull/1930))
- Removing `FocusZone` type from event callbacks @khmakoto ([#16952](https://github.com/microsoft/fluentui/pull/16952))

### Fixes
- Do not focus trigger on outside click @sophieH29 ([#627](https://github.com/stardust-ui/react/pull/627))
- Do not hide aria-live regions from accessibility tree @sophieH29 ([#917](https://github.com/stardust-ui/react/pull/917))
- Do not propagate any keyboard events @sophieH29 ([#1180](https://github.com/stardust-ui/react/pull/1180))
- Use always `getDocument` to correctly define current document object @sophieH29 ([#1820](https://github.com/stardust-ui/react/pull/1820))

### Features
- Add focus trap zone [#239](https://github.com/stardust-ui/react/pull/239)
    - Used Stardust utils instead of Fabric utilities:
    - Used `EventListener` [#949](https://github.com/stardust-ui/react/pull/949)
    - Extended `React.Component` instead of Fabric `BaseComponent`.
    - Used `ReactDOM.findDOMNode` reference instead of `createRef` for `_root`.
    - Got rid of `componentWillMount` as it deprecated in higher versions of React.
    - Added `aria-hidden` to the body children outside of the Popup to prevent screen reader from reading background information.
    - Renamed `focus` method to `_findElementAndFocusAsync`, made it private and removed `IFocusTrapZone` interface as it's no longer needed.


### Upgrade `FocusTrapZone` to the latest version from `fabric-ui` @sophieH29 ([#1790](https://github.com/stardust-ui/react/pull/1790))
- When `IsHiddenOnDismiss` is true focus does not automatically enter `Panel` ([OfficeDev/office-ui-fabric-react#7362](https://github.com/OfficeDev/office-ui-fabric-react/pull/7362))
- Refactor trapping behavior ([OfficeDev/office-ui-fabric-react#8216](https://github.com/OfficeDev/office-ui-fabric-react/pull/8216))
- Fix zero tabbable element scenarios ([OfficeDev/office-ui-fabric-react#8274](https://github.com/OfficeDev/office-ui-fabric-react/pull/8274))
- Fix focus and blur callbacks ([OfficeDev/office-ui-fabric-react#8404](https://github.com/OfficeDev/office-ui-fabric-react/pull/8404))
- Add new disabled prop ([OfficeDev/office-ui-fabric-react#8809](https://github.com/OfficeDev/office-ui-fabric-react/pull/8809))
- Update focus handling in DatePicker and FocusTrapZone ([OfficeDev/office-ui-fabric-react#8875](https://github.com/OfficeDev/office-ui-fabric-react/pull/8875))
- Remove aria-hidden from FocusTrapZone's bumpers ([OfficeDev/office-ui-fabric-react#9019](https://github.com/OfficeDev/office-ui-fabric-react/pull/9019))
