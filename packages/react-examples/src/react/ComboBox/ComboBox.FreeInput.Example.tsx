import * as React from 'react';
import { ComboBox } from '@fluentui/react';
import type { IComboBoxOption, IComboBoxStyles } from '@fluentui/react';

const options: IComboBoxOption[] = [
  { key: 'black', text: 'Black' },
  { key: 'blue', text: 'Blue' },
  { key: 'brown', text: 'Brown' },
  { key: 'cyan', text: 'Cyan' },
  { key: 'green', text: 'Green' },
  { key: 'magenta', text: 'Magenta', disabled: true },
  { key: 'mauve', text: 'Mauve' },
  { key: 'orange', text: 'Orange' },
  { key: 'pink', text: 'Pink' },
  { key: 'purple', text: 'Purple' },
  { key: 'red', text: 'Red' },
  { key: 'rose', text: 'Rose' },
  { key: 'violet', text: 'Violet' },
  { key: 'white', text: 'White' },
  { key: 'yellow', text: 'Yellow' },
];
// Optional styling to make the example look nicer
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

export const ComboBoxFreeInputExample: React.FunctionComponent = () => {
  return (
    <div>
      <ComboBox
        label="ComboBox with allowFreeInput and autocomplete"
        options={options}
        styles={comboBoxStyles}
        allowFreeInput
        autoComplete="on"
      />
      <ComboBox
        defaultSelectedKey="C"
        label="ComboBox with allowFreeInput without autocomplete"
        options={options}
        styles={comboBoxStyles}
        allowFreeInput
        autoComplete="off"
      />
      <ComboBox
        defaultSelectedKey="C"
        label="ComboBox with allowFreeInput and caseSensitive without autocomplete"
        options={options}
        styles={comboBoxStyles}
        allowFreeInput
        autoComplete="off"
        caseSensitive
      />
    </div>
  );
};
