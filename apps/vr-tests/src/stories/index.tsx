/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';

// Wrap all stories in a Fabric component for proper styling
export const FabricDecorator = (story) => (
  <Fabric>
    <p>
      { story() }
    </p>
  </Fabric>
);

// Import component stories

import './Button.stories';
import './Breadcrumb.stories';
