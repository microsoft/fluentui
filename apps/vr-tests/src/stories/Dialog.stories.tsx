/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

let footer = (
  <DialogFooter>
    <PrimaryButton text='Save' />
    <DefaultButton text='Cancel' />
  </DialogFooter>);

let text = {
  title: 'All emails together',
  subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
};

storiesOf('Dialog', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Dialog-main' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Dialog
      hidden={ false }
      dialogContentProps={ {
        type: DialogType.normal,
        ...text
      } }
      modalProps={ {
        isBlocking: false
      } }
    >
      { footer }
    </Dialog>
  ))
  .add('Large header', () => (
    <Dialog
      hidden={ false }
      dialogContentProps={ {
        type: DialogType.largeHeader,
        ...text
      } }
      modalProps={ {
        isBlocking: false
      } }
    >
      { footer }
    </Dialog>
  ))
  .add('Blocking', () => (
    <Dialog
      hidden={ false }
      dialogContentProps={ {
        type: DialogType.normal,
        ...text
      } }
      modalProps={ {
        isBlocking: true
      } }
    >
      { footer }
    </Dialog>
  ));