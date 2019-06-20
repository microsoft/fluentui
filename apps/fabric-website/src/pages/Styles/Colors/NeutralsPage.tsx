import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps, IColorSwatch } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsNeutralsPageProps } from './NeutralsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';
const neutralColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-neutral.json');

export const ColorsNeutralsPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage {...props} {...ColorsNeutralsPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />
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
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsNeutrals.md') as string}
              </Markdown>
              <ColorPalette colors={neutralColors} />
            </>
          )
        },
        {
          sectionName: 'Implementation',
          editUrl: `${baseUrl}/web/ColorsImplementation.md`,
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsImplementation.md') as string}
            </Markdown>
          )
        }
      ];

    default:
      return [
        {
          sectionName: 'Coming soon',
          content: '...'
        }
      ];
  }
}
