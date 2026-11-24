import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Label, Slider, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import {
  createSequenceComponent,
  fadeIn,
  fadeOut,
  hold,
  slideIn,
  slideOut,
} from '@fluentui/react-motion-components-preview';
import SequenceDefaultDescription from './SequenceDefault.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    padding: tokens.spacingHorizontalM,
    minWidth: '280px',
  },
  stage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '320px',
    height: '180px',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    overflow: 'hidden',
  },
  banner: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
  },
});

const BannerSequence = createSequenceComponent([
  [
    fadeIn({ duration: 400, easing: motionTokens.curveDecelerateMin }),
    slideIn({ from: { y: '-48px' }, duration: 400, easing: motionTokens.curveDecelerateMin }),
  ],
  hold(900),
  [
    fadeOut({ duration: 400, easing: motionTokens.curveAccelerateMin }),
    slideOut({ to: { y: '48px' }, duration: 400, easing: motionTokens.curveAccelerateMin }),
  ],
]);

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [replayKey, setReplayKey] = React.useState(0);
  const [gap, setGap] = React.useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button appearance="primary" onClick={() => setReplayKey(k => k + 1)}>
          Replay Sequence
        </Button>
        <div>
          <Label weight="semibold">Gap: {gap}ms</Label>
          <Slider min={-200} max={300} step={50} value={gap} onChange={(_, data) => setGap(data.value)} />
        </div>
      </div>

      <div className={classes.stage}>
        <BannerSequence key={gap} gap={gap} replayKey={replayKey}>
          <div className={classes.banner}>Enter → Hold → Exit</div>
        </BannerSequence>
      </div>
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      story: SequenceDefaultDescription,
    },
  },
};
