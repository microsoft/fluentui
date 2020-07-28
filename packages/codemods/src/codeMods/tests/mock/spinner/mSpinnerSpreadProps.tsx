/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable deprecation/deprecation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Spinner, SpinnerType, ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

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

export const RenderSpinnerProps = (props: ISpinnerProps) => {
  return (
    <div>
      <Spinner {...props} id="pl">
        Spinner
      </Spinner>
      <Spinner {...props} />
    </div>
  );
};

export function RenderSpinnerPropsFunc(props: ISpinnerProps) {
  return (
    <div>
      <Spinner {...props} id="pf">
        Spinner
      </Spinner>
      <Spinner {...props} />
    </div>
  );
}

export const RenderSpinnerPropsArrow = (props: ISpinnerProps): any => <Spinner {...props} />;
