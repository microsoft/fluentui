import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Panel, PanelType, Dialog, DialogType } from 'office-ui-fabric-react';

storiesOf('FocusTrapZones', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default')
        .click('.ms-Panel-closeButton')
        .snapshot('click on panel close button')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Dialog nested in Panel',
    () => (
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
                // eslint-disable-next-line @fluentui/max-len
                'This dialog uses Modal, which also makes use of Layer and FocusTrapZone. Focus should be trapped in the dialog.',
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
    ),
    { rtl: true },
  )
  .addStory('Panel on its own', () => (
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
  ));
