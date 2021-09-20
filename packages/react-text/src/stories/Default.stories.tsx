import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Text } from '../Text';
import type { TextProps } from '../Text';

const useStyles = makeStyles({
  container: {
    width: '100px',
  },
});

export const Default = (props: TextProps) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Text {...props}>This is an example of the Text component's usage.</Text>
    </div>
  );
};

Default.argTypes = {
  wrap: {
    defaultValue: true,
    control: 'boolean',
  },
  truncate: {
    defaultValue: false,
    control: 'boolean',
  },
  underline: {
    defaultValue: false,
    control: 'boolean',
  },
  block: {
    defaultValue: false,
    control: 'boolean',
  },
  italic: {
    defaultValue: false,
    control: 'boolean',
  },
  strikethrough: {
    defaultValue: false,
    control: 'boolean',
  },
  size: {
    defaultValue: 300,
    type: { name: 'number', required: false },
    control: {
      type: 'select',
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
  font: {
    defaultValue: 'base',
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['base', 'monospace', 'numeric'],
    },
  },
  weight: {
    defaultValue: 'regular',
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['regular', 'medium', 'semibold'],
    },
  },
  align: {
    defaultValue: 'start',
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['start', 'center', 'end', 'justify'],
    },
  },
};
