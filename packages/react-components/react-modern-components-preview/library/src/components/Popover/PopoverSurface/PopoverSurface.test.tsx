import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Popover } from '../Popover/Popover';
import { PopoverSurface } from './PopoverSurface';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';

describe('PopoverSurface', () => {
  isConformant({
    Component: PopoverSurface,
    displayName: 'PopoverSurface',
    requiredProps: { children: 'Popover content' },
    componentPath: require.resolve('./PopoverSurface'),
    disabledTests: ['has-top-level-file', 'has-top-level-file-extra'],
  });

  it('applies the default visual state and preserves a consumer class', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface className="consumer-class">Popover content</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group', { hidden: true });
    expect(surface).toHaveAttribute('data-size', 'medium');
    expect(surface).not.toHaveAttribute('data-appearance');
    expect(surface).toHaveClass('fui-PopoverSurface', 'consumer-class');
  });

  it.each([
    ['small', 'brand'],
    ['large', 'inverted'],
  ] as const)('inherits the %s size and %s appearance', (size, appearance) => {
    const { getByRole } = render(
      <Popover defaultOpen size={size} appearance={appearance}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Popover content</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group', { hidden: true });
    expect(surface).toHaveAttribute('data-size', size);
    expect(surface).toHaveAttribute('data-appearance', appearance);
  });

  it('renders the headless arrow structure when requested', () => {
    const { getByRole } = render(
      <Popover defaultOpen withArrow>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Popover content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeInTheDocument();
  });

  it('forwards its ref to the native dialog surface', () => {
    const ref = React.createRef<HTMLDialogElement>();
    const { getByRole } = render(
      <Popover defaultOpen trapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface ref={ref}>Popover content</PopoverSurface>
      </Popover>,
    );

    expect(ref.current).toBe(getByRole('dialog', { hidden: true }));
    expect(ref.current?.tagName).toBe('DIALOG');
  });

  it('forwards its ref to the native div surface when focus trapping is disabled', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface ref={ref}>Popover content</PopoverSurface>
      </Popover>,
    );

    expect(ref.current).toBe(getByRole('group', { hidden: true }));
    expect(ref.current?.tagName).toBe('DIV');
  });
});
