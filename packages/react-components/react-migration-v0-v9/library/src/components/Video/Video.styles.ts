import styles from './Video.module.css';

const videoStyles = {
  root: styles.root,
};

export const useVideoStyles = (): typeof videoStyles => videoStyles;
