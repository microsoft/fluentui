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
      otherSections={_otherSections(platform)}
      showSideRail={false}
      versionSwitcherDefinition={platform === Platforms.web ? SiteDefinition.versionSwitcherDefinition : undefined}
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

    if (platform === 'web') {
      sections.push({
        sectionName: 'Need a control Fabric React doesn’t have?',
        content: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/web/ControlsRequest.md') as string
      });
    }
    return sections;
  }
}

export const ControlsPage: React.StatelessComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>{(platform: Platforms) => <ControlsPageBase platform={platform} {...props} />}</PlatformContext.Consumer>
);
