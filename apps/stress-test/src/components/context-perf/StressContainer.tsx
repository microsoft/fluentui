import { makeStyles, shorthands } from '@fluentui/react-components';
import * as React from 'react';
import { getTestParams } from '../../shared/testParams';
import { performanceMeasure } from '../../shared/performanceMeasure';
import { StressComponent } from './StressComponent';
import { contexts } from './contexts';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('10px'),
  },
});

export type StressContainerProps = {
  numChildren?: number;
};

export const StressContainer: React.FC<StressContainerProps> = ({ numChildren = 10 }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const { test } = getTestParams();
    if (test === 'mount') {
      performanceMeasure('stress', 'start');
    } else if (test === 'prop-update') {
      setTimeout(() => {
        performanceMeasure('stress', 'start');
        setChecked(true);
      }, 2000);
    }
  }, []);

  const styles = useStyles();

  const kids = new Array(numChildren).fill('1');
  return (
    <div className={styles.container}>
      {kids.map((_, index) => {
        const { Provider } = contexts[index];
        return (
          <Provider key={index} value={{ value: index }}>
            <StressComponent count={index} checked={checked} />
          </Provider>
        );
      })}
    </div>
  );
};
