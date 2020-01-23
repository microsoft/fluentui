/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Separator, mergeStyles } from 'office-ui-fabric-react';

const verticalStyles = mergeStyles({
  height: '400px'
});

const horizontalStyles = mergeStyles({
  width: '400px'
});

storiesOf('Separator', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .add(
    'Root',
    () => (
      <div className={horizontalStyles}>
        <Separator>Today</Separator>
      </div>
    ),
    { rtl: true }
  )
  .add(
    'Horizontal Start Aligned',
    () => (
      <div className={horizontalStyles}>
        <Separator alignContent="start">Today</Separator>
      </div>
    ),
    { rtl: true }
  )
  .add(
    'Horizontal End Aligned',
    () => (
      <div className={horizontalStyles}>
        <Separator alignContent="end">Today</Separator>
      </div>
    ),
    { rtl: true }
  )
  .add(
    'Vertical Center Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical>Today</Separator>
      </div>
    ),
    { rtl: true }
  )
  .add(
    'Vertical Start Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical alignContent="start">
          Today
        </Separator>
      </div>
    ),
    { rtl: true }
  )
  .add(
    'Vertical End Aligned',
    () => (
      <div className={verticalStyles}>
        <Separator vertical alignContent="end">
          Today
        </Separator>
      </div>
    ),
    { rtl: true }
  );
