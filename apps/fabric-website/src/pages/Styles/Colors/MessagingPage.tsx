import * as React from 'react';
import { Markdown, IPageSectionProps, ColorPalette } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ColorsMessagingPageProps } from './MessagingPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors/docs';

export const ColorsMessagingPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage {...props} {...ColorsMessagingPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Messaging',
          editUrl: `${baseUrl}/web/ColorsMessaging.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsMessaging.md') as string}
              </Markdown>
              <ColorPalette
                colors={[
                  {
                    name: 'Warning',
                    hex: '#fff4ce'
                  },
                  {
                    name: 'Warning Icon',
                    hex: '#797673'
                  },
                  {
                    name: 'Severe Warning',
                    hex: '#fed9cc'
                  },
                  {
                    name: 'Severe Warning Icon',
                    hex: '#d83b01'
                  },
                  {
                    name: 'Error Block',
                    hex: '#fde7e9'
                  },
                  {
                    name: 'Error Block Icon',
                    hex: '#a80000'
                  },
                  {
                    name: 'Success',
                    hex: '#dff6dd'
                  },
                  {
                    name: 'Success Icon',
                    hex: '#107c10'
                  }
                ]}
              />
            </>
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
