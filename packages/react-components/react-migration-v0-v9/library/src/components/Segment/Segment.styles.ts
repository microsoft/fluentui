import styles from './Segment.module.css';

const segmentStyles = {
  segment: styles.segment,
};

export const useSegmentStyles = (): typeof segmentStyles => segmentStyles;
