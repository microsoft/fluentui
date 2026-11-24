`Carousel` presents peer content in fixed groups of one to four slides. Give the region a descriptive
collection name with `aria-label`, like "Upcoming meetings", rather than "Carousel".

## Composition

Import from `@fluentui/react-headless-components-preview/carousel` and compose the parts in reading order:

```tsx
<Carousel aria-label="Upcoming workshops" groupSize={2}>
  <CarouselAutoplayButton />
  <CarouselPrevious button={{ icon: <ChevronLeftRegular /> }} />
  <CarouselViewport>
    <CarouselCard>…</CarouselCard>
    <CarouselCard>…</CarouselCard>
  </CarouselViewport>
  <CarouselNext button={{ icon: <ChevronRightRegular /> }} />
  <CarouselNav>
    <CarouselNavButton />
  </CarouselNav>
</Carousel>
```

Rendering a part enables it. Parts register with `Carousel`, so:

- Omit `CarouselPrevious`/`CarouselNext` to hide the Previous/Next buttons, or `CarouselNav` to hide the page
  tabs.
- With neither rendered, or with fewer than two groups, every slide stays visible as a static collection,
  and the server render matches it before parts register.
- `CarouselAutoplayButton` enables user-started autoplay. Render it first so it is the first focus stop.

Each direct child of `CarouselViewport` is one slide; wrap content in `CarouselCard`, which is a focus stop
labeled "Slide 1 of 5". Embedded actions stay directly tabbable.

`CarouselNav` renders one item per group, defaulting to `<CarouselNavButton />`. Pass a template element, or a
render function like `{index => <CarouselNavButton />}` as in `@fluentui/react-carousel`.

`CarouselPrevious` and `CarouselNext` have `root` (layout wrapper), `button` (headless Button) and `tooltip`
(headless Tooltip content) slots. The tooltip text names the button through `aria-labelledby`; localize it
with `tooltip="Précédent"`. Supply your own chevron icons and mirror them in RTL.

## Selection and keyboard

`groupSize` defaults to 1. `activeIndex` and `defaultActiveIndex` are zero-based **group** indices;
`onActiveIndexChange(event, data)` reports `index` and the `reason` (`previous`, `next`, `nav` or
`autoplay`) for a requested change.
Controlled owners must accept a request to change the selection.

Previous and Next navigate sequentially. Tabs jump to groups and support RTL-aware Left/Right,
Home and End with automatic activation and roving tabindex. Embedded controls keep their native
keyboard behavior. Boundary arrows hide only after the transition settles, then move focus to the
first visible slide; otherwise focus stays on the activating control. `circular` defaults to false
and enables directional wrapping with both arrows always available.

## Autoplay and motion

`CarouselAutoplayButton` never starts rotation by itself. `autoplayInterval` on `Carousel` defaults to 4000ms;
non-integers or values outside 1000–2147483647 throw. Pause, manual navigation, or interaction outside
playback stops rotation. Hover temporarily suspends it; document visibility and viewport intersection
suspend its timer. Resuming a suspended session always waits a fresh interval. Non-circular playback stops
at the final group; Play there restarts from the first group. Localize `playLabel`, `pauseLabel` and
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

Swipe/drag and alternative pagination formats are outside the current spec.
