import styles from './SafeZoneArea.module.css';

export const useStyles = (): Record<
  'wrapper' | 'wrapperActive' | 'svg' | 'safeZone' | 'safeZoneDebug' | 'rectDebug',
  string
> => ({
  wrapper: styles.wrapper,
  wrapperActive: styles.wrapperActive,
  svg: styles.svg,
  safeZone: styles.safeZone,
  safeZoneDebug: styles.safeZoneDebug,
  rectDebug: styles.rectDebug,
});
