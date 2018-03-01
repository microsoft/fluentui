/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle';
import { ShimmerRectangle } from '../ShimmerRectangle/ShimmerRectangle';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';

// tslint:disable:jsx-no-lambda
export const ShimmerBasicExample = () => (
  <div style={ { padding: '2px' } }>
    <Shimmer>
      <ShimmerCircle />
      <ShimmerRectangle />
    </Shimmer>
    <br />
    <Shimmer>
      <ShimmerCircle
        height='40px'
      />
      <ShimmerCircle />
      <ShimmerRectangle />
    </Shimmer>
  </div>
);
