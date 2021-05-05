# Moving from `FocusZone` to `Tabster`

---

Contributors: @khmakoto

## Problem statement

We currently use `FocusZone` for focus management in both v0 and v8. For our converged components we are trying out a different approach by using `Tabster`.

The reason for doing this is use a framework-agnostic solution (as opposed to the React-centric `FocusZone`) that operates at the DOM level and has no external runtime dependencies.

However, we have to make sure that `Tabster` can actually cover all the scenarios `FocusZone` covered.

## Requirements

Ideally, `FocusZone` or `FocusTrapZone` like components should be avoided in most cases, and our components should provide first class support for correct keyboarding behaviour. It is reasonable to assume that our components might not cover all our customers' scenarios. We should define the the requirements that Fluent UI should support for focus management.

### Lists/Collections

Type of keyboard and focus behaviour that is the most commonly documentd by WAI-ARIA and most commonly seen in
* [listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)
* [menu(bar)](https://www.w3.org/TR/wai-aria-practices-1.1/#menu)

Although most widgets that involve collections will implement parts of the basic keyboarding with other special features i.e [radio group](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html)

The most important behaviour in this scenarios is navigating with the use of Arrow keys
* Left/Right
* Up/Down
* Left+Up/Right+Down

> TODO Discuss: Should `Tab` also be an option ?

> TODO Discuss: Should `Home` `End` `PgUp`  `PgDown` be built into this requirement or covered in components ?

### Grids

The most common example of grid keyboarding would the be infamous [data grid](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/dataGrids.html).

Elements should be navigated with all arrow keys in a 2D grid, that **does not need to be perfectly aligned**.

> TODO Discuss: Should `Home` `End` `PgUp`  `PgDown` be built into this requirement or covered in components ?

### Nested foucsable items

This scenario can happen in the case of grids where a cell contains focusable items but can also be focused/navigated in the scope of the whole grid.

Another common scenario are interactive cards where the card itself is focusable/clickable but the contents can also contain focusable items.

Nested focusable items should also be able to use list/grid focus behaviours.

> TODO Discuss: Set some clear requirements here

### Restoring lost focus

Often clicking on a widget (e.g button) can toggle an option and cause it to disappear. Without any intervention the focus will be lost and applied directly to the document body which is undesireable for screen reader users.

We should provide customers the ability to easily detect or avoid these situations by restoring focus to meaningful default elements.

### Finding/filtering focusable children

There are a variety of factors to consider when trying to find focusable elements for features:
* disabled
* aria-disabled
* aria-hidden
* tabindex
* Custom clasname/role/data-* requirements

We should provide customers the ability to easily find focusable items that **are focusable** and also follow their custom filtering requirements.

## How is `FocusZone` managing focus

`FocusZone` is a React component that is built to wrap around the elements whose focus it is to manage. It provides a number of props to abstract arrow key navigation behavior amongst tabbable elements and be able to group them into "zones" that you can transtition between.

## How is `Tabster` managing focus

`Tabster` is a set of tools and concepts for making a dynamic web application properly accessible and keyboard-navigable. It does this by working at the browser level, providing a framework-angostic solution (as opposed to the React-centric `FocusZone`) that operates directly on the DOM and has no external runtime dependencies.

It provides API for:

- Traversing focusable elements.
- Automatically restoring focus when it gets lost.
- Tracking and changing the currently focused element.
- Determining if a user is using keyboard to navigate through the application.
- Properly navigate through lists.
- Conveniently exclude the rest of the application from the keyboard and screen reader navigation flow when making a Modal.
- Properly highlighting the currently focus element via a custom outline component.

We are also abstracting `Tabster` into a set of hooks for easier use within React via the `@fluentui/react-tabster` package.

## Comparison between `FocusZone` and `Tabster`

Below, we present a comparison between the functionality available in `FocusZone` and `Tabster`, focusing on what is covered by either or both of them and seen from the lens of someone who wants to transition from using `FocusZone` to using `Tabster` in their project. The way we are going to approach this is by taking a look at which `FocusZone` props/capabilities are covered in `Tabster` (either fully or partially) and which ones are missing, all while skipping over deprecated props. We will then take a quick look at what `Tabster` provides that `FocusZone` does not.

### What is covered in `FocusZone` that is fully covered by `Tabster`

#### IFocusZone

- `focus(forceIntoFirstElement?: boolean): boolean`
  - _Description:_ Sets focus to the first tabbable item in the `FocusZone`, returning true if focus could be set to an active element and false otherwise. If `forceIntoFirstElement` is true, focus will be forced into the first element, even if the focus is already within the `FocusZone`.
  - _Equivalent in `Tabster`:_ Use `findFirstFocusable` from `useFocusFinders` in `@fluentui/react-tabster` instead.
- `focusLast(): boolean`
  - _Description:_ Sets focus to the last tabbable item in the `FocusZone`, returning true if focus could be set to an active element and false otherwise.
  - _Equivalent in `Tabster`:_ Use `findLastFocusable` from `useFocusFinders` in `@fluentui/react-tabster` instead.

#### IFocusZoneProps

- `isCircularNavigation?: boolean`
  - _Description:_ If set, the `FocusZone` will cycle to the beginning of the targets once the user navigates to the next target while at the end, and to the end when navigating to the previous target while at the beginning.
  - _Equivalent in `Tabster`:_ `useArrowNavigationGroup` from `@fluentui/react-tabster` can be used to allow for cyclic navigation, specified by passing the `circular` prop as part of the hook's `options` argument.

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
  - _What is missing in `Tabster`:_ `bidirectional` and `domOrder` navigation are not currently available via `useArrowNavigationGroup`.
- `handleTabKey?: FocusZoneTabbableElements`
  - _Description:_ Allows tab key to be handled to tab through a list of items in the `FocusZone`. An unfortunate side effect is that users will not be able to tab out of the `FocusZone` and have to hit some other key.
  - _Notes:_ `FocusZoneTabbableElements` is an `enum` with the following values:
    - `none`: Tabbing is not allowed.
    - `all`: All tabbing is allowed.
    - `inputOnly`: Tabbing is allowed only on input elements.
  - _Partial equivalent in `Tabster`:_ `Tabster` allows the user to specify the navigation type of the `Mover` to be handled via arrow keys, the tab key, or both.
  - _What is missing in `Tabster`:_ And abstraction similar to `useArrowNavigationGroup` would be nice to have. Even then, there is no equivalent currently for `inputOnly` tabbing.

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
- `shouldFocusOnMount?: boolean`
  - _Description:_ Determines if a default tabbable element should be force-focused on `FocusZone` mount.
  - _Why is no equivalent needed?_ There is no "mounting" process anymore since `Tabster` is not a React component.
- `disabled?: boolean`
  _Description:_ If set, the `FocusZone` component will not be tabbable and keyboard navigation will be disabled. This does not affect the `disabled` attribute of any child.
  - _Why is no equivalent needed?_ `Tabster` is not a component but a set of utilities, so it has no element to disable.
- `as?: React.ElementType`
  - _Description:_ A component that should be used as the root element of the `FocusZone` component.
  - _Why is no equivalent needed?_ There is no component to replace the root element of via `as`.
- `shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean`
  - _Description:_ Callback function that will be executed on keypresses to determine if the user intends to navigate into the inner (nested) zone. Returning true will ask the first inner zone to set focus.
  - _Why is no equivalent needed?_ Since `Tabster` is not a component but a set of utilities there is no concept of "nesting".
- `allowFocusRoot?: boolean`
  - _Description:_ Allows focus to park on root when focus is in the `FocusZone` at render time.
  - _Why is no equivalent needed?_ There is no component with a root to park at.
- `shouldFocusInnerElementWhenReceivedFocus?: boolean`
- `shouldResetActiveElementWhenTabFromZone?: boolean`
- `checkForNoWrap?: boolean`

#### Props that may need an equivalent

##### IFocusZone

- `focusElement(childElement?: HTMLElement, forceAlignment?: boolean): boolean`
  - _Description:_ Sets focus to a specific child element (`childElement`) within the zone. This can be used in conjunction with `shouldReceiveFocus` to create delayed focus scenarios (like animate the scroll position to the correct location and then focus). If `forceAlignment` is true, then focus alignment will be set according to the element provided. Returns true if focus could be set to an active element and false otherwise.
  - _What should we do about this prop?_ There is probably not a need to have something that matches this functionality 1:1. However, forcing alignment and the ability to specify a child element to get focus are probably things that we want to have something to transition to.
- `setFocusAlignment(point: Point): void`
  - _Description:_ Forces horizontal alignment in the context of vertical arrowing to use a specific point (`point`) as the reference, rather than a center based on the last horizontal motion.
  - _What should we do about this prop?_ We may need something similar to force horizontal alignment, although I am not so sure about using a specific point as reference.

##### IFocusZoneProps

- `defaultTabbableElement?: string | ((root: HTMLElement) => HTMLElement)`
  - _Description:_ Optionally defines the initial tabbable element inside the `FocusZone`. If a string is passed then it is treated as a selector for identifying the inital tabbable element. If a function is passed then it uses the root element as a parameter to return the initial tabbable element.
  - _What should we do about this prop?_ Is there an actual need for something like this? If so, we should probably find a solution in `Tabster`. If not, we should skip this prop and regard it as "not needed".
- `onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void`
- `shouldReceiveFocus?: (childElement?: HTMLElement) => boolean`
- `pagingSupportDisabled?: boolean`

### Props in `FocusZone` that need more info to know if they have an equivalent in `Tabster`

- `shouldRaiseClicks?: boolean`
- `shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean`
- `stopFocusPropagation?: boolean`
- `onFocus?: (event: React.FocusEvent<HTMLElement>) => void`
- `preventDefaultWhenHandled?: boolean`
- `preventFocusRestoration?: boolean`

### What is covered in `Tabster` that is not covered by `FocusZone`

There are mainly two functionalities that are available on `Tabster` that are not covered by `FocusZone`. These are:

#### Modalizer

`Tabster` has a concept it calls the `Modalizer`. It basically makes it conveniently easy to exclude the rest of the application from the keyboard and screen reader navigation flow when a modal dialog is opened.

Since `FocusZone` does not deal with modal dialogs particularly this is something that goes beyond its purpose.

#### Outline

`Tabster` provides a custom outline component that is supposed to solve two problems regarding the act of properly highlighting the focused elements when navigating with the keyboard: - Using the `outline` CSS property is insufficient because the outline of an element gets cropped when a parent element has `overflow: hidden`. - There is no way to limit the outline visibility to only the cases when a user is navigating with the keyboard.

`FocusZone` deals with the focus navigation management, not with styling, and hence does not provide an equivalent solution to the outline process mentioned above.
