import * as React from 'react';
import {
  ComboBox,
  IComboBoxProps,
  IComboBoxOption,
  SelectableOptionMenuItemType,
} from 'office-ui-fabric-react/lib/index';

const comboBoxBasicOptions: IComboBoxOption[] = [
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

const getErrorMessage = (value: number | string) => {
  if (value === 'B') {
    return 'B is not an allowed option';
  }
  return '';
};

export const ComboBoxErrorHandlingExample: React.FC = () => {
  const [dynamicErrorValue, setDynamicErrorValue] = React.useState('');

  const onChange: IComboBoxProps['onChange'] = (event, option) => {
    if (option) {
      setDynamicErrorValue(option.key);
    }
  };

  return (
    <div>
      <ComboBox
        label="ComboBox with static error message"
        defaultSelectedKey="B"
        errorMessage="Oh no! This ComboBox has an error!"
        options={comboBoxBasicOptions}
      />
      <ComboBox
        label="ComboBox with dynamic error message"
        onChange={onChange}
        selectedKey={dynamicErrorValue}
        errorMessage={getErrorMessage(dynamicErrorValue)}
        options={comboBoxBasicOptions}
      />
    </div>
  );
};
