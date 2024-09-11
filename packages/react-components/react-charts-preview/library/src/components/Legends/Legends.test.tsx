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
  {
    title: 'Legend 3',
    color: DefaultPalette.green,
  },
  {
    title: 'Legend 4',
    color: DefaultPalette.blue,
  },
  {
    title: 'Legend 5',
    color: DefaultPalette.blueMid,
  },
  {
    title: 'Legend 6',
    color: DefaultPalette.whiteTranslucent40,
  },
  {
    title: 'Legend 7',
    color: DefaultPalette.greenDark,
  },
  {
    title: 'Legend 8',
    color: DefaultPalette.blueDark,
  },
  {
    title: 'Legend 9',
    color: DefaultPalette.orange,
  },
  {
    title: 'Legend 10',
    color: DefaultPalette.purpleDark,
  },
  {
    title: 'Legend 11',
    color: DefaultPalette.yellowLight,
  },
  {
    title: 'Legend 12',
    color: DefaultPalette.greenLight,
  },
  {
    title: 'Legend 13',
    color: DefaultPalette.orangeLighter,
  },
  {
    title: 'Legend 14',
    color: DefaultPalette.teal,
  },
  {
    title: 'Legend 15',
    color: DefaultPalette.tealLight,
  },
  {
    title: 'Legend 16',
    color: DefaultPalette.redDark,
  },
  {
    title: 'Legend 17',
    color: DefaultPalette.white,
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
  beforeEach(sharedBeforeEach);

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

describe('Legends - basic props', () => {
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

  it('Should mount Overflow Button when not empty', () => {
    wrapper = mount(<Legends legends={legends} {...overflowProps} overflowText={'OverFlow Items'} />);
    const overflowBtnText = wrapper.getDOMNode().querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtnText).toBeDefined();
  });

  it('Should not mount Overflow when empty', () => {
    wrapper = mount(<Legends legends={legends} />);
    const overflowBtn = wrapper.getDOMNode().querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtn!.length).toBe(0);
  });

  it('Should be not able to select multiple Legends', () => {
    wrapper = mount(<Legends legends={legends} canSelectMultipleLegends={false} />);
    const canSelectMultipleLegends = wrapper
      .getDOMNode()
      .querySelector('[class^="legend"]')
      ?.getAttribute('canSelectMultipleLegends');
    expect(canSelectMultipleLegends).toBeFalsy();
  });

  it('Should render data-is-focusable correctly', () => {
    wrapper = mount(<Legends legends={legends} data-is-focusable={true} />);
    const dataIsFocusable = wrapper.getDOMNode().querySelector('[class^="legend"]')?.getAttribute('data-is-focusable');
    expect(dataIsFocusable).toBeTruthy();
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

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
      focusZonePropsInHoverCard,
      overflowProps,
      overflowText: 'OverFlow Items',
    };
    const component = mount(<Legends {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Legends - multi Legends', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('Should render defaultSelectedLegends', () => {
    wrapper = mount(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        defaultSelectedLegends={[legends[0].title, legends[2].title]}
      />,
    );
    const renderedLegends = wrapper.getDOMNode().querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(2);
  });
});
