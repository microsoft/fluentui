import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Panel, PanelType, Dialog, DialogType } from '@fluentui/react';

export default {
  title: 'FocusTrapZones',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default')
        .click('.ms-Panel-closeButton')
        .snapshot('click on panel close button')
        .end(),
    ),
  ],
};

export const DialogNestedInPanel = () => (
  <div>
    <Panel
      isOpen={true}
      type={PanelType.smallFixedFar}
      headerText="This panel makes use of Layer and FocusTrapZone. Focus should be trapped in the panel."
      closeButtonAriaLabel="Close"
      hasCloseButton={true}
    >
      <Dialog
        hidden={false}
        isBlocking={true}
        dialogContentProps={{
          type: DialogType.normal,
          title:
            'This dialog uses Modal, which also makes use of Layer and FocusTrapZone. ' +
            'Focus should be trapped in the dialog.',
          subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'.",
        }}
        modalProps={{
          titleAriaId: 'myLabelId',
          subtitleAriaId: 'mySubTextId',
          isBlocking: false,
        }}
      >
        {null}
      </Dialog>
    </Panel>
  </div>
);

DialogNestedInPanel.storyName = 'Dialog nested in Panel';

export const DialogNestedInPanelRTL = getStoryVariant(DialogNestedInPanel, RTL);

export const PanelOnItsOwn = () => (
  <div>
    <Panel
      isOpen={true}
      type={PanelType.smallFixedFar}
      headerText="This is a panel on its own"
      closeButtonAriaLabel="Close"
      hasCloseButton={true}
    >
      {null}
    </Panel>
  </div>
);

PanelOnItsOwn.storyName = 'Panel on its own';
