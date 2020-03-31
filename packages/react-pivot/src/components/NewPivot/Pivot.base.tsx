import * as React from 'react';
import { IPivotProps } from './Pivot.types';
import { getNativeProps, divProperties } from '@uifabric/utilities';

export const PivotBase = (props: IPivotProps) => {
  // hook would go here.
  const { classes = {} } = props;
  const nativeProps = getNativeProps(props, divProperties);

  return (
    <div {...nativeProps} className={classes.root}>
      i am a pivot
    </div>
  );
};
