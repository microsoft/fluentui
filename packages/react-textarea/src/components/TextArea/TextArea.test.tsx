import * as React from 'react';
import { render } from '@testing-library/react';
import { TextArea } from './TextArea';
import { isConformant } from '../../common/isConformant';

describe('TextArea', () => {
  isConformant({
    Component: TextArea,
    displayName: 'TextArea',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TextArea>Default TextArea</TextArea>);
    expect(result.container).toMatchSnapshot();
  });
});
