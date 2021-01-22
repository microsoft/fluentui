import * as React from 'react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';
import * as _ from 'lodash';

const getStyles = memoizeFunction(
  (
    _renderer: Function,
    _tokens: {},
    _rtl: boolean,
    disabled?: boolean,
    checked?: boolean,
    expanded?: boolean,
    hovered?: boolean,
  ) =>
    mergeStyleSets({
      root: [
        {
          backgroundColor: 'transparent',
          color: '#252423',
          fontWeight: 'normal',
          borderRadius: 0,
          border: '1px solid transparent',
          height: 40,
          padding: '0 9px',
        },
        {
          selectors: {
            ':hover': { backgroundColor: '#EDEBE9', color: '#252423' },
            ':active': { backgroundColor: '#D2D0CE' },
            '.ms-Fabric--isFocusVisible &:focus': { selectors: { ':active': { backgroundColor: '#D2D0CE' } } },
          },
        },
        disabled && {
          backgroundColor: 'transparent',
          color: '#A19F9D',
          border: '1px solid transparent',
          selectors: {
            ':hover': { backgroundColor: 'transparent' },
            ':active': { backgroundColor: 'transparent' },
            '.ms-Fabric--isFocusVisible &:focus': [
              [
                [
                  { backgroundColor: '#F3F2F1', borderColor: '#000000' },
                  { outlineWidth: '2px', outlineStyle: 'dotted', outlineColor: 'transparent' },
                  {
                    selectors: {
                      '@media screen and (-ms-high-contrast: active)': {
                        backgroundColor: 'Highlight',
                        color: 'GrayText',
                        opacity: 1,
                        outlineColor: 'GrayText',
                        MsHighContrastAdjust: 'none',
                        borderTopColor: 'GrayText',
                        borderRightColor: 'GrayText',
                        borderBottomColor: 'GrayText',
                        borderLeftColor: 'GrayText',
                      },
                    },
                  },
                ],
                { backgroundColor: 'transparent' },
              ],
            ],
          },
        },
        checked && {
          backgroundColor: '#E1DFDD',
          color: '#252423',
          selectors: {
            '.ms-Fabric--isFocusVisible &:focus': {
              backgroundColor: '#E1DFDD',
              selectors: { ':hover': { backgroundColor: '#EDEBE9' } },
            },
          },
        },
        expanded && { backgroundColor: '#E1DFDD', selectors: { ':hover': { backgroundColor: '#EDEBE9' } } },
        checked && hovered && { backgroundColor: '#EDEBE9' },
        checked &&
          disabled && {
            backgroundColor: '#E1DFDD',
            selectors: {
              ':hover': [
                { backgroundColor: '#EDEBE9', color: '#252423', border: '1px solid transparent' },
                {
                  selectors: {
                    '@media screen and (-ms-high-contrast: active)': {
                      backgroundColor: 'Highlight',
                      color: 'HighlightText',
                      MsHighContrastAdjust: 'none',
                      outlineColor: 'ButtonText',
                    },
                  },
                },
              ],
              ':active': [
                { backgroundColor: '#EDEBE9', color: '#252423', border: '1px solid transparent' },
                {
                  selectors: {
                    '@media screen and (-ms-high-contrast: active)': {
                      backgroundColor: 'Highlight',
                      color: 'HighlightText',
                      MsHighContrastAdjust: 'none',
                      outlineColor: 'ButtonText',
                    },
                  },
                },
              ],
              '.ms-Fabric--isFocusVisible &:focus': [
                [
                  [
                    { backgroundColor: '#F3F2F1', borderColor: '#000000' },
                    { outlineWidth: '2px', outlineStyle: 'dotted', outlineColor: 'transparent' },
                    {
                      selectors: {
                        '@media screen and (-ms-high-contrast: active)': {
                          backgroundColor: 'Highlight',
                          color: 'GrayText',
                          opacity: 1,
                          outlineColor: 'GrayText',
                          MsHighContrastAdjust: 'none',
                          borderTopColor: 'GrayText',
                          borderRightColor: 'GrayText',
                          borderBottomColor: 'GrayText',
                          borderLeftColor: 'GrayText',
                        },
                      },
                    },
                  ],
                  { backgroundColor: '#F3F2F1' },
                ],
              ],
            },
          },
      ],
      label: { marginRight: 2, marginLeft: 10, fontWeight: 400 },
      menuIcon: { marginRight: 2 },
    }),
);

const mockStylesOptions = { renderer: () => null, tokens: {}, rtl: false };

const App = () => {
  _.times(1000000, () => {
    getStyles(mockStylesOptions.renderer, mockStylesOptions.tokens, mockStylesOptions.rtl);
    getStyles(mockStylesOptions.renderer, mockStylesOptions.tokens, mockStylesOptions.rtl);
    getStyles(mockStylesOptions.renderer, mockStylesOptions.tokens, mockStylesOptions.rtl);
  });

  return null;
};

export default App;
