## Best practices

### Badges should not receive focus

- Badge information should be surfaced as part of the control that it is associated with, because, badges themselves do not receive focus meaning they are not directly accessible by screen readers.
  If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

### Screen Readers

Badge content is exposed as text, and is treated by screen readers as if it were inline content of the control it is associated with. This should provide a reasonable default for most badges that contain plain text, such as the `CounterBadge`.

There are two actions authors should consider taking when using Badge to improve this experience:

1. If the badge contains a custom icon, that icon must be given alternative text with `aria-label`, unless it is purely presentational:

```jsx
<Badge icon={<PasteIcon aria-label="paste" />} />
```

2. If the text of the badge itself is not sufficient to convey its meaning, it can either be given additional hidden text, or the parent element given an explicit label:

```jsx
<button>
  Inbox
  <Badge>6<span class="visuallyHidden"> unread messages</span></Badge>
</button>

<button aria-label="Inbox, 6 unread messages">
  Inbox
  <Badge>6</Badge>
</button>
```

### Badge shouldn't rely only on color information

- Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only [unread dot] ensure that non-visual information is included in the parent's label or description. Alternatively, mark up the Badge as an image with a label:

```jsx
<Badge role="img" aria-label="Active" appearance="filled" color="brand" />} />
```

### Text on Badge

- Badges are intented to have short text, small numerical values or status information. Long text is not supported and should not be used within a Badge.
