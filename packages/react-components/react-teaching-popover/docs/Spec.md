# @fluentui/react-teaching-popover Spec

## Background

A Teaching Popover is a structured popover to showcase information about a new component feature to a user. It should be attached via a trigger to a button, info tip, or component - or for further extension, callout(s). TeachingPopover can also be displayed programmatically, in this case it's intent should be announced to the user on launch to define context for accessibility users.

For a simple feature, a single paged TeachingPopover can be used to display core information, while extensive reading can be linked via a 'Learn More' secondary action.

For more complicated features, we recommend using the TeachingPopoverCarousel, this will enable multiple steps of information with an associating title/image, and can guide the user through multi-step tutorials - in situations where a single page is likely to require multiple TeachingPopovers pointing to various components, the upcoming TeachingCallout component will be better suited.

## Prior Art

- [OpenUI Research - Popover](https://open-ui.org/components/popup.research/)
- [OpenUI Research - Carousel](https://open-ui.org/components/carousel.research/)
- [Fluent V9 - Task: TeachingPopover](https://github.com/orgs/microsoft/projects/786/views/1?pane=issue&itemId=24403213)

### v0/v8 components

- [v8 TeachingPopover](https://developer.microsoft.com/en-us/fluentui#/controls/web/TeachingPopover)

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

## Variants

#### Carousel Vs Non-Carousel:

Dictated by a TeachingPopoverCarousel wrapper being present or not, and must contain multiple TeachingPopoverBody pages.

#### Appearance:

TeachingPopover respects the appearance prop inherited from popover: default (current Theme) or 'brand' - 'inverted' has been deprecated for this component as it is not within current design spec.

#### TeachingPopoverCarousel paginationType: Icon vs Text

'icon' will place visual buttons for reading & selecting page and is the default appearance
'text' will display page numbers for reading, must be localized by user, or '/' will be used, i.e. '4/6'

#### TeachingPopoverBody mediaLength: 'short', 'medium', 'tall'

All media sizes have a uniform width of '288px' and accompanying heights:
Short: Enforces a height of: '117px'
Medium: Enforces a height of: '176px'
Tall: Enforces a height of: '288px'

#### TeachingPopoverFooter - strings

Teaching popover footer requires the localized strings to be placed for button and count text (if text paginationType).

## API

See API at [TeachingPopover.types.ts](./src/components/TeachingPopover/TeachingPopover.types.ts).

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_

The V8 TeachingPopover was a unified single component with a visibility flag, the data and especially localized strings such as title, heading, and body text, will need to be segmented out into the appropriate sub-components and composed as described in sample code.

All popover logic, such as logic on dismiss or open, can be accessed via the underlying popover extension [Popover.md](../../react-popover/docs/Spec.md) - note that these classes have been extended, and their equivalent 'TeachingPopover' version should be used.

| Popover (v9)   | TeachingPopover (v9)                    |
| -------------- | --------------------------------------- |
| Popover        | TeachingPopover                         |
| PopoverTrigger | TeachingPopoverTrigger                  |
| PopoverSurface | TeachingPopoverSurface                  |
| PopoverContext | PopoverContext + TeachingPopoverContext |
| N/A            | TeachingPopoverCarousel                 |

The original PopoverContext provider is preserved, this ensures that popover functionality can be accessed via and compatible with the underlying inherited context hooks, while any TeachingPopover specific context is provided via TeachingPopoverContext.

TeachingPopoverTrigger has no additional functionality over PopoverTrigger, and is used to wrap the show popover button.

Carousel logic, such as page change can be accessed via the TeachingPopoverCarousel's onPageChange and onFinish for external use or control.

## Behaviors

#### Popover Inheritance

TeachingPopover adheres to the same underlying behaviors as [Popover](../../react-popover/docs/Spec.md) for show/close functionality and all UI external to TeachingPopoverSurface.

#### TeachingPopoverCarousel

A TeachingPopoverCarousel contains multiple TeachingPopoverBody's, these pages will be controlled via the secondary/primary TeachingPopoverButtons that are keyboard accessible in the popovers' footer (TeachingPopoverActions).

Additionally, users are recommended to include a TeachingPopoverPageCount that will aide the user with text based page data, or accessible icon interactions to select or skip to a specific page.

#### TeachingPopoverHeader

TBD: Replace as slots inside TeachingPopoverSurface?

Info tip subtitle located at the top of the popover, provides a dismiss button by default (can be nulled) and an infotip icon that can be overridden or removed, text displayed will be the children of TeachingPopoverHeader.

#### TeachingPopoverTitle

TBD: Replace as slots inside TeachingPopoverBody?

TeachingPopoverTitle is intended to provide a sub-header for TeachingPopoverBody, it does not provide a dismiss by default' - there should only ever be one 'dismiss' icon, so this option is intended for when no TeachingPopoverHeader is provided.

#### TeachingPopoverBody

This body section encapsulates a standardized media slot, with short/medium/tall size settings via mediaLength prop (TeachingPopoverBodyMediaLength type). It also acts as a boundary for pages within a TeachingPopoverCarousel, and will be paginated based on this encapsulation.

#### TeachingPopoverFooter

This section contains non-carousel buttons with both a secondary and primary button, these can be customized via slots or removed.

#### TeachingPopoverCarouselNav

This section contains carousel navigation with both a secondary and primary button, these can be customized via slots but must be present for carousel functionality.

#### TeachingPopoverCarouselNavButton

This can be used to recreate the carousel nav if desired, however it is recommended to just use TeachingPopoverCarouselNav for complete functionality.

## Accessibility

Focus and popover functionality will be handled by the underlying popover and focus zone, see functionality breakdown here: [Popover.md](../../react-popover/docs/Spec.md)

Keyboard accessibility will follow the default DOM tab order, and all interaction elements are ARIA compliant buttons, including the icon version of carousel pagination.

Tabster arrow navigation is applied to the carousel icons, 'Tab' will dive into the list of page icons that can then be selected via arrow keys, and can be exited via 'Tab' to the next focusable element - Additionally, the pagination icons will adhere to the 'tabList' A11y spec when a carousel is present in icon mode.
