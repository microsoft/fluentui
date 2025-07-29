import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Legends } from './index';
import { render, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Wrapper of the Legends to be tested.
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

/* eslint-disable @typescript-eslint/no-deprecated */
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

/* eslint-enable @typescript-eslint/no-deprecated */

describe('Legends - basic props', () => {
  it('Should not mount legends when empty', () => {
    let wrapper = render(<Legends legends={[]} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend!.length).toBe(0);
  });

  it('Should mount legends when not empty', () => {
    let wrapper = render(<Legends legends={legends} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend).toBeDefined();
  });

  it('Should mount Overflow Button when not empty', () => {
    let wrapper = render(<Legends legends={legends} /* {...overflowProps} */ overflowText={'OverFlow Items'} />);
    const overflowBtnText = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtnText).toBeDefined();
  });

  it('Should not mount Overflow when empty', () => {
    let wrapper = render(<Legends legends={legends} />);
    const overflowBtn = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtn!.length).toBe(0);
  });

  it('Should be not able to select multiple Legends', () => {
    let wrapper = render(<Legends legends={legends} canSelectMultipleLegends={false} />);
    const canSelectMultipleLegends = wrapper.container
      .querySelector('[class^="legend"]')
      ?.getAttribute('canSelectMultipleLegends');
    expect(canSelectMultipleLegends).toBeFalsy();
  });

  it('Should render data-is-focusable correctly', () => {
    let wrapper = render(<Legends legends={legends} data-is-focusable={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Render calling with respective to props', () => {
  //To Do - This tc will be need to revisit because the logic is not correct.
  it('No prop changes', () => {
    const props = {
      legends,
    };

    const { rerender, container } = render(<Legends {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<Legends {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });
  it.skip('prop changes', () => {
    const props = {
      legends,
      allowFocusOnLegends: true,
      focusZonePropsInHoverCard,
      overflowProps,
      overflowText: 'OverFlow Items',
    };
    const { rerender, container } = render(<Legends {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<Legends {...props} allowFocusOnLegends={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe.skip('Legends - multi Legends', () => {
  it('Should render defaultSelectedLegends', () => {
    const { container } = render(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        defaultSelectedLegends={[legends[0].title, legends[2].title]}
      />,
    );
    const renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(2);
  });
});

describe.skip('Legends - controlled legend selection', () => {
  it('follows updates in the selectedLegends prop', () => {
    const { rerender, container } = render(
      <Legends legends={legends} canSelectMultipleLegends={true} selectedLegends={[legends[0].title]} />,
    );
    let renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);

    rerender(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        selectedLegends={[legends[1].title, legends[2].title]}
      />,
    );
    renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(2);
  });

  it('follows updates in the selectedLegend prop', () => {
    const { rerender, container } = render(<Legends legends={legends} selectedLegend={legends[0].title} />);
    let renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);

    rerender(<Legends legends={legends} selectedLegend={legends[1].title} />);
    renderedLegends = container.querySelectorAll('button[aria-selected="true"]');
    expect(renderedLegends?.length).toBe(1);
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
