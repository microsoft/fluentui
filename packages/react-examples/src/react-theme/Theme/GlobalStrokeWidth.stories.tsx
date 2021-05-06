import * as React from 'react';
import { StrokeWidths, teamsLightTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Global/Stroke Width',
};

const global = teamsLightTheme.global;

export const GlobalStrokeWidth = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
    {Object.keys(global.strokeWidth).map((strokeWidth: keyof StrokeWidths) => [
      <div key={strokeWidth}>{strokeWidth}</div>,
      <div key={`${strokeWidth}-value`} style={{ borderBottom: `${global.strokeWidth[strokeWidth]} solid black` }} />,
    ])}
  </div>
);
