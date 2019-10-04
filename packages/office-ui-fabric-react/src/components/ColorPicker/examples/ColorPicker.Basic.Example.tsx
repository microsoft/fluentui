import * as React from 'react';
import { ColorPicker, Toggle, getColorFromString, IColor, IColorPickerStyles, updateA, mergeStyleSets } from 'office-ui-fabric-react';
import { useConstCallback } from '@uifabric/react-hooks';

const classNames = mergeStyleSets({
  wrapper: {
    display: 'flex'
  },
  column2: {
    marginLeft: 10
  }
});

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 12 },
  root: {
    maxWidth: 352,
    minWidth: 352
  },
  colorRectangle: { height: 268 }
};

export const ColorPickerBasicExample: React.FunctionComponent = () => {
  const [color, setColor] = React.useState<IColor>(() => getColorFromString('#ffffff')!);
  const [showPreview, setShowPreview] = React.useState(true);
  const [showAlphaSlider, setShowAlphaSlider] = React.useState(true);

  const updateColor = useConstCallback((ev: React.SyntheticEvent<HTMLElement>, colorObj: IColor) => {
    setColor(colorObj);
  });

  const onShowPreviewClick = useConstCallback((ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setShowPreview(!!checked);
  });

  const onShowAlphaClick = useConstCallback((ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setShowAlphaSlider(!!checked);
    if (!checked) {
      // If hiding the alpha slider, remove transparency from the color
      setColor(prevColor => updateA(prevColor, 100));
    }
  });

  return (
    <div className={classNames.wrapper}>
      <ColorPicker
        color={color}
        onChange={updateColor}
        alphaSliderHidden={!showAlphaSlider}
        showPreview={showPreview}
        styles={colorPickerStyles}
      />

      <div className={classNames.column2}>
        <Toggle label="Show alpha slider" onChange={onShowAlphaClick} checked={showAlphaSlider} />
        <Toggle label="Show preview box" onChange={onShowPreviewClick} checked={showPreview} />
      </div>
    </div>
  );
};
