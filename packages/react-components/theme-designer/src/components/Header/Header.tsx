import * as React from 'react';
import { makeStyles, mergeClasses, webDarkTheme, FluentProvider, Text } from '@fluentui/react-components';

const MFSTLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
      <path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" />
      <path fill="#80CC28" d="M256 121.666H134.335V0H256z" />
      <path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" />
      <path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" />
    </svg>
  );
};
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
        <MFSTLogo />
        <Text>Theme Designer</Text>
      </div>
    </FluentProvider>
  );
};
