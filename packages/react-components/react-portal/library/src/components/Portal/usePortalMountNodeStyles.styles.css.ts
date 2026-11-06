import styles from './Portal.module.css';
import { clsx } from 'clsx';

export const usePortalMountNodeClassName = (themeClassName: string, className?: string): string => {
  return clsx(themeClassName, styles.root, className);
};
