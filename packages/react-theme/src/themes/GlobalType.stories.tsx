/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { teamsLightTheme } from '../index';
import type { FontFamilyTokens, FontSizeTokens, LineHeightTokens, FontWeightTokens, TextAlignments } from '../index';

export default {
  title: 'Theme/Global/Type',
};

const global = teamsLightTheme.global;

export const GlobalFontFamily = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
    {Object.keys(global.type.fontFamilies).map((fontFamily: keyof FontFamilyTokens) => [
      <div key={fontFamily}>{fontFamily}</div>,
      <div key={`${fontFamily}-value`} style={{ fontFamily: `${global.type.fontFamilies[fontFamily]}` }}>
        {global.type.fontFamilies[fontFamily]}Font family {fontFamily}
      </div>,
    ])}
  </div>
);

export const GlobalFontSize = () => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    {Object.keys(global.type.fontSizes).map((fontSizeGroup: keyof FontSizeTokens) => [
      <h3 key={fontSizeGroup}>{fontSizeGroup}</h3>,
      <div
        key={`${fontSizeGroup}-value`}
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}
      >
        {Object.keys(global.type.fontSizes[fontSizeGroup]).map(
          (fontSize: keyof FontSizeTokens[keyof FontSizeTokens]) => [
            <div key={fontSize}>{fontSize}</div>,
            <div key={`${fontSize}-value`} style={{ fontSize: global.type.fontSizes[fontSizeGroup][fontSize] }}>
              Font size {fontSizeGroup}.{fontSize}
            </div>,
          ],
        )}
      </div>,
    ])}
  </div>
);

export const GlobalLineHeight = () => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    {Object.keys(global.type.lineHeights).map((lineHeightGroup: keyof LineHeightTokens) => [
      <h3 key={lineHeightGroup}>{lineHeightGroup}</h3>,
      <div
        key={`${lineHeightGroup}-value`}
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}
      >
        {Object.keys(global.type.lineHeights[lineHeightGroup]).map(
          (lineHeight: keyof LineHeightTokens[keyof LineHeightTokens]) => [
            <div key={lineHeight}>{lineHeight}</div>,
            <div
              key={`${lineHeight}-value`}
              style={{ lineHeight: global.type.lineHeights[lineHeightGroup][lineHeight], backgroundColor: '#eee' }}
            >
              Line height {lineHeightGroup}.{lineHeight}
            </div>,
          ],
        )}
      </div>,
    ])}
  </div>
);

export const GlobalFontWeight = () => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {Object.keys(global.type.fontWeights).map((fontWeight: keyof FontWeightTokens) => [
        <div key={fontWeight}>{fontWeight}</div>,
        <div key={`${fontWeight}-value`} style={{ fontWeight: global.type.fontWeights[fontWeight] }}>
          Font weight {fontWeight}
        </div>,
      ])}
    </div>
  </div>
);

export const GlobalTextAlignment = () => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {Object.keys(global.type.alignment).map((alignment: keyof TextAlignments) => [
        <div key={alignment}>{alignment}</div>,
        <div
          key={`${alignment}-value`}
          style={{
            textAlign: global.type.alignment[alignment],
            backgroundColor: '#eee',
          }}
        >
          Alignment: {alignment}
        </div>,
      ])}
    </div>
  </div>
);
