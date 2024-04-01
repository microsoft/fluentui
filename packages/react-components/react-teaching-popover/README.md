# @fluentui/react-teaching-popover

**React Teaching Popover components for [Fluent UI React](https://react.fluentui.dev/)**

A Teaching Popover is a structured popover to showcase information about a new component feature to a user. It should be attached via a trigger to a button, info tip, or component - or for further extension, callout(s). TeachingPopover can also be displayed programmatically, in this case it's intent should be announced to the user on launch to define context for accessibility users.

For a simple feature, a single paged TeachingPopover can be used to display core information, while extensive reading can be linked via a 'Learn More' secondary action.

For more complicated features, we recommend using the TeachingPopoverCarousel, this will enable multiple steps of information with an associating title/image, and can guide the user through multi-step tutorials.

## Sample Code

```jsx
<TeachingPopover withArrow={true} {...props}>
  <TeachingPopoverTrigger>
    <Button>TeachingPopover trigger</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
    <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
      <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
      {ExampleContent(1)}
    </TeachingPopoverBody>
    <TeachingPopoverFooter strings={{ primary: 'Learn more', secondary: 'Got it' }} />
  </TeachingPopoverSurface>
</TeachingPopover>
```

## Sample Code - Carousel

```jsx
<TeachingPopover withArrow={true} {...props}>
  <TeachingPopoverTrigger>
    <Button>TeachingPopover trigger</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>{'Tips'}</TeachingPopoverHeader>
    <TeachingPopoverCarousel
      strings={{
        next: 'Next',
        previous: 'Previous',
        initialStepText: 'Close',
        finalStepText: 'Finish',
      }}
    >
      {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
      <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
        <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
        {ExampleContent(1)}
      </TeachingPopoverBody>

      {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
      <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
        <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
        {ExampleContent(2)}
      </TeachingPopoverBody>

      {/* Multiple TeachingPopoverBody will be wrapped by a 'TeachingPopoverCarousel'*/}
      <TeachingPopoverBody media={<Image alt={'test image'} fit={'cover'} src={SwapImage} />}>
        <TeachingPopoverTitle>{'Teaching Bubble Title'}</TeachingPopoverTitle>
        {ExampleContent(3)}
      </TeachingPopoverBody>
    </TeachingPopoverCarousel>
  </TeachingPopoverSurface>
</TeachingPopover>
```
