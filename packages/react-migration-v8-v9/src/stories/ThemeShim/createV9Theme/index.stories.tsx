import * as React from 'react';

import { createTheme } from '@fluentui/react';
import { Button, makeStyles, Textarea, TextareaProps, shorthands } from '@fluentui/react-components';
import { createV9Theme } from '../../../components/Theme/index';

import descriptionMd from './Description.md';
import { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    gridRowGap: '10px',
    justifyItems: 'start',
    ...shorthands.padding('5px'),
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
    ...shorthands.border('1px', 'solid', 'black'),
  },
});

export const Default = () => {
  const styles = useStyles();

  const defaultV8Theme = createTheme();
  const defaultV8ThemeText = JSON.stringify(defaultV8Theme, null, 4);

  const [v8ThemeText, setV8ThemeText] = React.useState(defaultV8ThemeText);
  const [v9Theme, setV9Theme] = React.useState({} as Record<string, string>);

  const [message, setMessage] = React.useState('');

  const onV8ThemeTextChange: TextareaProps['onChange'] = (_, data) => {
    setV8ThemeText(data.value);
  };

  const onResetTheme = () => {
    setV8ThemeText(defaultV8ThemeText);
  };

  const onCreateTheme = React.useCallback(() => {
    try {
      const v8Theme = JSON.parse(v8ThemeText);
      const newV9Theme = createV9Theme(v8Theme);
      setV9Theme((newV9Theme as unknown) as Record<string, string>);
    } catch (e) {
      setMessage((e as Error).message);
    }
  }, [v8ThemeText]);

  return (
    <div className={styles.root}>
      <h2>v8 Theme</h2>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={v8ThemeText}
        onChange={onV8ThemeTextChange}
      />
      <div className={styles.actions}>
        <Button onClick={onCreateTheme}>Create</Button>
        <Button onClick={onResetTheme}>Reset</Button>
      </div>
      <div>{message}</div>
      <h2>v9 Theme</h2>
      <div className={styles.result}>
        {Object.keys(v9Theme)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>
                {v9Theme[key]}&nbsp;
                {key.startsWith('color') && (
                  <span className={styles.colorBlock} style={{ backgroundColor: v9Theme[key] }} />
                )}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default {
  title: 'Migration Shims/Theme/createV9Theme',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
