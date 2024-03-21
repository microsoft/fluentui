/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './ButtonDefault.stories';
import { Shape } from './ButtonShape.stories';
import { Appearance } from './ButtonAppearance.stories';
import { Size } from './ButtonSize.stories';
import { Disabled } from './ButtonDisabled.stories';
import { WithLongText } from './ButtonWithLongText.stories';

export const ButtonStories = () => (
  <div>
    <h1>Default</h1>
    <Default />
    <h1>Shape</h1>
    <Shape />
    <h1>Appearance</h1>
    <Appearance />
    <h1>Size</h1>
    <Size />
    <h1>Disabled</h1>
    <Disabled />
    <h1>With long text</h1>
    <WithLongText />
  </div>
);
