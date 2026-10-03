import * as React from 'react';
import { resetIds } from '../../Utilities';
import { Legends } from './index';
import { LegendsBase } from './Legends.base';
import { render, cleanup, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  cleanup();
  // Do this after unmounting to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

const legends = [
  { title: 'Legend 1', color: DefaultPalette.red },
  { title: 'Legend 2', color: DefaultPalette.black },
  { title: 'Legend 3', color: DefaultPalette.green },
  { title: 'Legend 4', color: DefaultPalette.blue },
  { title: 'Legend 5', color: DefaultPalette.blueMid },
  { title: 'Legend 6', color: DefaultPalette.whiteTranslucent40 },
  { title: 'Legend 7', color: DefaultPalette.greenDark },
  { title: 'Legend 8', color: DefaultPalette.blueDark },
  { title: 'Legend 9', color: DefaultPalette.orange },
  { title: 'Legend 10', color: DefaultPalette.purpleDark },
  { title: 'Legend 11', color: DefaultPalette.yellowLight },
  { title: 'Legend 12', color: DefaultPalette.greenLight },
  { title: 'Legend 13', color: DefaultPalette.orangeLighter },
  { title: 'Legend 14', color: DefaultPalette.teal },
  { title: 'Legend 15', color: DefaultPalette.tealLight },
  { title: 'Legend 16', color: DefaultPalette.redDark },
  { title: 'Legend 17', color: DefaultPalette.white },
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
    const { container } = render(<Legends legends={legends} />);
    expect(container).toMatchSnapshot();
  });

  it('renders allowFocusOnLegends correctly', () => {
    const { container } = render(<Legends legends={legends} allowFocusOnLegends={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders canSelectMultipleLegends correctly', () => {
    const { container } = render(<Legends legends={legends} canSelectMultipleLegends={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders styles correctly', () => {
    const { container } = render(<Legends legends={legends} {...styles} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Legends - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legends when empty', () => {
    render(<Legends legends={[]} />);
    // No legendContainer should be present
    expect(document.querySelectorAll('[class^="legendContainer"]').length).toBe(0);
  });

  it('Should mount legends when not empty', () => {
    render(<Legends legends={legends} />);
    expect(document.querySelectorAll('[class^="legendContainer"]')).toBeDefined();
  });

  it('Should render every legend inline and no overflow button when all legends fit', () => {
    // jsdom reports zero widths, so ResizeGroup never overflows here: all legends stay inline.
    // (The overflow scenario itself is covered in the 'Legends - overflow rendering' suite below.)
    render(<Legends legends={legends} {...overflowProps} overflowText={'OverFlow Items'} />);
    expect(document.querySelectorAll('button[role="option"]').length).toBe(legends.length);
    expect(screen.queryByText(/OverFlow Items/)).toBeNull();
  });

  it('Should not mount an overflow button when nothing overflows', () => {
    render(<Legends legends={legends} />);
    // The overflow indicator would render as '<count> more' ('more' is the default overflow text).
    expect(screen.queryByText(/^\d+ more$/)).toBeNull();
    expect(document.querySelectorAll('button[role="option"]').length).toBe(legends.length);
  });

  it('Should be not able to select multiple Legends', () => {
    render(<Legends legends={legends} canSelectMultipleLegends={false} />);
    const legend = document.querySelector('[class^="legend"]');
    expect(legend?.getAttribute('canSelectMultipleLegends')).toBeFalsy();
  });

  it('Should render data-is-focusable correctly', () => {
    render(<Legends legends={legends} data-is-focusable={true} />);
    const legend = document.querySelector('[class^="legend"]');
    expect(legend?.getAttribute('data-is-focusable')).toBeTruthy();
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(LegendsBase.prototype, 'render');
    const props = { legends };
    const { rerender } = render(<Legends {...props} />);
    rerender(<Legends {...props} />);
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
    const { rerender } = render(<Legends {...props} />);
    rerender(<Legends {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Legends - multi Legends', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render defaultSelectedLegends', () => {
    render(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        defaultSelectedLegends={[legends[0].title, legends[2].title]}
      />,
    );
    const selectedLegends = document.querySelectorAll('button[aria-selected="true"]');
    expect(selectedLegends.length).toBe(2);
  });
});

describe('Legends - controlled legend selection', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('follows updates in the selectedLegends prop', () => {
    const { rerender } = render(
      <Legends legends={legends} canSelectMultipleLegends={true} selectedLegends={[legends[0].title]} />,
    );
    let selectedLegends = document.querySelectorAll('button[aria-selected="true"]');
    expect(selectedLegends.length).toBe(1);

    rerender(
      <Legends
        legends={legends}
        canSelectMultipleLegends={true}
        selectedLegends={[legends[1].title, legends[2].title]}
      />,
    );
    selectedLegends = document.querySelectorAll('button[aria-selected="true"]');
    expect(selectedLegends.length).toBe(2);
  });

  it('follows updates in the selectedLegend prop', () => {
    const { rerender } = render(<Legends legends={legends} selectedLegend={legends[0].title} />);
    let selectedLegends = document.querySelectorAll('button[aria-selected="true"]');
    expect(selectedLegends.length).toBe(1);

    rerender(<Legends legends={legends} selectedLegend={legends[1].title} />);
    selectedLegends = document.querySelectorAll('button[aria-selected="true"]');
    expect(selectedLegends.length).toBe(1);
  });
});

describe('Legends - overflow reducers', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  // The reducers are private, pure functions driven by ResizeGroup; they are what decides which
  // legends move in and out of the overflow, so they are tested directly on an instance.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance: any = new LegendsBase({ legends: [] });
  const makeItems = (count: number) => Array.from({ length: count }, (_, i) => ({ key: i, title: `L${i + 1}` }));

  it('_onReduceData moves the last primary item to the front of the overflow', () => {
    const [first, second, third] = makeItems(3);
    expect(instance._onReduceData({ primary: [first, second, third], overflow: [] })).toEqual({
      primary: [first, second],
      overflow: [third],
    });
    expect(instance._onReduceData({ primary: [first, second], overflow: [third] })).toEqual({
      primary: [first],
      overflow: [second, third],
    });
  });

  it('_onReduceData returns undefined when there is no primary item left to move', () => {
    expect(instance._onReduceData({ primary: [], overflow: makeItems(2) })).toBeUndefined();
  });

  it('_onGrowData moves the first overflow item back to the end of primary', () => {
    const [first, second, third] = makeItems(3);
    expect(instance._onGrowData({ primary: [first], overflow: [second, third] })).toEqual({
      primary: [first, second],
      overflow: [third],
    });
  });

  it('_onGrowData returns undefined when there is no overflow item to restore', () => {
    expect(instance._onGrowData({ primary: makeItems(2), overflow: [] })).toBeUndefined();
  });

  it('_onGrowData is the inverse of _onReduceData', () => {
    const data = { primary: makeItems(3), overflow: [] };
    expect(instance._onGrowData(instance._onReduceData(data))).toEqual(data);
  });
});

describe('Legends - overflow rendering', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  const originalGetBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;
  const CONTAINER_WIDTH = 300;
  const LEGEND_BUTTON_WIDTH = 60;
  const OVERFLOW_INDICATOR_WIDTH = 60;

  beforeEach(() => {
    // ResizeGroup decides how many legends fit by measuring a hidden copy of the content
    // (initial pass: the div with data-automation-id="visibleContent" while it is hidden;
    // update passes: an anonymous div with visibility: hidden) against its own root container.
    // jsdom reports 0 for every width, which is exactly why overflow never happened in these
    // tests before. Report a fixed container width and a content width proportional to the
    // number of legend buttons currently rendered, so the real
    // ResizeGroup -> _onReduceData -> OverflowSet pipeline runs and converges: 17 legends at
    // 60px each never fit into 300px, and the loop settles at 4 inline legends + the overflow
    // indicator (4 * 60 + 60 = 300 <= 300).
    window.HTMLElement.prototype.getBoundingClientRect = function (this: HTMLElement): DOMRect {
      let width = CONTAINER_WIDTH;
      const isMeasuredContent =
        this.getAttribute('data-automation-id') === 'visibleContent' || this.style.visibility === 'hidden';
      if (isMeasuredContent) {
        const legendButtonCount = this.querySelectorAll('button').length;
        const hasOverflowIndicator = /\d+ Overflow Items/.test(this.textContent || '');
        width = legendButtonCount * LEGEND_BUTTON_WIDTH + (hasOverflowIndicator ? OVERFLOW_INDICATOR_WIDTH : 0);
      }
      return {
        width,
        height: 32,
        top: 0,
        left: 0,
        right: width,
        bottom: 32,
        x: 0,
        y: 0,
        toJSON: () => '',
      } as DOMRect;
    };
  });

  afterEach(() => {
    window.HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  /** Resolves once ResizeGroup has committed its final, visible render. */
  async function waitForResizeGroupToSettle(): Promise<void> {
    await waitFor(() => {
      const visibleContent = document.querySelector('[data-automation-id="visibleContent"]') as HTMLElement;
      expect(visibleContent.style.visibility).not.toBe('hidden');
    });
  }

  it('moves the legends that do not fit into an overflow button with the correct count', async () => {
    render(<Legends legends={legends} overflowText="Overflow Items" />);

    const overflowButton = await screen.findByText('13 Overflow Items');
    await waitForResizeGroupToSettle();

    const inlineLegends = document.querySelectorAll('button[role="option"]');
    expect(inlineLegends.length).toBe(4);
    // Every legend is either inline or accounted for by the overflow button count.
    expect(inlineLegends.length + 13).toBe(legends.length);
    // The first legends stay inline; overflowed legends leave the DOM entirely
    // (OverflowSet only renders them inside the hover card once it is opened).
    expect(screen.getByText('Legend 1')).toBeTruthy();
    expect(screen.queryByText('Legend 17')).toBeNull();
    expect(overflowButton.getAttribute('role')).toBe('button');
    expect(overflowButton.getAttribute('aria-expanded')).toBe('false');
    expect(overflowButton.getAttribute('aria-label')).toBe('13 Overflow Items');
  });

  it('opens a hover card listing the overflowed legends when the overflow button is clicked', async () => {
    render(<Legends legends={legends} overflowText="Overflow Items" />);

    const overflowButton = await screen.findByText('13 Overflow Items');
    await waitForResizeGroupToSettle();
    // Overflowed legends are not in the DOM before the hover card opens.
    expect(screen.queryByText('Legend 5')).toBeNull();
    expect(screen.queryByText('Legend 17')).toBeNull();

    fireEvent.click(overflowButton);

    await waitFor(() => expect(overflowButton.getAttribute('aria-expanded')).toBe('true'));
    // The hover card renders every overflowed legend (Legend 5 through Legend 17). The queries are
    // scoped to the hover card because opening it re-renders Legends, which makes ResizeGroup
    // re-measure all 17 legends in a temporary hidden div.
    const hoverCard = await waitFor(() => {
      const card = document.querySelector('[class*="hoverCardRoot"]') as HTMLElement;
      expect(card).not.toBeNull();
      return card;
    });
    expect(hoverCard.querySelectorAll('button').length).toBe(13);
    expect(within(hoverCard).getByText('Legend 5')).toBeTruthy();
    expect(within(hoverCard).getByText('Legend 17')).toBeTruthy();
  });

  it('renders no overflow button when all legends fit', async () => {
    render(<Legends legends={legends.slice(0, 3)} overflowText="Overflow Items" />);

    // 3 legends * 60px = 180px fits into the 300px container without any reduction.
    await waitForResizeGroupToSettle();

    expect(document.querySelectorAll('button[role="option"]').length).toBe(3);
    expect(screen.queryByText(/Overflow Items/)).toBeNull();
  });
});
