### Layout

- Hover cards, particularly expanding hover cards, are not well suited to small display sizes. It is best to only display the hover card on larger viewports.
- Hover cards contain both compact and expanded states, with the compact state appearing after 500 milliseconds and the expanded state appearing as the user continues to hover after 1500 milliseconds.
- The hover card positions itself automatically, depending upon where the target is on the viewport. Position the target so the card doesn’t obstruct inline commanding on the item.
- When setting an explicit `directionalHint`, the hover card will not automatically adjust position based on screen availability unless `directionalHintFixed: false` is explicitly set.

### Accessibility

Hover cards are not accessible to anyone not using a mouse with hover capability. It is strongly suggested that any information or functionality available in the hover card is also easily accessible through another means. An example is using a hover card to preview page content on a link, where the content can also be accessed by following the link.
