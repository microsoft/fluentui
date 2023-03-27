import * as React from 'react';
import { makeStyles, mergeClasses, webDarkTheme, FluentProvider, Text, Input, useId } from '@fluentui/react-components';

export interface HeaderProps {
  className?: string;
}

const useStyles = makeStyles({
  title: {
    paddingLeft: '16px',
  },
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

export const Header: React.FC<HeaderProps> = props => {
  const styles = useStyles();

  return (
    <FluentProvider theme={webDarkTheme} className={mergeClasses(styles.root, props.className)}>
      <div className={styles.title}>
        <Text>Theme Provider</Text>
      </div>

      {/* <div className={styles.logo}>
        <CircleRegular />
        <Text>Color Tool</Text>
      </div>
      <div className={styles.element}>
        UI Colors <ChevronRightRegular /> New palette
      </div> */}
    </FluentProvider>
  );
};
