import * as React from 'react';
import { resetIds } from '../../Utilities';
import { Legends } from './index';
import { LegendsBase } from './Legends.base';
import { render, cleanup } from '@testing-library/react';
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

  it('Should mount Overflow Button when not empty', () => {
    render(<Legends legends={legends} {...overflowProps} overflowText={'OverFlow Items'} />);
    expect(document.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]')).toBeDefined();
  });

  it('Should not mount Overflow when empty', () => {
    render(<Legends legends={legends} />);
    expect(document.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]').length).toBe(0);
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
