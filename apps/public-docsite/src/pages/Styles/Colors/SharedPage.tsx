import * as React from 'react';
import { Markdown, ColorPalette, IColorSwatch, IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsSharedPageProps } from './SharedPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getColorsImplementation } from './getColorsImplementation';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/Colors/docs';
// eslint-disable-next-line import/no-extraneous-dependencies
const sharedColors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-shared.json');

export const ColorsSharedPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...ColorsSharedPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
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
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/Colors/docs/web/ColorsShared.md') as string
                }
              </Markdown>
              <ColorPalette colors={sharedColors} />
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
