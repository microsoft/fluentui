import * as React from 'react';
import { IPageSectionProps, Markdown } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PersonaPageProps } from './PersonaPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { ImplementationSection } from '@fluentui/react-docsite-components/lib/index2';
import { ApiKind } from '@fluentui/react/lib/common/DocPage.types';

/* eslint-disable @fluentui/max-len */

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PersonaPage/';

export const PersonaPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Persona"
      {...PersonaPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/PersonaImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PersonaPage/docs/ios/PersonaImplementation.md') as string
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
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PersonaPage/docs/android/PersonaImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'cross':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/cross/PersonaImplementation.md',
          content: (
            <ImplementationSection
              jsonDocs={{
                name: '',
                tables: [
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IPersonaProps',
                    description: '\n',
                    extendsTokens: [
                      {
                        text: 'IPersonaCoinProps, ',
                      },
                      {
                        text: 'IPersonaState, ',
                      },
                    ],
                    members: [
                      {
                        name: 'text',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Primary text to display, usually the name of the person.\n',
                        deprecated: false,
                      },
                      {
                        name: 'secondaryText',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Secondary text to display, usually the role of the user.\n',
                        deprecated: false,
                      },
                      {
                        name: 'tertiaryText',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size72 or size100.\n',
                        deprecated: false,
                      },
                      {
                        name: 'optionalText',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Optional text to display, usually a custom message set. The optional text will only be shown when using size100.\n',
                        deprecated: false,
                      },
                    ],
                  },
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
                      {
                        name: 'size',
                        typeTokens: [
                          {
                            text: 'PersonaSize',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Decides the size of the PersonaCoin.\n',
                        deprecated: false,
                      },
                      {
                        name: 'coinColor',
                        typeTokens: [
                          {
                            text: 'PersonaCoinColor',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: "The background color when the user's initials are displayed.\n",
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'enum' as ApiKind,
                    name: 'PersonaPresence',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'away',
                        typeTokens: [
                          {
                            text: 'away',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'blocked',
                        typeTokens: [
                          {
                            text: 'blocked',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'busy',
                        typeTokens: [
                          {
                            text: 'busy',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'dnd',
                        typeTokens: [
                          {
                            text: 'dnd',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'none',
                        typeTokens: [
                          {
                            text: 'none',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'offline',
                        typeTokens: [
                          {
                            text: 'offline',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'online',
                        typeTokens: [
                          {
                            text: 'online',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'enum' as ApiKind,
                    name: 'PersonaSize',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'size8',
                        typeTokens: [
                          {
                            text: 'size8',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'No PersonaCoin is rendered.',
                        deprecated: false,
                      },
                      {
                        name: 'size24',
                        typeTokens: [
                          {
                            text: 'size24',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 24px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size32',
                        typeTokens: [
                          {
                            text: 'size32',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 32px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size40',
                        typeTokens: [
                          {
                            text: 'size40',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 40px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size48',
                        typeTokens: [
                          {
                            text: 'size48',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 48px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size56',
                        typeTokens: [
                          {
                            text: 'size56',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 56px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size72',
                        typeTokens: [
                          {
                            text: 'size72',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 72px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size100',
                        typeTokens: [
                          {
                            text: 'size100',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 100px PersonaCoin.',
                        deprecated: false,
                      },
                      {
                        name: 'size120',
                        typeTokens: [
                          {
                            text: 'size120',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Renders a 120px PersonaCoin.',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'enum' as ApiKind,
                    name: 'PersonaCoinColor',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'lightBlue',
                        typeTokens: [
                          {
                            text: 'lightBlue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'blue',
                        typeTokens: [
                          {
                            text: 'blue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'darkBlue',
                        typeTokens: [
                          {
                            text: 'darkBlue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'teal',
                        typeTokens: [
                          {
                            text: 'teal',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'green',
                        typeTokens: [
                          {
                            text: 'green',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'darkGreen',
                        typeTokens: [
                          {
                            text: 'darkGreen',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'lightPink',
                        typeTokens: [
                          {
                            text: 'lightPink',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'pink',
                        typeTokens: [
                          {
                            text: 'pink',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'magenta',
                        typeTokens: [
                          {
                            text: 'magenta',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'purple',
                        typeTokens: [
                          {
                            text: 'purple',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'orange',
                        typeTokens: [
                          {
                            text: 'orange',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'darkRed',
                        typeTokens: [
                          {
                            text: 'darkRed',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'violet',
                        typeTokens: [
                          {
                            text: 'violet',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'lightRed',
                        typeTokens: [
                          {
                            text: 'lightRed',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'gold',
                        typeTokens: [
                          {
                            text: 'gold',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'burgundy',
                        typeTokens: [
                          {
                            text: 'burgundy',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'warmGray',
                        typeTokens: [
                          {
                            text: 'warmGray',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'coolGray',
                        typeTokens: [
                          {
                            text: 'coolGray',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'cyan',
                        typeTokens: [
                          {
                            text: 'cyan',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
                        deprecated: false,
                      },
                      {
                        name: 'rust',
                        typeTokens: [
                          {
                            text: 'rust',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: '',
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
