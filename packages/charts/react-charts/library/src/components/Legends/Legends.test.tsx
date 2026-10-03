import * as React from 'react';
import { Legends } from './index';
import { render, act, fireEvent, screen } from '@testing-library/react';
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

describe('Legends snapShot testing', () => {
  it('renders Legends correctly', () => {
    const { container } = render(<Legends legends={legends} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders allowFocusOnLegends correctly', () => {
    const { container } = render(<Legends legends={legends} allowFocusOnLegends={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders canSelectMultipleLegends correctly', () => {
    const { container } = render(<Legends legends={legends} canSelectMultipleLegends={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders styles correctly', () => {
    const { container } = render(<Legends legends={legends} {...styles} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Legends - basic props', () => {
  it('Should not mount legends when empty', () => {
    const wrapper = render(<Legends legends={[]} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend!.length).toBe(0);
  });

  it('Should mount legends when not empty', () => {
    const wrapper = render(<Legends legends={legends} />);
    const legend = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(legend).toBeDefined();
  });

  it('Should render every legend inline and no overflow menu button when nothing overflows', () => {
    // jsdom reports zero widths, so the overflow manager never hides anything here: all legends
    // stay inline. (The overflow scenario itself is covered in the 'Legends - overflow' suite below.)
    const wrapper = render(<Legends legends={legends} overflowText={'OverFlow Items'} />);
    expect(wrapper.container.querySelectorAll('button[role="option"]').length).toBe(legends.length);
    expect(wrapper.container.querySelectorAll('[data-overflowing]').length).toBe(0);
    expect(wrapper.queryByText(/OverFlow Items/)).toBeNull();
  });

  it('Should not mount an overflow menu button when nothing overflows', () => {
    const wrapper = render(<Legends legends={legends} />);
    // The overflow menu button would render as '+<count> more' ('more' is the default overflow text).
    expect(wrapper.queryByText(/^\+\d+/)).toBeNull();
    expect(wrapper.container.querySelectorAll('[data-overflowing]').length).toBe(0);
  });

  it('Should be not able to select multiple Legends', () => {
    const wrapper = render(<Legends legends={legends} canSelectMultipleLegends={false} />);
    const canSelectMultipleLegends = wrapper.container
      .querySelector('[class^="legend"]')
      ?.getAttribute('canSelectMultipleLegends');
    expect(canSelectMultipleLegends).toBeFalsy();
  });

  it('Should render data-is-focusable correctly', () => {
    const wrapper = render(<Legends legends={legends} data-is-focusable={true} />);
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

describe('Legends - overflow', () => {
  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  const CONTAINER_WIDTH = 250;
  const ITEM_WIDTH = 50;

  beforeEach(() => {
    // @fluentui/react-overflow measures the container via clientWidth and each legend button (and
    // the overflow menu button) via offsetWidth, then resolves overflow synchronously at mount in
    // tests (observe() force-updates when clientWidth > 0 and its debounce is synchronous when
    // NODE_ENV === 'test'). jsdom reports 0 for both, which is exactly why overflow never happened
    // in these tests before. Mock the widths so the real overflow pipeline runs: 250px container
    // - 10px default padding = 240px available; 17 legends at 50px each never fit, and with the
    // 50px menu button the manager settles at 3 visible legends (3 * 50 + 50 = 200 <= 240) and
    // 14 overflowed ones.
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => CONTAINER_WIDTH });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => ITEM_WIDTH });
  });

  afterEach(() => {
    if (originalClientWidth) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (HTMLElement.prototype as any).clientWidth;
    }
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (HTMLElement.prototype as any).offsetWidth;
    }
  });

  it('hides the legends that do not fit and renders an overflow menu button with the count', () => {
    const { container } = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(screen.getByText('+14 Overflow Items')).toBeTruthy();
    // Overflowed legends stay in the DOM (hidden via CSS) and are marked with data-overflowing.
    const hiddenLegends = container.querySelectorAll('[data-overflowing]');
    expect(hiddenLegends.length).toBe(14);
    const visibleLegends = container.querySelectorAll('button[role="option"]:not([data-overflowing])');
    expect(visibleLegends.length).toBe(3);
    // Every legend is either visible or overflowed.
    expect(visibleLegends.length + hiddenLegends.length).toBe(legends.length);
    // The first legends remain visible; the trailing ones overflow.
    expect(visibleLegends[0].textContent).toBe('Legend 1');
    expect(hiddenLegends[hiddenLegends.length - 1].textContent).toBe('Legend 17');
  });

  it('opens a menu listing exactly the overflowed legends when the overflow menu button is clicked', () => {
    render(<Legends legends={legends} overflowText="Overflow Items" />);

    fireEvent.click(screen.getByText('+14 Overflow Items'));

    const menuItems = screen.getAllByRole('menuitemcheckbox');
    expect(menuItems.length).toBe(14);
    // The menu lists the overflowed legends (Legend 4 through Legend 17) in order.
    expect(menuItems[0].textContent).toContain('Legend 4');
    expect(menuItems[menuItems.length - 1].textContent).toContain('Legend 17');
  });

  it('renders no overflow menu button when all legends fit', () => {
    // A container wide enough for all 17 legends (17 * 50 = 850 < 2000 - 10).
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 2000 });

    const { container } = render(<Legends legends={legends} overflowText="Overflow Items" />);

    expect(screen.queryByText(/Overflow Items/)).toBeNull();
    expect(container.querySelectorAll('[data-overflowing]').length).toBe(0);
    expect(container.querySelectorAll('button[role="option"]').length).toBe(legends.length);
  });
});
