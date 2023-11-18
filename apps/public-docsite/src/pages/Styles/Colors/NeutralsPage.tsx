import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps, IColorSwatch } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsNeutralsPageProps } from './NeutralsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getColorsImplementation } from './getColorsImplementation';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/Colors/docs';
// eslint-disable-next-line import/no-extraneous-dependencies
const neutralColors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-neutral.json');

export const ColorsNeutralsPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...ColorsNeutralsPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Neutrals',
          editUrl: `${baseUrl}/web/ColorsNeutrals.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/Colors/docs/web/ColorsNeutrals.md') as string
                }
              </Markdown>
              <ColorPalette colors={neutralColors} />
            </>
          ),
        },
        getColorsImplementation(baseUrl, 'NeutralColors', 'gray10', 'gray10'),
      ];

    default:
      return [
        {
          sectionName: 'Coming soon',
          content: '...',
        },
      ];
  }
}
