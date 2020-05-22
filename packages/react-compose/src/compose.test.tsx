import * as React from 'react';
import compose from './compose';
import { mount } from 'enzyme';
import { ComposePreparedOptions } from './types';

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

  /*
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

        classes: [state => ({ root: 'asdf', slot1: '', primary: 'primary' })]
        classes: [state => ({ root: 'asdf' })]
      },
    );

    }
    let wrapper = mount(<Foo>hi</Foo>);
    expect(wrapper.html()).toEqual('<div>hi</div>');

    expect(lastResolveResult).toEqual({
      state: {
        children: 'hi',
      },
      slots: {
        root: 'div',
      },
      slotProps: {
        root: {
          children: 'hi',
        },
      },
    });
  });
  */
});
