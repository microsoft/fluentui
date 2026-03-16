import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, makeStyles, tokens, ColorArea } from '@fluentui/react-components';
import type { ColorAreaProps } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const DEFAULT_COLOR_HSV = { h: 324, s: 0.5, v: 0.5, a: 1 };

export const ColorAreaDefault = (): JSXElement => {
  const styles = useStyles();

  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [namedColor, setNamedColor] = React.useState('');

  const onChange: ColorAreaProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName();
    if (_namedColor) {
      setNamedColor(_namedColor);
    }
  };
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);
  const ariaAttributes = {
    'aria-roledescription': '2D slider',
    'aria-valuetext': `Saturation ${color.s * 100}, Brightness: ${color.v * 100}, ${namedColor}`,
  };

  return (
    <div className={styles.example}>
      <ColorArea
        color={color}
        onChange={onChange}
        inputX={{ 'aria-label': 'Saturation', ...ariaAttributes }}
        inputY={{ 'aria-label': 'Brightness', ...ariaAttributes }}
      />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

ColorAreaDefault.parameters = {
  docs: {
    description: {
      story:
        'The `ColorArea` component allows users to adjust two channels of HSB color values against a two-dimensional gradient background.',
    },
  },
};
