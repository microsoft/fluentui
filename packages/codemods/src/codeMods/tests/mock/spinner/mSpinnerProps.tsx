/* eslint-disable deprecation/deprecation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';

export const RenderSpinner = (props: any) => {
  return (
    <div>
      {/* SpinnerType is a deprecated enum */}
      {/* Instead, use SpinnerSize, which has 4 types instead of 2. */}
      <Spinner type={SpinnerType.normal} />
      <Spinner type={SpinnerType.large}> Woo Hoo! </Spinner>
    </div>
  );
};
