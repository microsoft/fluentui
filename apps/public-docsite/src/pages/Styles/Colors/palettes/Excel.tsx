import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';
import { WXPNeutrals } from './WXPNeutrals';

export const Excel = () => {
  return (
    <>
      <MarkdownHeader as="h2">Excel</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Excel Shade 30',
            hex: '#094624',
          },
          {
            name: 'Excel Shade 20',
            hex: '#0c5f32',
          },
          {
            name: 'Excel Shade 10',
            hex: '#0f703b',
          },
          {
            name: 'Excel Primary',
            hex: '#107c41',
          },
          {
            name: 'Excel Tint 10',
            hex: '#218d51',
          },
          {
            name: 'Excel Tint 20',
            hex: '#55b17e',
          },
          {
            name: 'Excel Tint 30',
            hex: '#a0d8b9',
          },
          {
            name: 'Excel Tint 40',
            hex: '#caead8',
          },
        ]}
      />

      <WXPNeutrals />
    </>
  );
};
