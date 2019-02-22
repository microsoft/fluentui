import * as React from 'react';
import { mount } from 'enzyme';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    jest.spyOn(WarnUtil, 'warnDeprecations').mockImplementation(() => {
      /** no impl **/
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders aria-label based on offAriaLabel', () => {
    const component = mount(<Toggle label="Label" offAriaLabel="offLabel" />);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-label')
    ).toEqual('offLabel');
  });

  it('renders aria-label based on onAriaLabel when Toggle is ON', () => {
    let isToggledValue;
    const callback = (isToggled: boolean) => {
      isToggledValue = isToggled;
    };

    const component = mount<React.ReactInstance>(
      <Toggle label="Label" onChanged={callback} offAriaLabel="offLabel" onAriaLabel="onLabel" />
    );

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-label')
    ).toEqual('offLabel');

    component
      .find('button')
      .first()
      .simulate('click');

    expect(isToggledValue).toEqual(true);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-label')
    ).toEqual('onLabel');
  });
});
