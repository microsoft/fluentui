DetailsList is a derivative of the <a href='#/components/list'>List</a> component. It is a robust way to display an information rich collection of items. It can support powerful ways to aid a user in finding content with sorting, grouping and filtering. Lists are a great way to handle large amounts of content, but poorly designed Lists can be difficult to parse.

Use a DetailsList when density of information is critical. Lists can support single and multiple selection, as well as drag and drop and marquee selection. They are composed of a column header, which contains the metadata fields which are attached to the list items, and provide the ability to sort, filter and even group the list. List items are composed of selection, icon, and name columns at minimum. One can also include other columns such as Date Modified, or any other metadata field associated with the collection. Place the most important columns from left to right for ease of recall and comparison.

DetailsList is classically used to display files, but is also used to render custom lists that can be purely metadata. Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear. Be sure to leave ample width for each column’s data. If there are multiple lines of text in a column, consider the variable row height variant.

## My scrollable content isn't updating on scroll! What should I do?

Add the `data-is-scrollable="true"` attribute to your scrollable element containing the DetailsList.

By default, the List used within DetailsList will use the `BODY` element as the scrollable element. If you contain the List within a scrollable `DIV` using `overflow: auto` or `scroll`, the List needs to listen for scroll events on that element instead. On initialization, the List will traverse up the DOM looking for the first element with the `data-is-scrollable` attribute to know when element to listen to for knowing when to re-evaulate the visible window.
