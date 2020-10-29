import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';

import { WXPNeutrals } from './WXPNeutrals';

export const PowerPoint = () => {
  return (
    <>
      <MarkdownHeader as="h2">PowerPoint</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'PowerPoint Shade 20',
            hex: '#740912',
          },
          {
            name: 'PowerPoint Shade 10',
            hex: '#a92b1a',
          },
          {
            name: 'PowerPoint Primary',
            hex: '#b7472a',
          },
          {
            name: 'PowerPoint Tint 10',
            hex: '#c75033',
          },
          {
            name: 'PowerPoint Tint 20',
            hex: '#e86e58',
          },
          {
            name: 'PowerPoint Tint 30',
            hex: '#ed9583',
          },
          {
            name: 'PowerPoint Tint 40',
            hex: '#fdc9b5',
          },
          {
            name: 'PowerPoint Tint 50',
            hex: '#fcf0ed',
          },
        ]}
      />

      <WXPNeutrals />
    </>
  );
};
