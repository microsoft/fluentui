import * as React from 'react';
import {
  ColorPicker,
  ChoiceGroup,
  IChoiceGroupOption,
  Toggle,
  getColorFromString,
  IColor,
  IColorPickerStyles,
  IColorPickerProps,
  updateA,
} from 'office-ui-fabric-react/lib/index';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useConstCallback } from '@uifabric/react-hooks';

const white = getColorFromString('#ffffff')!;

export const ColorPickerBasicExample: React.FunctionComponent = () => {
  const [color, setColor] = React.useState(white);
  const [showPreview, setShowPreview] = React.useState(true);
  const [alphaType, setAlphaType] = React.useState<IColorPickerProps['alphaType']>('alpha');

  const updateColor = useConstCallback((ev: any, colorObj: IColor) => setColor(colorObj));
  const onShowPreviewClick = useConstCallback((ev: any, checked?: boolean) => setShowPreview(!!checked));
  const onAlphaTypeChange = React.useCallback(
    (ev: any, option: IChoiceGroupOption = alphaOptions[0]) => {
      if (option.key === 'none') {
        // If hiding the alpha slider, remove transparency from the color
        setColor(updateA(color, 100));
      }
      setAlphaType(option.key as IColorPickerProps['alphaType']);
    },
    [color],
  );

  return (
    <div className={classNames.wrapper}>
      <ColorPicker
        color={color}
        onChange={updateColor}
        alphaType={alphaType}
        showPreview={showPreview}
        styles={colorPickerStyles}
        // The ColorPicker provides default English strings for visible text.
        // If your app is localized, you MUST provide the `strings` prop with localized strings.
        strings={{
          // By default, the sliders will use the text field labels as their aria labels.
          // If you'd like to provide more detailed instructions, you can use these props.
          alphaAriaLabel: 'Alpha slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          transparencyAriaLabel:
            'Transparency slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          hueAriaLabel: 'Hue slider: Use left and right arrow keys to change value, hold shift for a larger jump',
        }}
      />

      <div className={classNames.column2}>
        <Toggle label="Show preview box" onChange={onShowPreviewClick} checked={showPreview} />
        <ChoiceGroup
          label="Alpha slider type"
          options={alphaOptions}
          defaultSelectedKey={alphaOptions[0].key}
          onChange={onAlphaTypeChange}
        />
      </div>
    </div>
  );
};

const alphaOptions: IChoiceGroupOption[] = [
  { key: 'alpha', text: 'Alpha' },
  { key: 'transparency', text: 'Transparency' },
  { key: 'none', text: 'None' },
];

const classNames = mergeStyleSets({
  wrapper: { display: 'flex' },
  column2: { marginLeft: 10 },
});

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 12 },
  root: {
    maxWidth: 352,
    minWidth: 352,
  },
  colorRectangle: { height: 268 },
};
