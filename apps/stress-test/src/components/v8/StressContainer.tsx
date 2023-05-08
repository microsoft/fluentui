import { mergeStyleSets } from '@fluentui/react';
import * as React from 'react';
import { injectGlobalCss } from '../../shared/css/injectStyles';
import { getTestOptions } from '../../shared/utils/testOptions';
import { performanceMeasure } from '../../shared/utils/performanceMeasure';
import { StressComponent } from './StressComponent';

const styles = mergeStyleSets({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
});

export type StressContainerProps = {
  numChildren?: number;
};

export const StressContainer: React.FC<StressContainerProps> = ({ numChildren = 10 }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const { test } = getTestOptions();
    if (test === 'mount') {
      performanceMeasure('stress', 'start');
    } else if (test === 'inject-styles') {
      setTimeout(() => {
        performanceMeasure('stress', 'start');
        injectGlobalCss('');
      }, 2000);
    } else if (test === 'prop-update') {
      setTimeout(() => {
        performanceMeasure('stress', 'start');
        setChecked(true);
      }, 2000);
    }
  }, []);

  const kids = new Array(numChildren).fill('1');
  return (
    <div className={styles.container}>
      {kids.map((_, index) => {
        return <StressComponent key={index.toString()} checked={checked} />;
      })}
    </div>
  );
};
