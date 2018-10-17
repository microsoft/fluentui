/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';

// Wrap all stories in a Fabric component for proper styling

// tslint:disable:jsx-ban-props
export const FabricDecorator = story => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorTall = story => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorTallFixedWdith = story => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorFixedWidth = story => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorFullWidth = story => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
      {story()}
    </div>
  </Fabric>
);
