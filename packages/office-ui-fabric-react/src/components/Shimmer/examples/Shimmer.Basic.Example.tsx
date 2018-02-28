/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Shimmer } from '../Shimmer';
// import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';

// tslint:disable:jsx-no-lambda
export const ShimmerBasicExample = () => (
  <div style={ { padding: '2px' } }>
    <Shimmer
      isGeneric={ true }
    />
    <br />
    <Shimmer
      isGeneric={ false }
      hasCircle={ true }
    />
  </div>
);
