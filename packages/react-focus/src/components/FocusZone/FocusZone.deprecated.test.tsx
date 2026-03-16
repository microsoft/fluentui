import * as React from 'react';
import { render } from '@testing-library/react';
import { setWarningCallback } from '@fluentui/utilities';
import { FocusZone } from './FocusZone';

describe('FocusZone', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  it('renders FocusZone correctly with ariaDescribedby and ariaLabelledby', () => {
    const { container } = render(<FocusZone ariaDescribedBy="customDescribedBy" ariaLabelledBy="customLabelledBy" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
