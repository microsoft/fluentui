/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import {
  assertSlots,
  createPresenceComponent,
  Field,
  makeStyles,
  motionTokens,
  presenceMotionSlot,
  slot,
  Switch,
  tokens,
} from '@fluentui/react-components';
import type {
  ComponentProps,
  ComponentState,
  JSXElement,
  PresenceMotionSlotProps,
  Slot,
} from '@fluentui/react-components';
import { Fade, type FadeParams } from '../../../../react-motion-components-preview/library/src/index';
import * as React from 'react';

import description from './PresenceMotionSlotCustomize.stories.md';

// A params-typed fade slot: consumers can pass `{ duration, easing, outOpacity, ... }`
// directly on `surfaceMotion`.
type InfoPanelSlots = {
  root: NonNullable<Slot<'div'>>;
  surfaceMotion?: Slot<PresenceMotionSlotProps<FadeParams>>;
};

type InfoPanelProps = ComponentProps<InfoPanelSlots> & {
  open?: boolean;
};

type InfoPanelState = ComponentState<InfoPanelSlots> & {
  open: boolean;
};

const useInfoPanel = (props: InfoPanelProps): InfoPanelState => {
  const { open = false, surfaceMotion, ...rootProps } = props;

  return {
    open,
    components: {
      root: 'div',
      surfaceMotion: Fade,
    },
    root: slot.always(rootProps, { elementType: 'div' }),
    surfaceMotion: presenceMotionSlot(surfaceMotion, {
      elementType: Fade,
      defaultProps: {
        visible: open,
        unmountOnExit: true,
      },
    }),
  };
};

const renderInfoPanel = (state: InfoPanelState): JSXElement => {
  assertSlots<InfoPanelSlots>(state);

  return (
    <state.root>
      {state.surfaceMotion && (
        <state.surfaceMotion>
          <div>{state.root.children}</div>
        </state.surfaceMotion>
      )}
    </state.root>
  );
};

const InfoPanel: React.FC<InfoPanelProps> = props => {
  const state = useInfoPanel(props);

  return renderInfoPanel(state);
};

// A completely different motion for the render-fn card to swap in
const SlideMotion = createPresenceComponent({
  enter: {
    keyframes: [
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    duration: motionTokens.durationGentle,
    easing: motionTokens.curveDecelerateMax,
  },
  exit: {
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-20px)' },
    ],
    duration: motionTokens.durationGentle,
    easing: motionTokens.curveAccelerateMid,
  },
});

// --- Story ---

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card card" "controls controls controls" / 1fr 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minHeight: '140px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  panel: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    padding: '16px',
    fontSize: tokens.fontSizeBase200,
    textAlign: 'center',
  },
  label: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    textAlign: 'center',
    marginTop: '8px',
  },
});

export const PresenceMotionSlotCustomize = (): JSXElement => {
  const classes = useClasses();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <InfoPanel open={open}>
          <div className={classes.panel}>Default fade</div>
        </InfoPanel>
        <span className={classes.label}>Default</span>
      </div>

      <div className={classes.card}>
        {/* Tune the default fade by passing params directly on the slot */}
        <InfoPanel open={open} surfaceMotion={{ duration: 1000, outOpacity: 0.2 }}>
          <div className={classes.panel}>Slow fade with residual opacity</div>
        </InfoPanel>
        <span className={classes.label}>
          Direct params
          <br />
          <code>{'{ duration: 1000, outOpacity: 0.2 }'}</code>
        </span>
      </div>

      <div className={classes.card}>
        {/* Replace the default fade with a different motion via render function */}
        <InfoPanel
          open={open}
          surfaceMotion={{
            children: (_, props) => <SlideMotion {...props}>{props.children}</SlideMotion>,
          }}
        >
          <div className={classes.panel}>Slide from above</div>
        </InfoPanel>
        <span className={classes.label}>
          Render function
          <br />
          (swap in slide)
        </span>
      </div>

      <div className={classes.controls}>
        <Field>
          <Switch label="Visible" checked={open} onChange={() => setOpen(v => !v)} />
        </Field>
      </div>
    </div>
  );
};

PresenceMotionSlotCustomize.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
