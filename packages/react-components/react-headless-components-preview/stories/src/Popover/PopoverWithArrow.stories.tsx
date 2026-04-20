import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  wrapper: 'flex flex-col items-start gap-4 p-16',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'popover-with-arrow bg-white rounded-lg p-4 min-w-[240px] max-w-xs',
};

// The headless Popover renders an unstyled <div data-arrow /> inside the
// PopoverSurface when `withArrow` is set. Stories own the arrow styling —
// here the arrow is a 12px rotated square sharing the surface's
// background, and the surface uses `filter: drop-shadow(...)` (not
// `box-shadow`) so the shadow follows the combined silhouette of surface
// + arrow without casting any shadow into the popover's interior.
// Orientation is driven by data-placement, which usePositioning keeps in
// sync with the on-screen placement (including manual flip on overflow).
const arrowCss = `
.popover-with-arrow {
  overflow: visible;
  background: white;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.14));
}
.popover-with-arrow [data-arrow] {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
}
.popover-with-arrow[data-placement^='above'] [data-arrow] {
  bottom: -6px;
  inset-inline: 0;
  margin-inline: auto;
}
.popover-with-arrow[data-placement^='below'] [data-arrow] {
  top: -6px;
  inset-inline: 0;
  margin-inline: auto;
}
.popover-with-arrow[data-placement^='before'] [data-arrow] {
  right: -6px;
  inset-block: 0;
  margin-block: auto;
}
.popover-with-arrow[data-placement^='after'] [data-arrow] {
  left: -6px;
  inset-block: 0;
  margin-block: auto;
}
`;

export const WithArrow = (): React.ReactNode => (
  <div className={classes.wrapper}>
    <style>{arrowCss}</style>
    <Popover withArrow positioning={{ position: 'below', offset: 10 }}>
      <PopoverTrigger>
        <button className={classes.trigger}>With arrow</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Arrow popover</h3>
        <p className="text-sm text-gray-600">
          The headless <code>Popover</code> renders an unstyled <code>{`<div data-arrow />`}</code> when{' '}
          <code>withArrow</code> is set. This story styles the div as a CSS border-triangle and positions it at the
          surface edge that faces the trigger, using the <code>data-placement</code> attribute that{' '}
          <code>usePositioning</code> writes.
        </p>
      </PopoverSurface>
    </Popover>
  </div>
);
