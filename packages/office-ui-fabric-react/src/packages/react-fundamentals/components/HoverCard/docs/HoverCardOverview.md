HoverCards supplement content associated with a specific data element.

Two scenarios to consider for your own use case from an accessibility point of view when deciding how the card should open and it's behavior after it opened:

- Tabbing with a keyboard to the element triggering the HoverCard to open on focus. In this case no further navigation within the card is available and navigating to the next element will close the card. See Example 1.
- Tabbing with a keyboard to the element triggering the HoverCard and wait to open till the hotKey is depressed. When card is opened it will automatically focus the first focusable element of the card content. See Example 2.
