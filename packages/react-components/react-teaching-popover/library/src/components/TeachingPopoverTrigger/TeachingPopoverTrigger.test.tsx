import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverTrigger } from './TeachingPopoverTrigger';
import { render } from '@testing-library/react';

describe('TeachingPopoverTrigger', () => {
  isConformant({
    Component: TeachingPopoverTrigger,
    displayName: 'TeachingPopoverTrigger',
    requiredProps: { children: <span /> },
    disabledTests: [
      // PopoverTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // PopoverTrigger does not have own styles
      'make-styles-overrides-win',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
  it('renders a default state', () => {
    const { container } = render(
      <TeachingPopoverTrigger disableButtonEnhancement>
        <button>Popover trigger</button>
      </TeachingPopoverTrigger>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
