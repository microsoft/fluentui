# Components/Carousel/Carousel

A `Carousel` component is a sliding window of elements controlled by previous, next, and direct pagination buttons.

`Carousel` allows banners or a series of cards to be displayed in a way that takes up minimal screen space. It offers an accessible method of viewing content that is out of bounds via keyboard interactions.

'CarouselNavContainer' offers multiple layouts of the underlying controls which can be suitable for full screen banners, multiple cards within a view, or large image box previews and displays, or use the underlying controls directly for precision placement.

A `CarouselCard` can be full screen, responsive, or partial sizes, it is recommended to enable the `cardFocus` prop on the `CarouselSlider` if the cards are not full width banners (this provided keyboard navigation and accessibility tool access). If cards are intended to be full-screen banners, we recommend relying on the tab index of the internal elements only, while the out-of-view cards will be set to aria-hidden by default to prevent unnecessary tabbing and quick control access.

> ⚠️ For `aria-live` announcements to work correctly you should configure you application with a
> <a href="https://react.fluentui.dev/?path=/docs/utilities-aria-live-arialiveannouncer--docs">AriaLiveAnnouncer</a> towards the top of the React tree.

## Best practices

### Do

- Limit cards to a max width of 100% of screen size.
- Use 'gap' css on CarouselSlider to provide easy spacing between cards, use margin if circular is enabled.
- Keep cards a uniform size where possible.
- Set CarouselCards to focusMode='tab-exit' when there is multiple cards in view
- Avoid focus on CarouselCards if they are a full size banner, out of view cards will be set to 'inert'.
- Set an event listener on CarouselCards with EMBLA_VISIBILITY_EVENT to update state based on visibility (or use an intersectionObserver).

### Don't

- Use percentage based widths unless also using resize breakpoints to define number of cards, i.e. a 400px window should have max 1-2 cards while a 1000px window could fit 2-4+
- Set groupSize unless it is a constant set value, i.e. groupSize 2 if the size of cards is set to 50%.
- Set autoplay to true unless user interacts or an action is taken (i.e. clicking autoplay button).

## Props

| Name                  | Type                                    | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                  | `"div"`                                 | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `defaultActiveIndex`  | `number`                                | No       |         | The initial page to display in uncontrolled mode.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `align`               | `"center" "start" "end"`                | No       |         | The alignment of the carousel.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `activeIndex`         | `number`                                | No       |         | The value of the currently active page.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `appearance`          | `"flat" "elevated"`                     | No       | 'flat'  | Sets visual treatment for the Carousel container. `flat` Retains the minimal styling used by default prior to introducing appearance-based styles. `elevated` Applies rounded corners, background, and shadow tokens so the Carousel is presented as a surfaced container.                                                                                                                                                                         |
| `onActiveIndexChange` | `EventHandler<CarouselIndexChangeData>` | No       |         | Callback to notify a page change.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `circular`            | `boolean`                               | No       |         | Circular enables the carousel to loop back around on navigation past trailing index.                                                                                                                                                                                                                                                                                                                                                               |
| `groupSize`           | `number                                 | "auto"`  | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Controls the number of carousel cards per navigation element, will default to 'auto' Recommended to set to '1' when using full page carousel cards. |
| `whitespace`          | `boolean`                               | No       |         | Adds whitespace to start/end so that 'align' prop is always respected for current index Defaults to: False                                                                                                                                                                                                                                                                                                                                         |
| `motion`              | `CarouselMotion`                        | No       |         | Sets motion type as either 'slide' or 'fade' Defaults: 'slide' Users can also pass 'slide' & duration via CarouselMotion object to control carousel speed. Drag interactions are not affected because duration is then determined by the drag force. Note: Duration is not in milliseconds because Carousel uses an attraction physics simulation when scrolling instead of easings. Only values between 20-60 are recommended, 25 is the default. |
| `announcement`        | `CarouselAnnouncerFunction`             | No       |         | Localizes the string used to announce carousel page changes Defaults to: undefined                                                                                                                                                                                                                                                                                                                                                                 |
| `autoplayInterval`    | `number`                                | No       |         | Choose a delay between autoplay transitions in milliseconds. Only active if Autoplay is enabled via CarouselAutoplayButton Defaults: 4000                                                                                                                                                                                                                                                                                                          |
| `ref`                 | `Ref<HTMLDivElement>`                   | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Subcomponents

### CarouselAutoplayButton

If the Carousel is on auto-play, the user may opt into pausing the auto-play feature via the
CarouselAutoplayButton which must be present for auto-play to be enabled.

If CarouselAutoplayButton is present, auto-play will default to true on mount.

#### Props

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required            | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Icon that renders either before or after the `children` as specified by the `iconPosition` prop. |
| `as`                | `"a" "button"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No                  |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disabledFocusable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       |
| false               | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `appearance`        | `"subtle" "outline" "secondary" "primary" "transparent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                  | 'secondary' | A button can have its content and borders styled for greater emphasis or to be subtle. - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action. - 'primary': Emphasizes the button as a primary action. - 'outline': Removes background styling. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': Removes background and border styling. |
| `iconPosition`      | `"before" "after"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No                  | 'before'    | A button can format its icon to appear before or after its content.                                                                                                                                                                                                                                                                                                                                                                             |
| `shape`             | `"circular" "square" "rounded"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  | 'rounded'   | A button can be rounded, circular, or square.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `size`              | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium'    | A button supports different sizes.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `checked`           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       | Defines the controlled checked state of the `ToggleButton`. If passed, `ToggleButton` ignores the `defaultChecked` property. This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the correct value based on handling `onClick` events and re-rendering.                                                                                                                             |
| `onCheckedChange`   | `EventHandler<CarouselAutoplayChangeData>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  |             | Callback that informs the user when internal autoplay value has changed                                                                                                                                                                                                                                                                                                                                                                         |
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

### CarouselButton

A default navigation button that will set value to the next/previous page,
driven by it's type 'next' or 'previous'.

#### Props

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required            | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Icon that renders either before or after the `children` as specified by the `iconPosition` prop. |
| `as`                | `"a" "button"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No                  |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disabledFocusable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       |
| false               | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `appearance`        | `"subtle" "outline" "secondary" "primary" "transparent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                  | 'secondary' | A button can have its content and borders styled for greater emphasis or to be subtle. - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action. - 'primary': Emphasizes the button as a primary action. - 'outline': Removes background styling. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': Removes background and border styling. |
| `iconPosition`      | `"before" "after"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No                  | 'before'    | A button can format its icon to appear before or after its content.                                                                                                                                                                                                                                                                                                                                                                             |
| `shape`             | `"circular" "square" "rounded"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  | 'rounded'   | A button can be rounded, circular, or square.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `size`              | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium'    | A button supports different sizes.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `navType`           | `"next" "prev"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  |             | Dictates whether button will be of type go next or go previous Default: 'next'                                                                                                                                                                                                                                                                                                                                                                  |
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

### CarouselCard

The defining wrapper of a carousel's indexed content, they will take up the full
viewport of CarouselSlider or div wrapper,
users may place multiple items within this Card if desired, with consideration of viewport width.

Clickable actions within the content area are available via mouse and tab as expected,
non-active card content will be set to inert until moved to active card.

#### Props

| Name       | Type                  | Required | Default | Description                                              |
| ---------- | --------------------- | -------- | ------- | -------------------------------------------------------- |
| `as`       | `"div"`               | No       |         |                                                          |
| `autoSize` | `boolean`             | No       |         | Sets the card styling to be responsive based on content. |
| `ref`      | `Ref<HTMLDivElement>` | No       |         |                                                          |

### CarouselNav

Used to jump to a card based on index, using arrow navigation via Tabster.

The children of this component will be wrapped in a context to
provide the appropriate value based on their index position.

#### Props

| Name          | Type                  | Required | Default | Description                                                                                                                                      |
| ------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`          | `"div"`               | No       |         |                                                                                                                                                  |
| `appearance`  | `"brand"`             | No       |         | Enables an alternate brand style when set to 'brand'                                                                                             |
| `totalSlides` | `number`              | No       |         | The total number of slides available. Users may override if using the component without a Carousel wrapper or implementing custom functionality. |
| `ref`         | `Ref<HTMLDivElement>` | No       |         |                                                                                                                                                  |

### CarouselNavButton

The child element of CarouselNav, a singular button that will set the carousels active value on click.

#### Props

| Name                | Type                   | Required          | Default          | Description                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ---------------------- | ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| `as`                | `"a" "button" "div"`   | No                |                  |                                                                                                                                                                                                                                                                                                                                          |
| `disabledFocusable` | `boolean`              | No                | false            | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `ref`               | `Ref<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>` | No                                                                                                                                                                                                                                                                                                                                       |     |     |

### CarouselNavContainer

CarouselNavContainer component - This container will provide multiple valid layout options for the underlying carousel controls

#### Props

| Name              | Type                                                                                                                                                                                                                                                                  | Required                                           | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- | --- |
| `next`            | `WithSlotShorthandValue<(Partial<Omit<ButtonSlots, "root"> & Omit<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; } & Pick<...>, "ref"> & { ...; }> & Omit<...> & Omit<...> & { ...; }) | (Partial<...> & ... 2 more ... & { ...; })...`     | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |
| `nextTooltip`     | `WithSlotShorthandValue<TooltipProps>                                                                                                                                                                                                                                 | null`                                              | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |
| `prev`            | `WithSlotShorthandValue<(Partial<Omit<ButtonSlots, "root"> & Omit<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; } & Pick<...>, "ref"> & { ...; }> & Omit<...> & Omit<...> & { ...; }) | (Partial<...> & ... 2 more ... & { ...; })...`     | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |
| `prevTooltip`     | `WithSlotShorthandValue<TooltipProps>                                                                                                                                                                                                                                 | null`                                              | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |
| `autoplay`        | `WithSlotShorthandValue<(Omit<ButtonSlots, "root"> & Omit<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; } & Pick<...>, "ref"> & ... 4 more ... & RefAttributes<...>)                  | (Omit<...> & ... 5 more ... & RefAttributes<...>)> | null    | ...`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | No  |     |     |
| `autoplayTooltip` | `WithSlotShorthandValue<TooltipProps>                                                                                                                                                                                                                                 | null`                                              | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |
| `as`              | `"div"`                                                                                                                                                                                                                                                               | No                                                 |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `layout`          | `"inline" "overlay" "inline-wide" "overlay-wide" "overlay-expanded"`                                                                                                                                                                                                  | No                                                 |         | Default: 'inline' Defines the nav container layout: 'inline' - Default controls inline with carousel view inline-wide - Similar to inline but places nav buttons on far left/right 'overlay' - Controls overlaid on bottom of carousel viewport, 'overlay-wide' - Controls overlaid on bottom of carousel viewport with prev+autoplay/next buttons on far side 'overlay-expanded' - Controls overlaid on bottom of carousel viewport, with prev/next buttons on sides vertically centered |
| `ref`             | `Ref<HTMLDivElement>`                                                                                                                                                                                                                                                 | No                                                 |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### CarouselNavImageButton

A variant child element of CarouselNav, a singular image button that displays a
preview of card content and will set the carousels active value on click.

#### Props

| Name                | Type                   | Required                                                                                                              | Default          | Description                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --- |
| `image`             | `{ as?: "img"          | undefined; } & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "children"> & { ...; }` | Yes              |                                                                                                                                                                                                                                                                                                                                          | Required: The image within the button |
| `as`                | `"a" "button" "div"`   | No                                                                                                                    |                  |                                                                                                                                                                                                                                                                                                                                          |
| `disabledFocusable` | `boolean`              | No                                                                                                                    | false            | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `ref`               | `Ref<HTMLAnchorElement | HTMLButtonElement                                                                                                     | HTMLDivElement>` | No                                                                                                                                                                                                                                                                                                                                       |                                       |     |

### CarouselSlider

CarouselSlider component - The viewport window that CarouselCards are contained within.

#### Props

| Name        | Type                  | Required | Default | Description                                                                                                                                                                                                       |
| ----------- | --------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`        | `"div"`               | No       |         |                                                                                                                                                                                                                   |
| `cardFocus` | `boolean`             | No       |         | cardFocus sets the carousel slider as a focus group, enabling left/right navigation of elements. This will also be passed into CarouselCards via context and set the appropriate focus attributes Defaults: false |
| `ref`       | `Ref<HTMLDivElement>` | No       |         |                                                                                                                                                                                                                   |

### CarouselViewport

CarouselViewport component - TODO: add more docs

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Examples

### Alignment And Whitespace

Carousel can have slides aligned relative to the carousel viewport, use the `align` prop to set the alignment. Note, the `whitespace` prop could be used to clear leading and trailing empty space that causes excessive scrolling.

```tsx
import {
  Button,
  makeStyles,
  tokens,
  Image,
  Persona,
  Dropdown,
  Option,
  Switch,
  Field,
  CarouselSlider,
} from '@fluentui/react-components';
import { MoreHorizontalRegular, DocumentLinkRegular } from '@fluentui/react-icons';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselProps,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: 'auto 1fr',
    boxShadow: tokens.shadow16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    padding: '10px',
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    padding: '10px',
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    minWidth: '100px',
    width: '1fr',
  },
});

const useCardClasses = makeStyles({
  actionCard: {
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    textAlign: 'center',
    maxWidth: '350px',
    margin: '0px 6px',
    boxShadow: tokens.shadow16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    maxHeight: '200px',
  },
  imageButton: {
    position: 'absolute',
    left: '12px',
    bottom: '12px',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    padding: '12px',
    width: 'auto',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

type Post = {
  avatarUrl: string;
  name: string;
  text: string;
  description: string;
};

const POSTS: Post[] = [
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    name: 'Allan Munger',
    text: 'Meeting notes',
    description: '2 days ago by Kathryn Murphy',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg',
    name: 'Amanda Brady',
    text: 'FY24 Hiring Budget',
    description: 'Wed at 3:38pm',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AshleyMcCarthy.jpg',
    name: 'Ashley McCarthy',
    text: 'Test edited this',
    description: 'Thu at 4:38pm',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    name: 'Cameron Evans',
    text: 'Review 1:1 Recap',
    description: 'You recently opened this',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    name: 'Carlos Slattery',
    text: 'FY24 Hiring Test',
    description: '2 days ago by Cecil Folk',
  },
];

const ActionCard: React.FC<Post & { index: number }> = props => {
  const { avatarUrl, description, name, text, index } = props;
  const classes = useCardClasses();

  return (
    <CarouselCard className={classes.actionCard} aria-label={`Card ${index + 1} of ${POSTS.length}`}>
      <div className={classes.imageContainer}>
        <Image className={classes.image} fit="cover" src={swapImage} role="presentation" />
        <Button className={classes.imageButton} icon={<DocumentLinkRegular />} aria-label="Go to document" />
      </div>
      <div className={classes.info}>
        <Persona
          textPosition="after"
          avatar={{ name, image: { src: avatarUrl } }}
          name={text}
          presence={{ status: 'available' }}
          secondaryText={description}
        />

        <Button icon={<MoreHorizontalRegular />} aria-label="More options" />
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const AlignmentAndWhitespace = (): JSXElement => {
  const classes = useClasses();

  const [alignment, setAlignment] = React.useState<CarouselProps['align']>('center');
  const [whitespace, setWhitespace] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field label="Alignment" orientation="horizontal" className={classes.field}>
          <Dropdown
            className={classes.dropdown}
            placeholder="Select an alignment"
            onOptionSelect={(_, option) => {
              setAlignment(option.optionText as CarouselProps['align']);
            }}
            value={alignment}
          >
            {['start', 'center', 'end'].map(option => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>
        </Field>

        <Field label="Whitespace" orientation="horizontal" className={classes.field}>
          <Switch checked={whitespace} onChange={() => setWhitespace(!whitespace)} />
        </Field>
      </div>

      <div className={classes.card}>
        <Carousel align={alignment} className={classes.carousel} whitespace={whitespace} announcement={getAnnouncement}>
          <CarouselViewport>
            <CarouselSlider cardFocus aria-label="Use the left and right arrow keys to navigate focused carousel card">
              {POSTS.map((post, index) => (
                <ActionCard {...post} key={post.name} index={index} />
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <CarouselNavContainer
            layout="inline"
            next={{ 'aria-label': 'go to next' }}
            prev={{ 'aria-label': 'go to prev' }}
          >
            <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
          </CarouselNavContainer>
        </Carousel>
      </div>
    </div>
  );
};
```

### Appearance

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  Image,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'absolute',
    left: '10%',
    top: '25%',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title1,
  },
  subtext: {
    ...typographyStyles.body1,
  },
});

const IMAGES = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  index: number;
}> = props => {
  const { children, imageSrc, index } = props;
  const classes = useClasses();

  return (
    <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`} id={`test-${index}`}>
      <Image fit="cover" src={imageSrc} role="presentation" />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button size="small" shape="square" appearance="primary">
            Call to action
          </Button>
        </div>
      </div>
    </CarouselCard>
  );
};
const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number) => {
  return `Elevated carousel slide ${index + 1} of ${totalSlides}`;
};

export const Appearance = (): JSXElement => (
  <Carousel appearance="elevated" groupSize={1} circular announcement={getAnnouncement}>
    <CarouselViewport>
      <CarouselSlider>
        {IMAGES.map((imageSrc, index) => (
          <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
            Card {index + 1}
          </BannerCard>
        ))}
      </CarouselSlider>
    </CarouselViewport>
    <CarouselNavContainer
      layout="inline"
      autoplayTooltip={{ content: 'Autoplay', relationship: 'label' }}
      nextTooltip={{ content: 'Go to next', relationship: 'label' }}
      prevTooltip={{ content: 'Go to prev', relationship: 'label' }}
    >
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
);
```

### Autoplay

The Autoplay button must be present to enable autoplay as it is an accessibility requirement. To enable, any valid prop (recommended ariaLabel) must be passed in, while setting the autoplay prop in CarouselNav to undefined will disable and remove it.

```tsx
import {
  Button,
  CarouselSlider,
  Field,
  Image,
  makeStyles,
  Switch,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselAutoplayButtonProps,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    position: 'absolute',
    left: '10%',
    top: '25%',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title1,
  },
  subtext: {
    ...typographyStyles.body1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    boxShadow: tokens.shadow16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    padding: '10px',
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    padding: '10px',
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    maxWidth: 'max-content',
  },
});

const IMAGES = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  index: number;
}> = props => {
  const { children, imageSrc, index } = props;
  const classes = useClasses();

  return (
    <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`}>
      <Image fit="cover" src={imageSrc} role="presentation" />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button size="small" shape="square" appearance="primary">
            Call to action
          </Button>
        </div>
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Autoplay = (): JSXElement => {
  const classes = useClasses();
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(false);
  const [autoplayButton, setAutoplayButton] = React.useState(true);

  const autoplayProps: CarouselAutoplayButtonProps | undefined = autoplayButton
    ? {
        'aria-label': 'Enable autoplay',
        checked: autoplayEnabled,
        onCheckedChange: (e, data) => {
          setAutoplayEnabled(data.checked);
        },
      }
    : undefined;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field label="Autoplay Present" orientation="horizontal" className={classes.field}>
          <Switch checked={autoplayButton} onChange={() => setAutoplayButton(!autoplayButton)} />
        </Field>

        <Field label="Autoplay Enabled" orientation="horizontal" className={classes.field}>
          <Switch checked={autoplayEnabled} onChange={() => setAutoplayEnabled(!autoplayEnabled)} />
        </Field>
      </div>
      <div className={classes.card}>
        <Carousel groupSize={1} circular announcement={getAnnouncement}>
          <CarouselViewport>
            <CarouselSlider>
              {IMAGES.map((imageSrc, index) => (
                <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
                  Card {index + 1}
                </BannerCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <CarouselNavContainer
            layout="inline"
            autoplay={autoplayProps}
            next={{ 'aria-label': 'go to next' }}
            prev={{ 'aria-label': 'go to prev' }}
          >
            <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
          </CarouselNavContainer>
        </Carousel>
      </div>
    </div>
  );
};
```

### Controlled

Carousel can be controlled by setting `activeIndex` and `onActiveIndexChange` props.

```tsx
import {
  Body1,
  Divider,
  makeStyles,
  mergeClasses,
  Title1,
  tokens,
  Tooltip,
  Toolbar,
  ToolbarButton,
  CarouselSlider,
  CarouselAutoplayButton,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselButton,
  CarouselCard,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  carousel: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: '1fr auto',
    gap: '10px',
    placeItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  viewport: {
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    gap: '10px',

    alignSelf: 'center',
    justifySelf: 'center',
    width: 'max-content',

    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,

    padding: '10px',
  },
  controls: {
    padding: 0,
  },
  controlButton: {
    minWidth: '32px',
  },
  code: {
    display: 'flex',
    placeItems: 'center',
    padding: '4px 8px',

    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,

    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusMedium,
  },

  wireframe: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    placeContent: 'center',

    padding: '40px',
    height: '200px',

    position: 'relative',
  },
  wireframeEven: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke1}`,
  },
  wireframeInfo: {
    position: 'absolute',
    right: '12px',
    top: '12px',

    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `${tokens.strokeWidthThin} dotted ${tokens.colorPaletteRedBorder2}`,

    fontSize: tokens.fontSizeBase200,
    padding: '4px 8px',
  },
});

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

const WireframeContent: React.FC<{
  index: number;
}> = props => {
  const classes = useClasses();

  return (
    <div className={mergeClasses(classes.wireframe, props.index % 2 === 0 && classes.wireframeEven)}>
      <div className={classes.wireframeInfo}>
        <code>index: {props.index}</code>
      </div>
      <Title1 align="center">Lorem Ipsum</Title1>
      <Body1 align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Body1>
    </div>
  );
};

export const Controlled = (): JSXElement => {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <Carousel
        activeIndex={activeIndex}
        groupSize={1}
        draggable
        onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
        announcement={getAnnouncement}
      >
        <div className={classes.carousel}>
          <Tooltip content="Go To Previous Page" relationship="label">
            <CarouselButton navType="prev" aria-label="Previous Carousel Page Button" />
          </Tooltip>

          <CarouselViewport className={classes.viewport}>
            <CarouselSlider>
              <CarouselCard aria-label="1 of 5">
                <WireframeContent index={0} />
              </CarouselCard>
              <CarouselCard aria-label="2 of 5">
                <WireframeContent index={1} />
              </CarouselCard>
              <CarouselCard aria-label="3 of 5">
                <WireframeContent index={2} />
              </CarouselCard>
              <CarouselCard aria-label="4 of 5">
                <WireframeContent index={3} />
              </CarouselCard>
              <CarouselCard aria-label="5 of 5">
                <WireframeContent index={4} />
              </CarouselCard>
            </CarouselSlider>
          </CarouselViewport>

          <Tooltip content="Go To Next Page" relationship="label">
            <CarouselButton navType="next" aria-label="Next Carousel Page Button" />
          </Tooltip>
        </div>

        <div className={classes.footer}>
          <CarouselAutoplayButton aria-label="Enable autoplay" />
          <Divider vertical />
          <code className={classes.code}>{JSON.stringify({ activeIndex }, null, 2)}</code>
          <Divider vertical />
          <Toolbar className={classes.controls}>
            {new Array(5).fill(null).map((_, index) => (
              <ToolbarButton
                key={`toolbar-button-${index}`}
                aria-label={`Carousel Nav Button ${index} `}
                className={classes.controlButton}
                appearance="subtle"
                disabled={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                {index}
              </ToolbarButton>
            ))}
          </Toolbar>
        </div>
      </Carousel>
    </div>
  );
};
```

### Default

```tsx
import { Button, Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  CarouselAnnouncerFunction,
  CarouselSlider,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'absolute',
    left: '10%',
    top: '25%',
    background: tokens.colorNeutralBackground1,
    padding: '18px',
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title1,
  },
  subtext: {
    ...typographyStyles.body1,
  },
});

const IMAGES = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  index: number;
}> = props => {
  const { children, imageSrc, index } = props;
  const classes = useClasses();

  return (
    <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`} id={`test-${index}`}>
      <Image fit="cover" src={imageSrc} role="presentation" />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button size="small" shape="square" appearance="primary">
            Call to action
          </Button>
        </div>
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Default = (): JSXElement => (
  <Carousel groupSize={1} circular announcement={getAnnouncement}>
    <CarouselViewport>
      <CarouselSlider>
        {IMAGES.map((imageSrc, index) => (
          <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
            Card {index + 1}
          </BannerCard>
        ))}
      </CarouselSlider>
    </CarouselViewport>
    <CarouselNavContainer
      layout="inline"
      autoplayTooltip={{ content: 'Autoplay', relationship: 'label' }}
      nextTooltip={{ content: 'Go to next', relationship: 'label' }}
      prevTooltip={{ content: 'Go to prev', relationship: 'label' }}
    >
      <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
);
```

### Eventing

Carousel provides callbacks on index change with a multitude of event types.

```tsx
import {
  Body1,
  Caption1,
  makeStyles,
  mergeClasses,
  tokens,
  Title1,
  Subtitle2,
  useId,
  CarouselSlider,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  Text,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    gap: '20px',
  },
  carousel: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px 0',
    marginTop: '24px',
  },
  card: {
    margin: '10px',
  },
  logLabel: {
    alignSelf: 'end',
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    width: 'fit-content',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`,
  },
  log: {
    overflowY: 'auto',
    boxShadow: tokens.shadow16,
    minWidth: '240px',
    flex: 1,
    border: `2px solid ${tokens.colorBrandBackground}`,
    borderRadius: `${tokens.borderRadiusMedium} 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}`,
    padding: '12px',
    maxHeight: '250px',
  },
  logContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    filter: `drop-shadow(0 0 4px ${tokens.colorNeutralStroke1})`,
  },
  wireframe: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    placeContent: 'center',

    padding: '40px',
    height: '100px',

    position: 'relative',
  },
  wireframeEven: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke1}`,
  },
  wireframeInfo: {
    position: 'absolute',
    right: '12px',
    top: '12px',

    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `${tokens.strokeWidthThin} dotted ${tokens.colorPaletteRedBorder2}`,

    fontSize: tokens.fontSizeBase200,
    padding: '4px 8px',
  },
  wireframeSmall: {
    minWidth: '100px',
    padding: '40px 20px',
  },
  wireframeMedium: {
    minWidth: '200px',
    padding: '40px 20px',
  },
  wireframeLarge: {
    minWidth: '350px',
  },
});

const WireframeContent: React.FC<{
  appearance: 'odd' | 'even';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}> = props => {
  const classes = useClasses();

  return (
    <div
      tabIndex={0}
      className={mergeClasses(
        classes.wireframe,
        props.appearance === 'even' && classes.wireframeEven,
        props.size === 'small' && classes.wireframeSmall,
        props.size === 'medium' && classes.wireframeMedium,
        props.size === 'large' && classes.wireframeLarge,
      )}
    >
      <div className={classes.wireframeInfo}>
        <code>size: {props.size ?? 'auto'}</code>
      </div>
      {props.children}
    </div>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Eventing = (): JSXElement => {
  const classes = useClasses();
  const labelId = useId();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [statusLog, setStatusLog] = React.useState<
    [
      number,
      {
        type: 'click' | 'focus' | 'drag' | 'autoplay' | undefined;
        index: number;
      },
    ][]
  >([]);

  return (
    <div className={classes.container}>
      <Carousel
        className={classes.carousel}
        groupSize={1}
        circular
        draggable
        announcement={getAnnouncement}
        activeIndex={activeIndex}
        onActiveIndexChange={(ev, data) => {
          setActiveIndex(data.index);
          setStatusLog(prev => [[Date.now(), { type: data.type, index: data.index }], ...prev]);
        }}
      >
        <CarouselViewport>
          <CarouselSlider cardFocus>
            <CarouselCard className={classes.card} autoSize aria-label="1 of 7">
              <WireframeContent appearance="odd">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                </Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="2 of 7">
              <WireframeContent appearance="even" size="small">
                <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
                <Caption1 align="center">Lorem ipsum...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="3 of 7">
              <WireframeContent appearance="odd" size="medium">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="4 of 7">
              <WireframeContent appearance="even" size="large">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="5 of 7">
              <WireframeContent appearance="odd" size="medium">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="6 of 7">
              <WireframeContent appearance="even" size="large">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="7 of 7">
              <WireframeContent appearance="odd" size="small">
                <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
                <Caption1 align="center">Lorem ipsum...</Caption1>
              </WireframeContent>
            </CarouselCard>
          </CarouselSlider>
        </CarouselViewport>

        <CarouselNavContainer
          layout="inline"
          next={{ 'aria-label': 'go to next' }}
          prev={{ 'aria-label': 'go to prev' }}
          autoplay={{ 'aria-label': 'Carousel autoplay' }}
        >
          <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
        </CarouselNavContainer>
      </Carousel>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={labelId}>
          Events log
        </div>
        <div role="log" aria-labelledby={labelId} className={classes.log}>
          {statusLog.map(([time, status], i) => {
            const date = new Date(time);

            return (
              <div key={i}>
                {date.toLocaleTimeString()}{' '}
                <Text weight="bold">
                  {'{'} type: {status.type}, index: {status.index} {'}'}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
```

### First Run Experience

Carousel can be used in a Dialog to create a _first-run_ experience.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselSlider,
  CarouselViewport,
  Dialog,
  DialogSurface,
  DialogTrigger,
  Image,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  surface: {
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
  carousel: { padding: 0 },
  card: {},
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL}`,
  },
  header: {
    display: 'block',
    // We use margin instead of padding to avoid messing with the focus indicator in the header
    margin: `${tokens.spacingVerticalXXL} ${tokens.spacingVerticalXXL} ${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL}`,
    ...typographyStyles.subtitle1,
  },
  text: {
    display: 'block',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingVerticalXXL}`,
    ...typographyStyles.body1,
  },
});

const PAGES = [
  {
    id: 'Copilot-page-1',
    alt: 'Copilot logo',
    imgSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
    header: 'Discover Copilot, a whole new way to work',
    text: 'Explore new ways to work smarter and faster using the power of AI. Copilot in [Word] can help you [get started from scratch], [work from an existing file], [get actionable insights about documents], and more.',
  },
  {
    id: 'Copilot-page-2',
    alt: 'Copilot logo 2',
    imgSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
    header: 'Use your own judgment',
    text: 'Copilot can make mistakes so remember to verify the results. To help improve the experience, please share your feedback with us.',
  },
];

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}, ${PAGES[index].header}`;
};

export const FirstRunExperience = (): JSXElement => {
  const styles = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setModalOpen] = React.useState(false);
  const totalPages = PAGES.length;

  const setPage = (page: number) => {
    if (page < 0 || page >= totalPages) {
      setModalOpen(false);
      return;
    }
    setActiveIndex(page);
  };

  React.useEffect(() => {
    // Reset or initialize page on open if necessary
    if (open) {
      setActiveIndex(0);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(e, data) => setModalOpen(data.open)}>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogSurface className={styles.surface} aria-label="Discover Copilot">
        <Carousel
          className={styles.carousel}
          groupSize={1}
          circular
          announcement={getAnnouncement}
          activeIndex={activeIndex}
          motion="fade"
          onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
        >
          <CarouselViewport>
            <CarouselSlider>
              {PAGES.map(page => (
                <CarouselCard className={styles.card} key={page.id}>
                  <Image src={page.imgSrc} width={600} height={324} alt={page.imgSrc} />
                  <h1 tabIndex={-1} className={styles.header}>
                    {page.header}
                  </h1>
                  <span className={styles.text}>{page.text}</span>
                </CarouselCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <div className={styles.footer}>
            <Button onClick={() => setPage(activeIndex - 1)}>{activeIndex <= 0 ? 'Not Now' : 'Previous'}</Button>

            <CarouselNav appearance="brand">
              {index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}
            </CarouselNav>

            <Button appearance="primary" onClick={() => setPage(activeIndex + 1)}>
              {activeIndex === totalPages - 1 ? 'Try Copilot' : 'Next'}
            </Button>
          </div>
        </Carousel>
      </DialogSurface>
    </Dialog>
  );
};
```

### Image Slideshow

```tsx
import { makeStyles, Image, CarouselSlider } from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  viewport: {
    /* Optional: Prevent image from overlapping the 'overlay-expanded' controls */
    marginBottom: '72px',
  },
  card: {
    boxSizing: 'border-box',
    width: '100%',
    /*  Optional: Padding provides a buffer space for the 'overlay-expanded' next/prev buttons without cutting off viewport */
    paddingLeft: '52px',
    paddingRight: '52px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});

type ImageDefinition = {
  previewUrl: string;
  url: string;

  label: string;
  disabled?: boolean;
};

const IMAGES: ImageDefinition[] = [
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
    label: 'sea',
  },
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
    label: 'bridge',
    disabled: true,
  },
  {
    previewUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    url: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
    label: 'park',
  },
];

const ImageCard: React.FC<ImageDefinition> = props => {
  const classes = useClasses();
  const { url } = props;

  return <Image className={classes.image} src={url} role="presentation" />;
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const ImageSlideshow = (): JSXElement => {
  const classes = useClasses();

  return (
    <Carousel groupSize={1} align="center" announcement={getAnnouncement}>
      <CarouselViewport className={classes.viewport}>
        <CarouselSlider>
          {IMAGES.map((image, index) => (
            <CarouselCard key={image.url} className={classes.card} aria-label={`${index + 1} of ${IMAGES.length}`}>
              <ImageCard {...image} />
            </CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>

      <CarouselNavContainer
        layout="overlay-expanded"
        next={{ 'aria-label': 'go to next' }}
        prev={{ 'aria-label': 'go to prev' }}
      >
        <CarouselNav>
          {index => (
            <CarouselNavImageButton
              image={{ src: IMAGES[index].previewUrl }}
              aria-label={`Carousel Nav Button ${index}`}
            />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
```

### Responsive

Carousel can have responsive cards that adjust their size based on the content, using `autoSize` prop on `CarouselCard`.

```tsx
import {
  Body1,
  Caption1,
  makeStyles,
  mergeClasses,
  tokens,
  Title1,
  Subtitle2,
  CarouselSlider,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  slider: {
    gap: '10px',
  },
  wireframe: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    placeContent: 'center',

    padding: '40px',
    height: '200px',

    position: 'relative',
  },
  wireframeEven: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke1}`,
  },
  wireframeInfo: {
    position: 'absolute',
    right: '12px',
    top: '12px',

    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `${tokens.strokeWidthThin} dotted ${tokens.colorPaletteRedBorder2}`,

    fontSize: tokens.fontSizeBase200,
    padding: '4px 8px',
  },
  wireframeSmall: {
    minWidth: '100px',
    padding: '40px 20px',
  },
  wireframeMedium: {
    minWidth: '200px',
    padding: '40px 20px',
  },
  wireframeLarge: {
    minWidth: '350px',
  },
});

const WireframeContent: React.FC<{
  appearance: 'odd' | 'even';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}> = props => {
  const classes = useClasses();

  return (
    <div
      className={mergeClasses(
        classes.wireframe,
        props.appearance === 'even' && classes.wireframeEven,
        props.size === 'small' && classes.wireframeSmall,
        props.size === 'medium' && classes.wireframeMedium,
        props.size === 'large' && classes.wireframeLarge,
      )}
    >
      <div className={classes.wireframeInfo}>
        <code>size: {props.size ?? 'auto'}</code>
      </div>
      {props.children}
    </div>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Responsive = (): JSXElement => {
  const classes = useClasses();

  return (
    <Carousel draggable announcement={getAnnouncement}>
      <CarouselViewport>
        <CarouselSlider className={classes.slider}>
          <CarouselCard autoSize aria-label="1 of 7">
            <WireframeContent appearance="odd">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
              </Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="2 of 7">
            <WireframeContent appearance="even" size="small">
              <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
              <Caption1 align="center">Lorem ipsum...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="3 of 7">
            <WireframeContent appearance="odd" size="medium">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="4 of 7">
            <WireframeContent appearance="even" size="large">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="5 of 7">
            <WireframeContent appearance="odd" size="medium">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="6 of 7">
            <WireframeContent appearance="even" size="large">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="7 of 7">
            <WireframeContent appearance="odd" size="small">
              <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
              <Caption1 align="center">Lorem ipsum...</Caption1>
            </WireframeContent>
          </CarouselCard>
        </CarouselSlider>
      </CarouselViewport>

      <CarouselNavContainer layout="inline" next={{ 'aria-label': 'go to next' }} prev={{ 'aria-label': 'go to prev' }}>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
```

### Top Navigation

Top navigation places carousel controls at the header so users can see the title, page position, and navigation in one line. This story shows the default variant with previous and next buttons and dot pagination using CarouselNav inside CarouselNavContainer.

```tsx
import { Button, CarouselSlider, Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  Text,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  bannerCard: {
    alignContent: 'center',
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    height: '450px',
    textAlign: 'left',
    position: 'relative',
  },
  image: {
    borderRadius: 'inherit',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingHorizontalS,

    position: 'absolute',
    left: '10%',
    top: '25%',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    background: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXXL}`,
    maxWidth: '270px',
    width: '50%',
  },
  title: {
    ...typographyStyles.title3,
  },
  subtext: {
    marginBottom: tokens.spacingVerticalM,
    ...typographyStyles.body1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
  },
  card: {
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
    paddingBottom: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalSNudge,

    padding: `${tokens.spacingHorizontalMNudge} ${tokens.spacingVerticalMNudge}`,
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    maxWidth: 'max-content',
  },
  carouselHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacingVerticalSNudge,
    marginBottom: tokens.spacingHorizontalL,
  },
  carouselHeaderTitle: {
    flex: '1',
    margin: '0',
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },
  carouselNavigation: {
    width: 'fit-content',
    alignSelf: 'center',
    margin: '0',
  },
  slider: {
    gap: tokens.spacingVerticalXXL,
    padding: `0 ${tokens.spacingVerticalXXL}`,
  },
});

const IMAGES = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
];

const BannerCard: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  index: number;
}> = props => {
  const { children, imageSrc, index } = props;
  const classes = useClasses();

  return (
    <CarouselCard autoSize className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`}>
      <Image fit="cover" src={imageSrc} role="presentation" className={classes.image} />

      <div className={classes.cardContainer}>
        <div className={classes.title}>{children}</div>
        <div className={classes.subtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </div>
        <div>
          <Button appearance="primary">Call to action</Button>
        </div>
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const TopNavigation = (): React.ReactElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Carousel circular draggable announcement={getAnnouncement} className={classes.carousel}>
          <div className={classes.carouselHeader}>
            <Text as="h1" className={classes.carouselHeaderTitle}>
              Carousel Title
            </Text>
            <CarouselNavContainer
              next={{ 'aria-label': 'go to next' }}
              prev={{ 'aria-label': 'go to prev' }}
              className={classes.carouselNavigation}
            >
              <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
            </CarouselNavContainer>
          </div>
          <CarouselViewport>
            <CarouselSlider className={classes.slider}>
              {IMAGES.map((imageSrc, index) => (
                <BannerCard key={`image-${index}`} imageSrc={imageSrc} index={index}>
                  Card {index + 1}
                </BannerCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
        </Carousel>
      </div>
    </div>
  );
};
```
