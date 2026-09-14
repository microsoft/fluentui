/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots, Field, makeStyles, presenceMotionSlot, slot, Switch, tokens } from '@fluentui/react-components';
import type {
  ComponentProps,
  ComponentState,
  JSXElement,
  PresenceMotionSlotProps,
  Slot,
} from '@fluentui/react-components';
import { Fade, type FadeParams } from '../../../../react-motion-components-preview/library/src/index';
import * as React from 'react';

import description from './PresenceMotionSlotDefault.stories.md';

// 1. Pick a presence motion. Here we reuse `Fade` from react-motion-components-preview,
//    which is built with createPresenceComponent and accepts FadeParams (duration,
//    easing, outOpacity, inOpacity, ...).

// 2. Define the component's slot types. Declaring the slot with `FadeParams`
//    surfaces those params as direct props on `surfaceMotion`.
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

// 3. Build component state with presenceMotionSlot()
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

// 4. Render the component using the slot
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

// --- Story ---

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minHeight: '120px',
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
    padding: '20px',
  },
});

export const PresenceMotionSlotDefault = (): JSXElement => {
  const classes = useClasses();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <InfoPanel open={open}>
          <div className={classes.panel}>This panel uses presenceMotionSlot for its enter/exit animation.</div>
        </InfoPanel>
      </div>

      <div className={classes.controls}>
        <Field>
          <Switch label="Visible" checked={open} onChange={() => setOpen(v => !v)} />
        </Field>
      </div>
    </div>
  );
};

PresenceMotionSlotDefault.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
