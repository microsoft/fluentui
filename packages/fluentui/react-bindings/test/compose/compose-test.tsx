import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { compose, mergeProps, ComposePreparedOptions } from '@fluentui/react-bindings';

describe('compose', () => {
  interface ToggleProps extends React.AllHTMLAttributes<{}> {
    as?: string;
    defaultChecked?: boolean;
    checked?: boolean;
  }

  const useToggle = (props: ToggleProps) => props;

  const Toggle = compose<'div', ToggleProps, {}, {}, {}>(
    (_props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>, options: ComposePreparedOptions) => {
      const { state } = options;
      const { slots, slotProps } = mergeProps(state, options);
      return <slots.root ref={ref} {...slotProps.root} />;
    },
    {
      slots: {},
      state: useToggle,
      handledProps: ['checked'],
      displayName: 'Toggle',
    },
  );

  it('can compose a component', () => {
    const wrapper = mount(<Toggle id="foo" checked />);

    expect(wrapper.html()).toMatch('<div id="foo"></div>');
    expect(Toggle.displayName).toEqual('Toggle');
  });

  it('can recompose a component', () => {
    const NewToggle = compose<'div', ToggleProps, {}, {}, {}>(Toggle, { displayName: 'NewToggle' });
    const wrapper = mount(<NewToggle id="foo" />);

    expect(wrapper.html()).toMatch('<div id="foo"></div>');
    expect(NewToggle.displayName).toEqual('NewToggle');
  });

  it('can pass shorthandConfig via composeOptions', () => {
    const BaseComponent = compose<'div', { content?: string }, {}, {}, {}>(
      (_props, _ref, composeOptions) => {
        return (
          <div
            data-mapped-prop={composeOptions.shorthandConfig.mappedProp}
            data-allows-jsx={composeOptions.shorthandConfig.allowsJSX}
          />
        );
      },
      {
        shorthandConfig: {
          allowsJSX: false,
          mappedProp: 'content',
        },
      },
    );

    const ComposedComponent = compose<'div', { slot?: string }, {}, {}, {}>(BaseComponent, {
      shorthandConfig: {
        mappedProp: 'slot',
      },
    });

    const wrapper = shallow(<BaseComponent />);
    const composedWrapper = shallow(<ComposedComponent />);

    expect(wrapper.prop('data-mapped-prop')).toEqual('content');
    expect(wrapper.prop('data-allows-jsx')).toEqual(false);
    expect(composedWrapper.prop('data-mapped-prop')).toEqual('slot');
    expect(composedWrapper.prop('data-allows-jsx')).toEqual(false);
  });

  it('can recompose the state of a component', () => {
    const useNewToggle = (props: ToggleProps) => {
      return { ...props, 'data-new-state': 'NewToggle' };
    };
    const NewToggle = compose<'div', ToggleProps, {}, {}, {}>(Toggle, {
      displayName: 'NewToggle',
      state: useNewToggle,
    });
    const wrapper = mount(<NewToggle id="foo" />);
    expect(wrapper.html()).toMatch('<div id="foo" data-new-state="NewToggle"></div>');
    expect(NewToggle.displayName).toEqual('NewToggle');
  });
});
