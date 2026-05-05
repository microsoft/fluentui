# Components/TeachingPopover

## Subcomponents

### TeachingPopoverBody

Define a styled TeachingPopoverBody, using the `useTeachingPopoverBody_unstable` and `useTeachingPopoverBodyStyles_unstable`
hooks.

TeachingPopoverBody is used to host content within a TeachingPopover, and provides a standardized media slot

#### Props

| Name          | Type                                                                                                                                         | Required | Default | Description |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ----------------------- |
| `media`       | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |             | Optional Media Content. |
| `as`          | `"div"`                                                                                                                                      | No       |         |             |
| `mediaLength` | `"medium" "short" "tall"`                                                                                                                    | No       |         |             |
| `ref`         | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |             |

### TeachingPopoverCarousel

Define a styled TeachingPopoverCarousel, using the `useTeachingPopoverCarousel_unstable` and `useTeachingPopoverCarouselStyles_unstable`
hooks.

TeachingPopoverCarousel injects context providers that are required for TeachingPopoverCarouselCard display and navigation functionality

#### Props

| Name            | Type                                    | Required | Default | Description                                                                                               |
| --------------- | --------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `as`            | `"div"`                                 | No       |         |                                                                                                           |
| `announcement`  | `((newValue: string) => string)`        | No       |         | Localizes the string used to announce carousel page changes to screen reader users Defaults to: undefined |
| `value`         | `string`                                | No       |         | The value of the currently active page.                                                                   |
| `onValueChange` | `EventHandler<CarouselValueChangeData>` | No       |         | Callback to notify a page change.                                                                         |
| `onFinish`      | `EventHandler<CarouselValueChangeData>` | No       |         | Callback to notify when the final button step of a carousel has been activated.                           |
| `ref`           | `Ref<HTMLDivElement>`                   | No       |         |                                                                                                           |

### TeachingPopoverCarouselCard

Define a styled TeachingPopoverCarouselCard, using the `useTeachingPopoverCarouselCard_unstable` and `useTeachingPopoverCarouselCardStyles_unstable`
hooks.

TeachingPopoverCarouselCard is the definition of a single page view within the carousel, they are shown one at a time and can be navigated through sequentially.

#### Props

| Name    | Type                  | Required | Default | Description                                                                            |
| ------- | --------------------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `as`    | `"div"`               | No       |         |                                                                                        |
| `value` | `string`              | Yes      |         | The value used to identify a page, it should be unique and is necessary for pagination |
| `ref`   | `Ref<HTMLDivElement>` | No       |         |                                                                                        |

### TeachingPopoverCarouselFooter

Define a styled TeachingPopoverCarouselFooter, using the `useTeachingPopoverCarouselFooter_unstable` and `useTeachingPopoverCarouselFooterStyles_unstable`
hooks.

TeachingPopoverCarouselFooter contains previous/next buttons configured for carousel navigation, and a root slot for page count and/or page index navigation.

#### Props

| Name              | Type                                                                                                                                                                                                                                                                          | Required                                                                                                                                                                         | Default                    | Description                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------- | ------------------------- | --------------------- |
| `next`            | `NonNullable<WithSlotShorthandValue<(Omit<TeachingPopoverCarouselFooterButtonSlots, "root"> & Omit<{ as?: "button"                                                                                                                                                            | undefined; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; } & Pick<...>, "ref"> & Omit<...> & { ...; } & { ...; }) | (Omit<...> & ... 3 mor...` | Yes                                                                                           |                           | The next button slot. |
| `previous`        | `WithSlotShorthandValue<(Omit<TeachingPopoverCarouselFooterButtonSlots, "root"> & Omit<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; } & Pick<...>, "ref"> & Omit<...> & { ...; } & { ...; }) | (Omit<...> & ... 3 more ... & { .....`                                                                                                                                           | No                         |                                                                                               | The previous button slot. |
| `as`              | `"div"`                                                                                                                                                                                                                                                                       | No                                                                                                                                                                               |                            |                                                                                               |
| `layout`          | `"centered" "offset"`                                                                                                                                                                                                                                                         | No                                                                                                                                                                               |                            | Controls whether buttons will be centered (balanced) or right aligned Defaults to 'centered'. |
| `initialStepText` | `string`                                                                                                                                                                                                                                                                      | Yes                                                                                                                                                                              |                            | The text to be displayed on the initial step of carousel                                      |
| `finalStepText`   | `string`                                                                                                                                                                                                                                                                      | Yes                                                                                                                                                                              |                            | The text to be displayed on the final step of carousel                                        |
| `ref`             | `Ref<HTMLDivElement>`                                                                                                                                                                                                                                                         | No                                                                                                                                                                               |                            |                                                                                               |

### TeachingPopoverCarouselNav

Define a styled TeachingPopoverCarouselNav, using the `useTeachingPopoverCarouselNav_unstable` and `useTeachingPopoverCarouselNavStyles_unstable`
hooks.

TeachingPopoverCarouselNav provides an index-based pagination list to jump to any page within the carousel.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TeachingPopoverCarouselNavButton

TeachingPopoverCarouselNavButton is a button to jump to a single page within TeachingPopoverCarousel

It's value is injected via context and must be wrapped with a ValueIdContextProvider (automatically handled via TeachingPopoverCarouselNav)

#### Props

| Name                | Type                   | Required            | Default | Description                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ---------------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `as`                | `"a" "button"`         | No                  |         |                                                                                                                                                                                                                                                                                                                                          |
| `disabledFocusable` | `boolean`              | No                  | false   | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `ref`               | `Ref<HTMLAnchorElement | HTMLButtonElement>` | No      |                                                                                                                                                                                                                                                                                                                                          |     |

### TeachingPopoverCarouselPageCount

TeachingPopoverCarouselPageCount is a simple interface for rendering based on current and total page count

The child render function will provide both current and total page numbers for customization.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TeachingPopoverFooter

Define a styled TeachingPopoverFooter, using the `useTeachingPopoverFooter_unstable` and `useTeachingPopoverFooterStyles_unstable`
hooks.

TeachingPopoverFooter will provide both a secondary and primary button for the TeachingPopover,
and handle Popover functionality such as closing the popup.

Users must provide the localized text for each button within the footer via slots.

#### Props

| Name           | Type                                                                              | Required            | Default | Description                                                                                     |
| -------------- | --------------------------------------------------------------------------------- | ------------------- | ------- | ----------------------------------------------------------------------------------------------- | --- | -------------------------- |
| `secondary`    | `WithSlotShorthandValue<ButtonProps & RefAttributes<HTMLAnchorElement             | HTMLButtonElement>> | null`   | No                                                                                              |     | The secondary button slot. |
| `primary`      | `NonNullable<WithSlotShorthandValue<ButtonProps & RefAttributes<HTMLAnchorElement | HTMLButtonElement>> | null>`  | Yes                                                                                             |     | The primary button slot.   |
| `as`           | `"div"`                                                                           | No                  |         |                                                                                                 |
| `footerLayout` | `"horizontal" "vertical"`                                                         | No                  |         | Enables stylization to a horizontal or vertical stack of button layouts. Defaults to horizontal |
| `ref`          | `Ref<HTMLDivElement>`                                                             | No                  |         |                                                                                                 |

### TeachingPopoverHeader

Define a styled TeachingPopoverHeader, using the `useTeachingPopoverHeader_unstable` and `useTeachingPopoverHeaderStyles_unstable`
hooks.

TeachingPopoverHeader is an info subtitle located at the top of the popover, it provides a dismiss button by default (can be nulled)
and an info-tip icon that can be overridden or removed, subtitle displayed will be the children elements of TeachingPopoverHeader.

#### Props

| Name            | Type                                                                                                                                                     | Required | Default | Description |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | -------------------------------------------------------------- |
| `icon`          | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                | null`    | No      |             | Initial icon slot rendered before children content in heading. |
| `dismissButton` | `WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }> | null`    | No      |             | The component to be used as close button in heading            |
| `as`            | `"div" "h1" "h2" "h3" "h4" "h5" "h6"`                                                                                                                    | No       |         |             |
| `ref`           | `Ref<HTMLDivElement>`                                                                                                                                    | No       |         |             |

### TeachingPopoverSurface

TeachingPopoverSurface component renders react children in a positioned box

TeachingPopoverSurface is a direct extension of PopoverSurface, with it's own styling context hooks available.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TeachingPopoverTitle

Define a styled TeachingPopoverTitle, using the `useTeachingPopoverTitle_unstable` and `useTeachingPopoverTitleStyles_unstable`
hooks.

TeachingPopoverTitle is similar to TeachingPopoverHeader, but it is intended to be placed within a TeachingPopoverBody
TeachingPopoverTitle can also optionally render a dismiss button, however this should only be enabled when there is no TeachingPopoverHeader/dismiss.

#### Props

| Name            | Type                                                                                                                                                     | Required | Default | Description |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ------------------------------------------------------------------------- |
| `dismissButton` | `WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }> | null`    | No      |             | An alternate close button path if not placed in the TeachingPopoverHeader |
| `as`            | `"div" "h1" "h2" "h3" "h4" "h5" "h6"`                                                                                                                    | No       |         |             |
| `ref`           | `Ref<HTMLDivElement>`                                                                                                                                    | No       |         |             |

## Examples

### Appearance Brand

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverFooter,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const AppearanceBrand = (): JSXElement => (
  <TeachingPopover appearance="brand">
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
);
```

### Carousel

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const getAnnouncement = (newValue: string) => {
  return `Carousel slide ${newValue}`;
};

export const Carousel = (): JSXElement => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
      <TeachingPopoverCarousel defaultValue={'1'} announcement={getAnnouncement}>
        <TeachingPopoverCarouselCard value="1">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 1</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="2">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 2</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="3">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 3</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          <TeachingPopoverCarouselNav>
            {index => <TeachingPopoverCarouselNavButton aria-label={`Tip ${index}`} />}
          </TeachingPopoverCarouselNav>
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
```

### Carousel Brand

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const CarouselBrand = (): JSXElement => (
  <TeachingPopover appearance="brand">
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
      <TeachingPopoverCarousel defaultValue="1">
        <TeachingPopoverCarouselCard value="1">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 1</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="2">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 2</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="3">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 3</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          <TeachingPopoverCarouselNav>
            {index => <TeachingPopoverCarouselNavButton aria-label={`Tip ${index}`} />}
          </TeachingPopoverCarouselNav>
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
```

### Carousel Text

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselPageCount,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const CarouselText = (): JSXElement => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <Button>TeachingPopover trigger</Button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface>
      <TeachingPopoverHeader>Tips"</TeachingPopoverHeader>
      <TeachingPopoverCarousel defaultValue="1">
        <TeachingPopoverCarouselCard value="1">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 1</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="2">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 2</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselCard value="3">
          <TeachingPopoverBody media={<Image alt="test image" fit="cover" src={swapImage} />}>
            <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
            <div>This is page: 3</div>
          </TeachingPopoverBody>
        </TeachingPopoverCarouselCard>

        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          <TeachingPopoverCarouselPageCount>
            {(currentIndex: number, totalPages: number) => `${currentIndex} of ${totalPages}`}
          </TeachingPopoverCarouselPageCount>
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Image } from '@fluentui/react-components';

import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  TeachingPopoverFooter,
} from '@fluentui/react-components';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

export const Default = (): JSXElement => (
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
);
```
