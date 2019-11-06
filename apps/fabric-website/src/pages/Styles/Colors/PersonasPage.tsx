import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps, IColorSwatch } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsPersonasPageProps } from './PersonasPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getColorsImplementation } from './getColorsImplementation';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';
const personaColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-personas.json');
const personaGroupColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-persona-groups.json');

export const ColorsPersonasPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage {...props} {...ColorsPersonasPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Personas',
          editUrl: `${baseUrl}/web/ColorsPersonas.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsPersonas.md') as string}
              </Markdown>
              <ColorPalette colors={personaColors} />
            </>
          )
        },
        {
          sectionName: 'Groups',
          editUrl: `${baseUrl}/web/ColorsPersonasGroups.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsPersonasGroups.md') as string}
              </Markdown>
              <ColorPalette colors={personaGroupColors} />
            </>
          )
        },
        getColorsImplementation(baseUrl, 'SharedColors', 'red20', 'sharedRed20')
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
