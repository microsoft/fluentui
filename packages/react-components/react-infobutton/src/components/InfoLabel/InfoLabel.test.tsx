import * as React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InfoLabel } from './InfoLabel';
import { infoLabelClassNames } from './useInfoLabelStyles.styles';

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
    primarySlot: 'label',
    requiredProps: { interactive: true },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: 'Test',
            interactive: true,
          },
          expectedClassNames: {
            root: infoLabelClassNames.root,
            label: infoLabelClassNames.label,
            infoButton: infoLabelClassNames.infoButton,
          },
        },
      ],
    },
  });

  it('renders an InfoButton when info is set', () => {
    const result = render(
      <InfoLabel interactive={true} info="Test">
        Test label
      </InfoLabel>,
    );
    expect(result.getByRole('button')).toBeTruthy();
  });

  it("renders an InfoButton when the infoButton's info slot is set", () => {
    const result = render(
      <InfoLabel interactive={true} infoButton={{ info: 'Test' }}>
        Test label
      </InfoLabel>,
    );
    expect(result.getByRole('button')).toBeTruthy();
  });

  it('does not render an InfoButton when info is not set', () => {
    const result = render(<InfoLabel interactive={true}>Test label</InfoLabel>);
    expect(result.queryByRole('button')).toBeNull();
  });

  it('sets the infoButton aria-labelledby to the label and infoButton', () => {
    const result = render(
      <InfoLabel interactive={true} info="Test">
        Test label
      </InfoLabel>,
    );

    const infoButton = result.getByRole('button');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(infoButton.getAttribute('aria-labelledby')).toBe(`${label.id} ${infoButton.id}`);
  });

  it("applies InfoButton's info slot id to aria-owns on the InfoLabel's wrapper", () => {
    const { container } = render(
      <InfoLabel interactive={true} className="info-label-wrapper" info={{ id: 'test-id' }} />,
    );

    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBe('test-id');
  });

  it("applies InfoButton's correct id to aria-owns on the InfoLabel's wrapper when id is provided to the infoButton slot", () => {
    const { container } = render(
      <InfoLabel interactive={true} className="info-label-wrapper" infoButton={{ info: { id: 'test-id' } }} />,
    );

    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBe('test-id');
  });
});
