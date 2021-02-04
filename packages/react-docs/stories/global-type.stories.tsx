import * as React from 'react';
import { StorybookStoryContext } from '../src/types';

export default {
  title: 'Fluent UI Theme/Global/Type',
};

export const FontFamilies = (
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
    {Object.keys(global.type.fontFamilies).map((fontFamily) => [
      <div key={fontFamily}>{fontFamily}</div>,
      <div key={`${fontFamily}-value`} style={{ fontFamily: `${global.type.fontFamilies[fontFamily]}` }}>
        {global.type.fontFamilies[fontFamily]}Font family {fontFamily}
      </div>,
    ])}
  </div>
);

export const FontSizes = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    {Object.keys(global.type.fontSizes).map((fontSizeGroup) => [
      <h3 key={fontSizeGroup}>{fontSizeGroup}</h3>,
      <div
        key={`${fontSizeGroup}-value`}
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}
      >
        {Object.keys(global.type.fontSizes[fontSizeGroup]).map((fontSize) => [
          <div key={fontSize}>{fontSize}</div>,
          <div key={`${fontSize}-value`} style={{ fontSize: global.type.fontSizes[fontSizeGroup][fontSize] }}>
            Font size {fontSizeGroup}.{fontSize}
          </div>,
        ])}
      </div>,
    ])}
  </div>
);

export const LineHeights = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    {Object.keys(global.type.lineHeights).map((lineHeightGroup) => [
      <h3 key={lineHeightGroup}>{lineHeightGroup}</h3>,
      <div
        key={`${lineHeightGroup}-value`}
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}
      >
        {Object.keys(global.type.lineHeights[lineHeightGroup]).map((lineHeight) => [
          <div key={lineHeight}>{lineHeight}</div>,
          <div
            key={`${lineHeight}-value`}
            style={{ lineHeight: global.type.lineHeights[lineHeightGroup][lineHeight], backgroundColor: '#eee' }}
          >
            Line height {lineHeightGroup}.{lineHeight}
          </div>,
        ])}
      </div>,
    ])}
  </div>
);

export const FontWeights = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {Object.keys(global.type.fontWeights).map((fontWeight) => [
        <div key={fontWeight}>{fontWeight}</div>,
        <div key={`${fontWeight}-value`} style={{ fontWeight: global.type.fontWeights[fontWeight] }}>
          Font weight {fontWeight}
        </div>,
      ])}
    </div>
  </div>
);

export const Alignment = (
  props,
  {
    globals: {
      theme: {
        light: { global },
      },
    },
  }: StorybookStoryContext,
) => (
  <div style={{ fontFamily: global.type.fontFamilies.base }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {Object.keys(global.type.alignment).map((alignment) => [
        <div key={alignment}>{alignment}</div>,
        <div
          key={`${alignment}-value`}
          style={{ textAlign: global.type.alignment[alignment], backgroundColor: '#eee' }}
        >
          Alignment: {alignment}
        </div>,
      ])}
    </div>
  </div>
);
