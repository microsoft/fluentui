import * as React from 'react';
import { makeStyles, mergeClasses, webDarkTheme, FluentProvider, Text, Input, useId } from '@fluentui/react-components';
import { CircleRegular, ChevronRightRegular, EditRegular } from '@fluentui/react-icons';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface NavProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 3fr 3fr',
    height: '40px',
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  element: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const Nav: React.FC<NavProps> = props => {
  const styles = useStyles();

  const underlineId = useId('input-underline');

  const {
    state: { themeName },
  } = useThemeDesigner();

  return (
    <FluentProvider theme={webDarkTheme} className={mergeClasses(styles.root, props.className)}>
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
