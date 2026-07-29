import * as React from 'react';
import { clsx } from 'clsx';
import { webDarkTheme, FluentProvider, Text, Input, useId } from '@fluentui/react-components';
import { CircleRegular, ChevronRightRegular, EditRegular } from '@fluentui/react-icons';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import styles from './Nav.module.css';

export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = props => {
  const underlineId = useId('input-underline');

  const {
    state: { themeName },
  } = useThemeDesigner();

  return (
    <FluentProvider theme={webDarkTheme} className={clsx(styles.root, props.className)}>
      <div className={styles.logo}>
        <CircleRegular />
        <Text>Color Tool</Text>
      </div>
      <div className={styles.element}>
        UI Colors <ChevronRightRegular /> New palette
      </div>
      <div className={styles.element}>
        <Input
          appearance="underline"
          id={underlineId}
          contentAfter={<EditRegular />}
          placeholder={'myTheme'}
          value={themeName === 'myTheme' ? '' : themeName}
        />
      </div>
    </FluentProvider>
  );
};
