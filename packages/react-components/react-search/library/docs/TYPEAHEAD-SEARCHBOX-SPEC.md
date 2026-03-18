# Typeahead SearchBox — Design Spec

## Background

The [FluentUI design docs for SearchBox](https://fluent2.microsoft.design/components/web/react/core/searchbox/usage#content) describe a pattern for displaying search results beneath the input as the user types. The current `SearchBox` component has no built-in typeahead; this spec documents the recommended composable approach.

## Prior Art

- [OpenUI ComboBox research](https://open-ui.org/components/combobox.research/) — combobox suits a known finite option set, but is less practical for dynamically fetched results of unknown size.
- [FluentUI design docs for SearchBox](https://fluent2.microsoft.design/components/web/react/core/searchbox/usage#content) — guidance on sorting results; rendering is left to the developer.
- [Azure AI Search — Autocomplete](https://learn.microsoft.com/en-us/azure/search/search-add-autocomplete-suggestions)
- [FluentUI Blazor Search — Autocomplete](https://www.fluentui-blazor.net/Search#documentation)
- [Typeahead.js](https://typeahead.js.org/examples/) — mostly pre-fetched options rather than dynamic fetching.

## Approach

Rather than a sealed `TypeaheadSearchbox` component, this feature is delivered as a **composable pattern**: a Storybook story (and best-practices guidance) showing how to pair `SearchBox` with a results dropdown. This lets consumers plug in their own data-fetching layer (TanStack Query, SWR, custom hooks, etc.) and fully control result rendering.

### Sample Code

```tsx
<div style={{ position: 'relative' }}>
  <SearchBox
    role="combobox"
    aria-autocomplete="list"
    aria-controls={listboxId}
    aria-expanded={isOpen}
    aria-activedescendant={activeOptionId}
    value={query}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />
  <ul id={listboxId} role="listbox">
    {results.map(item => (
      <li key={item.id} role="option" aria-selected={item.id === selectedId}>
        {item.label}
      </li>
    ))}
  </ul>
</div>
```

See the **Typeahead** story for a complete, runnable example with debouncing, loading state, keyboard navigation, and ARIA live announcements.

## Behavior

### Component States

| State              | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **Rest**           | No text entered; dropdown hidden.                                                                     |
| **Typing**         | User is typing; after debounce, a search request fires and the dropdown opens with a loading spinner. |
| **Results loaded** | Results are displayed in the dropdown as a listbox.                                                   |
| **No results**     | Dropdown shows a "No results found" message.                                                          |
| **Item selected**  | Selected label fills the input; dropdown closes.                                                      |

### Interaction

- **Keyboard**
  - `ArrowDown` / `ArrowUp` — traverse the result list.
  - `Enter` — select the focused result (equivalent to click).
  - `Escape` — close the dropdown without selecting.
- **Pointer / Touch** — click or tap a result to select it.
- **Blur** — dropdown closes when focus leaves both the input and the listbox.

## Accessibility

The pattern follows the [ARIA combobox pattern](https://www.w3.org/WAI/ARIA/apd/patterns/combobox/):

| Element                  | Attributes                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Input (`SearchBox`)      | `role="combobox"`, `aria-autocomplete="list"`, `aria-controls`, `aria-expanded`, `aria-activedescendant` |
| Results container (`ul`) | `role="listbox"`, `aria-label="Search results"`                                                          |
| Each result (`li`)       | `role="option"`, `aria-selected`                                                                         |

- A **live region** (`aria-live="polite"`) announces loading state, result count, and "no results" to screen readers.
- Focus remains on the input at all times; `aria-activedescendant` communicates the visually focused option.
- The dismiss button and `Escape` key close the dropdown predictably.
