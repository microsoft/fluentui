import * as React from 'react';
import { mount } from 'enzyme';
import { Stack } from '../Stack';

describe('Stack Item', () => {
  it('allows className from child component to be rendered', () => {
    const wrapper = mount(
      <Stack>
        <div className="test" />
      </Stack>,
    );

    expect(wrapper.find('div.test').length).toBe(1);
  });

  it('can handle having a class in a child of an explicit Stack.Item component', () => {
    const wrapper = mount(
      <Stack>
        <Stack.Item>
          <div className="test" />
        </Stack.Item>
      </Stack>,
    );

    expect(wrapper.find('div.test').length).toBe(1);
  });

  it('can handle not having a class', () => {
    const wrapper = mount(
      <Stack>
        <Stack.Item>
          <div />
        </Stack.Item>
      </Stack>,
    );

    expect(wrapper.find('.test').length).toBe(0);
  });

  it('can handle having no children', () => {
    const createEmptyStackItem = () => {
      mount(
        <Stack>
          <Stack.Item />
        </Stack>,
      );
    };

    expect(createEmptyStackItem).not.toThrow();
  });

  it('includes the classNames on both a StackItem and its child', () => {
    const stackItemClassName = 'stackItemClass';
    const childClassName = 'childClass';

    const wrapper = mount(
      <Stack>
        <Stack.Item className={stackItemClassName}>
          <span className={childClassName} />
        </Stack.Item>
      </Stack>,
    );

    const stackItem = wrapper.find('div').at(1);
    const stackItemClass = stackItem.props().className;
    const child = wrapper.find('span').at(0);
    const childClass = child.props().className;

    expect(stackItemClass).toContain(stackItemClassName);
    expect(childClass).toContain(childClassName);
  });
});
