/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { RenderFunction } from '@storybook/react';

export const FabricDecorator = (story: RenderFunction) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorTall = (story: RenderFunction) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorTallFixedWidth = (story: RenderFunction) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorFixedWidth = (story: RenderFunction) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

export const FabricDecoratorFullWidth = (story: RenderFunction) => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
      {story()}
    </div>
  </div>
);
