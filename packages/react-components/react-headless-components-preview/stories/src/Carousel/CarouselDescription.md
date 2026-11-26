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
- A native `hidden` on the nav, an arrow wrapper or its `button` removes that route. Disabled arrows
  do not count. Use props or conditional rendering rather than visually hiding the only route with CSS.
- `CarouselAutoplayButton` enables user-started autoplay. Render it first so it is the first focus stop.
  Hiding, removing or disabling the playback control stops its session. Restoring it does not restart playback.
  `disabled` retains native button disabling; `disabledFocusable` keeps an unavailable control focusable.

Each direct child of `CarouselViewport` is one slide; wrap content in `CarouselCard`, which is a focus stop
labeled "Slide 1 of 5". Embedded actions stay directly tabbable.

Slides are grouped by position. Changing `groupSize`, or adding, removing or reordering slides, can move a
slide into a different group, which remounts it, so keep slide state (form values, playback position) outside
the slide. Keep `groupSize` fixed and stack cards at narrow widths with CSS rather than regrouping.

`CarouselNav` renders one item per group, defaulting to `<CarouselNavButton />`. Each template or render
function must supply exactly one wired, visible, enabled `CarouselNavButton` (or its hook and renderer)
per group. If any tab is missing, hidden or disabled, the _whole_ tablist is hidden: there are no partial
roving tablists or panels labeled by unavailable tabs. Operable arrows can still enable paging.

`CarouselPrevious` and `CarouselNext` have `root` (layout wrapper), `button` (headless Button) and `tooltip`
(headless Tooltip content) slots. The tooltip text names the button through `aria-labelledby`; localize it
with `tooltip="Précédent"`. Supply your own chevron icons and mirror them in RTL. Use semantic `dir="rtl"`
on the carousel or an ancestor so the example's `:dir(rtl)` icons agree with keyboard and motion direction.

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
control. `circular` defaults to false and enables directional wrapping with both arrows always available.

## Autoplay and motion

`CarouselAutoplayButton` never starts rotation by itself. `autoplayInterval` on `Carousel` defaults to 4000ms;
non-integers or values outside 1000–2147483647 throw. Pause, manual navigation, or interaction outside
playback stops rotation. Hover temporarily suspends it; document visibility and viewport intersection
suspend its timer. Resuming a suspended session always waits a fresh interval. Non-circular playback stops
once the selection reaches the final group; Play there requests the first group immediately. In controlled
mode it retries that restart once per eligible interval until accepted or stopped. Localize `playLabel`, `pauseLabel` and
`reducedMotionLabel` on `CarouselAutoplayButton`, and `getPageLabel`/`getSlideLabel` on `Carousel`.

Reduced motion settles animation immediately and disables playback without removing its focus stop.
Clearing the preference does not restart playback.

The optional `transition` adapter on `Carousel` returns native `Animation` objects for the incoming and
outgoing groups. The component cancels interrupted animations, waits for completion, defers live
announcements with `aria-busy`, and handles focus, reduced motion, document visibility and unmount cleanup.
The example adapter uses transform and opacity with consumer-owned CSS variables; the headless library has no
bundled motion values or styling. Without an adapter, changes are immediate.

## Styling hooks

- `Carousel` root: `data-paged`, `data-playing`, `data-circular`.
- `CarouselViewport`: `data-group-size` (1–4), plus `data-paged`, `data-buttons`, `data-nav` and
  `data-transitioning`. Its generated groups are `[data-carousel-page]` (with `data-active` or `data-outgoing`)
  containing `[data-carousel-slides]`.
- `CarouselPrevious`/`CarouselNext` root: `data-carousel-button` (`previous` or `next`). At a boundary it stays
  in layout but is `hidden` and `inert`; style it with `visibility: hidden` so the viewport doesn't shift.
- `CarouselNavButton`: `data-selected`. Elongate its `indicator` when selected.

The example CSS reserves both Previous/Next slots and layers groups in one grid cell, so the tallest group sets
the viewport height. Inactive groups have `hidden`, `inert` and `aria-hidden`; the CSS keeps their layout
contribution with `visibility: hidden`. At container widths of 320px or less the cards stack within the
current group. Host layouts must reserve outer clearance for the Previous/Next tooltips.

This fixed-group preview is maintained separately from the styled Embla Carousel; it does not share the
styled component's automatic grouping, dragging or event contract. Alternative pagination formats are outside this preview.
