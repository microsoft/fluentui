# @fluentui/react-carousel Spec

## Background

Carousel enables users to wrap content in 'cards' that can then be paginated via previous/next or page index navigation buttons.

## Prior Art

_Include background research done for this component_

- [OpenUI Research - Carousel](https://open-ui.org/components/carousel.research/)
- [Fluent V9 - Task: Carousel](https://github.com/microsoft/fluentui/issues/26647)

## Sample Code

```jsx
  <Carousel>
    <CarouselSlider>
      {Cards.map((_cardProps, index) => (
        <CarouselCard>
          Card {index + 1}
        </BannerCard>
      ))}
    </CarouselSlider>
    <CarouselNavContainer>
      <CarouselNav>{index => <CarouselNavButton/>}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
```

## Variants

### Card Peeking

Cards will peek by default when the cardWidth is less than 100% of the viewport width.

### Condensed Navigation

The CarouselNavContainer can be condensed, this will center all controls with minimal padding.

### Inline vs Composed Navigation

The CarouselNavContainer provides multiple valid layouts of the CarouselNavigation. If alternative variants are required, then the individual navigation components can be placed within the Carousel wrapper in any layouts.

## API

The core driver of the API will be context and event callbacks provided via the Carousel component, CarouselCards will register themselves via this wrapper, and the Navigation components will subscribe to any updates that occur. The Carousel itself will only re-render cards that had an active index change.

Carousel provides callbacks on navigation changes, as well as the ability to drive pagination externally via a controlled index.

## Behaviors

### Carousel

Carousel is the context wrapper and container for all carousel content/controls, it has no direct style or slot opinions. Carousel also provides API interfaces for callbacks that will occur on navigation events.

### CarouselAutoplayButton

If the carousel is on auto-play, the user may opt into pausing the auto-play feature via the CarouselAutoplayButton which must be present for auto-play to be enabled, this value can be controlled via interaction or the CarouselAutoplayButton props.

### CarouselButton

A default navigation button that will set value to the next/previous page, driven by it's navType of 'next' or 'previous'.

### CarouselCard

The defining wrapper of a carousel's indexed content, they can be set to a responsive sizing via autoSize prop, or controlled via CSS.

Clickable actions within the content area are available via mouse and tab as expected, non-active index content will be set to inert until moved to active card. Be sure to set 'cardFocus' on the slider if multiple cards are present at once (not 100% width).

### CarouselSlider

The container for animating and positioning the carousel cards, it should wrap all carousel cards to prevent the controls from affecting layout and responsiveness of card sizing.
It is intended to set the 'cardFocus' prop to true if cards are not set to 100% viewport width.

### CarouselNavContainer

A unified navigation footer with all Carousel navigation components as slots, with the CarouselNav intended to be placed within the root children. It contains variant layouts that are condensed or extended, the nav components can also be used independently.

### CarouselNav

Enables jumping directly to a card based on index and implements arrow navigation via Tabster. The children of this component will automatically be wrapped in a context to provide the appropriate value based on their index position.

### CarouselNavButton

The child element of CarouselNav, a singular button that will set the carousels active index on click.

### CarouselNavImageButton

A variant child element of CarouselNav, a singular image button that displays a preview of card content and will set the carousels active index on click.

### Other

Interactive content is expected to be available in logical tab order within DOM, including when a user may place navigation components via absolute positioning (i.e. when overlaid on Carousel content).
