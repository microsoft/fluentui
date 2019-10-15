import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@uifabric/example-app-base/lib/index2';
import { WXPNeutrals } from './WXPNeutrals';

export const Excel = () => {
  return (
    <>
      <MarkdownHeader as="h2">Excel</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Excel Shade 20',
            hex: '#004b1c'
          },
          {
            name: 'Excel Shade 10',
            hex: '#0e5c2f'
          },
          {
            name: 'Excel Primary',
            hex: '#217346'
          },
          {
            name: 'Excel Tint 10',
            hex: '#3f8159'
          },
          {
            name: 'Excel Tint 20',
            hex: '#4e9668'
          },
          {
            name: 'Excel Tint 30',
            hex: '#6eb38a'
          },
          {
            name: 'Excel Tint 40',
            hex: '#9fcdb3'
          },
          {
            name: 'Excel Tint 50',
            hex: '#e9f5ee'
          }
        ]}
      />

      <WXPNeutrals />
    </>
  );
};
