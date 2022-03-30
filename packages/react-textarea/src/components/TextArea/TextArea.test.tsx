import * as React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from './Textarea';
import { isConformant } from '../../common/isConformant';

describe('Textarea', () => {
  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Textarea value="Default Textarea" />);
    expect(result.container).toMatchSnapshot();
  });
});
