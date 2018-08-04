import * as React from 'react';
import { mount } from 'enzyme';
import { Stack } from '../index';

describe('Stack Item', () => {
  it('allows className from child component to be rendered', () => {
    const wrapper = mount(
      <Stack>
        <div className="test" />
      </Stack>
    );

    expect(wrapper.find('div.test').length).toBe(1);
  });

  it('can handle having a class in a child of an explicit Stack.Item component', () => {
    const wrapper = mount(
      <Stack>
        <Stack.Item>
          <div className="test" />
        </Stack.Item>
      </Stack>
    );

    expect(wrapper.find('div.test').length).toBe(1);
  });

  it('can handle not having a class', () => {
    const wrapper = mount(
      <Stack>
        <Stack.Item>
          <div />
        </Stack.Item>
      </Stack>
    );

    expect(wrapper.find('.test').length).toBe(0);
  });
});
