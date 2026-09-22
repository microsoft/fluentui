import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../../testing/isConformant';
import { Popover } from '../Popover/Popover';
import { PopoverSurface } from '../PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger';

describe('PopoverTrigger', () => {
  isConformant({
    Component: PopoverTrigger,
    displayName: 'PopoverTrigger',
    requiredProps: { children: <button>Trigger</button> },
    componentPath: require.resolve('./PopoverTrigger'),
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'has-top-level-file',
      'has-top-level-file-extra',
      'make-styles-overrides-win',
    ],
  });

  it('preserves child handlers while applying trigger state', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button onClick={onClick}>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Popover content</PopoverSurface>
      </Popover>,
    );

    const trigger = getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('data-open');

    userEvent.click(trigger);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
