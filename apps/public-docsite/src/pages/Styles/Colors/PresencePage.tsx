import * as React from 'react';
import { Markdown, ColorPalette, IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsPresencePageProps } from './PresencePage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/Colors/docs';

export const ColorsPresencePage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...ColorsPresencePageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Presence',
          editUrl: `${baseUrl}/web/ColorsPresence.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/Colors/docs/web/ColorsPresence.md') as string
                }
              </Markdown>
              <ColorPalette
                colors={[
                  {
                    name: 'Away',
                    hex: '#ffaa44',
                    code: {
                      core: '$ms-color-sharedOrange10',
                      react: 'SharedColors.orange10',
                    },
                  },
                  {
                    name: 'Do Not Disturb',
                    hex: '#c50f1f',
                  },
                  {
                    name: 'Online',
                    hex: '#6bb700',
                  },
                  {
                    name: 'Invisible',
                    hex: '#8a8886',
                  },
                  {
                    name: 'Out of Office',
                    hex: '#b4009e',
                  },
                ]}
              />
            </>
          ),
        },
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
