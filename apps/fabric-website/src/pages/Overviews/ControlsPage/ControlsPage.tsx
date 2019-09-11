import * as React from 'react';
import { css, Link } from 'office-ui-fabric-react';
import { Page, PlatformContext, INavPage, IPageSectionProps, IPageProps } from '@uifabric/example-app-base/lib/index2';
import * as PageStyles from '@uifabric/example-app-base/lib/components/Page/Page.module.scss';
import { SiteDefinition } from '../../../SiteDefinition/index';
import { getSubTitle } from '../../../utilities/index';
import { ControlsPageProps } from './ControlsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const ControlsPageBase: React.StatelessComponent<IPageProps<Platforms>> = props => {
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
                {category.pages.map(page => (
                  <li key={page.url} className={css(PageStyles.uThird)}>
                    <Link href={page.url}>{page.title}</Link>
                  </li>
                ))}
              </ul>
            )
          }
      );

    sections.push(_otherControlsRequestSections(platform));
    return sections;
  }
}

function _otherControlsRequestSections(platform: Platforms): IPageSectionProps<Platforms> {
  switch (platform) {
    case 'web':
      return {
        sectionName: 'Need a control Fabric React doesn’t have?',
        content: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/web/ControlsRequest.md') as string
      };
    case 'ios':
      return {
        sectionName: 'Need a control Fabric iOS doesn’t have?',
        content: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/ios/ControlsRequest.md') as string
      };
    case 'android':
      return {
        sectionName: 'Need a control Fabric Android doesn’t have?',
        content: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/android/ControlsRequest.md') as string
      };
  }
}

export const ControlsPage: React.StatelessComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>{(platform: Platforms) => <ControlsPageBase platform={platform} {...props} />}</PlatformContext.Consumer>
);
