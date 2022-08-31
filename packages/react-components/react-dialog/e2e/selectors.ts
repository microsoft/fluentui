import { dialogClassNames, dialogSurfaceClassNames, dialogTitleClassNames } from '@fluentui/react-dialog';

export const dialogBackdropSelector = `.${dialogClassNames.backdrop}`;
export const dialogSurfaceSelector = `.${dialogSurfaceClassNames.root}`;
export const dialogTriggerOpenSelector = `[aria-haspopup="dialog"]`;
export const dialogTriggerCloseSelector = `#close-btn`;
export const dialogTitleSelector = `.${dialogTitleClassNames.root}`;
export const dialogCloseButtonSelector = `.${dialogTitleClassNames.closeButton}`;
