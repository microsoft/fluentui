/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { teamsLightTheme } from '../index';
import type { StrokeWidthTokens } from '../index';

export default {
  title: 'Theme/Stroke Widths',
};

const theme = teamsLightTheme;

export const StrokeWidths = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
    {Object.keys(theme)
      .filter(tokenName => tokenName.startsWith('strokeWidth'))
      .map((strokeWidth: keyof StrokeWidthTokens) => [
        <div key={strokeWidth}>{strokeWidth}</div>,
        <div key={`${strokeWidth}-value`} style={{ borderBottom: `${theme[strokeWidth]} solid black` }} />,
      ])}
  </div>
);
