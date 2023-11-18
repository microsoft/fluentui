import * as React from 'react';
import { PlatformContext, Page, IPageProps, IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { GetStartedPageProps } from './GetStartedPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { getSubTitle } from '../../../utilities/index';

export interface IGetStartedPageProps extends IPageProps<Platforms> {}

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/GetStartedPage/';
// en dashes look like regular dashes in a monospace font
const enDash = '–';

const GetStartedPageBase: React.FunctionComponent<IGetStartedPageProps> = props => {
  const { platform } = props;
  return (
    <Page
      title="Get started"
      subTitle={getSubTitle(platform!)}
      {...props}
      {...GetStartedPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Fluent UI React',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopExisting.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopExisting.md') as string,
          jumpLinks: [{ text: enDash + ' Add to existing project', url: 'add-to-existing-project' }],
        },
        {
          sectionName: 'Start a new Fluent UI React project',
          jumpLinkName: enDash + ' Start a new project',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopSimple.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopSimple.md') as string,
        },
        {
          sectionName: 'Next steps with Fluent UI React',
          jumpLinkName: enDash + ' Next steps',
          editUrl: baseUrl + 'docs/web/GetStartedNextSteps.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedNextSteps.md') as string,
        },
        {
          sectionName: 'Fabric Core',
          editUrl: baseUrl + 'docs/web/GetStartedDevelopCore.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDevelopCore.md') as string,
        },
        {
          sectionName: 'Use our design language in your site',
          jumpLinkName: 'Design language',
          editUrl: baseUrl + 'docs/web/GetStartedDesign.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedDesign.md') as string,
        },
      ];

    default:
      return [];
  }
}

export const GetStartedPage: React.FunctionComponent<IGetStartedPageProps> = (props: IGetStartedPageProps) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <GetStartedPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
