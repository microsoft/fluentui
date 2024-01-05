import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverButton } from './TeachingPopoverButton';
import { TeachingPopoverButtonProps } from './TeachingPopoverButton.types';

describe('TeachingPopoverButton', () => {
  isConformant({
    Component: TeachingPopoverButton as React.FunctionComponent<TeachingPopoverButtonProps>,
    displayName: 'TeachingPopoverButton',
    requiredProps: { buttonType: 'primary' },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders correctly', () => {
    const { getByRole } = render(<TeachingPopoverButton buttonType="primary">This is a button</TeachingPopoverButton>);
    const button = getByRole('button');

    expect(button.tagName).toBe('BUTTON');
  });
});
