import * as React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { InfoLabel } from './InfoLabel';

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
    primarySlot: 'label',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (now a default test) replaces it: it
    // asserts the group marker IS stamped and is never `classList[0]` (D16.2 / D16.6). The
    // `has-static-classnames` testOptions that fed the deleted test went with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
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
