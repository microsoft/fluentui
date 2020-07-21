HoverCards supplement content associated with a specific data element.

Two scenarios to consider for your own use case from an accessibility point of view when deciding how the card should open and its behavior after it opened:

- Tabbing with a keyboard to the element triggering the HoverCard to open on focus (see first example). In this case no further navigation within the card is available and navigating to the next element will close the card.
- Tabbing with a keyboard to the element triggering the HoverCard and opening when the hotKey is pressed (see second example). When the card is opened it will automatically focus the first focusable element of the card content.
