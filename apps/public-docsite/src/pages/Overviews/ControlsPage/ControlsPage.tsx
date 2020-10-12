import * as React from 'react';
import { css, Link } from '@fluentui/react';
import { Page, PlatformContext, INavPage, IPageSectionProps, IPageProps } from '@uifabric/example-app-base/lib/index2';
import * as PageStyles from '@uifabric/example-app-base/lib/components/Page/Page.module.scss';
import { SiteDefinition } from '../../../SiteDefinition/index';
import { getSubTitle } from '../../../utilities/index';
import { ControlsPageProps } from './ControlsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const ControlsPageBase: React.FunctionComponent<IPageProps<Platforms>> = props => {
  const { platform } = props;
  return (
    <Page
      {...props}
      title="Controls"
      platform={platform}
      subTitle={getSubTitle(platform)}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
      showSideRail={false}
      {...ControlsPageProps[platform]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  const controls = SiteDefinition.pages.filter(page => page.title === 'Controls')[0].platforms;
  const platformControls: INavPage[] = controls[platform];

  if (platformControls) {
    let sections: IPageSectionProps<Platforms>[] = platformControls
      .filter(page => !page.isHiddenFromMainNav && page.isCategory)
      .map(
        category =>
          category.pages && {
            sectionName: category.title,
            content: (
              <ul className={PageStyles.uListFlex}>
                {category.pages.map(page => {
                  // If a page has sub-pages, it's considered a category and doesn't have its own URL.
                  // Get the URL from the first sub-page instead.
                  const url = page.url || (page.pages && page.pages[0] && page.pages[0].url);
                  return url ? (
                    <li key={url} className={css(PageStyles.uThird)}>
                      <Link href={url}>{page.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            ),
          },
      );

    _otherControlsRequestSections(platform) !== undefined && sections.push(_otherControlsRequestSections(platform));
    return sections;
  }
}

function _otherControlsRequestSections(platform: Platforms): IPageSectionProps<Platforms> {
  switch (platform) {
    case 'web':
      return {
        sectionName: "Need a control you don't see here?",
        content: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/web/ControlsRequest.md') as string,
      };
    case 'ios':
      return {
        sectionName: "Need a control you don't see here?",
        content: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/ios/ControlsRequest.md') as string,
      };
    case 'android':
      return {
        sectionName: "Need a control you don't see here?",
        content: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/android/ControlsRequest.md') as string,
      };
    case 'mac':
      return {
        sectionName: "Need a control you don't see here?",
        content: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/mac/ControlsRequest.md') as string,
      };
    case 'cross':
      return {
        sectionName: "Need a control you don't see here?",
        content: require('!raw-loader!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/cross/ControlsRequest.md') as string,
      };
  }
  return undefined;
}

export const ControlsPage: React.FunctionComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <ControlsPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
