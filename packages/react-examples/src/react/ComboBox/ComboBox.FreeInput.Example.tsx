import * as React from 'react';
import { ComboBox, IComboBoxProps } from '@fluentui/react';
import type { IComboBoxOption } from '@fluentui/react';

const options: IComboBoxOption[] = [
  {
    key: 'apple',
    text: 'apple',
  },
  {
    key: 'aardvark',
    text: 'aardvark',
  },
];

export const ComboBoxFreeInputExample: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string>('');
  const [customPendingValueIndex, setCustomPendingValueIndex] = React.useState<number>(-1);

  const filteredOptions = searchTerm ? options.filter(opt => opt.text.toLowerCase().startsWith(searchTerm)) : options;

  const handleChange: IComboBoxProps['onChange'] = (e, o, i, v) => {
    if (o) {
      setSelected(o.key.toString());
      setCustomPendingValueIndex(options.indexOf(o) ?? -1);
      console.log(customPendingValueIndex);
    }
    if (!o && v) {
      setCustomPendingValueIndex(-1);
    }
  };

  function handleInputChange(o: string) {
    setSearchTerm(o);
  }

  function handlePendingChange(option, index, value) {
    console.log(option, index, value);
  }

  return (
    <div>
      <ComboBox
        allowFreeform
        placeholder={'Select a thing...'}
        selectedKey={selected ? selected : null}
        prefix="#"
        options={filteredOptions}
        autoComplete={'on'}
        style={{ marginBottom: '1rem' }}
        onInputValueChange={handleInputChange}
        openOnKeyboardFocus
        calloutProps={{ alignTargetEdge: true }}
        onChange={handleChange}
        customPendingValueIndex={customPendingValueIndex}
      />
    </div>
  );
};
