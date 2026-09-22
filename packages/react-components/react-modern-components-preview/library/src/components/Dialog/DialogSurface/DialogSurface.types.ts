import type {
  DialogSurfaceProps as DialogSurfaceBaseProps,
  DialogSurfaceState as DialogSurfaceBaseState,
} from '@fluentui/react-headless-components-preview/dialog';
export type { DialogSurfaceSlots } from '@fluentui/react-headless-components-preview/dialog';

export type DialogSurfaceProps = DialogSurfaceBaseProps;

export type DialogSurfaceState = DialogSurfaceBaseState & {
  root: DialogSurfaceBaseState['root'] & {
    'data-nested'?: '';
  };
};
