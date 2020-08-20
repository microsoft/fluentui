import * as React from 'react';
import { makeVariants } from './makeVariants';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles';
import { mount, ReactWrapper } from 'enzyme';

describe('makeVariants', () => {
  const _stylesheet: Stylesheet = Stylesheet.getInstance();
  let wrapper: ReactWrapper | undefined;

  _stylesheet.setConfig({ injectionMode: InjectionMode.none });

  beforeEach(() => {
    _stylesheet.reset();
  });

  afterEach(() => {
    if (wrapper) {
      if (!wrapper.exists()) {
        wrapper.unmount();
      }
      wrapper = undefined;
    }
  });

  const useVariants = makeVariants('Button', '--button', {
    base: {
      background: 'red',
    },
    primary: {
      background: 'green',
    },
  });

  const Foo = (props: { className?: string; primary?: boolean }) => {
    const state = { ...props };

    useVariants(state);

    return <button className={state.className} />;
  };

  it('can render default base variant', () => {
    wrapper = mount(<Foo />);

    expect(wrapper.getDOMNode().classList.contains('Button-base-0')).toBeTruthy();
    expect(_stylesheet.getRules()).toEqual('.Button-base-0{--button-background:red;}');
  });

  it('can render primary variant', () => {
    wrapper = mount(<Foo primary />);

    expect(wrapper.getDOMNode().getAttribute('class')).toEqual(' Button-base-primary-0');
    expect(_stylesheet.getRules()).toEqual('.Button-base-primary-0{--button-background:green;}');
  });

  it('can respect themed variant overrides', () => {
    wrapper = mount(<Foo />);
  });
});
