import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastBody } from './ToastBody';
import { isConformant } from '../../testing/isConformant';
import { ToastBodyProps } from './ToastBody.types';

describe('ToastBody', () => {
  isConformant<ToastBodyProps>({
    Component: ToastBody,
    displayName: 'ToastBody',
    disabledTests: [
      // TODO: having problems due to the fact root is Fragment
      'component-has-static-classnames-object',
    ],
    requiredProps: {
      subtitle: 'subtitle',
    },
  });

  it('renders a default state', () => {
    const result = render(<ToastBody>Default ToastBody</ToastBody>);
    expect(result.container).toMatchSnapshot();
  });
});
