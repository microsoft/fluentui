/* eslint-disable prefer-const */
/* eslint-disable deprecation/deprecation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';

export const RenderSpinner = (props: any) => {
  const propsTest = { type: SpinnerType.normal, ariaLabel: 'Spinner!' };
  return (
    <div>
      <Spinner {...propsTest} id="d">
        Spinner
      </Spinner>
      {/* include self closing Spinner check */}
      <Spinner {...propsTest} id="d1" />
    </div>
  );
};

export const RenderLetSpinner = (props: any) => {
  let propsTest = { type: SpinnerType.normal, ariaLabel: 'Spinner!' };
  return (
    <div>
      <Spinner {...propsTest} id="l">
        Woo hoo!
      </Spinner>
      <Spinner {...propsTest} />
    </div>
  );
};

const propsForArrow = { type: SpinnerType.normal, ariaLabel: 'Spinner!' };

export const RenderSpinnerPropsArrow = (): any => <Spinner {...propsForArrow} />;
