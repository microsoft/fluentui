import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { fadeAtom, slideAtom } from '@fluentui/react-motion-components-preview';
import { MessageBarGroupProps } from './MessageBarGroup.types';

/**
 * A presence component for a MessageBar to enter and exit from a MessageBarGroup.
 * It has an optional enter transition of a slide-in and fade-in,
 * when the `animate` prop is set to `'both'`.
 * It always has an exit transition of a fade-out.
 */
export const MessageBarMotion = createPresenceComponent<{ animate?: MessageBarGroupProps['animate'] }>(
  ({ animate }) => {
    const duration = motionTokens.durationGentle;

    return {
      enter:
        animate === 'both'
          ? // enter with slide and fade
            [fadeAtom({ direction: 'enter', duration }), slideAtom({ direction: 'enter', outY: '-100%', duration })]
          : [], // no enter motion

      // Always exit with a fade
      exit: fadeAtom({ direction: 'exit', duration }),
    };
  },
);
