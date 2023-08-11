import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { Form } from './Form';

export interface SidebarProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <Form />
    </div>
  );
};
