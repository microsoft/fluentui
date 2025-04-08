# @fluentui/react-carousel

**React Carousel components for [Fluent UI React](https://react.fluentui.dev/)**

A Carousel is a sliding viewport that enables a list of tab panels to be hidden offscreen while still remaining accessible via rotating controls or keyboard interactions.

For full screen banners, hidden cards will be set to inert and can be accessed via the underlying nav controls (prev/next/pagination), while smaller responsive CarouselCards can be explored with keyboard navigation (left/right arrow keys) and group focus (Enter/Esc) to void lengthy tabIndex sequences.

The React Carousel uses direct DOM manipulation to ensure that state can be updated without driving a react render cycle of the CarouselCards themselves, users may subscribe to visibility event callbacks or activeIndex supplied via context for updating local state on carousel movement.

A CarouselAnnouncer class is provided that will announce page changes when context is updated for accessibility users.

## Sample Code

```jsx
<Carousel groupSize={1} circular>
  <CarouselSlider>
    {Cards.map((card, index) => (
      <CarouselCard key={`image-${index}`} index={index}>
        Card {index + 1}
      </CarouselCard>
    ))}
  </CarouselSlider>
  <CarouselNavContainer next={{ 'aria-label': 'go to next' }} prev={{ 'aria-label': 'go to prev' }}>
    <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
  </CarouselNavContainer>
  <CarouselAnnouncer>
    {(currentIndex, totalSlides, _slideGroupList) => {
      return `Slide ${currentIndex + 1} of ${totalSlides}`;
    }}
  </CarouselAnnouncer>
</Carousel>
```
