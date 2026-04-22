import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  tokens,
  DialogTrigger,
  DialogSurface,
  makeStyles,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Field,
  Slider,
  Text,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  row: {
    display: 'flex',
    gap: '20px',
    alignItems: 'start',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  codeBlock: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    borderRadius: tokens.borderRadiusMedium,
    padding: '8px 12px',
    whiteSpace: 'pre',
  },
});

/**
 * When a component's motion slot type includes generic parameters, those parameters
 * can be passed directly as props on the slot object — no `children` render function needed.
 *
 * Dialog's `surfaceMotion` slot is typed with `ScaleParams`, exposing parameters like
 * `duration`, `outScale`, and `easing` as direct overrides. This follows the same pattern
 * as regular Fluent UI slots: `badge=&#123;&#123; status: 'available' &#125;&#125;`.
 */
export const DirectParams = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(600);
  const [outScale, setOutScale] = React.useState(0.5);

  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <Field label={`Enter duration: ${duration}ms`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Field label={`Out scale: ${outScale.toFixed(2)}`}>
          <Slider min={0} max={1} step={0.05} value={outScale} onChange={(_, data) => setOutScale(data.value)} />
        </Field>
      </div>

      <div className={classes.row}>
        <div className={classes.column}>
          <Text weight="semibold">Direct params (concise)</Text>
          <Dialog
            surfaceMotion={{
              duration,
              outScale,
            }}
          >
            <DialogTrigger disableButtonEnhancement>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Direct param override</DialogTitle>
                <DialogContent>
                  The <code>duration</code> and <code>outScale</code> props are passed directly on the{' '}
                  <code>surfaceMotion</code> slot object.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <div className={classes.codeBlock}>
            {`<Dialog
  surfaceMotion={{
    duration: ${duration},
    outScale: ${outScale.toFixed(2)},
  }}
>`}
          </div>
        </div>

        <div className={classes.column}>
          <Text weight="semibold">Children render function (verbose)</Text>
          <Dialog
            surfaceMotion={{
              children: (Motion, props) => (
                <Motion {...props} duration={duration} outScale={outScale}>
                  {props.children}
                </Motion>
              ),
            }}
          >
            <DialogTrigger disableButtonEnhancement>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Render function override</DialogTitle>
                <DialogContent>
                  The same override using a <code>children</code> render function — functionally identical but more
                  verbose.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <div className={classes.codeBlock}>
            {`<Dialog
  surfaceMotion={{
    children: (Motion, props) => (
      <Motion
        {...props}
        duration={${duration}}
        outScale={${outScale.toFixed(2)}}
      >
        {props.children}
      </Motion>
    ),
  }}
>`}
          </div>
        </div>
      </div>
    </div>
  );
};

DirectParams.parameters = {
  docs: {
    description: {
      story:
        'Motion slot parameters can be passed directly as props on the slot object, ' +
        'without using the `children` render function. This works when the component ' +
        'declares its motion slot with typed parameters ' +
        '(e.g. `Slot<PresenceMotionSlotProps<ScaleParams>>`). ' +
        'Compare the two approaches side by side — direct params for simple overrides, ' +
        'render function for full motion replacement.',
    },
  },
};
