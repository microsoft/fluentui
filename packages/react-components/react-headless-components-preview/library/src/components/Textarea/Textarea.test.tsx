import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
  });

  it('renders a default state', () => {
    const result = render(<Textarea placeholder="Default Textarea" />);
    expect(result.container).toMatchSnapshot();
  });
});
