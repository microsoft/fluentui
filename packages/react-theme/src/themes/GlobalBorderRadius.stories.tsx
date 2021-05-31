/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { teamsLightTheme, BorderRadius as BorderRadiusType } from '../index';

export default {
  title: 'Theme/Global/Border Radius',
};

const global = teamsLightTheme.global;

// FIXME: border radius -> string
export const GlobalBorderRadius = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr ', gap: '10px', alignItems: 'center' }}>
    {Object.keys(global.borderRadius).map((radius: keyof BorderRadiusType) => [
      <div key={radius}>{radius}</div>,
      <div
        key={`${radius}-col1`}
        style={{
          background: '#bbb',
          width: '3em',
          height: '3em',
          borderRadius: global.borderRadius[radius],
        }}
      />,
      <div
        key={`${radius}-col2`}
        style={{
          border: `${global.strokeWidth.thin} solid black`,
          width: '3em',
          height: '3em',
          borderRadius: global.borderRadius[radius],
        }}
      />,
    ])}
  </div>
);
