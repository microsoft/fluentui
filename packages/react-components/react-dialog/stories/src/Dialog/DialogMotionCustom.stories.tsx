import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  makeStyles,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import description from './DialogMotionCustom.stories.md';

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const MotionCustom = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(600);
  const [outScale, setOutScale] = React.useState(0.5);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [backdropDuration, setBackdropDuration] = React.useState(300);

  const easing = motionTokens.curveDecelerateMid;

  return (
    <>
      <div className={classes.controls}>
        <Field label={`Surface duration: ${duration}ms`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Field label={`Surface outScale: ${outScale.toFixed(2)}`}>
          <Slider min={0} max={1} step={0.05} value={outScale} onChange={(_, data) => setOutScale(data.value)} />
        </Field>
        <Field label={`Backdrop duration: ${backdropDuration}ms`}>
          <Slider
            min={0}
            max={1000}
            step={50}
            value={backdropDuration}
            onChange={(_, data) => setBackdropDuration(data.value)}
          />
        </Field>
        <Switch
          label="Surface animateOpacity"
          checked={animateOpacity}
          onChange={(_, data) => setAnimateOpacity(data.checked)}
        />
      </div>

      <Dialog surfaceMotion={{ duration, outScale, easing, animateOpacity }}>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogSurface backdropMotion={{ duration: backdropDuration }}>
          <DialogBody>
            <DialogTitle>Dialog with custom motion params</DialogTitle>
            <DialogContent>
              This dialog's surface animation is driven by direct <code>surfaceMotion</code> params (`duration`,
              `outScale`, `easing`, `animateOpacity`). Its backdrop fade is tuned independently via{' '}
              <code>backdropMotion</code> (`duration`).
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
