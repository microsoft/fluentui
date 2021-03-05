import * as React from 'react';
import {
  Markdown,
  PlatformContext,
  Page,
  IPageProps,
  IPageSectionProps,
} from '@fluentui/react-docsite-components/lib/index2';
import { ResourcesPageProps } from './ResourcesPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/ResourcesPage/';

export interface IResourcesPageProps extends IPageProps<Platforms> {}

const ResourcesPageBase: React.FunctionComponent<IResourcesPageProps> = props => {
  return <Page {...props} {...ResourcesPageProps} otherSections={_otherSections()} />;
};

function _otherSections(): IPageSectionProps[] {
  return [
    {
      sectionName: 'Design resources',
      editUrl: baseUrl + 'docs/default/ResourcesDesignResources.md',
      content: (
        <Markdown>
          {
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDesignResources.md') as string
          }
        </Markdown>
      ),
    },
    {
      sectionName: 'Developer resources',
      editUrl: baseUrl + 'docs/default/ResourcesDeveloperResources.md',
      content: (
        <Markdown>
          {
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/ResourcesDeveloperResources.md') as string
          }
        </Markdown>
      ),
    },
    {
      sectionName: 'Contribution process',
      editUrl: baseUrl + 'docs/default/ResourcesContributionProcess.md',
      content: (
        <Markdown>
          {
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/ResourcesContributionProcess.md') as string
          }
        </Markdown>
      ),
    },
    {
      sectionName: 'Microsoft employees',
      editUrl: baseUrl + 'docs/default/MicrosoftEmployees.md',
      content: (
        <Markdown>
          {
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ResourcesPage/docs/default/MicrosoftEmployees.md') as string
          }
        </Markdown>
      ),
    },
  ];
}

export const ResourcesPage: React.FunctionComponent<IResourcesPageProps> = (props: IResourcesPageProps) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <ResourcesPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
