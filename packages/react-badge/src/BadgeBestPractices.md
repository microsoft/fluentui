<details>
<summary>
 Best Practices
</summary>

### Badges should not receive focus

- Badge information should be surfaced as part of the control that it is associated with, because, badges themselves do not receive focus meaning they are not directly accessible by screen readers.
  If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

### Screen Readers

- Badges should be given a meaningful description. This description will be applied, via “aria-describedby” to the element decorated by the Badge. For example, "Chat, 6 unread" or similar.
  General guidance is that the badge icon is marked as “aria-hidden” by default.

### Badge shouldn't rely only on color information

- Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only [unread dot] ensure that non-visual information is included using aria-describedby

### Text on Badge

- Badges are intented to have short text, small numerical values or status information. Long text is not supported and should not be used within a Badge.
</details>
