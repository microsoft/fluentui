import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';
import { WXPNeutrals } from './WXPNeutrals';

export const Word = () => {
  return (
    <>
      <MarkdownHeader as="h2">Word</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Word Shade 20',
            hex: '#002050',
          },
          {
            name: 'Word Shade 10',
            hex: '#124078',
          },
          {
            name: 'Word Primary',
            hex: '#2b579a',
          },
          {
            name: 'Word Tint 10',
            hex: '#3c65a4',
          },
          {
            name: 'Word Tint 20',
            hex: '#4a78b0',
          },
          {
            name: 'Word Tint 30',
            hex: '#7da3c6',
          },
          {
            name: 'Word Tint 40',
            hex: '#a5b9d1',
          },
          {
            name: 'Word Tint 50',
            hex: '#e3ecfa',
          },
        ]}
      />

      <WXPNeutrals />
    </>
  );
};
