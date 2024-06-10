import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastTitle } from './ToastTitle';
import { isConformant } from '../../testing/isConformant';
import { ToastTitleProps } from './ToastTitle.types';
import { toastTitleClassNames } from './useToastTitleStyles.styles';

describe('ToastTitle', () => {
  isConformant<ToastTitleProps>({
    Component: ToastTitle,
    displayName: 'ToastTitle',
    getTargetElement: result => {
      const targetElement = result.container.querySelector(`.${toastTitleClassNames.root}`);
      if (targetElement) {
        return targetElement as HTMLElement;
      }

      throw new Error(`Failed to get ToastTitle root ${toastTitleClassNames.root}`);
    },
    disabledTests: [
      // TODO: having problems due to the fact root is Fragment
      'component-has-static-classnames-object',
    ],
    requiredProps: {
      media: 'c',
      action: 'a',
    },
  });

  it('renders a default state', () => {
    const result = render(<ToastTitle>Default ToastTitle</ToastTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
