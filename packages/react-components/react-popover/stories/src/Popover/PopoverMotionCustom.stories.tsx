import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, createPresenceComponent, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import { fadeAtom, blurAtom } from '@fluentui/react-motion-components-preview';

const FadeInBlurOut = createPresenceComponent({
  enter: fadeAtom({ duration: 500, direction: 'enter' }),
  exit: [fadeAtom({ duration: 500, direction: 'exit' }), blurAtom({ duration: 500, direction: 'exit' })],
});

export const MotionCustom = (): JSXElement => (
  <Popover
    surfaceMotion={{
      // The children render function replaces the default PopoverSurfaceMotion component.
      // The first argument is the default component (ignored here since we're replacing it).
      // The second argument contains the resolved slot props:
      //   - motionProps: visible, appear, unmountOnExit, children (the popover surface), and event callbacks
      //   - mainAxis: a popover-specific slide distance param unused by the custom motion, so it is discarded
      children: (_, { mainAxis: _mainAxis, ...motionProps }) => <FadeInBlurOut {...motionProps} />,
    }}
  >
    <PopoverTrigger disableButtonEnhancement>
      <Button>Open popover</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
      <h3 style={{ marginTop: 0 }}>Popover content</h3>
      <p>This popover fades in and blurs out.</p>
    </PopoverSurface>
  </Popover>
);

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'Popover animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` slot.',
    },
  },
};
