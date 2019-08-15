import * as React from 'react';
import { Markdown, ColorPalette, IColorSwatch, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsSharedPageProps } from './SharedPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getColorsImplementation } from './getColorsImplementation';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';
const sharedColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-shared.json');

export const ColorsSharedPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...ColorsSharedPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Shared',
          editUrl: `${baseUrl}/web/ColorsShared.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsShared.md') as string}
              </Markdown>
              <ColorPalette colors={sharedColors} />
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
