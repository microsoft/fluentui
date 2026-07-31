/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots, Field, presenceMotionSlot, slot, Switch } from '@fluentui/react-components';
import type {
  ComponentProps,
  ComponentState,
  JSXElement,
  PresenceMotionSlotProps,
  Slot,
} from '@fluentui/react-components';
import { Fade, type FadeParams } from '../../../../react-motion-components-preview/library/src/index';
import * as React from 'react';

import description from './PresenceMotionSlotDisable.stories.md';

import styles from './PresenceMotionSlotDisable.module.css';

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

// --- Story ---

const useClasses = () => styles;

export const PresenceMotionSlotDisable = (): JSXElement => {
  const classes = useClasses();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        {/* Passing null disables the animation — the panel appears/disappears instantly */}
        <InfoPanel open={open} surfaceMotion={null}>
          <div className={classes.panel}>This panel has its animation disabled via surfaceMotion=null.</div>
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

PresenceMotionSlotDisable.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
