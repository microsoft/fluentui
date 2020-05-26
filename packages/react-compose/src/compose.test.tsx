import * as React from 'react';
import compose from './compose';
import { mount, shallow } from 'enzyme';
import { ComposePreparedOptions } from './types';
import { defaultComposeOptions } from './mergeComposeOptions';

describe('compose', () => {
  interface ToggleProps extends React.AllHTMLAttributes<{}> {
    as?: string;
    defaultChecked?: boolean;
    checked?: boolean;
  }

  const Toggle = compose<'div', ToggleProps>(
    (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => {
      return <div ref={ref} {...props} />;
    },
    {
      defaultProps: {
        as: 'div',
      },
      slots: {},
      displayName: 'Toggle',
    },
  );

  it('can compose a component', () => {
    const wrapper = mount(<Toggle id="foo" checked />);

    expect(wrapper.html()).toMatch('<div id="foo"></div>');
    expect(Toggle.displayName).toEqual('Toggle');
  });

  it('can recompose a component', () => {
    const NewToggle = compose(Toggle, { displayName: 'NewToggle' });
    const wrapper = mount(<Toggle id="foo" />);

    expect(wrapper.html()).toMatch('<div id="foo"></div>');
    expect(NewToggle.displayName).toEqual('NewToggle');
  });

  it('can pass shorthandConfig via composeOptions', () => {
    const BaseComponent = compose(
      (props, ref, composeOptions) => {
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

    const ComposedComponent = compose(BaseComponent, {
      shorthandConfig: {
        mappedProp: 'as',
      },
    });

    const wrapper = shallow(<BaseComponent />);
    const composedWrapper = shallow(<ComposedComponent />);

    expect(wrapper.prop('data-mapped-prop')).toEqual('content');
    expect(wrapper.prop('data-allows-jsx')).toEqual(false);
    expect(composedWrapper.prop('data-mapped-prop')).toEqual('as');
    expect(composedWrapper.prop('data-allows-jsx')).toEqual(false);
  });

  it('provides a resolve function for the component to resolve slots, slotProps, and classes', () => {
    // tslint:disable-next-line:no-any
    let lastResolveResult: Record<string, any> = {};

    const Foo = compose<'div', ToggleProps>(
      (props: ToggleProps, ref: React.Ref<HTMLDivElement>, options: ComposePreparedOptions<'div', ToggleProps>) => {
        lastResolveResult = options.resolve(props);

        const { slots, slotProps } = lastResolveResult;

        return <slots.root ref={ref} {...slotProps.root} />;
      },
      {
        slots: {
          root: 'div',
          slot1: 'div',
        },
        classes: () => {
          return { root: 'root', slot1: '', primary: 'primary' };
        },
      },
    );

    const wrapper = mount(<Foo>hi</Foo>);

    expect(wrapper.html()).toEqual('<div class="root">hi</div>');

    expect(lastResolveResult).toEqual({
      state: {
        children: 'hi',
      },
      slots: {
        ...defaultComposeOptions.slots,
        root: 'div',
        slot1: 'div',
      },
      slotProps: {
        root: {
          className: 'root',
          children: 'hi',
        },
      },
    });
  });
});
