'use client';

import { useDialog as useDialogBase } from '@fluentui/react-headless-components-preview/dialog';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Scale } from '@fluentui/react-motion-components-preview';
import type { DialogProps, DialogState } from './Dialog.types';

export const useDialog = (props: DialogProps): DialogState => {
  const { surfaceMotion, ...rest } = props;
  const state = useDialogBase(rest);

  return {
    ...state,
    components: {
      surfaceMotion: Scale,
    },
    surfaceMotion: presenceMotionSlot(surfaceMotion, {
      elementType: Scale,
      defaultProps: {
        appear: state.unmountOnClose,
        unmountOnExit: state.unmountOnClose,
        visible: state.open,
      },
    }),
  };
};
