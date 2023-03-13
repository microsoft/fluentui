import { useTriggerElement } from '@fluentui/react-bindings';
import { mount } from 'enzyme';
import * as React from 'react';

import * as consoleUtil from '../consoleUtil';

const TestComponent: React.FC<{ trigger?: React.ReactElement }> = props => {
  return useTriggerElement(props);
};

const OLD_ENV = process.env.NODE_ENV;

describe('useTriggerElement', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
  });
  afterAll(() => {
    process.env.NODE_ENV = OLD_ENV;
  });
  it('"children" can be null', () => {
    const wrapper = mount(<TestComponent>{null}</TestComponent>);

    expect(wrapper.children()).toHaveLength(0);
  });

  it('"trigger" can be null', () => {
    const wrapper = mount(<TestComponent trigger={null as unknown as React.ReactElement} />);

    expect(wrapper.children()).toHaveLength(0);
  });

  it('"trigger" should be a React element', () => {
    consoleUtil.disableOnce();
    expect(() => mount(<TestComponent>Foo</TestComponent>)).toThrow(
      'React.Children.only expected to receive a single React element child.',
    );
  });

  it('"trigger" should be a single element', () => {
    consoleUtil.disableOnce();
    expect(() =>
      mount(
        <TestComponent>
          <button />
          <button />
        </TestComponent>,
      ),
    ).toThrow('React.Children.only expected to receive a single React element child.');
  });

  it('"trigger" should not be a Fragment element', () => {
    consoleUtil.disableOnce();
    expect(() =>
      mount(
        <TestComponent>
          <></>
        </TestComponent>,
      ),
    ).toThrow(/A "React\.Fragment" cannot be used as a "trigger"/);
  });

  it('"trigger" with "disabled" will produce a warning', () => {
    consoleUtil.disableOnce();
    const warn = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

    mount(
      <TestComponent>
        <button disabled />
      </TestComponent>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/Disabled elements should used as/));
  });

  it('"pointer-events" should be set on disabled "trigger" children', () => {
    consoleUtil.disableOnce();
    expect(() =>
      mount(
        <TestComponent>
          <div>
            <button disabled />
          </div>
        </TestComponent>,
      ),
    ).toThrow(/A disabled element should have explicit/);
  });
});
