import * as React from 'react';
import { render } from '@testing-library/react';
import { setWarningCallback } from '@fluentui/utilities';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  it('renders aria-label based on offAriaLabel', () => {
    const { container } = render(<Toggle label="Label" offAriaLabel="offLabel" />);
    const toggleButton = container.querySelector('button');

    expect(toggleButton?.getAttribute('aria-label')).toEqual('offLabel');
  });

  it('renders aria-label based on onAriaLabel when Toggle is ON', () => {
    const { container } = render(<Toggle label="Label" onAriaLabel="onLabel" defaultChecked />);
    const toggleButton = container.querySelector('button');

    expect(toggleButton?.getAttribute('aria-label')).toEqual('onLabel');
  });

  it('has no aria-labelledby attribute when checked if onAriaLabel is provided', () => {
    const { container } = render(<Toggle label="Label" onAriaLabel="OnAriaLabel" defaultChecked />);
    const toggleButton = container.querySelector('button');

    expect(toggleButton?.getAttribute('aria-labelledby')).toBeNull();
  });

  it('has no aria-labelledby attribute when unchecked if offAriaLabel is provided', () => {
    const { container } = render(<Toggle label="Label" offAriaLabel="OffAriaLabel" />);
    const toggleButton = container.querySelector('button');

    expect(toggleButton?.getAttribute('aria-labelledby')).toBeNull();
  });
});
