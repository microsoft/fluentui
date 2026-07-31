import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastTrigger } from './ToastTrigger';
import { isConformant } from '../../testing/isConformant';
import type { ToastTriggerProps } from './ToastTrigger.types';

describe('ToastTrigger', () => {
  isConformant<ToastTriggerProps>({
    disabledTests: [
      // ToastTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // ToastTrigger clones its child rather than rendering an element of its own, so there
      // is no outermost slot to stamp `group/fui-toast-trigger` on — it has no styles hook at
      // all. `component-has-group-marker` became a default test with DECISIONS.md D16.6, so
      // the opt-out has to be explicit.
      'component-has-group-marker',
      // ToastTrigger does not have own styles
    ],
    Component: ToastTrigger,
    displayName: 'ToastTrigger',
    requiredProps: {
      children: <button>toast trigger</button>,
    },
  });

  it('renders a default state', () => {
    const result = render(
      <ToastTrigger>
        <button>toast trigger</button>
      </ToastTrigger>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
