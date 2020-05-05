import * as React from 'react';
import { IPageSectionProps, Markdown } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PersonaPageProps } from './PersonaPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { ImplementationSection } from '@uifabric/example-app-base/lib/index2';
import { ApiKind } from 'office-ui-fabric-react/lib/common/DocPage.types';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/PersonaPage/';

export const PersonaPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Persona"
      {...PersonaPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/PersonaImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/PersonaImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/android/PersonaImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'windows':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/windows/PersonaImplementation.md',
          content: (
            <ImplementationSection
              jsonDocs={{
                name: '',
                tables: [
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IPersonaCoinProps',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'imageUrl',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.\n',
                        deprecated: false,
                      },
                      {
                        name: 'imageDescription',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Alt text for the image to use. Defaults to an empty string.\n',
                        deprecated: false,
                      },
                      {
                        name: 'initials',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: "The user's initials to display in the image area when there is no image. \n",
                        deprecated: false,
                      },
                      {
                        name: 'isOutOfOffice',
                        typeTokens: [
                          {
                            text: 'boolean',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'This flag can be used to signal the persona is out of office. This will change the way the presence icon looks for statuses that support dual-presence. \n',
                        deprecated: false,
                      },
                      {
                        name: 'presence',
                        typeTokens: [
                          {
                            text: 'PersonaPresence',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Presence of the person to display - will not display presence if undefined. \n',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'enum' as ApiKind,
                    name: 'PersonaPresence',
                    description: '\n',
                    extendsTokens: [],
                    members: [],
                  },
                ],
              }}
            />
          ),
        },
      ];
  }
}
