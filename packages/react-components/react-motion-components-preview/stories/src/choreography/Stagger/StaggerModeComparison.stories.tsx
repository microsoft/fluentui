import * as React from 'react';
import StaggerModeComparisonDescription from './StaggerModeComparison.stories.md';
import {
  makeStyles,
  tokens,
  Button,
  Avatar,
  Dropdown,
  Option,
  motionTokens,
  JSXElement,
} from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

type StaggerHideMode = 'visibleProp' | 'visibilityStyle' | 'unmount';
type StaggerDelayMode = 'timing' | 'delayProp';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
] as const;

const renderAvatars = () => {
  return avatarData.map(avatar => (
    <Avatar key={avatar.name} initials={avatar.initials} color={avatar.color} name={avatar.name} />
  ));
};

const renderAvatarsWithTransition = () => {
  return avatarData.map(avatar => (
    <Scale
      fromScale={0}
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
    flexWrap: 'wrap',
  },
  dropdown: {
    minWidth: '160px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalL,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '100px',
    position: 'relative',
  },
  modeInfo: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS,
  },
  badge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  hideModeBadge: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
  },
  delayModeBadge: {
    color: tokens.colorPalettePurpleForeground2,
    backgroundColor: tokens.colorPalettePurpleBackground2,
  },
  performanceBadge: {
    color: tokens.colorPaletteGreenForeground1,
    backgroundColor: tokens.colorPaletteGreenBackground2,
  },
  warningBadge: {
    color: tokens.colorPaletteYellowForeground1,
    backgroundColor: tokens.colorPaletteYellowBackground2,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

const getPerformanceRating = (hideMode: StaggerHideMode, delayMode: StaggerDelayMode) => {
  if (delayMode === 'delayProp') {
    return 'Best Performance';
  }
  if (hideMode === 'visibilityStyle' && delayMode === 'timing') {
    return 'Good Performance';
  }
  return 'Standard Performance';
};

const getDescription = (hideMode: StaggerHideMode, delayMode: StaggerDelayMode) => {
  const combinations = {
    'visibleProp-delayProp': 'Optimal for presence components - native timing, component animations',
    'visibleProp-timing': 'Presence components with JavaScript timing control',
    'visibilityStyle-delayProp': 'Layout preservation with native timing (bypasses component animations)',
    'visibilityStyle-timing': 'Standard DOM elements with stable layout',
    'unmount-delayProp': 'Optimal for one-way animations - native timing, layout reflow',
    'unmount-timing': 'One-way animations with JavaScript timing control',
  };
  return combinations[`${hideMode}-${delayMode}` as keyof typeof combinations] || 'Custom combination';
};

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut =
  'linear(0, 0.453 7.8%, 0.803 16.1%, 1.048 24.9%, 1.132 29.5%, 1.194 34.4%, 1.227 38.4%, 1.245 42.5%, 1.25 46.9%, 1.242 51.7%, 1.2 60.5%, 1.038 84.9%, 1.009 92.5%, 1)';

export const ModeComparison = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(false);
  const [hideMode, setHideMode] = React.useState<StaggerHideMode>('visibleProp');
  const [delayMode, setDelayMode] = React.useState<StaggerDelayMode>('delayProp');
  const itemDelay = 100;

  const performanceRating = getPerformanceRating(hideMode, delayMode);
  const description = getDescription(hideMode, delayMode);

  // Choose appropriate content based on selected modes
  const content =
    hideMode === 'visibleProp' || delayMode === 'delayProp' ? renderAvatarsWithTransition() : renderAvatars();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={() => setVisible(!visible)} appearance="primary">
          {visible ? 'Hide' : 'Show'} Avatars
        </Button>

        <Dropdown
          className={classes.dropdown}
          placeholder="Hide Mode"
          value={hideMode}
          onOptionSelect={(_, data) => setHideMode(data.optionValue as StaggerHideMode)}
        >
          <Option value="visibleProp">visibleProp</Option>
          <Option value="visibilityStyle">visibilityStyle</Option>
          <Option value="unmount">unmount</Option>
        </Dropdown>

        <Dropdown
          className={classes.dropdown}
          placeholder="Delay Mode"
          value={delayMode}
          onOptionSelect={(_, data) => setDelayMode(data.optionValue as StaggerDelayMode)}
        >
          <Option value="delayProp">delayProp</Option>
          <Option value="timing">timing</Option>
        </Dropdown>
      </div>

      <div className={classes.section}>
        <div className={classes.sectionTitle}>
          Current Configuration: {hideMode} + {delayMode}
        </div>

        <div className={classes.modeInfo}>
          <div className={`${classes.badge} ${classes.hideModeBadge}`}>hideMode: {hideMode}</div>
          <div className={`${classes.badge} ${classes.delayModeBadge}`}>delayMode: {delayMode}</div>
          <div
            className={`${classes.badge} ${
              performanceRating === 'Best Performance'
                ? classes.performanceBadge
                : performanceRating === 'Good Performance'
                ? classes.warningBadge
                : classes.warningBadge
            }`}
          >
            {performanceRating}
          </div>
        </div>

        <div className={classes.items}>
          <Stagger visible={visible} hideMode={hideMode} delayMode={delayMode} itemDelay={itemDelay}>
            {content}
          </Stagger>
        </div>

        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

ModeComparison.parameters = {
  docs: {
    description: {
      story: StaggerModeComparisonDescription,
    },
  },
};
