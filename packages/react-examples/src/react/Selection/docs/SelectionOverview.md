Selection is a store that maintains the selection state of items in an efficient way.
It exposes methods for accessing the selection state given an item index.
If the items change, it can resolve the selection if items move in the array.

SelectionZone is a React component that acts as a mediator between the Selection object and elements. By providing it the Selection instance and rendering content within it, you can have it manage clicking/focus/keyboarding from the DOM and translate into selection updates. You just need to provide the right data-selection-\* attributes on elements within each row/tile to give SelectionZone a hint what the intent is.

SelectionZone also takes in an onItemInvoked callback for when items are invoked. Invoking occurs when a user double clicks a row, presses enter while focused on it, or clicks within an element marked by the data-selection-invoke attribute.

Available attributes:

- **data-selection-index:** the index of the item being represented.This would go on the root of the tile/row.
- **data-selection-invoke:** this boolean flag would be set on the element which should immediately invoke the item on click.There is also a nuanced behavior where we will clear selection and select the item if mousedown occurs on an unselected item.
- **data-selection-toggle:** this boolean flag would be set on the element which should handle toggles.This could be a checkbox or a div.
- **data-selection-toggle-all:** this boolean flag indicates that clicking it should toggle all selection.
- **data-selection-disabled:** allows a branch of the DOM to be marked to ignore input events that alter selections.
- **data-selection-select:** allows a branch of the DOM to ensure that the current item is selected upon interaction
