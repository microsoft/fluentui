# Dropdown / Combobox Migration

## Architecture Change

In v8, both components are **data-driven**: pass an `options` array of `IDropdownOption` / `IComboBoxOption` objects.

In v9, both are **declarative**: compose `<Option>` (and `<OptionGroup>`) as JSX children. This is the same pattern shift as `ContextualMenu` → `Menu`.

The `onChange` callback is also renamed to `onOptionSelect` with a different signature.

## Dropdown

### Before / After — basic

```tsx
// v8
import { Dropdown, IDropdownOption } from '@fluentui/react';

const options: IDropdownOption[] = [
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'cherry', text: 'Cherry', disabled: true },
];

<Dropdown
  label="Fruit"
  placeholder="Select an option"
  options={options}
  selectedKey={selectedKey}
  onChange={(_, option) => setSelectedKey(option?.key as string)}
/>;
```

```tsx
// v9
import { Dropdown, Option, Field } from '@fluentui/react-components';

// Track both the display value (text) and the key (value)
const [selectedKey, setSelectedKey] = React.useState('');
const [selectedValue, setSelectedValue] = React.useState('');

<Field label="Fruit">
  <Dropdown
    placeholder="Select an option"
    value={selectedValue}
    selectedOptions={[selectedKey]}
    onOptionSelect={(_, data) => {
      setSelectedKey(data.optionValue ?? '');
      setSelectedValue(data.optionText ?? '');
    }}
  >
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
    <Option disabled value="cherry">
      Cherry
    </Option>
  </Dropdown>
</Field>;
```

### Before / After — multi-select

```tsx
// v8
<Dropdown
  multiSelect
  options={options}
  selectedKeys={selectedKeys}
  onChange={(_, option) => {
    if (option?.selected) {
      setSelectedKeys(prev => [...prev, option.key as string]);
    } else {
      setSelectedKeys(prev => prev.filter(k => k !== option?.key));
    }
  }}
/>
```

```tsx
// v9
<Dropdown
  multiselect
  selectedOptions={selectedKeys}
  value={selectedKeys.join(', ')}
  onOptionSelect={(_, data) => setSelectedKeys(data.selectedOptions)}
>
  <Option value="apple">Apple</Option>
  <Option value="banana">Banana</Option>
  <Option value="cherry">Cherry</Option>
</Dropdown>
```

### Before / After — grouped options

```tsx
// v8
import { DropdownMenuItemType } from '@fluentui/react';

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'divider', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegsHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'carrot', text: 'Carrot' },
];
```

```tsx
// v9
import { Dropdown, Option, OptionGroup } from '@fluentui/react-components';

<Dropdown>
  <OptionGroup label="Fruits">
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
  </OptionGroup>
  <OptionGroup label="Vegetables">
    <Option value="carrot">Carrot</Option>
  </OptionGroup>
</Dropdown>;
```

## IDropdownProps → DropdownProps

| v8                   | v9                               | Notes                                                                         |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `options`            | `<Option>` children              | Each `IDropdownOption` → `<Option>`                                           |
| `selectedKey`        | `selectedOptions={[key]}`        | v9 takes an array even for single select                                      |
| `selectedKeys`       | `selectedOptions={keys}`         | Multi-select                                                                  |
| `defaultSelectedKey` | `defaultSelectedOptions={[key]}` |                                                                               |
| `onChange`           | `onOptionSelect`                 | `(ev, data) => void`; data has `optionValue`, `optionText`, `selectedOptions` |
| `placeholder`        | `placeholder`                    |                                                                               |
| `label`              | `<Field label="...">` wrapper    | Same as other form controls                                                   |
| `disabled`           | `disabled`                       |                                                                               |
| `required`           | `required` on `<Field>`          |                                                                               |
| `errorMessage`       | `validationMessage` on `<Field>` |                                                                               |
| `multiSelect`        | `multiselect`                    | Casing change                                                                 |
| `calloutProps`       | `Listbox` props / `positioning`  |                                                                               |
| `styles`             | `className` + `makeStyles`       |                                                                               |
| `theme`              | `FluentProvider`                 |                                                                               |
| `componentRef`       | `ref`                            |                                                                               |

## IDropdownOption → Option

| v8 `IDropdownOption` | v9 `Option`            | Notes                                                           |
| -------------------- | ---------------------- | --------------------------------------------------------------- |
| `key`                | `value`                | `<Option value="apple">`                                        |
| `text`               | `children`             | `<Option>Apple</Option>`                                        |
| `disabled`           | `disabled`             |                                                                 |
| `hidden`             | —                      | Remove from the list instead                                    |
| `title`              | `title`                |                                                                 |
| `itemType: Header`   | `OptionGroup` label    | See grouped options example above                               |
| `itemType: Divider`  | `OptionGroup` boundary | No `OptionDivider` in v9; use separate `<OptionGroup>` elements |

---

## Combobox

### Before / After — Combobox basic

```tsx
// v8
import { ComboBox, IComboBoxOption } from '@fluentui/react';

const options: IComboBoxOption[] = [
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
];

<ComboBox
  label="Fruit"
  placeholder="Select or type"
  options={options}
  selectedKey={selectedKey}
  onChange={(_, option, __, value) => {
    if (option) setSelectedKey(option.key as string);
    else setInputValue(value ?? '');
  }}
  allowFreeInput
/>;
```

```tsx
// v9
import { Combobox, Option, Field } from '@fluentui/react-components';

const [selectedKey, setSelectedKey] = React.useState('');
const [inputValue, setInputValue] = React.useState('');

<Field label="Fruit">
  <Combobox
    placeholder="Select or type"
    value={inputValue}
    selectedOptions={[selectedKey]}
    onOptionSelect={(_, data) => {
      setSelectedKey(data.optionValue ?? '');
      setInputValue(data.optionText ?? '');
    }}
    onChange={e => setInputValue(e.target.value)} // freeform typing
    freeform // allow values not in the list
  >
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
  </Combobox>
</Field>;
```

### Filtering (autocomplete)

```tsx
// v9 — filter options based on input value
const [query, setQuery] = React.useState('');
const matches = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

<Combobox
  value={query}
  onChange={e => setQuery(e.target.value)}
  onOptionSelect={(_, data) => setQuery(data.optionText ?? '')}
>
  {matches.map(o => (
    <Option key={o} value={o}>
      {o}
    </Option>
  ))}
</Combobox>;
```

## IComboBoxProps → ComboboxProps

| v8                   | v9                               | Notes                                                       |
| -------------------- | -------------------------------- | ----------------------------------------------------------- |
| `options`            | `<Option>` children              |                                                             |
| `selectedKey`        | `selectedOptions={[key]}`        |                                                             |
| `onChange`           | `onOptionSelect` + `onChange`    | `onOptionSelect` for list picks; `onChange` for typed input |
| `allowFreeInput`     | `freeform`                       |                                                             |
| `autoComplete`       | `autoComplete`                   | `"on"` or `"off"`                                           |
| `label`              | `<Field label="...">` wrapper    |                                                             |
| `placeholder`        | `placeholder`                    |                                                             |
| `disabled`           | `disabled`                       |                                                             |
| `multiSelect`        | `multiselect`                    |                                                             |
| `text` (display val) | `value`                          | The text shown in the input                                 |
| `errorMessage`       | `validationMessage` on `<Field>` |                                                             |
| `styles`             | `className` + `makeStyles`       |                                                             |
| `theme`              | `FluentProvider`                 |                                                             |
| `componentRef`       | `ref`                            |                                                             |
