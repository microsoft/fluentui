import * as React from 'react';
import { Markdown, withPlatform, Page, IPageProps, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { GetStartedPageProps } from './GetStartedPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getSubTitle } from '../../../utilities/index';

export interface IGetStartedPageProps extends IPageProps<Platforms> {}

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/GetStartedPage/';

const GetStartedPageBase: React.StatelessComponent<IGetStartedPageProps> = props => {
  const { platform } = props;
  return (
    <Page
      title="Get started"
      subTitle={getSubTitle(platform)}
      {...props}
      {...GetStartedPageProps[platform]}
      otherSections={_otherSections(platform)}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Add to existing project',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopExisting.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopExisting.md') as string
              }
            </Markdown>
          )
        },
        {
          sectionName: 'Quick start a new project',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopSimple.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopSimple.md') as string
              }
            </Markdown>
          )
        },
        {
          sectionName: 'Use our Create React App',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopCRA.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopCRA.md') as string
              }
            </Markdown>
          )
        },
        {
          sectionName: 'Use our Gatsby.js starter',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopGatsby.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopGatsby.md') as string
              }
            </Markdown>
          )
        },
        {
          sectionName: 'Use our design language in your site',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopCore.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopCore.md') as string
              }
            </Markdown>
          )
        }
      ];

    default:
      return [];
  }
}

export const GetStartedPage: React.StatelessComponent<IGetStartedPageProps> = withPlatform<Platforms>(GetStartedPageBase);
