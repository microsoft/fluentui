import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsPersonasPageProps } from './PersonasPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';

export const ColorsPersonasPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...ColorsPersonasPageProps[platform]} otherSections={_otherSections(platform)} />;
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
              <ColorPalette
                colors={[
                  {
                    name: 'PinkRed10',
                    hex: '#750b1c',
                    code: {
                      core: '$ms-color-sharedPinkRed10',
                      react: 'SharedColors.pinkRed10'
                    }
                  },
                  {
                    name: 'Red20',
                    hex: '#a4262c',
                    code: {
                      core: '$ms-color-sharedRed20',
                      react: 'SharedColors.red20'
                    }
                  },
                  {
                    name: 'Red10',
                    hex: '#d13438',
                    code: {
                      core: '$ms-color-sharedRed10',
                      react: 'SharedColors.red10'
                    }
                  },
                  {
                    name: 'Orange20',
                    hex: '#ca5010',
                    code: {
                      core: '$ms-color-sharedOrange20',
                      react: 'SharedColors.orange20'
                    }
                  },
                  {
                    name: 'OrangeYellow20',
                    hex: '#986f0b',
                    code: {
                      core: '$ms-color-sharedOrangeYellow20',
                      react: 'SharedColors.orangeYellow20'
                    }
                  },
                  {
                    name: 'Green10',
                    hex: '#498205',
                    code: {
                      core: '$ms-color-sharedGreen10',
                      react: 'SharedColors.green10'
                    }
                  },
                  {
                    name: 'Green20',
                    hex: '#0b6a0b',
                    code: {
                      core: '$ms-color-sharedGreen20',
                      react: 'SharedColors.green20'
                    }
                  },
                  {
                    name: 'Cyan20',
                    hex: '#038387',
                    code: {
                      core: '$ms-color-sharedCyan20',
                      react: 'SharedColors.cyan20'
                    }
                  },
                  {
                    name: 'Cyan30',
                    hex: '#005b70',
                    code: {
                      core: '$ms-color-sharedCyan30',
                      react: 'SharedColors.cyan30'
                    }
                  },
                  {
                    name: 'CyanBlue10',
                    hex: '#0078d4',
                    code: {
                      core: '$ms-color-sharedCyanBlue10',
                      react: 'SharedColors.cyanBlue10'
                    }
                  },
                  {
                    name: 'CyanBlue20',
                    hex: '#004e8c',
                    code: {
                      core: '$ms-color-sharedCyanBlue20',
                      react: 'SharedColors.cyanBlue20'
                    }
                  },
                  {
                    name: 'Blue10',
                    hex: '#4f6bed',
                    code: {
                      core: '$ms-color-sharedBlue10',
                      react: 'SharedColors.blue10'
                    }
                  },
                  {
                    name: 'BlueMagenta30',
                    hex: '#5c2e91',
                    code: {
                      core: '$ms-color-sharedBlueMagenta30',
                      react: 'SharedColors.blueMagenta30'
                    }
                  },
                  {
                    name: 'BlueMagenta20',
                    hex: '#8764b8',
                    code: {
                      core: '$ms-color-sharedBlueMagenta20',
                      react: 'SharedColors.blueMagenta20'
                    }
                  },
                  {
                    name: 'Magenta20',
                    hex: '#881798',
                    code: {
                      core: '$ms-color-sharedMagenta20',
                      react: 'SharedColors.magenta20'
                    }
                  },
                  {
                    name: 'Magenta10',
                    hex: '#c239b3',
                    code: {
                      core: '$ms-color-sharedMagenta10',
                      react: 'SharedColors.magenta10'
                    }
                  },
                  {
                    name: 'MagentaPink10',
                    hex: '#e3008c',
                    code: {
                      core: '$ms-color-sharedMagentaPink10',
                      react: 'SharedColors.magentaPink10'
                    }
                  },
                  {
                    name: 'Orange30',
                    hex: '#8e562e',
                    code: {
                      core: '$ms-color-sharedOrange30',
                      react: 'SharedColors.orange30'
                    }
                  },
                  {
                    name: 'Gray30',
                    hex: '#7a7574',
                    code: {
                      core: '$ms-color-sharedGray30',
                      react: 'SharedColors.gray30'
                    }
                  },
                  {
                    name: 'Gray20',
                    hex: '#69797e',
                    code: {
                      core: '$ms-color-sharedGray20',
                      react: 'SharedColors.gray20'
                    }
                  }
                ]}
              />
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
              <ColorPalette
                colors={[
                  {
                    name: 'Red20',
                    hex: '#a4262c',
                    code: {
                      core: '$ms-color-sharedRed20',
                      react: 'SharedColors.red20'
                    }
                  },
                  {
                    name: 'Orange20',
                    hex: '#ca5010',
                    code: {
                      core: '$ms-color-sharedOrange20',
                      react: 'SharedColors.orange20'
                    }
                  },
                  {
                    name: 'Yellow20',
                    hex: '#986f0B',
                    code: {
                      core: '$ms-color-sharedYellow20',
                      react: 'SharedColors.yellow20'
                    }
                  },
                  {
                    name: 'Green10',
                    hex: '#498205',
                    code: {
                      core: '$ms-color-sharedGreen10',
                      react: 'SharedColors.green10'
                    }
                  },
                  {
                    name: 'Cyan20',
                    hex: '#038387',
                    code: {
                      core: '$ms-color-sharedCyan20',
                      react: 'SharedColors.cyan20'
                    }
                  },
                  {
                    name: 'CyanBlue10',
                    hex: '#0078d4',
                    code: {
                      core: '$ms-color-sharedCyanBlue10',
                      react: 'SharedColors.cyanBlue10'
                    }
                  },
                  {
                    name: 'CyanBlue20',
                    hex: '#004e8c',
                    code: {
                      core: '$ms-color-sharedCyanBlue20',
                      react: 'SharedColors.cyanBlue20'
                    }
                  },
                  {
                    name: 'Blue10',
                    hex: '#4f6bed',
                    code: {
                      core: '$ms-color-sharedBlue10',
                      react: 'SharedColors.blue10'
                    }
                  },
                  {
                    name: 'BlueMagenta20',
                    hex: '#8764b8',
                    code: {
                      core: '$ms-color-sharedBlueMagenta20',
                      react: 'SharedColors.blueMagenta20'
                    }
                  },
                  {
                    name: 'Magenta20',
                    hex: '#881798',
                    code: {
                      core: '$ms-color-sharedMagenta20',
                      react: 'SharedColors.magenta20'
                    }
                  },
                  {
                    name: 'Gray20',
                    hex: '#69797e',
                    code: {
                      core: '$ms-color-sharedGray20',
                      react: 'SharedColors.gray20'
                    }
                  },
                  {
                    name: 'Gray30',
                    hex: '#7a7574',
                    code: {
                      core: '$ms-color-sharedGray30',
                      react: 'SharedColors.gray30'
                    }
                  }
                ]}
              />
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
