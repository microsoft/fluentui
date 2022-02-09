# Moving from `FocusZone` to `Tabster`

---

Contributors: @khmakoto @ling1726

## Problem statement

We currently use `FocusZone` for focus management in both v0 and v8. For our converged components we are trying out a different approach by using `Tabster`.

The reason for doing this is to use a framework-agnostic solution (as opposed to the React-centric `FocusZone`) that operates at the DOM level and has no external runtime dependencies.

However, we have to make sure that `Tabster` can actually cover all the scenarios `FocusZone` covered.

## Requirements

Ideally, `FocusZone` or `FocusTrapZone` like components should be avoided in most cases, and our components should provide first class support for correct keyboarding behavior. It is reasonable to assume that our components might not cover all our customers' scenarios. We should define the requirements that Fluent UI should support for focus management.

### Lists/Collections

Type of keyboard and focus behavior that is the most commonly documented by WAI-ARIA and most commonly seen in

- [listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)
- [menu(bar)](https://www.w3.org/TR/wai-aria-practices-1.1/#menu)

Although most widgets that involve collections will implement parts of the basic keyboarding with other special features i.e [radio group](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html).

The most important behavior in these scenarios is navigating with the use of Arrow keys

- Left/Right
- Up/Down
- Left+Up/Right+Down
- Tab can be used alongside arrow keys
- Possibility of using Home/End keys to focus first/last elements respectively

### Grids

The most common example of grid keyboarding would be the infamous [data grid](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/dataGrids.html).

Elements should be navigated with all arrow keys in a 2D grid, that **does not need to be perfectly aligned**.

### Nested focusable items

This scenario can happen in the case of grids where a cell contains focusable items that can also be focused/navigated in the scope of the whole grid.

Another common scenario are interactive cards where the card itself is focusable/clickable but the contents in it can also contain focusable items.

Nested focusable items should also be able to use list/grid focus behaviors.

> TODO #19324

### Restoring lost focus

Often clicking on a widget (e.g button) can toggle an option and cause it to disappear. Without any intervention the focus will be lost and applied directly to the document body, which is undesireable for screen reader users.

We should provide customers the ability to easily detect or avoid these situations by restoring focus to meaningful default elements.

### Finding/filtering focusable children

There are a variety of factors to consider when trying to find focusable elements for features:

- disabled
- aria-disabled
- aria-hidden
- tabindex
- Custom clasname/role/data-\* requirements

We should provide customers the ability to easily find focusable items that **are focusable** and also follow their custom filtering requirements.

## `FocusZone`

`FocusZone` is a React component that is built to wrap around the elements whose focus it is to manage. It provides a number of props to abstract arrow key navigation behavior amongst tabbable elements and be able to group them into "zones" that you can transition between.

The React component pattern for focus management is not ideal, it breaks React component isolation. These components use DOM operations and a mix of global and synthetic event listeners to implement behavior. The components also expose a class-based interface for focus operations on children elements, which further breaks isolation.

Nested focusables cause issues on the current `FocusZone` component, where nested focusables behave inconsistently or incorrectly. Here are some recent issues related to this:

- [microsoft/fluentui#8551](https://github.com/microsoft/fluentui/issues/8551)
- [microsoft/fluentui#12177](https://github.com/microsoft/fluentui/issues/12177)
- [microsoft/fluentui#16037](https://github.com/microsoft/fluentui/issues/16037)
- [microsoft/fluentui#13210](https://github.com/microsoft/fluentui/issues/13210)

## `Tabster`

Philosophy behind `Tabster`:

> **Tab**index on **Ster**oids

[Tabster](https://github.com/microsoft/tabster) is designed to be a lower level utility that manages the state of focusable elements independent from a rendering framework.

Internally, `Tabster` leverages the [TreeWalker API](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker), which is the recommended DOM tree traversal method [according to the w3c](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html).

[Tabster](https://github.com/microsoft/tabster) manages focus on a lower level than the rendering framework and acts on the **visible** DOM. Since operations are run on visible DOM there is a much clearer path for handling dynamically loaded content that would otherwise require effects outside the rendering lifecycle in React components, which breaks component isolation principles.

`Tabster` has 2 levels of API:

- Declarative with `data-tabster` DOM attribute
- Functional that can accept DOM elemenets or functions

Nesting focusables is a problem that `Tabster` explicitly tries to solve. It does this by bringing focus management to a lower level than the rendering framework, trying to accomplish this consistently without worrying about rendering cycles.

From the highest level, `Tabster` is opt-in and will not work unless a specific root element has been configured.

### Modules

The description of the each constituent module in the library can be found in the [Tabster README](https://github.com/microsoft/tabster).

The bundle size of each of the different modules of the library are listed in the below table (as of May 5, 2021). The library is fully tree-shakeable, and for most cases only the `core` part of the library is expected to be used.

| Module          | minified (kb) | gzipped(kb |
| --------------- | ------------- | ---------- |
| Core            | 45.3          | 12.2       |
| Deloser         | 13.2          | 3.2        |
| Modalizer       | 4.5           | 0.8        |
| ObservedElement | 3.1           | 0.7        |
| Outline         | 7.9           | 2          |
| CrossOrigin     | 18.9          | 4.4        |

[#18700](https://github.com/microsoft/fluentui/pull/18700) refactors `FocusZone` and `FocusTrapZone` to be independent of old v8 styling utilities and measures the bundle size. We should eventually reach the same targets with tabster

![image](https://user-images.githubusercontent.com/20744592/123287421-03359100-d50f-11eb-899d-4846dfbbc8b4.png)

#### Core API

`Tabster's` Core API provides the following functionalities:

- Groupper - handling groups of focusable elements.
- Mover - hanling moving between (groups of) focusable elements.
- Focusable - utilities to find and verify focusable elements.
- Focused element state - observes the currently focused element.
- Keyboard navigation state - observes if the user is navigating with keyboard.

All of those functionalities are opt-in.

#### Deloser

Elements with focus on them disappearing from the application and causing the focus to suddenly be on the `body` is a common problem in the web.

The Deloser API tries to solve this by tracking the focus history and automatically restoring focus when it is lost.

The API is opt-in, and can be declarative (`data-tabster`) for the simplest use case. It can also be paused/resumed during runtime.

#### Modalizer

Modal dialogs generally have these hard requirements:

- Focus must be trapped.
- All non-interactable elements must be hidden from screen readers.
- Only one modal can be active at a time.

This API is also opt-in and handles all the above requirements.

## Comparison between `FocusZone` and `Tabster`

Below, we present a comparison between the functionality available in `FocusZone` and `Tabster`, focusing on what is covered by either or both of them and seen from the lens of someone who wants to transition from using `FocusZone` to using `Tabster` in their project. The way we are going to approach this is by taking a look at which `FocusZone` props/capabilities are covered in `Tabster` (either fully or partially) and which ones are missing, all while skipping over deprecated props.

### What is covered in `FocusZone` that is fully covered by `Tabster`

#### IFocusZone

- `focus(forceIntoFirstElement?: boolean): boolean`
  - _Description:_ Sets focus to the first tabbable item in the `FocusZone`, returning true if focus could be set to an active element and false otherwise. If `forceIntoFirstElement` is true, focus will be forced into the first element, even if the focus is already within the `FocusZone`.
  - _Equivalent in `Tabster`:_ Use `findFirstFocusable` from `useFocusFinders` in `@fluentui/react-tabster` instead.
- `focusLast(): boolean`
  - _Description:_ Sets focus to the last tabbable item in the `FocusZone`, returning true if focus could be set to an active element and false otherwise.
  - _Equivalent in `Tabster`:_ Use `findLastFocusable` from `useFocusFinders` in `@fluentui/react-tabster` instead.
- `focusElement(childElement?: HTMLElement, forceAlignment?: boolean): boolean`
  - _Description:_ Sets focus to a specific child element (`childElement`) within the zone. This can be used in conjunction with `shouldReceiveFocus` to create delayed focus scenarios (like animate the scroll position to the correct location and then focus). If `forceAlignment` is true, then focus alignment will be set according to the element provided. Returns true if focus could be set to an active element and false otherwise.
  - _Equivalent in `Tabster`:_ Use `findAllFocusable` from `useFocusFinders` in `@fluentui/react-tabster` instead. This function will walk the HTML tree and return nodes that match a callback similar to `find` in native JS.

#### IFocusZoneProps

- `isCircularNavigation?: boolean`
  - _Description:_ If set, the `FocusZone` will cycle to the beginning of the targets once the user navigates to the next target while at the end, and to the end when navigating to the previous target while at the beginning.
  - _Equivalent in `Tabster`:_ `useArrowNavigationGroup` from `@fluentui/react-tabster` can be used to allow for cyclic navigation, specified by passing the `circular` prop as part of the hook's `options` argument.
- `preventFocusRestoration?: boolean`
  - _Description:_ If true, prevents the `FocusZone` from attempting to restore the focus to the inner element when the focus is on the root element after `componentDidUpdate`.
  - _Equivalent in `Tabster`:_ If "deloser" part of `Tabster` is not declared then it does not keep track of focus history for focus restoration, which essentially accomplishes the same goal.
- `shouldFocusOnMount?: boolean`
  - _Description:_ Determines if a default tabbable element should be force-focused on `FocusZone` mount.
  - _Equivalent in `Tabster`:_ The same functionality can be accomplished by using one of the focus finding utilities from `useFocusFinders` (part of `@fluentui/react-tabster`) either in an effect for function components or in the `componentDidMount` lifecycle method for class-based components.
- `allowFocusRoot?: boolean`
  - _Description:_ Allows focus to park on root when focus is in the `FocusZone` at render time.
  - _Equivalent in `Tabster`:_ This is equivalent to adding `tabIndex={0}` to the root element supporting `Tabster`.
- `onFocus?: (event: React.FocusEvent<HTMLElement>) => void`
  - _Description:_ Callback called when a "focus" event is triggered in the `FocusZone`.
  - _Equivalent in `Tabster`:_ Native `onFocus` callback can be used instead.

### What is covered in `FocusZone` that is partially covered by `Tabster`

#### IFocusZoneProps

- `direction?: FocusZoneDirection`
  - _Description:_ Defines which arrows to react to.
  - _Notes:_ `FocusZoneDirection` is an `enum` with the following values:
    - `vertical`: Reacts to Up/Down arrows.
    - `horizontal`: Reacts to Left/Right arrows.
    - `bidirectional`: Reacts to all arrows.
    - `domOrder`: Reacts to all arrows by navigating to the next item in DOM by pressing Right/Down arrow keys and to the previous item in the DOM by pressing Left/Up arrow keys. Left and Right arrow keys are swapped in RTL mode.
  - _Partial equivalent in `Tabster`:_ `useArrowNavigationGroup` from `@fluentui/react-tabster` can be used to allow for arrow navigation for either a vertical or horizontal axis, specified by passing the `axis` prop as part of the hook's `options` argument.
  - _What is missing in `Tabster`?:_ `bidirectional` and `domOrder` navigation are not currently available via `useArrowNavigationGroup`.
- `handleTabKey?: FocusZoneTabbableElements`
  - _Description:_ Allows tab key to be handled to tab through a list of items in the `FocusZone`. An unfortunate side effect is that users will not be able to tab out of the `FocusZone` and have to hit some other key.
  - _Notes:_ `FocusZoneTabbableElements` is an `enum` with the following values:
    - `none`: Tabbing is not allowed.
    - `all`: All tabbing is allowed.
    - `inputOnly`: Tabbing is allowed only on input elements.
  - _Partial equivalent in `Tabster`:_ `Tabster` allows the user to specify the navigation type of the `Mover` to be handled via arrow keys, the tab key, or both.
  - _What is missing in `Tabster`?:_ And abstraction similar to `useArrowNavigationGroup` would be nice to have. Even then, there is no equivalent currently for `inputOnly` tabbing.
- `shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean`
  - _Description:_ Callback function that will be executed on keypresses to determine if the user intends to navigate into the inner (nested) zone. Returning true will ask the first inner zone to set focus.
  - _Partial equivalent in `Tabster`:_ The "groupper" part of `Tabster` groups focusables and can handle nesting.
  - _What is missing in `Tabster`?:_ We need to be very clear about how we support nested focusables to determine what kind of API is needed here.
- `shouldFocusInnerElementWhenReceivedFocus?: boolean`
  - _Description:_ If true and `FocusZone's` root element (container) receives focus, the focus will land either on the `defaultTabbableElement` (if set) or on the first tabbable element of this `FocusZone`. Commonly used in the case of nested `FocusZones` where the nested `FocusZone's` container is a focusable element.
  - _Partial equivalent in `Tabster`:_ The "groupper" part of `Tabster` groups focusables and can handle nesting.
  - _What is missing in `Tabster`?:_ We need to be very clear about how we support nested focusables to determine what kind of API is needed here.

### What is covered in `FocusZone` that is not covered by `Tabster`

#### Props that need no equivalent

##### IFocusZoneProps

- `componentRef?: IRefObject<IFocusZone>`
  - _Description:_ Optional callback to access the `IFocusZone` interface used instead of `ref` for accessing the public methods and properties of the component.
  - _Why is no equivalent needed?_ `Tabster` is not a component but a set of utilities, so it has no need for a `ref`.
- `elementRef?: React.Ref<HTMLElement>`
  - _Description:_ Optional callback to access the root DOM element.
  - _Why is no equivalent needed?_ `Tabster` is not a component but a set of utilities, so it has no need for a `ref`.
- `className?: string`
  - _Description:_ Additional class name to provide on the root element, in addition to the ms-FocusZone class.
  - _Why is no equivalent needed?_ `Tabster` is not a component but a set of utilities, so it has no element to apply a class to.
- `disabled?: boolean`
  - _Description:_ If set, the `FocusZone` component will not be tabbable and keyboard navigation will be disabled. This does not affect the `disabled` attribute of any child.
  - _Why is no equivalent needed?_ `Tabster` is not a component but a set of utilities, so it has no element to disable.
- `as?: React.ElementType`
  - _Description:_ A component that should be used as the root element of the `FocusZone` component.
  - _Why is no equivalent needed?_ There is no component to replace the root element of via `as`.
- `preventDefaultWhenHandled?: boolean`
  - _Description:_ If true, `FocusZone` prevents the default behavior of keyboard events when changing focus between elements.
  - _Why is no equivalent needed?_ There is no clear partner scenario that needs arrow key movement with scrolling. Prefer removing until a partner asks for it.
- `shouldReceiveFocus?: (childElement?: HTMLElement) => boolean`
  - _Description:_ Callback method for determining if focus should indeed be set on the given element. Receives the child element within the zone to focus as a parameter and returns true if focus should set to the given element and false if we should avoid setting focus to it.
  - _Why is no equivalent needed?_ This callback is an antipattern that breaks component encapsulation. This should probably not be supported going forward and should only be considered in the future if a partner vehemently asks for similar behavior.

#### Props that may need an equivalent

##### IFocusZone

- `setFocusAlignment(point: Point): void`
  - _Description:_ Forces horizontal alignment in the context of vertical arrowing to use a specific point (`point`) as the reference, rather than a center based on the last horizontal motion.
  - _What should we do about this prop?_ We may need something similar to force horizontal alignment, although I am not so sure about using a specific point as reference.

##### IFocusZoneProps

- `defaultTabbableElement?: string | ((root: HTMLElement) => HTMLElement)`
  - _Description:_ Optionally defines the initial tabbable element inside the `FocusZone`. If a string is passed then it is treated as a selector for identifying the inital tabbable element. If a function is passed then it uses the root element as a parameter to return the initial tabbable element.
  - _What should we do about this prop?_ Is there an actual need for something like this? If so, we should probably find a solution in `@fluentui/react-tabster`. If not, we should skip this prop and regard it as "not needed". Anyways, it is too early right now to make a call on it and the actual API would probably have to look very different to what it looks like in `FocusZone` today.
- `shouldResetActiveElementWhenTabFromZone?: boolean`
  - _Description:_ If true and the `Tab` key is not handled by `FocusZone`, resets current active element to null value. For example, when roving index is not desirable and focus should always reset to the default tabbable element.
  - _What should we do about this prop?_ If we do provide a `defaultTabbableElement` then we might want something like this going forward as well, but this is pending the decision on the `defaultTabbableElement` prop.
- `onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void`
  - _Description:_ Callback for when one of the immediate children elements gets active by getting focused by having one of its respective children elements focused.
  - _What should we do about this prop?_ We might something similar in `Tabster`, although it might be just the native `onFocus` callback.
- `pagingSupportDisabled?: boolean`
  - _Description:_ Determines whether to disable the paging support for `Page Up` and `Page Down` keyboard scenarios.
  - _What should we do about this prop?_ We might need a prop like this if we decide `Tabster` needs to support `Page Up` and `Page Down` scenarios, but that is still an unknown as of right now.
- `checkForNoWrap?: boolean`
  - _Description:_ Determines whether to check for data attributes that specify the intent to avoid focus wrapping.
  - _What should we do about this prop?_ We might need a way to enable or disable focus wrapping.

### Props in `FocusZone` that need more info to know if they have an equivalent in `Tabster`

- `shouldRaiseClicks?: boolean`
  - _Description:_ Determines whether the `FocusZone` will walk up the DOM trying to invoke click callbacks on focusable elements on Enter and Space keydowns to ensure accessibility for tags that do not guarantee this behavior.
- `shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean`
  - _Description:_ A callback method to determine if the input element should lose focus on arrow keys. Receives the input element which is to lose focus as a paramenter and returns true if the input element should lose focus and false otherwise.
- `stopFocusPropagation?: boolean`
  - _Description:_ Whether the `FocusZone` should allow focus events to propagate past the `FocusZone`.
