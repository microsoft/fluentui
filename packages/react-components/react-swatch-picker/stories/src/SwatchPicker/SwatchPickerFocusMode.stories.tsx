import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-components';
import type { SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

const colors = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
];

export const SwatchPickerFocusMode = (): JSXElement => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
  };

  return (
    <>
      <h3>Arrow navigation (default)</h3>
      <SwatchPicker
        focusMode="arrow"
        aria-label="SwatchPicker with arrow navigation"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {colors.map(color => (
          <ColorSwatch key={color.value} {...color} />
        ))}
      </SwatchPicker>
      <h3>Tab navigation</h3>
      <SwatchPicker
        focusMode="tab"
        aria-label="SwatchPicker with tab navigation"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {colors.map(color => (
          <ColorSwatch key={color.value} {...color} />
        ))}
      </SwatchPicker>
    </>
  );
};

SwatchPickerFocusMode.parameters = {
  docs: {
    description: {
      story:
        'The `focusMode` prop controls how focus moves between swatches. Use `"arrow"` (default) to navigate with arrow keys, or `"tab"` to navigate with the Tab key.',
    },
  },
};
