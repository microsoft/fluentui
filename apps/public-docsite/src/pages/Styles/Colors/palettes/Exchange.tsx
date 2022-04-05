import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';

export const Exchange = () => {
  return (
    <>
      <MarkdownHeader as="h2">Exchange</MarkdownHeader>
      <ColorPalette
        colors={[
          {
            name: 'Comm Shade 30',
            hex: '#004578',
            code: {
              core: '$ms-color-communicationShade30',
              react: 'CommunicationColors.shade30',
            },
          },
          {
            name: 'Comm Shade 20',
            hex: '#005a9e',
            code: {
              core: '$ms-color-communicationShade20',
              react: 'CommunicationColors.shade20',
            },
          },
          {
            name: 'Comm Shade 10',
            hex: '#106ebe',
            code: {
              core: '$ms-color-communicationShade10',
              react: 'CommunicationColors.shade10',
            },
          },
          {
            name: 'Comm Primary',
            hex: '#0078d4',
            code: {
              core: '$ms-color-communicationPrimary',
              react: 'CommunicationColors.primary',
            },
          },
          {
            name: 'Comm Tint 10',
            hex: '#2b88d8',
            code: {
              core: '$ms-color-communicationTint10',
              react: 'CommunicationColors.tint10',
            },
          },
          {
            name: 'Comm Tint 20',
            hex: '#c7e0f4',
            code: {
              core: '$ms-color-communicationTint20',
              react: 'CommunicationColors.tint20',
            },
          },
          {
            name: 'Comm Tint 30',
            hex: '#deecf9',
            code: {
              core: '$ms-color-communicationTint30',
              react: 'CommunicationColors.tint30',
            },
          },
          {
            name: 'Comm Tint 40',
            hex: '#eff6fc',
            code: {
              core: '$ms-color-communicationTint40',
              react: 'CommunicationColors.tint40',
            },
          },
        ]}
      />

      <MarkdownHeader as="h3">Neutrals</MarkdownHeader>
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
            name: 'Gray190',
            hex: '#201f1e',
            code: {
              core: '$ms-color-gray190',
              react: 'NeutralColors.gray190',
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
            name: 'Gray120',
            hex: '#797775',
            code: {
              core: '$ms-color-gray120',
              react: 'NeutralColors.gray120',
            },
          },
          {
            name: 'Gray90',
            hex: '#a19f9d',
            code: {
              core: '$ms-color-gray90',
              react: 'NeutralColors.gray90',
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
            name: 'Gray50',
            hex: '#d2d0ce',
            code: {
              core: '$ms-color-gray50',
              react: 'NeutralColors.gray50',
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
    </>
  );
};
