import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TextPageProps } from './TextPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps, ImplementationSection } from '@uifabric/example-app-base/lib/index2';
import { ApiKind } from 'office-ui-fabric-react/lib/common/DocPage.types';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/TextPage/';

export const TextPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Text"
      {...TextPageProps[props.platform]}
      otherSections={_otherSections(platform) as any}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/TextImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextPage/docs/ios/TextImplementation.md') as string,
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/TextImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextPage/docs/android/TextImplementation.md') as string,
        },
      ];
    case 'cross':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/cross/TextImplementation.md',
          content: (
            <ImplementationSection
              jsonDocs={{
                name: '',
                tables: [
                  {
                    kind: 'interface' as ApiKind,
                    name: 'ITextProps',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'variant',
                        typeTokens: [
                          {
                            text: 'keyof ITypography[variants]',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Optional font style for Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontFamily',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Font family of the Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontSize',
                        typeTokens: [
                          {
                            text: 'integer',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Font size of the Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontWeight',
                        typeTokens: [
                          {
                            text: 'keyof IFontWeights | FontWeightValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Font weight of the Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'disabled',
                        typeTokens: [
                          {
                            text: 'boolean',
                          },
                        ],
                        kind: 'property' as 'property',
                        defaultValue: 'false',
                        description: 'Sets disabled style to the Text.\n',
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
