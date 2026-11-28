`Carousel` presents peer content in fixed groups of one to four slides. Give the region a descriptive
collection name with `aria-label`, like "Upcoming meetings", rather than "Carousel".

## Composition

Import from `@fluentui/react-headless-components-preview/carousel` and compose the parts in reading order:

```tsx
<Carousel aria-label="Upcoming workshops" groupSize={2}>
  <CarouselAutoplayButton />
  <CarouselPrevious button={{ icon: <ChevronLeftRegular /> }} />
  <CarouselViewport>
    <CarouselCard>Keyboard navigation</CarouselCard>
    <CarouselCard>Semantic HTML</CarouselCard>
    <CarouselCard>Responsive layouts</CarouselCard>
  </CarouselViewport>
  <CarouselNext button={{ icon: <ChevronRightRegular /> }} />
  <CarouselNav>
    <CarouselNavButton />
  </CarouselNav>
</Carousel>
```

Compose one viewport and at most one of each control. Parts register with `Carousel`, so:

- Omit `CarouselPrevious`/`CarouselNext` to hide the Previous/Next buttons, or `CarouselNav` to hide the page
  tabs.
- Paging needs operable controls that reach every group: a complete `CarouselNav`, both `CarouselPrevious` and `CarouselNext`, or
  one arrow in a `circular` collection. Otherwise (a lone non-circular arrow, no controls, or fewer than two
  groups) every slide stays visible as a static collection, and the server render matches it before parts
  register.
- A native `hidden` or `inert` on the nav, an arrow wrapper or its `button` removes that route. Arrows and tabs
  disabled by a surrounding `fieldset` do not count either; controls in its first `legend` remain operable
  unless another fieldset disables them. Use props or conditional rendering rather than hiding the only route with CSS.
- `CarouselAutoplayButton` enables user-started autoplay. Render it first so it is the first focus stop.
  Hiding, removing or disabling the playback control stops its session. Restoring it does not restart playback.
  `disabled` retains native button disabling; `disabledFocusable` keeps an unavailable control focusable.

Each direct child of `CarouselViewport` is one slide; wrap content in `CarouselCard`, which is a focus stop
labeled "Slide 1 of 5". Embedded actions stay directly tabbable. With a nav, a tab panel whose slides offer no
focus stop of their own (plain content without `CarouselCard` or tabbable elements) becomes a focus stop itself,
so keyboard users can reach it; the server render adds this after hydration. Controls that are disabled (including
by a surrounding `fieldset`), `display: none`, `visibility: hidden` or inside a closed `<details>` don't count.
This is rechecked when slide content, an ancestor's `class`/`style`, a surrounding `fieldset` or the window size
changes; other stylesheet changes are not observed.

Slides are grouped by position. Changing `groupSize`, or adding, removing or reordering slides, can move a
slide into a different group, which remounts it, so keep slide state (form values, playback position) outside
the slide. Keep `groupSize` fixed and stack cards at narrow widths with CSS rather than regrouping.

`CarouselNav` renders one item per group, defaulting to `<CarouselNavButton />`. Each template or render
function must supply exactly one wired, visible, enabled `CarouselNavButton` (or its hook and renderer)
per group. If any tab is missing, hidden, inert or disabled, the _whole_ tablist is unavailable: there are no partial
roving tablists or panels labeled by unavailable tabs. Operable arrows can still enable paging.
If a tab requests `autoFocus`, a complete nav honors it on mount. Restoring an incomplete or hidden nav
does not move focus back to that tab. If the nav owns focus when it becomes incomplete or unavailable (hidden, inert,
disabled or a single group), including a focused tab that becomes disabled or hidden, focus moves into the selected
group. If the focused tab is removed while the nav stays complete, focus moves to the selected tab. Focus elsewhere
is left alone. The nav's own `onFocus`/`onBlur` run only while the tablist is available.

`CarouselPrevious` and `CarouselNext` have `root` (layout wrapper) and `button` (headless Button) slots. The
button is named "Previous" or "Next" through `aria-label`; localize it with `button={{ 'aria-label': 'Précédent' }}`
(or `aria-labelledby`). There is no built-in tooltip, so the carousel doesn't pay for one you don't use. To add one,
wrap the button in a headless `Tooltip` from the slot render function, as the examples do. The button's own
`aria-label` wins over a tooltip's label, so show `props['aria-label']` as the content with
`relationship="inaccessible"`; the name and the tooltip then stay in sync. While a transition runs at a boundary the
arrow stays focusable with `disabledFocusable`, which the callback can read to keep the tooltip closed.
Supply your own chevron icons and mirror them in RTL. Use semantic `dir="rtl"` on the carousel or an ancestor so the
example's `:dir(rtl)` icons agree with keyboard and motion direction.
If you wrap the arrow with a slot render function, forward the supplied props and ref to its component.
Carousel checks the fieldsets that contain the current native button, even when a slot replaces that element.
When it needs to keep checking, the entire custom arrow stays mounted in a layout-free wrapper. The wrapper
is hidden and inert in static mode and at a settled boundary. At that boundary an empty `[data-carousel-button]`
keeps the root's layout class and style. Use that descendant selector for positioning; a mounted ref alone
does not mean the arrow is visible. If anything in the staged callback result, such as a sibling help button,
owns focus when it is hidden, focus moves into the selected group.

`display: contents` removes a layout box, not the DOM parent. The owner of a disabled `fieldset` must render
its first `legend` as a direct child to exempt controls inside it. Put the entire `CarouselPrevious` or
`CarouselNext` inside that legend. A legend returned as a sibling of the forwarded root is not a direct child
of the enclosing fieldset. A fieldset rendered inside the slot can have its own direct first legend.

## Selection and keyboard

`groupSize` defaults to 1. `activeIndex` and `defaultActiveIndex` are zero-based **group** indices;
`onActiveIndexChange(event, data)` reports `index` and the `reason` (`previous`, `next`, `nav` or
`autoplay`) for a requested change.
In controlled mode a request only changes the selection once the owner passes the new `activeIndex`. If the
owner declines a request, the selection stays where it is; nav keys still move focus from the focused tab, so
the next key continues from there, and autoplay keeps requesting the next group at each interval.

Previous and Next navigate sequentially. Tabs jump to groups and support RTL-aware Left/Right,
Home and End with automatic activation and roving tabindex. Left/Right follow `dir` on `Carousel`,
else the carousel's computed direction. The headless `Provider` doesn't write `dir` to the DOM, so set
it on an ancestor element for RTL. Embedded controls keep their native keyboard behavior. Boundary arrows
hide only after the transition settles, then move focus to the first visible slide (or the group's first
tabbable element, or the group itself, for slides without `CarouselCard`); otherwise focus stays on the activating
control. When controls make a static collection paged, focus moves into the selected group only if the
previously focused content would be hidden. When the selection changes while focus is in the outgoing group,
including focus the browser already dropped from it, focus moves to the incoming group. This layout change does not
animate. `circular` defaults to
false and enables directional wrapping with both arrows always available.

## Autoplay and motion

`CarouselAutoplayButton` never starts rotation by itself. `autoplayInterval` on `Carousel` defaults to 4000ms;
non-integers or values outside 1000–2147483647 throw. Pause, manual navigation, or interaction outside
playback stops rotation. Hover temporarily suspends it, including while the pointer is over Pause, until the
pointer leaves the carousel; document visibility and viewport intersection
suspend its timer. These exemptions apply only to the carousel's own controls, identified by the element its
forwarded ref receives: a carousel nested in a slide is content of the outer carousel, so hovering its Play/Pause or
arrows suspends the outer rotation and focusing or activating them stops it. Resuming a suspended session always waits a fresh interval. Non-circular playback stops
once the selection reaches the final group; Play there requests the first group immediately. In controlled
mode it retries that restart once per eligible interval until accepted or stopped. Localize `playLabel` and
`pauseLabel` on `CarouselAutoplayButton`, and `getPageLabel`/`getSlideLabel` on `Carousel`.

The carousel does not read `prefers-reduced-motion`. Whether autoplay is offered with reduced motion is the
wrapper's call: render `CarouselAutoplayButton` conditionally, or not at all.

Page changes are animated with CSS. While one runs, the viewport has `data-transitioning` and
`data-direction` (`next` or `previous`; flip it with `:dir(rtl)` for right-to-left layouts), the new group has
`data-incoming` and the old group `data-outgoing`; style the old group visible while it is outgoing. Put the
enter and exit keyframe animations on the `[data-carousel-page]` elements themselves: animations of the slides
inside them are not tracked. Inactive groups are `hidden`, so use `animation` rather than `transition`.

Once the change renders, the carousel reads `getAnimations()` on both page elements. Running animations with a
finite end time and nonzero playback rate delay settlement: hiding the old group, focus recovery, live
announcements (`aria-busy`) and the next autoplay interval. Animations started with `element.animate()` count
too, if they exist by then. With no such animations (none styled, or removed under
`@media (prefers-reduced-motion: reduce)`) the change is immediate. Pausing a tracked animation indefinitely keeps
the carousel busy. The example animates transform and opacity with consumer-owned CSS variables; the headless
library has no bundled motion values or styling.

## Styling hooks

- `Carousel` root: `data-paged`, `data-playing`, `data-circular`.
- `CarouselViewport`: `data-group-size` (1–4), plus `data-paged`, `data-buttons`, `data-nav` and
  `data-transitioning`, with `data-direction` while transitioning. Its generated groups are `[data-carousel-page]`
  (with `data-active`, and `data-incoming` or `data-outgoing` while transitioning)
  containing `[data-carousel-slides]`.
- `CarouselPrevious`/`CarouselNext` root: `data-carousel-button` (`previous` or `next`). At a boundary it stays
  in layout but is `hidden` and `inert`; style it with `visibility: hidden` so the viewport doesn't shift.
- `CarouselNavButton`: `data-selected`. Elongate its `indicator` when selected.

The example CSS reserves both Previous/Next slots and layers groups in one grid cell, so the tallest group sets
the viewport height. Inactive groups have `hidden`, `inert` and `aria-hidden`; the CSS keeps their layout
contribution with `visibility: hidden`. At container widths of 320px or less the cards stack within the
current group.

This fixed-group preview is maintained separately from the styled Embla Carousel; it does not share the
styled component's automatic grouping, dragging or event contract. Alternative pagination formats are outside this preview.
