/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { RenderFunction } from '@storybook/react';
import { FluentCustomizations } from '../../../../packages/fluent-theme/src/FluentCustomizations';
import { Customizer } from 'office-ui-fabric-react';

export const FabricDecorator = (story: RenderFunction) => (
  <Customizer {...FluentCustomizations}>
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden' }}>
        {story()}
      </div>
    </div>
  </Customizer>
);

export const FabricDecoratorTall = (story: RenderFunction) => (
  <Customizer {...FluentCustomizations}>
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px 10px 120px' }}>
        {story()}
      </div>
    </div>
  </Customizer>
);

export const FabricDecoratorTallFixedWidth = (story: RenderFunction) => (
  <Customizer {...FluentCustomizations}>
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px 10px 120px', width: '300px' }}>
        {story()}
      </div>
    </div>
  </Customizer>
);

export const FabricDecoratorFixedWidth = (story: RenderFunction) => (
  <Customizer {...FluentCustomizations}>
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
        {story()}
      </div>
    </div>
  </Customizer>
);

export const FabricDecoratorFullWidth = (story: RenderFunction) => (
  <Customizer {...FluentCustomizations}>
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '10px', width: '100%', overflow: 'hidden' }}>
        {story()}
      </div>
    </div>
  </Customizer>
);
