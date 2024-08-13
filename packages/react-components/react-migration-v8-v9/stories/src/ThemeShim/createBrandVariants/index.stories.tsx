import * as React from 'react';

import { DefaultPalette } from '@fluentui/react';
import { Button, makeStyles, Textarea, TextareaProps, RadioGroup, Radio } from '@fluentui/react-components';
import { createBrandVariants } from '@fluentui/react-migration-v8-v9';

import descriptionMd from './Description.md';
import { Meta } from '@storybook/react';

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

export const Default = () => {
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
