import * as React from 'react';
import { makeStyles, shorthands, Tooltip } from '@fluentui/react-components';
import {
  SwatchPicker,
  SwatchPickerOnSelectEventHandler,
  ColorSwatch,
  ColorSwatchProps,
} from '@fluentui/react-swatch-picker-preview';
import { renderSwatchPickerRow, renderSwatchPickerGrid } from '../../src/utils/renderUtils';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
  },
});

const colors = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { color: '#FEFF37', value: 'FEFF37', 'aria-label': 'yellow' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#011F5E', value: '011F5E', 'aria-label': 'dark blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

export const SwatchPickerLayout = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedColor);
  };

  const styles = useStyles();

  return (
    <>
      <h3>Row</h3>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        {colors.map((color, index) => {
          return <ColorSwatchWithTooltip key={`${color.value}-${index}`} {...color} />;
        })}
      </SwatchPicker>
      <h3>Grid</h3>
      <SwatchPicker
        grid
        aria-label="SwatchPicker default"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {renderSwatchPickerGrid(colors, 3, (row, index) => renderSwatchPickerRow(row, index, ColorSwatchWithTooltip))}
      </SwatchPicker>
      <div
        className={styles.example}
        style={{
          backgroundColor: selectedColor,
        }}
      />
    </>
  );
};

const ColorSwatchWithTooltip = (props: ColorSwatchProps) => {
  const { color, value } = props;
  const label = props['aria-label'] ?? 'color swatch';
  return (
    <Tooltip withArrow content={label} relationship="label">
      <ColorSwatch color={color} value={value} aria-label={label} />
    </Tooltip>
  );
};
