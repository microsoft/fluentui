import * as React from 'react';
import { Spinner, SpinnerType, ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

// tslint:disable-next-line: no-any
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

// tslint:disable-next-line: no-any
export const RenderLetSpinner = (props: any) => {
  // tslint:disable-next-line: prefer-const
  let propsTest = { type: SpinnerType.normal, ariaLabel: 'Spinner!' };
  return (
    <div>
      <Spinner {...propsTest} id="l">
        Yoo hoo!
      </Spinner>
      {/* include self closing spinner check */}
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
      {/* include self closing Spinner check */}
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
      {/* include self closing Spinner check */}
      <Spinner {...props} />
    </div>
  );
}
