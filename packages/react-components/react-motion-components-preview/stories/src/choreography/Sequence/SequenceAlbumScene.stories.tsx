import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Text, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import {
  createChoreographyComponent,
  fadeIn,
  fadeOut,
  hold,
  layer,
  scaleIn,
  scaleOut,
  sequence,
  slideIn,
  slideOut,
  stagger,
} from '@fluentui/react-motion-components-preview';
import SequenceAlbumSceneDescription from './SequenceAlbumScene.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalL,
  },
  stage: {
    width: '420px',
    padding: tokens.spacingHorizontalXL,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    overflow: 'hidden',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '120px 100px',
    gap: tokens.spacingHorizontalM,
    '& > :nth-child(1)': {
      gridColumn: '1 / -1',
    },
  },
  photoCard: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: tokens.fontWeightSemibold,
  },
});

const AlbumSceneMotion = createChoreographyComponent([
  layer(
    '[data-part="title"]',
    sequence([
      [
        fadeIn({ duration: 400, easing: motionTokens.curveDecelerateMin }),
        slideIn({ from: { y: '-32px' }, duration: 400, easing: motionTokens.curveDecelerateMin }),
      ],
      hold(1200),
      [
        fadeOut({ duration: 400, easing: motionTokens.curveAccelerateMin }),
        slideOut({ to: { y: '32px' }, duration: 400, easing: motionTokens.curveAccelerateMin }),
      ],
    ]),
  ),
  stagger(
    [
      layer(
        '[data-part="photo"]',
        sequence([
          [
            fadeIn({ duration: 250, easing: motionTokens.curveDecelerateMin }),
            scaleIn({ from: 0.7, duration: 250, easing: motionTokens.curveDecelerateMin }),
          ],
          hold(1300),
          [
            fadeOut({ duration: 250, easing: motionTokens.curveAccelerateMin }),
            scaleOut({ to: 0.7, duration: 250, easing: motionTokens.curveAccelerateMin }),
          ],
        ]),
      ),
    ],
    { startInterval: 100 },
  ),
]);

export const AlbumScene = (): JSXElement => {
  const classes = useClasses();
  const [replayKey, setReplayKey] = React.useState(0);

  return (
    <div className={classes.container}>
      <Button appearance="primary" onClick={() => setReplayKey(k => k + 1)}>
        Replay Scene
      </Button>

      <AlbumSceneMotion replayKey={replayKey}>
        <div className={classes.stage}>
          <Text as="h2" size={700} weight="bold" data-part="title">
            Summer Highlights
          </Text>
          <div className={classes.photoGrid}>
            <div className={classes.photoCard} data-part="photo">
              Photo 1
            </div>
            <div className={classes.photoCard} data-part="photo">
              Photo 2
            </div>
            <div className={classes.photoCard} data-part="photo">
              Photo 3
            </div>
          </div>
        </div>
      </AlbumSceneMotion>
    </div>
  );
};

AlbumScene.parameters = {
  docs: {
    description: {
      story: SequenceAlbumSceneDescription,
    },
  },
};
