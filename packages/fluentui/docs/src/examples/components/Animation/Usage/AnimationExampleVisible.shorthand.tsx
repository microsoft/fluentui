import * as React from 'react';
import { Provider, Animation, Button } from '@fluentui/react-northstar';
import { useLogKnob } from '@fluentui/docs-components';
import { MentionIcon } from '@fluentui/react-icons-northstar';

const AnimationExampleVisible = () => {
  const [visible, setVisible] = React.useState(false);

  const onEnter = useLogKnob('onEnter');
  const onEntering = useLogKnob('onEntering');
  const onEntered = useLogKnob('onEntered');

  const onExit = useLogKnob('onExit');
  const onExiting = useLogKnob('onExiting');
  const onExited = useLogKnob('onExited');

  return (
    <Provider
      theme={{
        animations: {
          fadeEnterSlow: {
            keyframe: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            duration: '500ms',
            timingFunction: 'cubic-bezier(0.33,0.00,0.67,1.00)',
            fillMode: 'forwards',
          },
          fadeExitSlow: {
            keyframe: {
              '0%': { opacity: 1 },
              '100%': { opacity: 0 },
            },
            duration: '500ms',
            timingFunction: 'cubic-bezier(0.33,0.00,0.67,1.00)',
            fillMode: 'forwards',
          },
        },
      }}
    >
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</Button>&emsp;
      {/* Children as function */}
      <Animation
        visible={visible}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        name={visible ? 'fadeEnterSlow' : 'fadeExitSlow'}
        mountOnEnter
        unmountOnExit
      >
        {({ classes }) => <MentionIcon className={classes} />}
      </Animation>
      {/* Children as element */}
      <Animation
        visible={visible}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        name={visible ? 'fadeEnterSlow' : 'fadeExitSlow'}
        mountOnEnter
        unmountOnExit
      >
        <MentionIcon />
      </Animation>
    </Provider>
  );
};

export default AnimationExampleVisible;
