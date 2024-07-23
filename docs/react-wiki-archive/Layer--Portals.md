## Overview

`Layer` previously (< OUFR v6.66.0) used React's `unstable_renderSubtreeIntoContainer`, which will [soon be removed](https://github.com/facebook/react/issues/10143).

Compared to `unstable_renderSubtreeIntoContainer`, [React Portals](https://reactjs.org/docs/portals.html) introduced in [OUFR v6.66.0](https://github.com/microsoft/fluentui/releases/tag/office-ui-fabric-react_v6.66.0) dispatches events in a way that respects virtual hierarchy rather than DOM hierarchy. This means that events will now trickle down and bubble up from portals through ancestors that previously would have not received these events.

Since pre-Portals `Layer` events never bubbled up to its ancestors prior to React Portals, `Layer`'s use of React portals has been implemented with event blocking added to more closely simulate `Layer`'s previous behavior. Event bubbling is controlled via a new `Layer` prop `eventBubblingEnabled` and is disabled by default for backwards compatibility.

## Known Behavior Changes

However, React portals do introduce a couple of known behavior changes regarding the following events:

- Capture events (for localized, non-window capture handlers)
- `onMouseEnter` / `onMouseLeave`

These behavioral changes will affect both app code and components that have any portals as part of their hierarchy.

## Who is Affected

If you have app or component code with localized, non-window capture or `onMouseEnter` / `onMouseLeave` handlers and that code has any of the following components as children, you should be aware of these changes.

- Callout
  - ComboBox
  - ContextualMenu
  - DatePicker
  - Dropdown
  - ExpandingCard
  - Keytip
  - TeachingBubble
  - Tooltip
- Coachmark
- Layer
- Modal
  - Dialog
- Panel

## Capture Events

`Layer` can block events that bubble up and prevent them from traversing up the hierarchy. However, capture events trickle down and cannot be easily blocked or controlled by `Layer`. Since Portals more accurately respect virtual hierarchy, capture events will now trickle down through content to any components contained in the `Layer`. (This didn't happen with old Layer because these events just traversed directly to the Layer subtree attached to root.)

![image](https://user-images.githubusercontent.com/26070760/45439777-914a7080-b66f-11e8-8c9d-db95bfe382ba.png)

The effect is that when any of the components listed above are interacted with, existing capture handlers in their ancestors will now fire when they haven't previously. In cases where this causes undesired behavior, a `utilities` helper `portalContainsElement` was added to help work around this specific example:

For example, one case of undesired behavior in Fabric was in the `BaseButton` component. This new utility was used to properly manage focus for expanded SplitButton dropdown menus:

```
  private _onSplitContainerFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    const container = this._splitButtonContainer.current;

    // If the target is coming from the portal we do not need to set focus on the container.
    if (!container || (ev.target && portalContainsElement(ev.target, container))) {
      return;
    }

    ...
  };
```

## onMouseEnter / onMouseLeave Events

When any of the components listed above are moused over, [every `onMouseEnter` handler along the subtree from the common ancestor of the component left down to the Layered component will be triggered](https://reactjs.org/docs/events.html#mouse-events). (This didn't happen with old Layer because these events just traversed directly to / from the `Layer` subtree attached to root.)

![image](https://user-images.githubusercontent.com/26070760/45056057-a3f8f000-b046-11e8-8d3d-bfeef864f51b.png)

For example, if a `Tooltip` contains a `Modal` and the `Modal` is open, the `Tooltip` will appear over the Modal when the mouse enters the browser window. This happens because `Tooltip`'s `onMouseEnter` handler is now triggered with portals where it wasn't before.

The same `portalContainsElement` utility mentioned for capture handlers can be used in these scenarios. For example, to prevent `Tooltips` from appearing over child `Modals`, the following code was added to `TooltipHost`:

```
  private _onTooltipMouseEnter = (ev): void => {
    ...

    if (ev.target && portalContainsElement(ev.target as HTMLElement, this._getTargetElement())) {
      // Do not show tooltip when target is inside a portal relative to TooltipHost.
      return;
    }

    ...
  };
```

If both `TooltipHost` and `ev.target` are contained within the same portal, the `Tooltip` will continue to appear as expected.

![portals](https://user-images.githubusercontent.com/26070760/45122148-e5a59b80-b117-11e8-8cde-fe11d1f5e190.gif)

Likewise, `onMouseLeave` used to be generated when Layered components rendered. Now that Layered components are more accurately viewed as part of the hierarchy, `onMouseLeave` events may not get generated when rendering Layered content. Additionally, `onMouseLeave` events will now get generated for the entire root->content->Layer->Layered component subtree when the mouse leaves the browser window or any point in that subtree.
