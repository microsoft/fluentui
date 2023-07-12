import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastTrigger } from './ToastTrigger';
import { isConformant } from '../../testing/isConformant';
import { ToastTriggerProps } from './ToastTrigger.types';

describe('ToastTrigger', () => {
  isConformant<ToastTriggerProps>({
    disabledTests: [
      // ToastTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // ToastTrigger does not have own styles
      'make-styles-overrides-win',
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
