import { dialogSurfaceClassNames, dialogTitleClassNames } from '@fluentui/react-dialog';

export const dialogTriggerCloseId = 'close-btn';

export const dialogBackdropSelector = `.${dialogSurfaceClassNames.backdrop}`;
export const dialogSurfaceSelector = `.${dialogSurfaceClassNames.root}`;
export const dialogTriggerOpenSelector = `[aria-haspopup="dialog"]`;
export const dialogTriggerCloseSelector = `#${dialogTriggerCloseId}`;
export const dialogTitleSelector = `.${dialogTitleClassNames.root}`;
export const dialogActionSelector = `.${dialogTitleClassNames.action}`;
