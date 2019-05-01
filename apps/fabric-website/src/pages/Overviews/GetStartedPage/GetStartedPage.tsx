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
          sectionName: 'Use our design language in your own experience',
          editUrl: baseUrl + 'docs/web/GetStartedDesign.md',
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDesign.md') as string}
            </Markdown>
          )
        },
        {
          sectionName: 'Develop with Fabric React',
          editUrl: baseUrl + 'docs/web/GetStartedDevelop.md',
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelop.md') as string}
            </Markdown>
          )
        }
      ];

    default:
      return [];
  }
}

export const GetStartedPage: React.StatelessComponent<IGetStartedPageProps> = withPlatform<Platforms>(GetStartedPageBase);
