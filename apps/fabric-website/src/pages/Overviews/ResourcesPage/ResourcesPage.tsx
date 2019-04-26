import * as React from 'react';
import { Markdown, withPlatform, Page, IPageProps, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ResourcesPageProps } from './ResourcesPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

export interface IResourcesPageProps extends IPageProps<Platforms> {}

const ResourcesPageBase: React.StatelessComponent<IResourcesPageProps> = props => {
  return <Page {...props} {...ResourcesPageProps} otherSections={_otherSections()} />;
};

function _otherSections(): IPageSectionProps[] {
  return [
    {
      sectionName: 'Design resources',
      editUrl:
        'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDesignResources.md',
      content: (
        <Markdown>
          {
            require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDesignResources.md') as string
          }
        </Markdown>
      )
    },
    {
      sectionName: 'Developer resources',
      editUrl:
        'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDeveloperResources.md',
      content: (
        <Markdown>
          {
            require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDeveloperResources.md') as string
          }
        </Markdown>
      )
    },
    {
      sectionName: 'Contribution process',
      editUrl:
        'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesContributionProcess.md',
      content: (
        <Markdown>
          {
            require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesContributionProcess.md') as string
          }
        </Markdown>
      )
    },
    {
      sectionName: 'Join the community',
      editUrl:
        'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesJoinTheCommunity.md',
      content: (
        <Markdown>
          {
            require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ResourcesPage/docs/default/ResourcesJoinTheCommunity.md') as string
          }
        </Markdown>
      )
    }
  ];
}

export const ResourcesPage: React.StatelessComponent<IResourcesPageProps> = withPlatform<Platforms>(ResourcesPageBase);
