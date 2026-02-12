import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label, makeStyles, useId } from '@fluentui/react-components';
import { RangeSlider } from '@fluentui/react-slider';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '0.5rem',
  },
});

export const MinMax = (): JSXElement => {
  const labelId = useId('rangeslider-min-max-label-');
  const styles = useStyles();
  const min = 10;
  const max = 60;

  return (
    <>
      <Label id={labelId}>Min/Max Example</Label>
      <div className={styles.wrapper}>
        <Label aria-hidden>{min}</Label>
        <RangeSlider aria-labelledby={labelId} min={min} max={max} defaultValue={{ start: 20, end: 50 }} />
        <Label aria-hidden>{max}</Label>
      </div>
    </>
  );
};

MinMax.parameters = {
  docs: {
    description: {
      story:
        'Display textual min and max values alongside the RangeSlider to help users understand the available bounds.',
    },
  },
};
