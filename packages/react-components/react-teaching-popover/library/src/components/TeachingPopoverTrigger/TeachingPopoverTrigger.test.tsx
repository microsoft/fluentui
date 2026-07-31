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
      // ...and therefore has no element to carry the Tailwind named-group marker either.
      // `component-has-group-marker` became a default test with the statics-removal sweep
      // (DECISIONS.md D16.6); this component clones its child, so `getTargetElement` would
      // resolve to the consumer's own element (migration/griffel-to-tailwind).
      'component-has-group-marker',
      // PopoverTrigger does not have own styles
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
