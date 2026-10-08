import * as React from 'react';
import { Legends } from './index';
import { render, act, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { tokens } from '@fluentui/react-theme';

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

  it('Should mount Overflow Button when not empty', () => {
    const wrapper = render(<Legends legends={legends} /* {...overflowProps} */ overflowText={'OverFlow Items'} />);
    const overflowBtnText = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtnText).toBeDefined();
  });

  it('Should not mount Overflow when empty', () => {
    const wrapper = render(<Legends legends={legends} />);
    const overflowBtn = wrapper.container.querySelectorAll('[class^="ms-OverflowSet-overflowButton"]');
    expect(overflowBtn!.length).toBe(0);
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

describe.each([false, true])('Legends - special names with multiselect %s', canSelectMultipleLegends => {
  const names = ['Revenue', '__proto__', 'constructor', 'toString'];
  const specialLegends = names.map(title => ({ title, color: tokens.colorBrandBackground }));

  it.each(names)('selects and deselects %s without treating inherited names as selected', title => {
    const onChange = jest.fn();
    render(
      <Legends legends={specialLegends} canSelectMultipleLegends={canSelectMultipleLegends} onChange={onChange} />,
    );
    names.forEach(name => expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false'));
    const option = screen.getByRole('option', { name: title });

    fireEvent.click(option);
    expect(onChange).toHaveBeenLastCalledWith([title], expect.anything(), expect.objectContaining({ title }));
    expect(option).toHaveAttribute('aria-selected', 'true');
    names
      .filter(name => name !== title)
      .forEach(name => {
        expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false');
      });
    fireEvent.click(option);
    expect(onChange).toHaveBeenLastCalledWith([], expect.anything(), expect.objectContaining({ title }));
    expect(option).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(option);
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  it.each(names)('honors default selection of %s', title => {
    render(
      <Legends
        legends={specialLegends}
        canSelectMultipleLegends={canSelectMultipleLegends}
        {...(canSelectMultipleLegends ? { defaultSelectedLegends: [title] } : { defaultSelectedLegend: title })}
      />,
    );
    names.forEach(name => {
      expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', String(name === title));
    });
    fireEvent.click(screen.getByRole('option', { name: title }));
    expect(screen.getByRole('option', { name: title })).toHaveAttribute('aria-selected', 'false');
  });

  it('leaves controlled selection unchanged until props update', () => {
    const onChange = jest.fn();
    const props = { legends: specialLegends, canSelectMultipleLegends, onChange };
    const { rerender } = render(
      <Legends
        {...props}
        {...(canSelectMultipleLegends ? { selectedLegends: ['constructor'] } : { selectedLegend: 'constructor' })}
      />,
    );
    fireEvent.click(screen.getByRole('option', { name: '__proto__' }));
    expect(onChange).toHaveBeenLastCalledWith(
      canSelectMultipleLegends ? ['constructor', '__proto__'] : ['__proto__'],
      expect.anything(),
      expect.objectContaining({ title: '__proto__' }),
    );
    expect(screen.getByRole('option', { name: 'constructor' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: '__proto__' })).toHaveAttribute('aria-selected', 'false');
    rerender(
      <Legends
        {...props}
        {...(canSelectMultipleLegends ? { selectedLegends: ['__proto__'] } : { selectedLegend: '__proto__' })}
      />,
    );
    expect(screen.getByRole('option', { name: '__proto__' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'constructor' })).toHaveAttribute('aria-selected', 'false');
  });

  if (canSelectMultipleLegends) {
    it('clears all selections and can select a special name again', () => {
      const onChange = jest.fn();
      render(<Legends legends={specialLegends} canSelectMultipleLegends onChange={onChange} />);
      names.forEach(name => fireEvent.click(screen.getByRole('option', { name })));
      expect(onChange).toHaveBeenLastCalledWith([], expect.anything(), expect.anything());
      names.forEach(name => expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false'));
      fireEvent.click(screen.getByRole('option', { name: '__proto__' }));
      expect(onChange).toHaveBeenLastCalledWith(['__proto__'], expect.anything(), expect.anything());
    });
  }
});
