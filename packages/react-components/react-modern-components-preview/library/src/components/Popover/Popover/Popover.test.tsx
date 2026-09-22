import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../../testing/isConformant';
import { Popover } from './Popover';
import { PopoverSurface } from '../PopoverSurface/PopoverSurface';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <div>Popover content</div> },
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
  });

  it('composes headless open behavior', () => {
    const onOpenChange = jest.fn();
    const { getByRole, queryByText } = render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Popover content</PopoverSurface>
      </Popover>,
    );

    expect(queryByText('Popover content')).not.toBeInTheDocument();

    userEvent.click(getByRole('button'));

    expect(getByRole('group', { hidden: true })).toHaveTextContent('Popover content');
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('renders a custom surface motion and accepts disabled motion', () => {
    const customMotion = {
      children: (_: unknown, motionProps: { children: React.ReactElement }) => (
        <div data-testid="custom-motion">{motionProps.children}</div>
      ),
    };
    const { getByTestId, queryByTestId, rerender } = render(
      <Popover defaultOpen surfaceMotion={customMotion}>
        <PopoverSurface>Custom motion content</PopoverSurface>
      </Popover>,
    );

    expect(getByTestId('custom-motion')).toHaveTextContent('Custom motion content');

    rerender(
      <Popover defaultOpen surfaceMotion={null}>
        <PopoverSurface>Disabled motion content</PopoverSurface>
      </Popover>,
    );
    expect(queryByTestId('custom-motion')).not.toBeInTheDocument();
  });
});
