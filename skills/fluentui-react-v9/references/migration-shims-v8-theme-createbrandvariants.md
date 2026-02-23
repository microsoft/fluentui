# Migration Shims/V8/Theme/createBrandVariants

The createBrandVariants shim method allows you to create a v9 BrandVariants (a.k.a brand ramp) from a v8 Palette.

The v9 BrandVariants has 16 colors while the v8 Palette has 9 brand colors. You can choose between two algorithms when calling the shim.

- pairs (default): This interpolates the colors between each pair of palette colors (e.g. themeDarker and themeDark). This works best for palettes that are a gradient of the same color.
- primaryAndEnds: This interpolates the colors between the themeDarker and themePrimary and then between themePrimary and themeLighterAlt. Each interpolation is a mix based on the step between BrandVariants colors (e.g. 40, 50, 60). This works best to create a smooth gradient from a palette that has varied colors.

You should also feel free to make changes to the BrandVariants after using the shim to handle special palette cases.

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { DefaultPalette } from '@fluentui/react';
import { Button, makeStyles, Textarea, TextareaProps, RadioGroup, Radio } from '@fluentui/react-components';
import { createBrandVariants } from '@fluentui/react-migration-v8-v9';

import { Meta } from '@storybook/react-webpack5';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    gridRowGap: '10px',
    justifyItems: 'start',
    padding: '5px',
  },
  editor: {
    width: '400px',
    height: '300px',
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '10px',
    justifyItems: 'start',
  },
  result: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '10px',
    rowGap: '5px',
  },
  colorBlock: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    border: '1px solid black',
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();

  const defaultPaletteText = JSON.stringify(DefaultPalette, null, 4);

  const [interpolation, setInterpolation] = React.useState('pairs');
  const [v8PaletteText, setV8PaletteText] = React.useState(defaultPaletteText);
  const [brandVariants, setBrandVariants] = React.useState({} as Record<string, string>);

  const [message, setMessage] = React.useState('');

  const onV8PaletteTextChange: TextareaProps['onChange'] = (_, data) => {
    setV8PaletteText(data.value);
  };

  const onResetPalette = () => {
    setV8PaletteText(defaultPaletteText);
  };

  const onCreateBrand = React.useCallback(() => {
    try {
      const v8Palette = JSON.parse(v8PaletteText);
      const brand = createBrandVariants(v8Palette, interpolation as 'pairs' | 'primaryAndEnds');
      setBrandVariants(brand as unknown as Record<string, string>);
    } catch (e) {
      setMessage((e as Error).message);
    }
  }, [interpolation, v8PaletteText]);

  return (
    <div className={styles.root}>
      <h2>v8 Palette</h2>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={v8PaletteText}
        onChange={onV8PaletteTextChange}
      />

      <RadioGroup value={interpolation} onChange={(_, data) => setInterpolation(data.value)}>
        <Radio label="pairs" value="pairs" />
        <Radio label="primaryAndEnds" value="primaryAndEnds" />
      </RadioGroup>
      <div className={styles.actions}>
        <Button onClick={onCreateBrand}>Create</Button>
        <Button onClick={onResetPalette}>Reset</Button>
      </div>
      <div>{message}</div>
      <h2>v9 BrandVariants</h2>
      <div className={styles.result}>
        {Object.keys(brandVariants).map(key => (
          <>
            <div>{key}</div>
            <div>
              {brandVariants[key]}&nbsp;
              <span className={styles.colorBlock} style={{ backgroundColor: brandVariants[key] }} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Theme/createBrandVariants',
  component: React.Fragment,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
```
