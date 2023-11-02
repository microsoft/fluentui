# @fluentui/react-teaching-bubble-preview Spec

## Background

A Teaching Bubble is a structured popover to showcase information about a new component feature to a user. It should be attached via a trigger to a button, info tip, or component - or for further extension, callout(s). TeachingBubble can also be displayed programmatically, in this case it's intent should be announced to the user on launch to define context for accessibility users.

For a simple feature, a single paged TeachingBubble can be used to display core information, while extensive reading can be linked via a 'Learn More' secondary action.

For more complicated features, we recommend using the TeachingBubbleCarousel, this will enable multiple steps of information with an associating title/image, and can guide the user through multi-step tutorials - in situations where a single page is likely to require multiple TeachingBubbles pointing to various components, the upcoming TeachingCallout component will be better suited.

## Prior Art

- [OpenUI Research - Popover](https://open-ui.org/components/popup.research/)
- [OpenUI Research - Carousel](https://open-ui.org/components/carousel.research/)
- [Fluent V9 - Task: TeachingBubble](https://github.com/orgs/microsoft/projects/786/views/1?pane=issue&itemId=24403213)

### v0/v8 components

- [v8 TeachingBubble](https://developer.microsoft.com/en-us/fluentui#/controls/web/teachingbubble)

## Sample Code

```jsx
<TeachingBubble>
  <TeachingBubbleTrigger>
    <Button>TeachingBubble trigger</Button>
  </TeachingBubbleTrigger>
  <TeachingBubbleSurface>
    <TeachingBubbleHeader>{'Tips'}</TeachingBubbleHeader>
    <TeachingBubbleBody
      media={{
        src: 'mediaSrc',
      }}
    >
      <TeachingBubbleTitle>{'Teaching Bubble Title'}</TeachingBubbleTitle>
      {ExampleContent(1)}
    </TeachingBubbleBody>
    <TeachingBubbleActions>
      <TeachingBubbleButton buttonType="secondary" altStepText="Close">
        {'Learn More'}
      </TeachingBubbleButton>
      <TeachingBubbleButton buttonType="primary" altStepText="Finish">
        {'Got it'}
      </TeachingBubbleButton>
    </TeachingBubbleActions>
  </TeachingBubbleSurface>
</TeachingBubble>
```

## Sample Code - Carousel

```jsx
<TeachingBubble>
  <TeachingBubbleTrigger>
    <Button>TeachingBubble trigger</Button>
  </TeachingBubbleTrigger>
  <TeachingBubbleSurface>
    <TeachingBubbleHeader>{'Tips'}</TeachingBubbleHeader>
    <TeachingBubbleCarousel>
      <TeachingBubbleBody
        media={{
          src: 'mediaSrc-1',
        }}
      >
        <TeachingBubbleTitle>{'Title - 1'}</TeachingBubbleTitle>
        {ExampleContent(1)}
      </TeachingBubbleBody>
      <TeachingBubbleBody
        media={{
          src: 'mediaSrc-2',
        }}
      >
        <TeachingBubbleTitle>{'Title - 2'}</TeachingBubbleTitle>
        {ExampleContent(2)}
      </TeachingBubbleBody>
      <TeachingBubbleBody
        media={{
          src: 'mediaSrc-3',
        }}
      >
        <TeachingBubbleTitle>{'Title - 3'}</TeachingBubbleTitle>
        {ExampleContent(3)}
      </TeachingBubbleBody>
    </TeachingBubbleCarousel>
    {/* TeachingBubbleActions ensure that carousel & popover functionality work in sync */}
    <TeachingBubbleActions>
      <TeachingBubbleButton buttonType="secondary" altStepText="Close">
        {'Back'}
      </TeachingBubbleButton>
      <TeachingBubblePageCount countStyle="count">{'of'}</TeachingBubblePageCount>
      <TeachingBubbleButton buttonType="primary" altStepText="Finish">
        {'Next'}
      </TeachingBubbleButton>
    </TeachingBubbleActions>
  </TeachingBubbleSurface>
</TeachingBubble>
```

## Variants

#### Carousel Vs Non-Carousel:

Dictated by a TeachingBubbleCarousel wrapper being present or not, and must contain multiple TeachingBubbleBody pages.

#### Appearance:

TeachingBubble respects the appearance prop inherited from popover: default (current Theme) or 'brand' - 'inverted' has been deprecated for this component as it is not within current design spec.

#### TeachingBubblePageCount countStyle: Icon vs Count

'icon' will place visual buttons for reading & selecting page
'count' will display page numbers for reading, must be localized by user, or '/' will be used, i.e. '4/6'

#### TeachingBubbleBody mediaLength: 'short', 'medium', 'tall'

All media sizes have a uniform width of '288px' and accompanying heights:
Short: Enforces a height of: '117px'
Medium: Enforces a height of: '176px'
Tall: Enforces a height of: '288px'

#### TeachingBubbleButton - buttonType: 'primary', 'secondary'

This prop will dictate underlying style of the buttons, as well as handle alternate functionality for carousel:
Primary - Go to Next
Secondary - Go to Previous.

## API

See API at [TeachingBubble.types.ts](./src/components/TeachingBubble/TeachingBubble.types.ts).

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_

The V8 TeachingBubble was a unified single component with a visibility flag, the data and especially localized strings such as title, heading, and body text, will need to be segmented out into the appropriate sub-components and composed as described in sample code.

Primary/Secondary button props can be moved to 'TeachingBubbleButton' with a 'primary' and 'secondary' buttonType applied.

All popover logic, such as logic on dismiss or open, can be accessed via the underlying popover extension [Popover.md](../../react-popover/docs/Spec.md) - note that these classes have been extended, and their equivalent 'TeachingBubble' version should be used.

| Popover (v9)   | TeachingBubble (v9)                           |
| -------------- | --------------------------------------------- |
| Popover        | TeachingBubble                                |
| PopoverTrigger | TeachingBubbleTrigger + TeachingBubbleButtons |
| PopoverSurface | TeachingBubbleSurface                         |
| PopoverContext | PopoverContext + TeachingBubbleContext        |

The original PopoverContext provider is preserved, this ensures that popover functionality can be accessed via and compatible with the underlying inherited context hooks, while any TeachingBubble specific context is provided via TeachingBubbleContext.

TeachingBubbleTrigger has no additional functionality over PopoverTrigger, and is used to wrap the launch button or connected UI component. Internally, TeachingBubbleButtons provide primary/secondary action functionality and additional styling based on state over tge trigger wrapper.

Carousel logic, such as page change can be accessed via the TeachingBubbleCarousel's onPageChange and onFinish for external use or control.

## Behaviors

#### Popover Inheritance

TeachingBubble adheres to the same underlying behaviors as [Popover](../../react-popover/docs/Spec.md) for show/close functionality and all UI external to TeachingBubbleSurface.

#### TeachingBubbleCarousel

A TeachingBubbleCarousel contains multiple TeachingBubbleBody's, these pages will be controlled via the secondary/primary TeachingBubbleButtons that are keyboard accessible in the popovers' footer (TeachingBubbleActions).

Additionally, users are recommended to include a TeachingBubblePageCount that will aide the user with text based page data, or accessible icon interactions to select or skip to a specific page.

#### TeachingBubbleButton

These buttons will be used to control both the trigger action (close popover) and pagination (based on 'secondary' vs 'primary' button type) as well as being extendable to apply custom functionality such as opening a link from 'Learn More'. This functionality has deviated slightly from TeachingBubbleTrigger, as it requires additional style overrides for branded appearance.

#### TeachingBubbleHeader

Info tip subtitle located at the top of the popover, provides a dismiss button by default (can be nulled) and an infotip icon that can be overridden or removed, text displayed will be the children of TeachingBubbleHeader.

#### TeachingBubbleTitle

TeachingBubbleTitle is intended to provide a sub-header for TeachingBubbleBody, it does not provide a dismiss by default, but is available via 'showDismiss' - there should only ever be one 'dismiss' icon, so this option is intended for when no TeachingBubbleHeader is provided.

#### TeachingBubbleBody

This body section encapsulates a standardized media slot, with short/medium/tall size settings via mediaLength prop (TeachingBubbleBodyMediaLength type). It also acts as a boundary for pages within a TeachingBubbleCarousel, and will be paginated based on this encapsulation.

## Accessibility

Focus and popover functionality will be handled by the underlying popover and focus zone, see functionality breakdown here: [Popover.md](../../react-popover/docs/Spec.md)

Keyboard accessibility will follow the default DOM tab order, and all interaction elements are ARIA compliant buttons, including the icon version of carousel pagination.

Tabster tabBehavior: 'limited' is applied to the carousel icons, using 'Enter' will dive into the list of page icons, and can be exited via continuing tab, or using 'escape' key.
