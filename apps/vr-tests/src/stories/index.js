/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { addDecorator } from '@storybook/react';
import { Fabric } from 'office-ui-fabric-react';


// Wrap all stories in a Fabric component for proper styling
const FabricDecorator = (story) => (
  <Fabric>
    <p>
      {story()}
    </p>
  </Fabric>
);

addDecorator(FabricDecorator);

// Import component stories

import './Button.stories';
