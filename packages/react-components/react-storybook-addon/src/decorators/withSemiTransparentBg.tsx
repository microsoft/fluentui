import * as React from 'react';
import { MATERIAL_TYPE_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { MaterialType, MaterialTypeProvider } from '@fluentui/react-shared-contexts';

export const withMaterialTypeProvider = (StoryFn: () => JSX.Element, context: FluentStoryContext) => {
  const { globals, parameters } = context;
  const semiTransparent = parameters.materialType ?? globals[MATERIAL_TYPE_ID] ?? MaterialType.Opaque;

  return <MaterialTypeProvider value={semiTransparent}>{StoryFn()}</MaterialTypeProvider>;
};
