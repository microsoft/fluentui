import * as React from 'react';
import { StorybookStoryContext } from '../src/types';

export default {
  title: 'Fluent UI Theme/Global/Border Radius',
};

export const BorderRadius = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr ', gap: '10px', alignItems: 'center' }}>
    {Object.keys(global.borderRadius).map((radius) => [
      <div key={radius}>{radius}</div>,
      <div
        style={{
          background: '#bbb',
          width: '3em',
          height: '3em',
          borderRadius: global.borderRadius[radius],
        }}
      />,
      <div
        style={{
          border: `${global.strokeWidth.thin}px solid black`,
          width: '3em',
          height: '3em',
          borderRadius: global.borderRadius[radius],
        }}
      />,
    ])}
  </div>
);
