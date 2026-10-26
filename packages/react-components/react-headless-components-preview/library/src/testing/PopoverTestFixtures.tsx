import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { Popover } from '../components/Popover/Popover';
import { PopoverTrigger } from '../components/Popover/PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from '../components/Popover/PopoverSurface/PopoverSurface';
import type { PopoverProps } from '../components/Popover/Popover.types';

export type TestOpenMode = 'uncontrolled' | 'accept' | 'reject';

export const useTestPopoverOpen = (
  mode: TestOpenMode,
  initiallyOpen: boolean,
  onOpenChange?: PopoverProps['onOpenChange'],
): Pick<PopoverProps, 'open' | 'defaultOpen' | 'onOpenChange'> => {
  const [open, setOpen] = React.useState(initiallyOpen);
  return {
    defaultOpen: mode === 'uncontrolled' ? initiallyOpen : undefined,
    open: mode === 'uncontrolled' ? undefined : open,
    onOpenChange: (event, data) => {
      onOpenChange?.(event, data);
      if (mode === 'accept' || (mode === 'reject' && data.open)) {
        setOpen(data.open);
      }
    },
  };
};

export const PopoverFocusExample = ({
  textOnly = false,
  ...props
}: Partial<PopoverProps> & { textOnly?: boolean }): React.ReactElement => (
  <>
    <button data-testid="before">Before</button>
    <Popover defaultOpen={props.open === undefined ? true : undefined} {...props}>
      <PopoverTrigger>
        <button data-testid="trigger">Trigger</button>
      </PopoverTrigger>
      <PopoverSurface data-testid="surface">
        {textOnly ? 'Surface' : <button data-testid="inside">Inside</button>}
        {props.children}
      </PopoverSurface>
    </Popover>
    <button data-testid="after">After</button>
  </>
);

export const TriggerPortalExample = ({
  mountNode,
  autoFocus = false,
  interactive = true,
  ...props
}: Partial<Omit<PopoverProps, 'children'>> & {
  mountNode: HTMLElement;
  autoFocus?: boolean;
  interactive?: boolean;
}): React.ReactElement => (
  <Popover {...props}>
    <PopoverTrigger disableButtonEnhancement>
      <div tabIndex={0}>
        Trigger
        <Portal mountNode={mountNode}>
          <button autoFocus={autoFocus}>Entry</button>
        </Portal>
      </div>
    </PopoverTrigger>
    <PopoverSurface as="div" data-testid="surface">
      {interactive ? <button>Inside</button> : 'Surface'}
    </PopoverSurface>
  </Popover>
);
