import * as React from 'react';
import { StorybookStoryContext } from '../src/types';

export default {
  title: 'Fluent UI Theme/Global/Stroke Width',
};

export const StrokeWidth = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
    {Object.keys(global.strokeWidth).map((strokeWidth) => [
      <div key={strokeWidth}>{strokeWidth}</div>,
      <div style={{ borderBottom: `${global.strokeWidth[strokeWidth]}px solid black` }} />,
    ])}
  </div>
);
