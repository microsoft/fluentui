import * as React from 'react';
import { Text, mergeClasses, makeStyles } from '@fluentui/react-components';
import { Attach24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  mediaObject: {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '4px',
  },
  media: {
    gridRowStart: 'span 2',
  },
  centerExample: {
    justifyContent: 'center',
  },
});

export const GridIconMediaObject = () => {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.mediaObject, styles.centerExample)}>
      <Attach24Regular className={styles.media} />
      <Text size={400} weight="bold">
        File.tsx
      </Text>
      <Text size={200}>256 Gb</Text>
    </div>
  );
};
