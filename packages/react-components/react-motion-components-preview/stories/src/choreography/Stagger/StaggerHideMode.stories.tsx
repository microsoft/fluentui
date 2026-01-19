import * as React from 'react';
import StaggerHideModeDescription from './StaggerHideMode.stories.md';
import { makeStyles, tokens, Button, Avatar, Checkbox, motionTokens, JSXElement } from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

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

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '80px',
    position: 'relative',
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  badge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
    position: 'absolute',
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },
});

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
