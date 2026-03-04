# TeachingBubble / Coachmark → TeachingPopover Migration

Both v8 components map to v9 `TeachingPopover`. It uses the same composable trigger/surface pattern as `Popover`.

## Component Renames

| v8               | v9                |
| ---------------- | ----------------- |
| `TeachingBubble` | `TeachingPopover` |
| `Coachmark`      | `TeachingPopover` |

## Component Structure (v9)

```
<TeachingPopover>
  <TeachingPopoverTrigger>   — the element that opens it
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>  — title + close button
    <TeachingPopoverBody>    — content + optional media slot
    <TeachingPopoverFooter>  — action buttons
    <TeachingPopoverCarousel> — optional multi-step carousel
```

## Prop Mapping — TeachingBubble → TeachingPopover

| v8 `ITeachingBubbleProps`      | v9 equivalent                                                | Notes                                                                                                          |
| ------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `headline`                     | `<TeachingPopoverHeader>` children                           |                                                                                                                |
| `primaryButtonProps`           | `<Button>` in `<TeachingPopoverFooter>`                      |                                                                                                                |
| `secondaryButtonProps`         | `<Button>` in `<TeachingPopoverFooter>`                      |                                                                                                                |
| `illustrationImage`            | `media` slot on `<TeachingPopoverBody>`                      |                                                                                                                |
| `hasCloseButton`               | `<TeachingPopoverHeader>` includes a close button by default |                                                                                                                |
| `footerContent`                | `<TeachingPopoverFooter>` children                           |                                                                                                                |
| `onDismiss`                    | `onOpenChange` on `<TeachingPopover>`                        | `(_, data) => !data.open`                                                                                      |
| `calloutProps.target`          | `<TeachingPopoverTrigger>` wrapping target                   | Or `positioning` prop on `<TeachingPopover>`                                                                   |
| `calloutProps.directionalHint` | `positioning` on `<TeachingPopover>`                         | See [Positioning docs](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--docs) |
| `styles`                       | `className` on sub-components                                |                                                                                                                |
| `theme`                        | —                                                            | Use `FluentProvider`                                                                                           |

## Before / After

```tsx
// v8 — TeachingBubble
import { TeachingBubble } from '@fluentui/react';
<TeachingBubble
  target="#my-button"
  headline="Discover this feature"
  primaryButtonProps={{ text: 'Next', onClick: handleNext }}
  secondaryButtonProps={{ text: 'Dismiss', onClick: handleDismiss }}
  onDismiss={handleDismiss}
>
  Here's how to use this new feature.
</TeachingBubble>;

// v9 — TeachingPopover
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  Button,
} from '@fluentui/react-components';

<TeachingPopover>
  <TeachingPopoverTrigger disableButtonEnhancement>
    <Button id="my-button">Feature</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverHeader>Discover this feature</TeachingPopoverHeader>
    <TeachingPopoverBody>Here's how to use this new feature.</TeachingPopoverBody>
    <TeachingPopoverFooter>
      <Button appearance="primary" onClick={handleNext}>
        Next
      </Button>
      <Button onClick={handleDismiss}>Dismiss</Button>
    </TeachingPopoverFooter>
  </TeachingPopoverSurface>
</TeachingPopover>;
```

## Multi-Step (Carousel)

For multi-step teaching flows (replaces v8 paginated `TeachingBubble`):

```tsx
import {
  TeachingPopover,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  // ...other imports
} from '@fluentui/react-components';

<TeachingPopover>
  <TeachingPopoverTrigger disableButtonEnhancement>
    <Button>Start tour</Button>
  </TeachingPopoverTrigger>
  <TeachingPopoverSurface>
    <TeachingPopoverCarousel onFinish={handleFinish}>
      <TeachingPopoverCarouselCard value="step1">
        <TeachingPopoverHeader>Step 1</TeachingPopoverHeader>
        <TeachingPopoverBody>First step content.</TeachingPopoverBody>
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="step2">
        <TeachingPopoverHeader>Step 2</TeachingPopoverHeader>
        <TeachingPopoverBody>Second step content.</TeachingPopoverBody>
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselNav>
        {value => <TeachingPopoverCarouselNavButton value={value} />}
      </TeachingPopoverCarouselNav>
    </TeachingPopoverCarousel>
  </TeachingPopoverSurface>
</TeachingPopover>;
```
