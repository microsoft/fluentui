# @fluentui/react-teaching-popover

**React Teaching Popover components for [Fluent UI React](https://react.fluentui.dev/)**

A Teaching Popover is a structured popover to showcase information about a new component feature to a user. It should be attached via a trigger to a button, info tip, or component - or for further extension, callout(s). TeachingPopover can also be displayed programmatically, in this case it's intent should be announced to the user on launch to define context for accessibility users.

For a simple feature, a single paged TeachingPopover can be used to display core information, while extensive reading can be linked via a 'Learn More' secondary action.

For more complicated features, we recommend using the TeachingPopoverCarousel, this will enable multiple steps of information with an associating title/image, and can guide the user through multi-step tutorials.

## Sample Code

```jsx
<TeachingPopover>
  <TeachingPopoverTrigger>
    <Button>TeachingPopover trigger</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
    <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
      <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
      <div>This is a teaching popover body</div>
    </TeachingPopoverBody>
    <TeachingPopoverFooter primary="Learn more" secondary="Got it" />
  </TeachingPopoverSurface>
</TeachingPopover>
```

## Opt-in CSS Modules composition

The `.styles.css` alternatives retain public cross-package style hooks, just like
Nav and Carousel: TeachingPopoverSurface calls `usePopoverSurfaceStyles_unstable`
from `@fluentui/react-popover`, and TeachingPopoverCarouselFooterButton calls
`useButtonStyles_unstable` from `@fluentui/react-button`. Do not replace these with
private deep imports or duplicate their base rules.

Opt-in resolver swaps must cover those base packages, including public re-exports,
as well as TeachingPopover, for both source `.styles` and built
`.styles.js` → `.styles.css.js` imports. Base modules are imported before derived
stylesheets. CSS Modules must be processed and CSS assets retained in the
`fluentui` layer. Swapping only TeachingPopover intentionally leaves Griffel base
hooks in the graph; unlayered Griffel rules can override layered CSS, so that
hybrid is not guaranteed to match the fully selected CSS implementation.

Surface preserves its local-class-before-base-hook call order and returns the
base hook's result, including arrow styling. With both alternatives selected, its
later stylesheet supplies padding, radius, minimum width, and box sizing while
Popover supplies appearance, typography, and positioning-arrow styles.
FooterButton calls Button first, merges its returned state, and then adds its
local root and brand navigation classes with caller classes last. Button still
supplies sizing, icon, disabled, focus, and interaction styles. Class-list order
does not determine CSS precedence: its brand hover/active colors and inherited
forced-colors/focus rules need browser cascade verification before claiming
parity. Hook tests verify composition, not computed-style or VRT parity.

## Sample Code - Carousel

```jsx
<TeachingPopover>
  <TeachingPopoverTrigger>
    <Button>TeachingPopover trigger</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
    <TeachingPopoverCarousel defaultValue="test-0">
      <TeachingPopoverCarouselCard value="test-0">
        <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
          <div>This is page: 1</div>
        </TeachingPopoverBody>
      </TeachingPopoverCarouselCard>

      <TeachingPopoverCarouselCard value="test-1">
        <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
          <div>This is page: 2</div>
        </TeachingPopoverBody>
      </TeachingPopoverCarouselCard>

      <TeachingPopoverCarouselCard value="test-3">
        <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
          <div>This is page: 3</div>
        </TeachingPopoverBody>
      </TeachingPopoverCarouselCard>

      <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
        <TeachingPopoverCarouselNav>{() => <TeachingPopoverCarouselNavButton />}</TeachingPopoverCarouselNav>
      </TeachingPopoverCarouselFooter>
    </TeachingPopoverCarousel>
  </TeachingPopoverSurface>
</TeachingPopover>
```
