import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SeparatorPageProps } from './SeparatorPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { ImplementationSection } from '@fluentui/react-docsite-components/lib/index2';
import { ApiKind } from '@fluentui/react/lib/common/DocPage.types';

/* eslint-disable @fluentui/max-len */

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SeparatorPage/';

export const SeparatorPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Separator"
      {...SeparatorPageProps[platform!]}
      otherSections={_otherSections(platform!) as any}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/SeparatorImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/ios/SeparatorImplementation.md') as string,
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/SeparatorImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/android/SeparatorImplementation.md') as string,
        },
      ];

    case 'mac':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/mac/SeparatorImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/mac/SeparatorImplementation.md') as string,
        },
      ];

    case 'cross':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/cross/SeparatorImplementation.md',
          content: (
            <ImplementationSection
              jsonDocs={{
                name: '',
                tables: [
                  {
                    kind: 'interface' as ApiKind,
                    name: 'ISeparatorPropTokens ',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'vertical',
                        typeTokens: [
                          {
                            text: 'boolean',
                          },
                        ],
                        kind: 'property' as 'property',
                        defaultValue: 'false',
                        description:
                          "Specifies whether the separator is vertical or horizontal. If true, then it's vertical.\n",
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'ISeparatorTokens ',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'separatorWidth',
                        typeTokens: [
                          {
                            text: 'number',
                          },
                        ],
                        kind: 'property' as 'property',
                        defaultValue: '1',
                        description:
                          'Specifies the width of the separator. This will be interpreted as DIPs on Windows and Android, but as points on Mac and iOS.\n',
                        deprecated: false,
                      },
                    ],
                  },
                ],
              }}
            />
          ),
        },
      ];
  }
}
