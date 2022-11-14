import { dialogSurfaceClassNames, dialogTitleClassNames } from '@fluentui/react-dialog';

export const dialogTriggerOpenId = 'open-btn';
export const dialogTriggerCloseId = 'close-btn';

export const dialogBackdropSelector = `.${dialogSurfaceClassNames.backdrop}`;
export const dialogSurfaceSelector = `.${dialogSurfaceClassNames.root}`;
export const dialogTriggerOpenSelector = `#${dialogTriggerOpenId}`;
export const dialogTriggerCloseSelector = `#${dialogTriggerCloseId}`;
export const dialogTitleSelector = `.${dialogTitleClassNames.root}`;
export const dialogActionSelector = `.${dialogTitleClassNames.action}`;
