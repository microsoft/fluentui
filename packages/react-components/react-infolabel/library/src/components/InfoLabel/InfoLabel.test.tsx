import * as React from 'react';
import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
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

  it.each([0, '0', 'Test'])('opens information content %s', info => {
    const result = render(<InfoLabel info={info}>Test label</InfoLabel>);

    fireEvent.click(result.getByRole('button'));

    expect(result.getByRole('note')).toHaveTextContent(String(info));
    expect(result.getByRole('note')).toBeVisible();
  });

  it("renders an InfoButton when the infoButton's info slot is set", () => {
    const result = render(<InfoLabel infoButton={{ info: 'Test' }}>Test label</InfoLabel>);
    expect(result.getByRole('button')).toBeTruthy();
  });

  it('does not render an InfoButton when info is not set', () => {
    const result = render(<InfoLabel>Test label</InfoLabel>);
    expect(result.queryByRole('button')).toBeNull();
  });

  it.each([undefined, false, ''])('does not render an InfoButton for empty info %s', info => {
    const result = render(<InfoLabel info={info}>Test label</InfoLabel>);

    expect(result.queryByRole('button')).toBeNull();
  });

  it('allows an explicit null infoButton to suppress numeric zero info', () => {
    const result = render(
      <InfoLabel info={0} infoButton={null}>
        Test label
      </InfoLabel>,
    );

    expect(result.queryByRole('button')).toBeNull();
  });

  it("preserves the infoButton's explicit info slot over numeric zero info", () => {
    const result = render(
      <InfoLabel info={0} infoButton={{ info: 'Custom info' }}>
        Test label
      </InfoLabel>,
    );

    fireEvent.click(result.getByRole('button'));

    expect(result.getByRole('note')).toHaveTextContent('Custom info');
  });

  it('sets the infoButton aria-labelledby to the label and infoButton', () => {
    const result = render(<InfoLabel info="Test">Test label</InfoLabel>);

    const infoButton = result.getByRole('button');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(infoButton.getAttribute('aria-labelledby')).toBe(`${label.id} ${infoButton.id}`);
  });

  it("applies InfoButton's info slot id to aria-owns on the InfoLabel's wrapper when open", () => {
    const { container } = render(<InfoLabel className="info-label-wrapper" info={{ id: 'test-id' }} />);
    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBeNull();

    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBe('test-id');
  });

  it("applies InfoButton's correct id to aria-owns on the InfoLabel's wrapper when id is provided to the infoButton slot", () => {
    const { container } = render(<InfoLabel className="info-label-wrapper" infoButton={{ info: { id: 'test-id' } }} />);
    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBeNull();

    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBe('test-id');
  });
});
