/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarGroupState, MessageBarGroupSlots } from './MessageBarGroup.types';
// import { TransitionGroup } from 'react-transition-group';
// import { MessageBarTransition } from './MessageBarTransition';
// import { Fade, Collapse } from '@fluentui/react-motion-components-preview';
import { createPresenceComponent, PresenceGroup, motionTokens, PresenceDirection } from '@fluentui/react-motion';

const opacityAtom = (direction: PresenceDirection, duration: number, easing: string = motionTokens.curveLinear) => {
  const keyframes = [{ opacity: 0 }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};

/**
 * A horizontal or vertical translation, from a specified distance to zero.
 * @param distance - The distance to slide; it can be a percentage or pixels.
 */
const slideAtom = (
  direction: PresenceDirection,
  axis: 'X' | 'Y',
  distance: string,
  duration: number,
  enterEasing: string = motionTokens.curveDecelerateMid,
  exitEasing: string = motionTokens.curveAccelerateMid,
) => {
  const keyframes = [{ transform: `translate${axis}(${distance})` }, { transform: 'translate${axis}(0)' }];
  let easing = enterEasing;
  if (direction === 'exit') {
    keyframes.reverse();
    easing = exitEasing;
  }
  return {
    keyframes,
    duration,
    easing,
  };
};

const SlideInFadeOut = createPresenceComponent(({ element }) => {
  const duration = motionTokens.durationGentle;

  return {
    enter: [
      opacityAtom('enter', duration),
      slideAtom('enter', 'Y', '-100%', duration),
      // {
      //   keyframes: [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }],
      //   duration,
      //   easing: motionTokens.curveDecelerateMid,
      // },
    ],

    exit: opacityAtom('exit', duration),
  };
});

/**
 * Render the final JSX of MessageBarGroup
 */
export const renderMessageBarGroup_unstable = (state: MessageBarGroupState) => {
  assertSlots<MessageBarGroupSlots>(state);

  return (
    <state.root>
      <PresenceGroup>
        {state.children.map(child => (
          <SlideInFadeOut key={child.key}>{child}</SlideInFadeOut>
        ))}
      </PresenceGroup>

      {/* <TransitionGroup component={null}>
        {state.children.map(child => (
          <MessageBarTransition
            animate={state.animate}
            key={child.key}
            enterClassName={state.enterStyles}
            exitClassName={state.exitStyles}
          >
            {child}
          </MessageBarTransition>
        ))}
      </TransitionGroup> */}
    </state.root>
  );
};
