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
