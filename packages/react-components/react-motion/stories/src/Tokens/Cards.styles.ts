import styles from './Cards.module.css';

export const useClasses = (): typeof styles => styles;

const cardClasses = {
  container: styles.cardClassesContainer,
  point: styles.point,
  graph: styles.graph,
  graphP: styles.graphP,
  graphT: styles.graphT,
  svg: styles.svg,
  path: styles.path,
  duration: styles.duration,
  view: styles.view,
  title: styles.title,
  name: styles.name,
  value: styles.value,
};

export const useCardClasses = (): typeof cardClasses => cardClasses;
