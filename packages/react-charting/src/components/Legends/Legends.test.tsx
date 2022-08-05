jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { Legends } from './index';
import { ILegendState, LegendsBase } from './Legends.base';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ILegendsProps } from './Legends.types';

// Wrapper of the Legends to be tested.
let wrapper: ReactWrapper<ILegendsProps, ILegendState, LegendsBase> | undefined;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }

  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

const legends = [
  {
    title: 'Legend 1',
    color: DefaultPalette.red,
  },
  {
    title: 'Legend 2',
    color: DefaultPalette.black,
  },
];

const styles = {
  rect: {
    borderRadius: '3px',
  },
};

const overflowProps = {
  styles: {
    item: { border: `1px dotted ${DefaultPalette.green}` },
    root: {},
    overflowButton: { backgroundColor: DefaultPalette.neutralLight },
  },
};

const focusZonePropsInHoverCard = {
  'aria-label': 'Legend 1 selected',
};

describe('Legends snapShot testing', () => {
  it('renders Legends correctly', () => {
    const component = renderer.create(<Legends legends={legends} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders allowFocusOnLegends correctly', () => {
    const component = renderer.create(<Legends legends={legends} allowFocusOnLegends={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders canSelectMultipleLegends correctly', () => {
    const component = renderer.create(<Legends legends={legends} canSelectMultipleLegends={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders styles correctly', () => {
    const component = renderer.create(<Legends legends={legends} {...styles} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('AreaChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legends when empty', () => {
    wrapper = mount(<Legends legends={[]} />);
    const legend = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(legend!.length).toBe(0);
  });

  it('Should mount legends when not empty', () => {
    wrapper = mount(<Legends legends={legends} />);
    const legend = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(legend).toBeDefined();
  });

  it('Should render overflowProps correctly', () => {
    wrapper = mount(<Legends legends={legends} {...overflowProps} />);
    const overflowProp = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(overflowProp).toBeDefined();
  });

  it('Should render data-is-focusable correctly', () => {
    wrapper = mount(<Legends legends={legends} data-is-focusable={true} />);
    const dataIsFocusable = wrapper.getDOMNode().querySelector('[class^="legend"]')?.getAttribute('data-is-focusable');
    expect(dataIsFocusable).toBeTruthy();
  });

  it('Should render focusZonePropsInHoverCard correctly', () => {
    wrapper = mount(<Legends legends={legends} {...focusZonePropsInHoverCard} />);
    const overflowProp = wrapper.getDOMNode().querySelector('[class^="legend"]')?.getAttribute('aria-label');
    expect(overflowProp).toBe('Legend 1 selected');
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(LegendsBase.prototype, 'render');
    const props = {
      legends,
    };
    const component = mount(<Legends {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
  it('prop changes', () => {
    const renderMock = jest.spyOn(LegendsBase.prototype, 'render');
    const props = {
      legends,
      allowFocusOnLegends: true,
    };
    const component = mount(<Legends {...props} />);
    component.setProps({ ...props, allowFocusOnLegends: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
