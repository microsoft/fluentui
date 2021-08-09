import DialogTemplate from './fixtures/dialog.html';
import DialogFastButtonsTemplate from './fixtures/dialog-button-test.html';
import './index';

export default {
  title: 'Components/Dialog',
};

export const Dialog = (): string => DialogTemplate;
export const DialogButtonTest = (): string => DialogFastButtonsTemplate;
