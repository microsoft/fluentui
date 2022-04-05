import * as React from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  SelectableOptionMenuItemType,
  PrimaryButton,
  IButtonStyles,
} from '@fluentui/react';

const options: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];
// Optional styling to make the example look nicer
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
const buttonStyles: Partial<IButtonStyles> = { root: { display: 'block', margin: '10px 0 20px' } };

export const ComboBoxBasicExample: React.FunctionComponent = () => {
  const comboBoxRef = React.useRef<IComboBox>(null);
  const onOpenClick = React.useCallback(() => comboBoxRef.current?.focus(true), []);

  return (
    <div>
      <ComboBox
        componentRef={comboBoxRef}
        defaultSelectedKey="C"
        label="Basic single-select ComboBox"
        options={options}
        styles={comboBoxStyles}
      />
      <PrimaryButton text="Open first ComboBox" onClick={onOpenClick} styles={buttonStyles} />

      <ComboBox
        defaultSelectedKey="C"
        label="Basic multi-select ComboBox"
        multiSelect
        options={options}
        styles={comboBoxStyles}
      />
    </div>
  );
};
