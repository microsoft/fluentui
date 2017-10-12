/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { TooltipHost } from 'office-ui-fabric-react';

storiesOf('Tooltip', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .hover('.ms-TooltipHost')
        .wait(200)
        .snapshot('default')
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Default', () => (
    <TooltipHost content='This is the tooltip' id='myID' calloutProps={ { gapSpace: 0 } }>
      Hover over me
    </TooltipHost>
  ));