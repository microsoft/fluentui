# Overlay runtime fallback contract

## Status

This document defines the implementation-neutral behavior for Headless overlay
components. Native browser behavior is the baseline. A fallback implementation
may use Fluent UI's Portal, focus-management, and positioning utilities, but it
must not expose different behavior to consumers.

The runtime decision is binary for a given document:

- **Native** when the complete HTML Popover and CSS Anchor Positioning contract
  used by Headless is available.
- **Fallback** when any required capability is missing.

Components do not select a runtime independently. A document must not mix
native and fallback overlay stacks.

## Component inventory

| Category | Components |
| --- | --- |
| Anchored popovers | Popover, TeachingPopover, InfoLabel, AvatarGroupPopover |
| Anchored selection surfaces | Menu, Dropdown, Combobox, TagPicker |
| Anchored hints | Tooltip |
| Non-anchored overlays | Dialog, Drawer, Toaster |

TeachingPopover, InfoLabel, and AvatarGroupPopover inherit the Popover
contract. Drawer inherits the Dialog contract. TagPicker participates in the
positioning runtime even when its rendered surface does not directly call the
Popover API.

## Native capability gate

Native mode requires all capabilities below in the target document's realm:

- `HTMLElement.prototype.showPopover`
- `HTMLElement.prototype.hidePopover`
- the `:popover-open` selector
- the `hint` popover value used by Tooltip
- `HTMLDialogElement.prototype.showModal`
- `anchor-name`
- `position-anchor`
- `position-area`
- `position-try-fallbacks`, including flip tactics
- `anchor-size()`

Partial support selects fallback mode. Detection must use the target document
and its default view rather than the module's global realm.

## Shared behavioral contract

| Contract | Native baseline | Fallback requirement |
| --- | --- | --- |
| Layering | Browser top layer | Render through the Fluent Portal associated with the target document |
| Open state | `showPopover()`, `hidePopover()`, or `showModal()` | Preserve the same controlled and uncontrolled React state |
| Light dismiss | `popover="auto"` | Match outside-click, Escape, iframe-focus, peer, and nested-overlay dismissal |
| Manual popovers | React controls `popover="manual"` | Do not add light-dismiss behavior that native mode does not have |
| Modal focus | Native dialog focus, inertness, and restoration | Match with Fluent focus-management utilities |
| Initial focus | Native dialog/popover focusing steps and `autofocus` | Honor the same author-selected target and timing |
| Focus restoration | Browser restoration where specified | Restore to the same trigger or previously focused element |
| Nested overlays | Native auto-popover and dialog stack | Preserve parent/child dismissal and modal suspension semantics |
| Hint behavior | Native `popover="hint"` | Preserve one-visible-tooltip and Escape behavior |
| Events | Native `toggle` mirrored into React | Emit the same `onOpenChange` or visibility callback once |
| ARIA | Existing roles, ids, relationships, and state attributes | Preserve the same observable DOM contract |

## Positioning contract

The public Headless positioning surface is the intersection supported by the
native implementation. The fallback must not enable additional
`@fluentui/react-positioning` behavior implicitly.

| Option or result | Native behavior | Fallback requirement |
| --- | --- | --- |
| `position` / `align` | Logical `position-area` mapping | Equivalent logical placement |
| Default strategy | `fixed` | Explicitly use `fixed` |
| Default collision chain | `flip-block`, `flip-inline`, then both | Generate the equivalent ordered placements |
| `fallbackPositions` | Try supplied position areas in order | Preserve supplied order |
| No fitting fallback | Browser retains its specified fallback result | Do not substitute Floating UI `bestFit` behavior |
| Shift | No separate shifting contract | Disable fallback-only shifting |
| `pinned` | No fallback attempts | Disable flip and shift |
| Numeric offset | Logical main-axis gap | Equivalent Floating UI offset |
| Object offset | Logical main- and cross-axis values | Equivalent normalized offset |
| Function offset | Resolves to zero because native layout rects are unavailable | Also resolve to zero |
| `matchTargetSize: "width"` | `anchor-size(width)` | Match target width |
| `coverTarget` | `position-area: center` plus self-alignment | Equivalent cover-target placement |
| Custom target | Element or virtual target | Equivalent target support |
| Imperative ref | `setTarget()` and `updatePosition()` | Delegate to the active backend without ref replacement |
| Arrow | CSS anchor placement | Floating UI arrow placement against the same arrow element |
| Resolved placement | Logical Headless `data-placement` | Convert physical Floating UI placement to the same logical value |
| RTL | Logical CSS behavior | Produce the same `data-placement` and visual side |

For example, the default fallback sequence for `above-start` is:

1. `below-start` (`flip-block`)
2. `above-end` (`flip-inline`)
3. `below-end` (`flip-block flip-inline`)

The same logical transforms apply to horizontal placements. For
`before-top`, the sequence is `before-bottom`, `after-top`, then
`after-bottom`.

## Runtime loading contract

- The first overlay mount in an unsupported document starts one shared dynamic
  import.
- Concurrent mounts reuse the same promise and runtime instance.
- Open state may change while loading. The requested surface appears when the
  runtime is ready without another interaction.
- A fallback surface must not briefly render at an unpositioned static
  location.
- A rejected import is an explicit runtime error. Components must not silently
  report an open state while rendering no usable surface.
- Server rendering must not access browser globals or choose a browser runtime.
- Runtime state and capability results are cached per document so iframes and
  alternate Fluent target documents remain isolated.

## Bundle contract

Native-capable consumers must not download fallback implementation code.

- Native entry chunks must exclude `@fluentui/react-positioning`,
  `@floating-ui/*`, and fallback-only Portal/focus modules.
- All Headless overlay entry points must reference one shared async fallback
  chunk.
- Both ESM and CommonJS package outputs must preserve an asynchronous load
  boundary.
- Type-only references to `@fluentui/react-positioning` are allowed.
- Runtime helpers such as positioning shorthand normalization must live in a
  native-safe module rather than statically importing the fallback package.

## Component-specific acceptance

### Popover and compositions

Click, keyboard, hover, context-menu, controlled, triggerless, modal, and
nested cases must preserve their current callbacks, focus behavior, and
logical placement.

### Menu

Fallback mode must preserve submenu chains, context targets, hover delay,
safe-zone behavior, item focus, and dismissal of the correct menu depth.

### Tooltip

Fallback mode must preserve show/hide delays, label and description
relationships, one-visible-tooltip coordination, Escape, hidden-reference
behavior, and arrow placement.

### Dropdown, Combobox, and TagPicker

Fallback mode must preserve active-descendant behavior, trigger focus,
outside-click dismissal, inline-popup behavior, target-width matching, and
logical placement.

### Dialog and Drawer

Modal, alert, and non-modal variants must preserve their distinct dismissal,
backdrop, scroll-lock, focus-trap, nested-dialog, and restoration behavior.
Non-modal fallback must not accidentally gain auto-popover light dismiss.

### Toaster

Fallback mode must portal populated position containers without changing toast
ordering, keyboard behavior, announcements, focus restoration, or position
styling contracts.

## Internal override

Tests and emergency rollout controls may force `native` or `fallback` before a
document's runtime is selected. The override is not a component prop or a
supported public API, and tests must reset it between cases.
