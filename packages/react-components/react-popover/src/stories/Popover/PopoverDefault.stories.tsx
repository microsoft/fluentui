import * as React from 'react';
import { Popover, PopoverSurface, Switch, PositioningImperativeRef } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

export const Default = (props: PopoverProps) => {
  const positioningRef = React.useRef<PositioningImperativeRef | null>(null);
  const switchRef = React.useRef<HTMLInputElement>(null);
  const popoverSurfaceRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (positioningRef.current && switchRef.current) {
      positioningRef.current.setTarget(switchRef.current);
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      switchRef.current?.focus();
    }
  }, [open]);

  const onFocus = () => {
    setOpen(true);
  };

  const onBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  const onMouseOver = (e: React.MouseEvent) => {
    setOpen(true);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    setOpen(false);
  };

  return (
    <span onFocus={onFocus} onBlur={onBlur} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <Switch ref={switchRef} />
      <Popover inline positioning={{ positioningRef }} open={open}>
        <PopoverSurface ref={popoverSurfaceRef}>
          <div>
            <h3>Popover content</h3>

            <button>Button</button>
          </div>
        </PopoverSurface>
      </Popover>
    </span>
  );
};
