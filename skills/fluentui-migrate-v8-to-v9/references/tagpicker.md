# TagPicker / PeoplePicker Migration

v8 `TagPicker` and `PeoplePicker` used async `onResolveSuggestions` callbacks with data-driven items. v9 `TagPicker` is a composable component with declarative `<TagPickerOption>` children.

## Component Structure

### v8

```
<TagPicker>           — monolithic, async-suggestion-driven
```

### v9

```
<TagPicker>
  <TagPickerControl>
    <TagPickerGroup>  — renders the selected Tag chips
      <Tag />         — one per selected item
    </TagPickerGroup>
    <TagPickerInput>  — the text input
  </TagPickerControl>
  <TagPickerList>
    <TagPickerOption> — one per option (like <Option> in Combobox/Dropdown)
  </TagPickerList>
</TagPicker>
```

## Migration Strategy

v8 `onResolveSuggestions` (async) → v9: filter options yourself in state/memo and render only matching `<TagPickerOption>` children.

```tsx
// v8
<TagPicker
  onResolveSuggestions={filter => allPeople.filter(p => p.text.includes(filter))}
  selectedItems={selected}
  onChange={items => setSelected(items ?? [])}
/>;

// v9
const [query, setQuery] = React.useState('');
const [selected, setSelected] = React.useState<string[]>([]);

const visibleOptions = allOptions.filter(o => !selected.includes(o) && o.toLowerCase().includes(query.toLowerCase()));

<TagPicker
  selectedOptions={selected}
  onOptionSelect={(_, data) => {
    setSelected(data.selectedOptions);
    setQuery('');
  }}
>
  <TagPickerControl>
    <TagPickerGroup>
      {selected.map(opt => (
        <Tag key={opt} shape="rounded" dismissible dismissIcon={{ 'aria-label': 'remove' }} value={opt}>
          {opt}
        </Tag>
      ))}
    </TagPickerGroup>
    <TagPickerInput aria-label="Select people" value={query} onChange={e => setQuery(e.target.value)} />
  </TagPickerControl>
  <TagPickerList>
    {visibleOptions.map(opt => (
      <TagPickerOption key={opt} value={opt}>
        {opt}
      </TagPickerOption>
    ))}
  </TagPickerList>
</TagPicker>;
```

## TagPicker Prop Mapping

| v8 `IBasePickerProps`    | v9 `TagPickerProps`                                     | Notes                                              |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------------- |
| `onResolveSuggestions`   | Filter options in render                                | Async lookup → filter `<TagPickerOption>` children |
| `selectedItems`          | `selectedOptions`                                       | `string[]` of option values                        |
| `onChange`               | `onOptionSelect`                                        | `(_, data) => data.selectedOptions`                |
| `inputProps`             | Props on `<TagPickerInput>`                             |                                                    |
| `itemLimit`              | Check `data.selectedOptions.length` in `onOptionSelect` |                                                    |
| `getTextFromItem`        | `value` prop on `<TagPickerOption>`                     |                                                    |
| `pickerSuggestionsProps` | Compose your own `<TagPickerList>` content              |                                                    |
| `onEmptyInputFocus`      | Show all options when `query === ''` in your filter     |                                                    |
| `disabled`               | `disabled`                                              |                                                    |
| `styles`                 | `className` on sub-components                           |                                                    |
| `theme`                  | —                                                       | Use `FluentProvider`                               |

## TagPicker Props (v9)

| Prop                     | Notes                                                                   |
| ------------------------ | ----------------------------------------------------------------------- |
| `open` / `defaultOpen`   | Controlled / uncontrolled dropdown visibility                           |
| `selectedOptions`        | Controlled selected values (`string[]`)                                 |
| `defaultSelectedOptions` | Uncontrolled initial selection                                          |
| `onOptionSelect`         | `EventHandler<TagPickerOnOptionSelectData>`                             |
| `onOpenChange`           | `EventHandler<TagPickerOnOpenChangeData>`                               |
| `appearance`             | `"outline"` \| `"underline"` \| `"filled-darker"` \| `"filled-lighter"` |
| `size`                   | `"medium"` \| `"large"` \| `"extra-large"`                              |
| `inline`                 | Render popover inline in DOM order (not on `document.body`)             |

## Accessibility Notes

- Add `aria-label` to `<TagPickerInput>` — screen readers need an accessible name
- Communicate to users that Backspace removes the last tag when input is focused
- Known VoiceOver/Safari bug: dropdown items not navigable on iOS (same issue as `Combobox`)
