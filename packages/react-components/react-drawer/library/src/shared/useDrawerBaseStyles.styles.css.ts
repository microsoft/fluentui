import { clsx } from 'clsx';
import type { GriffelResetStyle } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { DrawerBaseState } from './DrawerBase.types';
import styles from './DrawerBase.module.css';

export const drawerCSSVars = { drawerSizeVar: '--fui-Drawer--size' };

export const drawerDefaultStyles: GriffelResetStyle = {
  overflow: 'hidden',

  width: `var(${drawerCSSVars.drawerSizeVar})`,
  maxWidth: '100vw',
  height: 'auto',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
};

export const useDrawerDefaultClassName = (): string => styles.root;

export const useDrawerBottomBaseStyles = (): Record<'small' | 'medium' | 'large' | 'full', string> => ({
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  full: styles['bottom-full'],
});

export const useDrawerBaseClassNames = ({ position, size }: DrawerBaseState): string =>
  clsx(styles[position], styles[size]);
