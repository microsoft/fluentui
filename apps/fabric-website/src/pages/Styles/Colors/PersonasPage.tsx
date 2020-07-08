import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsPersonasPageProps } from './PersonasPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getColorsImplementation } from './getColorsImplementation';
import * as personaColors from '../../../data/colors-personas.json';
import * as personaGroupColors from '../../../data/colors-persona-groups.json';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';

export const ColorsPersonasPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...ColorsPersonasPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
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
                {
                  require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsPersonas.md') as string
                }
              </Markdown>
              <ColorPalette colors={personaColors} />
            </>
          ),
        },
        {
          sectionName: 'Groups',
          editUrl: `${baseUrl}/web/ColorsPersonasGroups.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsPersonasGroups.md') as string
                }
              </Markdown>
              <ColorPalette colors={personaGroupColors} />
            </>
          ),
        },
        getColorsImplementation(baseUrl, 'SharedColors', 'red20', 'sharedRed20'),
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
