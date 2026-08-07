import * as React from 'react';
import { clsx } from 'clsx';
import { FluentProvider, Text, webDarkThemeClassName, Button } from '@fluentui/react-components';
import styles from './Header.module.css';

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

export const Header: React.FC<HeaderProps> = props => {
  const handleClick = () => {
    const url = 'https://github.com/microsoft/fluentui/discussions';
    window.open(url, '_blank');
  };

  return (
    <FluentProvider themeClassName={webDarkThemeClassName} className={clsx(styles.root, props.className)}>
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
