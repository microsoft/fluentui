---
id: card
title: fluent-card
sidebar_label: card
custom_edit_url: https://github.com/microsoft/fluentui/edit/master/packages/web-components/src/card/README.md
---

# fluent-presence-badge

## Overview

A `fluent-presence-badge` is designed to be used with the Avatar control to display a status icon based on the in/out/busy status of an Office user.

## API

Extends FAST Element

_Component Name_

- `fluent-presence-badge`

_Attributes_

- `status` - string value that sets the icon to display: `"available" | "away" | "busy" | "dnd" | "outofoffice" | "offline" | "blocked"`
- `outofoffice` - boolean value that shows user's in/out of office status and visually overrides the status icon for `"away"` and `"offline"` and switches other status icons to the fluent outline

**Events**

- None

## Anatomy and appearance

```html
<!-- shadow root -->
<div aria-hidden="true" class="presence-badge">
  <slot name="busy">
    <svg><path></path></svg>
  </slot>
</div>
<!-- end shadow root -->
```

_Slot names_

- available
- away
- busy
- dnd
- offline
- unknown
- blocked
- outofoffice

_Host attributes_

status =

- available
- away
- busy
- dnd
- offline
- unknown
- blocked
- outofoffice

## CSS overrides

The badge can be customized several ways:

- icon size and color can be changed
  - `--presence-size: 16px` can be changed
  - Color can be changed for each status:
    - `--presence-color-available`
    - `--presence-color-away`
    - `--presence-color-busy`
    - `--presence-color-do-no-disturb`
    - `--presence-color-offline`
    - `--presence-color-unknown`
    - `--presence-color-blocked`
    - `--presence-color-out-of-office`
- icon mask width and color
  - `--presence-mask-width: 8px;`
  - `--presence-mask-color: #464775`
- icon glyph (svg) can be changed

## Usage

```html live
<fast-design-system-provider use-defaults>
  <!-- common usage -->
  <fluent-presence-badge status="busy" title="Busy"></fluent-presence-badge>

  <!-- custom color -->
  <fluent-presence-badge status="busy" title="Busy" style="--presence-color-busy: #929292;"></fluent-presence-badge>

  <!-- custom icon slotted -->

  <fluent-presence-badge status="do-not-disturb" title="Do Not Disturb">
    <svg slot="do-not-disturb" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
      <path d="m16 8c0 4.4183-3.5817 8-8 8-4.41828 0-8-3.5817-8-8 0-4.41828 3.58172-8 8-8 4.4183 0 8 3.58172 8 8z" />
    </svg>
  </fluent-presence-badge>
</fast-design-system-provider>
```

### Accessibility

The element is for display only and is aria-hidden and does not receive focus.

### Globalization

There is no RTL presentation.

### Test Plan

Testing is still TBD for our web components, I would expect this to align with the testing strategy and not require additional test support.
