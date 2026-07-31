import * as React from 'react';
import StaggerDelayModeDescription from './StaggerDelayMode.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Avatar, Checkbox, motionTokens } from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

import styles from './StaggerDelayMode.module.css';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
] as const;

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut =
  'linear(0, 0.453 7.8%, 0.803 16.1%, 1.048 24.9%, 1.132 29.5%, 1.194 34.4%, 1.227 38.4%, 1.245 42.5%, 1.25 46.9%, 1.242 51.7%, 1.2 60.5%, 1.038 84.9%, 1.009 92.5%, 1)';

const renderAvatarsWithTransition = () => {
  return avatarData.map(avatar => (
    <Scale
      outScale={0}
      duration={600}
      exitDuration={300}
      easing={curveOvershootFirmOut}
      exitEasing={motionTokens.curveAccelerateMid}
      key={avatar.name}
    >
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </Scale>
  ));
};

const renderPlainAvatars = () => {
  return avatarData.map(avatar => (
    <div key={avatar.name} style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </div>
  ));
};

const useClasses = () => styles;

export const DelayMode = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const [reversed, setReversed] = React.useState(false);
  const itemDelay = 100;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={() => setVisible(!visible)} appearance="primary">
          {visible ? 'Hide' : 'Show'} Avatars
        </Button>
        <Checkbox checked={reversed} onChange={(_, data) => setReversed(data.checked === true)} label="Reversed" />
      </div>

      <div className={classes.comparison}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>delayProp (Motion Components)</div>
          <div className={classes.items}>
            <Stagger visible={visible} delayMode="delayProp" itemDelay={itemDelay} reversed={reversed}>
              {renderAvatarsWithTransition()}
            </Stagger>
          </div>
          <div className={classes.description}>
            Native component delay props — browser-driven timing (best performance).
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>timing (JavaScript Control)</div>
          <div className={classes.items}>
            <div className={classes.badge}>Auto-detected</div>
            <Stagger visible={visible} delayMode="timing" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>JavaScript-managed timing (works for plain DOM or mixed content).</div>
        </div>
      </div>
    </div>
  );
};

DelayMode.parameters = {
  docs: {
    description: {
      story: StaggerDelayModeDescription,
    },
  },
};
