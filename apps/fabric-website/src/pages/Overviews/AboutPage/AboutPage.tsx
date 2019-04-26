import * as React from 'react';
import { Markdown, Page, IPageProps, IPageSectionProps, withPlatform } from '@uifabric/example-app-base/lib/index2';
import { AboutPageProps } from './AboutPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/AboutPage/';

export interface IAboutPageProps extends IPageProps<Platforms> {}

const AboutPageBase: React.StatelessComponent<IAboutPageProps> = props => {
  return <Page {...props} {...AboutPageProps} otherSections={_otherSections()} />;
};

function _otherSections(): IPageSectionProps[] {
  return [
    {
      sectionName: 'Overview',
      editUrl: baseUrl + 'docs/default/AboutOverview.md',
      content: (
        <Markdown>
          {require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/AboutPage/docs/default/AboutOverview.md') as string}
        </Markdown>
      )
    }
  ];
}

export const AboutPage: React.StatelessComponent<IAboutPageProps> = withPlatform<Platforms>(AboutPageBase);
