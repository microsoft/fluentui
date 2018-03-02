/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';

// tslint:disable:jsx-no-lambda
export const ShimmerBasicExample = () => (
  <div style={ { padding: '2px' } }>
    <Shimmer
      width='100%'
    />
    <Shimmer
      width='50%'
    />
    <hr />
    <Shimmer
      width='80%'
      lineElements={ [
        { type: 'circle', diameter: '30px' },
        { type: 'gap', width: '5%' },
        { type: 'rectangular', height: '20px', verticalAlign: 'center' }
      ] }
    />
  </div>
);
