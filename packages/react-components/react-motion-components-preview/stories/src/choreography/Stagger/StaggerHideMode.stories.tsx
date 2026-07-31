import * as React from 'react';
import StaggerHideModeDescription from './StaggerHideMode.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Avatar, Checkbox, motionTokens } from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

import styles from './StaggerHideMode.module.css';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
] as const;

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

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut =
  'linear(0, 0.453 7.8%, 0.803 16.1%, 1.048 24.9%, 1.132 29.5%, 1.194 34.4%, 1.227 38.4%, 1.245 42.5%, 1.25 46.9%, 1.242 51.7%, 1.2 60.5%, 1.038 84.9%, 1.009 92.5%, 1)';

export const HideMode = (): JSXElement => {
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
          <div className={classes.sectionTitle}>visibleProp</div>
          <div className={classes.items}>
            <div className={classes.badge}>Auto-detected</div>
            <Stagger visible={visible} hideMode="visibleProp" itemDelay={itemDelay} reversed={reversed}>
              {renderAvatarsWithTransition()}
            </Stagger>
          </div>
          <div className={classes.description}>Preserves mount & layout; uses component-level animations.</div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>visibilityStyle</div>
          <div className={classes.items}>
            <div className={classes.badge}>Override</div>
            <Stagger visible={visible} hideMode="visibilityStyle" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>
            Keeps elements mounted and toggles CSS visibility to preserve layout.
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>unmount</div>
          <div className={classes.items}>
            <div className={classes.badge}>Override</div>
            <Stagger visible={visible} hideMode="unmount" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>Mounts/unmounts children so items affect layout on enter/exit.</div>
        </div>
      </div>
    </div>
  );
};

HideMode.parameters = {
  docs: {
    description: {
      story: StaggerHideModeDescription,
    },
  },
};
