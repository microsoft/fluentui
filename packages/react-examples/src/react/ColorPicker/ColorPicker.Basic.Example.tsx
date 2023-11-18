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
  mergeStyleSets,
} from '@fluentui/react';

const white = getColorFromString('#ffffff')!;

export const ColorPickerBasicExample: React.FunctionComponent = () => {
  const [color, setColor] = React.useState(white);
  const [showPreview, setShowPreview] = React.useState(true);
  const [alphaType, setAlphaType] = React.useState<IColorPickerProps['alphaType']>('alpha');

  const updateColor = React.useCallback((ev: any, colorObj: IColor) => setColor(colorObj), []);
  const onShowPreviewClick = React.useCallback((ev: any, checked?: boolean) => setShowPreview(!!checked), []);
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
          // Previously this example had more detailed instructions in the labels, but this is
          // a bad practice and not recommended. Labels should be concise, and match visible text when possible.
          hueAriaLabel: 'Hue',
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
