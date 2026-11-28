`Carousel` shows peer content in groups of one to four slides. Name the collection with `aria-label`, like
"Upcoming workshops", rather than "Carousel".

## Usage

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

- Each child of `CarouselViewport` is one slide. Wrap it in `CarouselCard` so keyboard users can reach it.
- Render only the controls you need. The carousel pages when its controls can reach every group: `CarouselNav`,
  both arrows, or one arrow with `circular`. Otherwise every slide stays visible, which is also what the server
  renders.
- `CarouselAutoplayButton` is optional. Render it first so it's the first focus stop.

## Selection

- `groupSize` (1–4, default 1) sets how many slides show at once. Keep it fixed and stack cards with CSS at
  narrow widths; regrouping remounts slides, so keep slide state outside them.
- `activeIndex` / `defaultActiveIndex` are zero-based **group** indices. `onActiveIndexChange` reports the
  `index` and the `reason` (`previous`, `next`, `nav` or `autoplay`).
- `circular` wraps navigation in both directions.
- The nav is a tablist: Left/Right, Home and End move between groups. Set `dir="rtl"` on the carousel or an
  ancestor for right-to-left layouts.

## Previous and Next

The arrows are named "Previous" and "Next". Localize them with `button={{ 'aria-label': 'Précédent' }}`, and
supply your own chevron icons, mirrored in RTL. At the first or last group (unless `circular`) the arrow is
hidden.

To add a tooltip, wrap the button through the slot render function and show its name:

```tsx
const withTooltip: SlotRenderFunction<React.ComponentPropsWithRef<'button'>> = (Component, props) => (
  <Tooltip relationship="inaccessible" content={props['aria-label']}>
    <Component {...props} />
  </Tooltip>
);

<CarouselNext button={{ icon: <ChevronRightRegular />, children: withTooltip }} />;
```

The render function receives `disabledFocusable` while the arrow is unavailable, including while it's hidden at
the first or last group. Keep the tooltip closed then; the examples do this with a controlled `visible`.

## Autoplay

Rotation starts only when the user presses Play. It pauses on hover and while the carousel is off-screen or the
tab is hidden, and stops on manual navigation. `autoplayInterval` defaults to 4000ms. To respect reduced motion,
don't render `CarouselAutoplayButton` when the user prefers it.

## Animation

Animate page changes in CSS with keyframe `animation` on `[data-carousel-page]`. While a change runs, the viewport
has `data-direction` (`next` or `previous`), the new page `data-incoming` and the old page `data-outgoing`; keep
the outgoing page visible until its animation ends. The carousel waits for these animations before moving focus,
so remove them under `prefers-reduced-motion` to make changes instant. Without animations, pages switch
immediately.

## Styling hooks

- `Carousel`: `data-paged`, `data-playing`, `data-circular`.
- `CarouselViewport`: `data-group-size`, `data-paged`, `data-buttons`, `data-nav`, `data-transitioning`,
  `data-direction`. Pages are `[data-carousel-page]` with `data-active`, `data-incoming` or `data-outgoing`.
- `CarouselPrevious` / `CarouselNext`: `[data-carousel-button="previous|next"]`; style its `hidden` state with
  `visibility: hidden` so the viewport doesn't shift.
- `CarouselNavButton`: `data-selected`.

## Localization

Use `playLabel` / `pauseLabel` on `CarouselAutoplayButton`, and `getPageLabel` / `getSlideLabel` on `Carousel`.

This preview groups slides at fixed sizes. Unlike the styled `Carousel`, it has no dragging or automatic
grouping.
