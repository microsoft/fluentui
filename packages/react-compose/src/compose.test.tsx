import * as React from 'react';
import compose from './compose';
import { mount } from 'enzyme';

describe('compose', () => {
  interface ToggleProps extends React.AllHTMLAttributes<{}> {
    defaultChecked?: boolean;
    checked?: boolean;
  }

  const Toggle = compose<'div', ToggleProps>(
    (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => {
      return <div ref={ref} {...props} />;
    },
    {
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
});
