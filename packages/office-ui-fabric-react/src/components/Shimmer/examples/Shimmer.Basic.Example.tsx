/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Shimmer, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';

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
      width='90%'
      lineElements={ [
        { type: ShimmerElementType.CIRCLE, height: '39' },
        { type: 'gap', width: '5' },
        { type: 'rectangle', height: '20', verticalAlign: 'center', width: '30' },
        { type: 'gap', width: '5' },
        { type: 'rectangle', height: '10', verticalAlign: 'top', width: '10' },
        { type: 'gap', width: '10' },
        { type: 'rectangle', height: '30', verticalAlign: 'bottom' },
        { type: 'gap', width: '10' },
        { type: 'rectangle', height: '5', width: '20' }
      ] }
    />
  </div>
);
