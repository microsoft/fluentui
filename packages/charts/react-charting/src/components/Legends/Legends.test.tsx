import * as React from 'react';
import { resetIds } from '../../Utilities';
import { Legends } from './index';
import { LegendsBase } from './Legends.base';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
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
const overflowLegends = legends.map((legend, index) => ({ ...legend, key: String(index) }));

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

  it.each([false, true])('updates the accessible name with enabledWrapLines=%s', enabledWrapLines => {
    const { getAllByRole, rerender } = render(
      <Legends legends={legends} enabledWrapLines={enabledWrapLines} ariaLabel="Legendas" />,
    );
    getAllByRole('listbox', { hidden: true }).forEach(listbox => {
      expect(listbox.getAttribute('aria-label')).toBe('Legendas');
    });

    rerender(<Legends legends={legends} enabledWrapLines={enabledWrapLines} ariaLabel="Legenden" />);
    getAllByRole('listbox', { hidden: true }).forEach(listbox => {
      expect(listbox.getAttribute('aria-label')).toBe('Legenden');
    });
  });

  it.each([undefined, 'Legendas'])('names the overflow list using ariaLabel=%s', async ariaLabel => {
    const result = render(
      <Legends
        legends={legends}
        enabledWrapLines
        ariaLabel={ariaLabel}
        overflowProps={{ overflowItems: overflowLegends.slice(0, 2) }}
      />,
    );
    fireEvent.click(result.getByRole('button', { name: '2 more' }));

    await waitFor(() => {
      const listboxes = result.getAllByRole('listbox', { hidden: true });
      expect(listboxes.length).toBe(2);
      listboxes.forEach(listbox => {
        expect(listbox.getAttribute('aria-label')).toBe(ariaLabel ?? 'Legends');
      });
    });
  });

  it('preserves the overflow focus zone accessible name override', async () => {
    const result = render(
      <Legends
        legends={legends}
        enabledWrapLines
        ariaLabel="Legendas"
        focusZonePropsInHoverCard={{ 'aria-label': 'Legendas adicionais' }}
        overflowProps={{ overflowItems: overflowLegends.slice(0, 2) }}
      />,
    );
    fireEvent.click(result.getByRole('button', { name: '2 more' }));

    expect(await result.findByRole('listbox', { name: 'Legendas adicionais' })).toBeTruthy();
  });

  it('uses the localized complete overflow label and updates its count', () => {
    const overflowText = jest.fn((count: number) => (count === 1 ? 'mais uma legenda' : `mais ${count} legendas`));
    const { getByRole, rerender } = render(
      <Legends
        legends={legends}
        enabledWrapLines
        overflowProps={{ overflowItems: overflowLegends.slice(0, 3) }}
        overflowText={overflowText}
      />,
    );
    expect(getByRole('button', { name: 'mais 3 legendas' }).textContent).toBe('mais 3 legendas');
    expect(overflowText).toHaveBeenLastCalledWith(3);

    rerender(
      <Legends
        legends={legends}
        enabledWrapLines
        overflowProps={{ overflowItems: overflowLegends.slice(0, 1) }}
        overflowText={overflowText}
      />,
    );
    expect(getByRole('button', { name: 'mais uma legenda' }).textContent).toBe('mais uma legenda');
    expect(overflowText).toHaveBeenLastCalledWith(1);

    overflowText.mockClear();
    rerender(
      <Legends legends={legends} enabledWrapLines overflowProps={{ overflowItems: [] }} overflowText={overflowText} />,
    );
    expect(overflowText).not.toHaveBeenCalled();
  });

  it('updates both overflow labels when the locale changes without changing the count', () => {
    const props = {
      legends,
      enabledWrapLines: true,
      overflowProps: { overflowItems: overflowLegends.slice(0, 3) },
    };
    const { getByRole, queryByRole, rerender } = render(
      <Legends {...props} overflowText={count => `mais ${count} legendas`} />,
    );
    expect(getByRole('button', { name: 'mais 3 legendas' }).textContent).toBe('mais 3 legendas');

    rerender(<Legends {...props} overflowText={count => `${count} weitere Legenden`} />);

    expect(getByRole('button', { name: '3 weitere Legenden' }).textContent).toBe('3 weitere Legenden');
    expect(queryByRole('button', { name: 'mais 3 legendas' })).toBeNull();
  });

  it.each([undefined, '', 'remaining'])('preserves string overflow formatting for %s', overflowText => {
    const { getByRole } = render(
      <Legends
        legends={legends}
        enabledWrapLines
        overflowProps={{ overflowItems: overflowLegends.slice(0, 3) }}
        overflowText={overflowText}
      />,
    );
    const label = `3 ${overflowText || 'more'}`;
    expect(getByRole('button', { name: label }).textContent).toBe(label);
  });

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
