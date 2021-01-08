import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';

export const Skype = () => {
  return (
    <>
      <MarkdownHeader as="h2">Skype</MarkdownHeader>

      <MarkdownHeader as="h3">Blue theme (default)</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Comm Primary',
            hex: '#0078d4',
            code: {
              core: '$ms-color-communicationPrimary',
              react: 'CommunicationColors.primary',
            },
          },
          {
            hex: '#00bcf2',
          },
          {
            hex: '#b3dbf2',
          },
          {
            name: 'CyanBlue20',
            hex: '#004e8c',
            code: {
              core: '$ms-color-sharedCyanBlue20',
              react: 'SharedColors.cyanBlue20',
            },
          },
          {
            hex: '#11255e',
          },
        ]}
      />

      <MarkdownHeader as="h3">Blurple theme</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            hex: '#7160e8',
          },
          {
            hex: '#8378de',
          },
          {
            hex: '#cfc4f5',
          },
          {
            hex: '#49409a',
          },
          {
            hex: '#460f54',
          },
        ]}
      />

      <MarkdownHeader as="h3">Purple theme</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            hex: '#c239b3',
          },
          {
            hex: '#c182d1',
          },
          {
            hex: '#edbed3',
          },
          {
            hex: '#721481',
          },
          {
            hex: '#373277',
          },
        ]}
      />

      <MarkdownHeader as="h3">Pink theme</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            hex: '#ea005e',
          },
          {
            hex: '#ff6767',
          },
          {
            hex: '#ee9889',
          },
          {
            hex: '#c30052',
          },
          {
            hex: '#6b0036',
          },
        ]}
      />

      <MarkdownHeader as="h3">Orange theme</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Orange20',
            hex: '#ca5010',
            code: {
              core: '$ms-color-sharedOrange20',
              react: 'Shared.orange20',
            },
          },
          {
            hex: '#ff8c00',
          },
          {
            hex: '#f7b189',
          },
          {
            hex: '#c50f1f',
          },
          {
            name: 'PinkRed10',
            hex: '#750b1c',
            code: {
              core: '$ms-color-sharedPinkRed10',
              react: 'SharedColors.pinkRed10',
            },
          },
        ]}
      />

      <MarkdownHeader as="h3">Default theme neutrals</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Gray180',
            hex: '#252423',
            code: {
              core: '$ms-color-gray180',
              react: 'NeutralColors.gray180',
            },
          },
          {
            name: 'Gray140',
            hex: '#484644',
            code: {
              core: '$ms-color-gray140',
              react: 'NeutralColors.gray140',
            },
          },
          {
            name: 'Gray130',
            hex: '#605e5c',
            code: {
              core: '$ms-color-gray130',
              react: 'NeutralColors.gray130',
            },
          },
          {
            name: 'Gray100',
            hex: '#979593',
            code: {
              core: '$ms-color-gray100',
              react: 'NeutralColors.gray100',
            },
          },
          {
            name: 'Gray60',
            hex: '#c8c6c4',
            code: {
              core: '$ms-color-gray60',
              react: 'NeutralColors.gray60',
            },
          },
          {
            name: 'Gray40',
            hex: '#e1dfdd',
            code: {
              core: '$ms-color-gray40',
              react: 'NeutralColors.gray40',
            },
          },
          {
            name: 'Gray30',
            hex: '#edebe9',
            code: {
              core: '$ms-color-gray30',
              react: 'NeutralColors.gray30',
            },
          },
          {
            name: 'Gray20',
            hex: '#f3f2f1',
            code: {
              core: '$ms-color-gray20',
              react: 'NeutralColors.gray20',
            },
          },
          {
            name: 'Gray10',
            hex: '#faf9f8',
            code: {
              core: '$ms-color-gray10',
              react: 'NeutralColors.gray10',
            },
          },
          {
            name: 'White',
            hex: '#ffffff',
            code: {
              core: '$ms-color-white',
              react: 'NeutralColors.white',
            },
          },
        ]}
      />

      <MarkdownHeader as="h3">Dark theme neutrals</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Gray190',
            hex: '#201f1e',
            code: {
              core: '$ms-color-gray190',
              react: 'NeutralColors.gray190',
            },
          },
          {
            name: 'Gray170',
            hex: '#292827',
            code: {
              core: '$ms-color-gray170',
              react: 'NeutralColors.gray170',
            },
          },
          {
            name: 'Gray160',
            hex: '#323130',
            code: {
              core: '$ms-color-gray160',
              react: 'NeutralColors.gray160',
            },
          },
          {
            name: 'Gray150',
            hex: '#3b3a39',
            code: {
              core: '$ms-color-gray150',
              react: 'NeutralColors.gray150',
            },
          },
          {
            name: 'Gray140',
            hex: '#484644',
            code: {
              core: '$ms-color-gray140',
              react: 'NeutralColors.gray140',
            },
          },
          {
            name: 'Gray130',
            hex: '#605e5c',
            code: {
              core: '$ms-color-gray130',
              react: 'NeutralColors.gray130',
            },
          },
          {
            name: 'Gray110',
            hex: '#8a8886',
            code: {
              core: '$ms-color-gray110',
              react: 'NeutralColors.gray110',
            },
          },
          {
            name: 'Gray80',
            hex: '#b3b0ad',
            code: {
              core: '$ms-color-gray80',
              react: 'NeutralColors.gray80',
            },
          },
          {
            name: 'Gray60',
            hex: '#c8c6c4',
            code: {
              core: '$ms-color-gray60',
              react: 'NeutralColors.gray60',
            },
          },
          {
            name: 'White',
            hex: '#ffffff',
            code: {
              core: '$ms-color-white',
              react: 'NeutralColors.white',
            },
          },
        ]}
      />

      <MarkdownHeader as="h3">Call theme neutrals</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Black',
            hex: '#000000',
            code: {
              core: '$ms-color-black',
              react: 'NeutralColors.black',
            },
          },
          {
            name: 'Gray220',
            hex: '#11100f',
            code: {
              core: '$ms-color-gray220',
              react: 'NeutralColors.gray220',
            },
          },
          {
            name: 'Gray210',
            hex: '#161514',
            code: {
              core: '$ms-color-gray210',
              react: 'NeutralColors.gray210',
            },
          },
          {
            name: 'Gray200',
            hex: '#1b1a19',
            code: {
              core: '$ms-color-gray200',
              react: 'NeutralColors.gray200',
            },
          },
          {
            name: 'Gray190',
            hex: '#201f1e',
            code: {
              core: '$ms-color-gray190',
              react: 'NeutralColors.gray190',
            },
          },
          {
            name: 'Gray180',
            hex: '#252423',
            code: {
              core: '$ms-color-gray180',
              react: 'NeutralColors.gray180',
            },
          },
          {
            name: 'Gray170',
            hex: '#292827',
            code: {
              core: '$ms-color-gray170',
              react: 'NeutralColors.gray170',
            },
          },
          {
            name: 'Gray160',
            hex: '#323130',
            code: {
              core: '$ms-color-gray160',
              react: 'NeutralColors.gray160',
            },
          },
          {
            name: 'Gray150',
            hex: '#3b3a39',
            code: {
              core: '$ms-color-gray150',
              react: 'NeutralColors.gray150',
            },
          },
          {
            name: 'Gray130',
            hex: '#605e5c',
            code: {
              core: '$ms-color-gray130',
              react: 'NeutralColors.gray130',
            },
          },
          {
            name: 'Gray110',
            hex: '#8a8886',
            code: {
              core: '$ms-color-gray110',
              react: 'NeutralColors.gray110',
            },
          },
          {
            name: 'Gray80',
            hex: '#b3b0ad',
            code: {
              core: '$ms-color-gray80',
              react: 'NeutralColors.gray80',
            },
          },
          {
            name: 'Gray60',
            hex: '#c8c6c4',
            code: {
              core: '$ms-color-gray60',
              react: 'NeutralColors.gray60',
            },
          },
          {
            name: 'White',
            hex: '#ffffff',
            code: {
              core: '$ms-color-white',
              react: 'NeutralColors.white',
            },
          },
        ]}
      />
    </>
  );
};
