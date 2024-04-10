/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import 'react';
import { Default } from './ButtonDefault';
import { Shape } from './ButtonShape';
import { Appearance } from './ButtonAppearance';
import { Size } from './ButtonSize';
import { Disabled } from './ButtonDisabled';
import { WithLongText } from './ButtonWithLongText';

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
