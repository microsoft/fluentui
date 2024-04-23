import * as React from 'react';
import { makeStyles, shorthands, Tooltip } from '@fluentui/react-components';
import {
  SwatchPicker,
  ColorSwatch,
  ColorSwatchProps,
  SwatchPickerOnSelectEventHandler,
} from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

export const SwatchPickerWithTooltip = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <ColorSwatchWithTooltip color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatchWithTooltip color="#FF7A00" value="FF7A00" aria-label="orange" />
        <ColorSwatchWithTooltip color="#90D057" value="90D057" aria-label="light green" />
        <ColorSwatchWithTooltip color="#00B053" value="00B053" aria-label="green" />
        <ColorSwatchWithTooltip color="#00AFED" value="00AFED" aria-label="light blue" />
        <ColorSwatchWithTooltip color="#006EBD" value="006EBD" aria-label="blue" />
        <ColorSwatchWithTooltip color="#011F5E" value="011F5E" aria-label="dark blue" />
        <ColorSwatchWithTooltip color="#712F9E" value="712F9E" aria-label="purple" />
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
