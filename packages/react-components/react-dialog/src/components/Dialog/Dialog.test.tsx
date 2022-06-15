import * as React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from './Dialog';
import { isConformant } from '../../common/isConformant';

describe('Dialog', () => {
  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
    disabledTests: [
      // Menu does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classname',
      'component-has-static-classnames-object',
      'component-has-static-classname-exported',
      // Menu does not have own styles
      'make-styles-overrides-win',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <Dialog>
        <div>Default Dialog</div>
      </Dialog>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
