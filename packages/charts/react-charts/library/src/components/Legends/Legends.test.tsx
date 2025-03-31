jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Legends } from './index';
import { LegendState } from './Legends';
import { mount, ReactWrapper } from 'enzyme';
import { LegendsProps } from './Legends.types';
import { render, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Wrapper of the Legends to be tested.
let wrapper: ReactWrapper<LegendsProps, LegendState> | undefined;

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
    color: '#FF0000',
  },
  {
    title: 'Legend 2',
    color: '#000000',
  },
  {
    title: 'Legend 3',
    color: '#008000',
  },
  {
    title: 'Legend 4',
    color: '#0000ff',
  },
  {
    title: 'Legend 5',
    color: '#191970',
  },
  {
    title: 'Legend 6',
    color: '#E4E3E9',
  },
  {
    title: 'Legend 7',
    color: '#013220',
  },
  {
    title: 'Legend 8',
    color: '#00008B',
  },
  {
    title: 'Legend 9',
    color: '#FFA500',
  },
  {
    title: 'Legend 10',
    color: '#301934',
  },
  {
    title: 'Legend 11',
    color: '#Ffffed',
  },
  {
    title: 'Legend 12',
    color: '#90ee90',
  },
  {
    title: 'Legend 13',
    color: '#FFA500',
  },
  {
    title: 'Legend 14',
    color: '#008080',
  },
  {
    title: 'Legend 15',
    color: '#008080',
  },
  {
    title: 'Legend 16',
    color: 'FF0000',
  },
  {
    title: 'Legend 17',
    color: '#FFFFFF',
  },
];

const styles = {
  rect: {
    borderRadius: '3px',
  },
};

const overflowProps = {
  styles: {
    item: { border: `1px dotted #008000` },
    root: {},
    overflowButton: { backgroundColor: '#Ffe536' },
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

describe('Legends - basic props', () => {
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
    wrapper = mount(<Legends legends={legends} /* {...overflowProps} */ overflowText={'OverFlow Items'} />);
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
  });
});

describe('Render calling with respective to props', () => {
  //To Do - This tc will be need to revisit because the logic is not correct.
  it('No prop changes', () => {
    const props = {
      legends,
    };
    const component = mount(<Legends {...props} />);
    expect(component).toMatchSnapshot();
    component.setProps({ ...props });
    expect(component).toMatchSnapshot();
  });
  it('prop changes', () => {
    const props = {
      legends,
      allowFocusOnLegends: true,
      focusZonePropsInHoverCard,
      overflowProps,
      overflowText: 'OverFlow Items',
    };
    const component = mount(<Legends {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    const renderedDOM = component.findWhere(node => node.prop('hideTooltip') === true);
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Legends - multi Legends', () => {
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

describe('Legends - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<Legends legends={legends} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
