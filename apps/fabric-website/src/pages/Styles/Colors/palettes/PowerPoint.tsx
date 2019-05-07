import * as React from 'react';

import { ColorPalette } from '@uifabric/example-app-base/lib/index2';

import { WXPNeutrals } from './WXPNeutrals';

export const PowerPoint = () => {
  return (
    <>
      <h2>PowerPoint</h2>
      <ColorPalette
        colors={[
          {
            name: 'PowerPoint Shade 20',
            hex: '#740912'
          },
          {
            name: 'PowerPoint Shade 10',
            hex: '#a92b1a'
          },
          {
            name: 'PowerPoint Primary',
            hex: '#b7472a'
          },
          {
            name: 'PowerPoint Tint 10',
            hex: '#c75033'
          },
          {
            name: 'PowerPoint Tint 20',
            hex: '#e86e58'
          },
          {
            name: 'PowerPoint Tint 30',
            hex: '#ed9583'
          },
          {
            name: 'PowerPoint Tint 40',
            hex: '#fdc9b5'
          },
          {
            name: 'PowerPoint Tint 50',
            hex: '#fcf0ed'
          }
        ]}
      />

      <WXPNeutrals />
    </>
  );
};
