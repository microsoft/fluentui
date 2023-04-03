import * as React from 'react';

import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InfoLabel } from './InfoLabel';

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
    primarySlot: 'label',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: 'Test',
          },
        },
      ],
    },
  });

  it('renders an InfoButton when info is set', () => {
    const result = render(<InfoLabel info="Test">Test label</InfoLabel>);
    expect(result.getByRole('button')).toBeTruthy();
  });

  it("renders an InfoButton when the infoButton's info slot is set", () => {
    const result = render(<InfoLabel infoButton={{ info: 'Test' }}>Test label</InfoLabel>);
    expect(result.getByRole('button')).toBeTruthy();
  });

  it('does not render an InfoButton when info is not set', () => {
    const result = render(<InfoLabel>Test label</InfoLabel>);
    expect(result.queryByRole('button')).toBeNull();
  });

  it('sets the infoButton aria-labelledby to the label and infoButton', () => {
    const result = render(<InfoLabel info="Test">Test label</InfoLabel>);

    const infoButton = result.getByRole('button');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(infoButton.getAttribute('aria-labelledby')).toBe(`${label.id} ${infoButton.id}`);
  });
});
