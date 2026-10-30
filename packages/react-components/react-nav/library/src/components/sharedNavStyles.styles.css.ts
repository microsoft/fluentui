import { tokens } from '@fluentui/react-theme';
import styles from './sharedNavStyles.module.css';

export const navItemTokens = {
  defaultDrawerWidth: 260,
  indicatorOffset: 16,
  indicatorWidth: 4,
  indicatorHeight: 20,
  backgroundColor: tokens.colorNeutralBackground4,
  backgroundColorHover: tokens.colorNeutralBackground4Hover,
  backgroundColorPressed: tokens.colorNeutralBackground4Pressed,
  animationTokens: {
    animationDuration: tokens.durationFaster,
    animationFillMode: 'both',
    animationTimingFunction: tokens.curveLinear,
  },
  transitionTokens: {
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveLinear,
    transitionProperty: 'background',
  },
};

export const useRootDefaultClassName = (): string => styles.root;
export const useSmallStyles = (): Record<'root', string> => ({ root: styles.small });
export const useContentStyles = (): Record<'selected', string> => ({ selected: styles.contentSelected });
export const useIndicatorStyles = (): Record<'base', string> => ({ base: styles.indicator });
export const useIconStyles = (): Record<'base' | 'selected', string> => ({
  base: styles.icon,
  selected: styles.selected,
});
