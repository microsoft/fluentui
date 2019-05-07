import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsNeutralsPageProps } from './NeutralsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';

export const ColorsNeutralsPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...ColorsNeutralsPageProps[platform]} otherSections={_otherSections(platform)} />;
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
              <ColorPalette
                colors={[
                  {
                    name: 'Black',
                    hex: '#000000',
                    code: {
                      core: '$ms-color-black',
                      react: 'NeutralColors.black'
                    }
                  },
                  {
                    name: 'Gray220',
                    hex: '#11100f',
                    code: {
                      core: '$ms-color-gray220',
                      react: 'NeutralColors.gray220'
                    }
                  },
                  {
                    name: 'Gray210',
                    hex: '#161514',
                    code: {
                      core: '$ms-color-gray210',
                      react: 'NeutralColors.gray210'
                    }
                  },
                  {
                    name: 'Gray200',
                    hex: '#1b1a19',
                    code: {
                      core: '$ms-color-gray200',
                      react: 'NeutralColors.gray200'
                    }
                  },
                  {
                    name: 'Gray190',
                    hex: '#201f1e',
                    code: {
                      core: '$ms-color-gray190',
                      react: 'NeutralColors.gray190'
                    }
                  },
                  {
                    name: 'Gray180',
                    hex: '#252423',
                    code: {
                      core: '$ms-color-gray180',
                      react: 'NeutralColors.gray180'
                    }
                  },
                  {
                    name: 'Gray170',
                    hex: '#292827',
                    code: {
                      core: '$ms-color-gray170',
                      react: 'NeutralColors.gray170'
                    }
                  },
                  {
                    name: 'Gray160',
                    hex: '#323130',
                    code: {
                      core: '$ms-color-gray160',
                      react: 'NeutralColors.gray160'
                    }
                  },
                  {
                    name: 'Gray150',
                    hex: '#3b3a39',
                    code: {
                      core: '$ms-color-gray150',
                      react: 'NeutralColors.gray150'
                    }
                  },
                  {
                    name: 'Gray140',
                    hex: '#484644',
                    code: {
                      core: '$ms-color-gray140',
                      react: 'NeutralColors.gray140'
                    }
                  },
                  {
                    name: 'Gray130',
                    hex: '#605e5c',
                    code: {
                      core: '$ms-color-gray130',
                      react: 'NeutralColors.gray130'
                    }
                  },
                  {
                    name: 'Gray120',
                    hex: '#797775',
                    code: {
                      core: '$ms-color-gray120',
                      react: 'NeutralColors.gray120'
                    }
                  },
                  {
                    name: 'Gray110',
                    hex: '#8a8886',
                    code: {
                      core: '$ms-color-gray110',
                      react: 'NeutralColors.gray110'
                    }
                  },
                  {
                    name: 'Gray100',
                    hex: '#979593',
                    code: {
                      core: '$ms-color-gray100',
                      react: 'NeutralColors.gray100'
                    }
                  },
                  {
                    name: 'Gray90',
                    hex: '#a19f9d',
                    code: {
                      core: '$ms-color-gray90',
                      react: 'NeutralColors.gray90'
                    }
                  },
                  {
                    name: 'Gray80',
                    hex: '#b3b0ad',
                    code: {
                      core: '$ms-color-gray80',
                      react: 'NeutralColors.gray80'
                    }
                  },
                  {
                    name: 'Gray70',
                    hex: '#bebbb8',
                    code: {
                      core: '$ms-color-gray70',
                      react: 'NeutralColors.gray70'
                    }
                  },
                  {
                    name: 'Gray60',
                    hex: '#c8c6c4',
                    code: {
                      core: '$ms-color-gray60',
                      react: 'NeutralColors.gray60'
                    }
                  },
                  {
                    name: 'Gray50',
                    hex: '#d2d0ce',
                    code: {
                      core: '$ms-color-gray50',
                      react: 'NeutralColors.gray50'
                    }
                  },
                  {
                    name: 'Gray40',
                    hex: '#e1dfdd',
                    code: {
                      core: '$ms-color-gray40',
                      react: 'NeutralColors.gray40'
                    }
                  },
                  {
                    name: 'Gray30',
                    hex: '#edebe9',
                    code: {
                      core: '$ms-color-gray30',
                      react: 'NeutralColors.gray30'
                    }
                  },
                  {
                    name: 'Gray20',
                    hex: '#f3f2f1',
                    code: {
                      core: '$ms-color-gray20',
                      react: 'NeutralColors.gray20'
                    }
                  },
                  {
                    name: 'Gray10',
                    hex: '#faf9f8',
                    code: {
                      core: '$ms-color-gray10',
                      react: 'NeutralColors.gray10'
                    }
                  },
                  {
                    name: 'White',
                    hex: '#ffffff',
                    code: {
                      core: '$ms-color-white',
                      react: 'NeutralColors.white'
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
