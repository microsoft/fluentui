import * as React from 'react';
import { css, Link } from 'office-ui-fabric-react';
import { Page, withPlatform, INavPage, IPageSectionProps, IPageProps } from '@uifabric/example-app-base/lib/index2';
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
      {...ControlsPageProps[platform]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  const controls = SiteDefinition.pages.filter(page => page.title === 'Controls')[0].platforms;
  const platformControls: INavPage[] = controls[platform];

  if (platformControls) {
    return platformControls
      .filter(page => !page.isHiddenFromMainNav && page.isCategory)
      .map(
        (category, categoryIndex) =>
          category.pages && {
            key: categoryIndex,
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
  }
}

export const ControlsPage: React.StatelessComponent<IPageProps<Platforms>> = withPlatform<Platforms>(ControlsPageBase);
