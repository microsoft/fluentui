import * as React from 'react';
import { mount } from 'enzyme';
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
    const component = mount(<Toggle label="Label" offAriaLabel="offLabel" />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-label')).toEqual('offLabel');
  });

  it('renders aria-label based on onAriaLabel when Toggle is ON', () => {
    const component = mount(<Toggle label="Label" onAriaLabel="onLabel" defaultChecked />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-label')).toEqual('onLabel');
  });

  it('has no aria-labelledby attribute when checked if onAriaLabel is provided', () => {
    const component = mount(<Toggle label="Label" onAriaLabel="OnAriaLabel" defaultChecked />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBeNull();
  });

  it('has no aria-labelledby attribute when unchecked if offAriaLabel is provided', () => {
    const component = mount(<Toggle label="Label" offAriaLabel="OffAriaLabel" />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBeNull();
  });
});
