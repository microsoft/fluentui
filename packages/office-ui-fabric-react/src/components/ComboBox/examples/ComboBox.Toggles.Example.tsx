import * as React from 'react';
import {
  ComboBox,
  Fabric,
  IComboBoxOption,
  mergeStyles,
  SelectableOptionMenuItemType,
  Toggle,
} from 'office-ui-fabric-react/lib/index';
import { useBoolean } from '@uifabric/react-hooks';

const INITIAL_OPTIONS: IComboBoxOption[] = [
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

const wrapperClassName = mergeStyles({
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' },
  },
});

export const ComboBoxTogglesExample: React.FC = () => {
  const [autoComplete, { toggle: ToggleAutoComplete }] = useBoolean(false);
  const [allowFreeform, { toggle: ToggleAllowFreeform }] = useBoolean(true);

  return (
    <Fabric className={wrapperClassName}>
      <ComboBox
        label="ComboBox with toggleable freeform/auto-complete"
        key={'' + autoComplete + allowFreeform}
        allowFreeform={allowFreeform}
        autoComplete={autoComplete ? 'on' : 'off'}
        options={INITIAL_OPTIONS}
      />
      <Toggle label="Allow freeform" checked={allowFreeform} onChange={ToggleAllowFreeform} />
      <Toggle label="Auto-complete" checked={autoComplete} onChange={ToggleAutoComplete} />
    </Fabric>
  );
};
