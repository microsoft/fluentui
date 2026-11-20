// An entry point that re-exports a hook with `export type`, which removes it from the runtime module.
export { Dialog, renderDialog, useDialogContextValues } from '../../dialog';
export type { useDialog, DialogContextValues, DialogProps, DialogState } from '../../dialog';
