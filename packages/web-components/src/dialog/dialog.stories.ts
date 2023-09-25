import DialogTemplate from './fixtures/dialog.html';
import DialogFastButtonsTemplate from './fixtures/dialog-button-test.html';
import './index';

export default {
  title: 'Components/Dialog',
};

export const Dialog = (): string => DialogTemplate;
export const DialogButtonTest = (): string => DialogFastButtonsTemplate;

const dialogExample = `
<fluent-dialog id="foo" aria-label="Simple dialog" modal="true">
  <h2>Dialog with text and button. The button should recieve focus</h2>
  <button>Button A</button>
  <button id="element" autofocus>Should autofocus</button>
</fluent-dialog>
`;

Dialog.parameters = {
  docs: {
    source: {
      code: dialogExample,
    },
  },
};

const dialogButtonTestExample = `
<fluent-dialog id="foo" aria-label="Simple dialog" modal="true">
  <h2>Dialog with text and fluent buttons. The first button should receive focus</h2>
  <fluent-button tabindex="0" id="element">Button Text</fluent-button>
  <fluent-button tabindex="0" id="element">Button Text</fluent-button>
</fluent-dialog>
`;

DialogButtonTest.parameters = {
  docs: {
    source: {
      code: dialogButtonTestExample,
    },
  },
};
