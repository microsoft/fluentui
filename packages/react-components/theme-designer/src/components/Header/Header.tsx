import * as React from 'react';
import {
  FluentProvider,
  makeStyles,
  mergeClasses,
  Text,
  tokens,
  webDarkTheme,
  Button,
} from '@fluentui/react-components';

const MFSTLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
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
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: tokens.spacingHorizontalL,
    gap: tokens.spacingHorizontalS,
  },
  text: {
    width: '300px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  link: {
    paddingRight: tokens.spacingHorizontalL,
  },
});

export const Header: React.FC<HeaderProps> = props => {
  const styles = useStyles();

  const handleClick = () => {
    const url = 'https://github.com/microsoft/fluentui/discussions';
    window.open(url, '_blank');
  };

  return (
    <FluentProvider theme={webDarkTheme} className={mergeClasses(styles.root, props.className)}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <MFSTLogo />
          <Text className={styles.text}>Theme Designer</Text>
        </div>
        <div className={styles.link}>
          <Button
            size="small"
            appearance="outline"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={handleClick}
          >
            Give Feedback
          </Button>
        </div>
      </div>
    </FluentProvider>
  );
};
