# @fluentui/react-carousel-preview Spec

## Background

Carousel enables users to wrap content in 'cards' that can then be paginated via previous/next or page index navigation buttons.

## Prior Art

_Include background research done for this component_

- [OpenUI Research - Carousel](https://open-ui.org/components/carousel.research/)
- [Fluent V9 - Task: Carousel](https://github.com/microsoft/fluentui/issues/26647)

## Sample Code

```jsx
<Carousel defaultValue="test-0">
  <CarouselCard value="test-0">
    <div>This is card: 1</div>
  </CarouselCard>

  <CarouselCard value="test-1">
    <div>This is card: 2</div>
  </CarouselCard>

  <CarouselCard value="test-3">
    <div>This is card: 3</div>
  </CarouselCard>

  <CarouselFooter showAutoplay>
    <CarouselNav>{() => <CarouselNavButton />}</CarouselNav>
  </CarouselFooter>
</Carousel>
```

## Variants

### Card Peeking

When peeking is enabled, the previous and next card will be partially displayed on either side of the current active card.

### Condensed Navigation

The CarouselFooter can be condensed, this will center all controls with minimal padding.

### Inline vs Composed Navigation

The CarouselFooter contains all navigation components in an inline horizontal container, however we have multiple valid layouts of the CarouselNavigation. If disconnected variants are required (such as prev/next buttons being overlaid in a different place than footer), then the individual navigation components can be placed within the Carousel wrapper in a variety of layouts.

## API

The core driver of the API will be context provided via the Carousel component, CarouselCards will register themselves via this context, and the Navigation components will subscribe to any updates that occur. The Carousel itself will only re-render on active index change.

Since the navigation has multiple valid layout formats, navigation components will be available individually to move around, or combined into slots via CarouselFooter within a single horizontal container.

Carousel provides callbacks on navigation changes, as well as the ability to drive pagination externally via a controlled index.

Users **must** provide a value on each carouselCard, and a defaultValue that the carousel will initiate on.

Motion can be enabled for next/previous button shift.

A gap prop will be provided to place spacing between cards.

## Behaviors

### Carousel

Carousel is the context wrapper and container for all carousel content/controls, it has no direct style or slot opinions. Carousel also provides API interfaces for callbacks that will occur on navigation events.

### CarouselAutoplayButton

If the carousel is on auto-play, the user may opt into pausing the auto-play feature via the CarouselAutoplayButton which must be present for auto-play to be enabled (if CarouselAutoplayButton present, auto-play will default to true on mount).

### CarouselButton

A default navigation button that will set value to the next/previous page, driven by it's type 'next' or 'previous'.

### CarouselCard

The defining wrapper of a carousel's indexed content, they will take up the full viewport of Carousel wrapper (with consideration for gap and peeking variants), users may place multiple items within this Card if desired, with consideration of viewport width.

Clickable actions within the content area are available via mouse and tab as expected, non-active index content will be set to inert until moved to active card.

### CarouselFooter

A unified navigation footer with all Carousel navigation components as slots, with the CarouselNav intended to be placed within the root children. The footer will have variant layouts that are condensed or extended, as well as options to null out slots if not required or placed externally.

### CarouselNav

Used to jump to a card based on index, using arrow navigation via Tabster. The children of this component will be wrapped in a context to provide the appropriate value based on their index position.

### CarouselNavButton

The child element of CarouselNav, a singular button that will set the carousels active index on click.

### CarouselNavImageButton

A variant child element of CarouselNav, a singular image button that displays a preview of card content and will set the carousels active index on click.

### Other

Interactive content is expected to be available in logical tab order within DOM, including when a user may place navigation components via absolute positioning (i.e. when overlaid on Carousel content).
