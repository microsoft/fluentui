import * as React from 'react';
import { css, Link } from '@fluentui/react';
import {
  Page,
  PlatformContext,
  INavPage,
  IPageSectionProps,
  IPageProps,
} from '@fluentui/react-docsite-components/lib/index2';
import * as PageStyles from '@fluentui/react-docsite-components/lib/components/Page/Page.module.scss';
import { SiteDefinition } from '../../../SiteDefinition/index';
import { getSubTitle } from '../../../utilities/index';
import { ControlsPageProps } from './ControlsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const webPlatformBanner = {
  banner: {
    title: 'Fluent UI v9',
    message: 'Check out the all new [Fluent UI version 9](https://react.fluentui.dev)!',
  },
};

const ControlsPageBase: React.FunctionComponent<IPageProps<Platforms>> = props => {
  const { platform } = props;
  return (
    <Page
      {...props}
      title="Controls"
      platform={platform}
      {...(props.platform === Platforms.web && webPlatformBanner)}
      subTitle={getSubTitle(platform!)}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
      showSideRail={false}
      versionSwitcherDefinition={platform === Platforms.web ? SiteDefinition.versionSwitcherDefinition : undefined}
      {...ControlsPageProps[platform!]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  const controls = SiteDefinition.pages.filter(page => page.title === 'Controls')[0].platforms;
  const platformControls: INavPage[] | undefined = controls![platform];

  if (platformControls) {
    let sections = platformControls
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
      ) as IPageSectionProps<Platforms>[];

    const _otherControlsRequestSectionsValue = _otherControlsRequestSections(platform);

    _otherControlsRequestSectionsValue !== undefined && sections.push(_otherControlsRequestSectionsValue);
    return sections;
  }
}

function _otherControlsRequestSections(platform: Platforms): IPageSectionProps<Platforms> | undefined {
  switch (platform) {
    case 'web':
      return {
        sectionName: "Need a control you don't see here?",
        content:
          require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/web/ControlsRequest.md') as string,
      };
    case 'ios':
      return {
        sectionName: "Need a control you don't see here?",
        content:
          require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/ios/ControlsRequest.md') as string,
      };
    case 'android':
      return {
        sectionName: "Need a control you don't see here?",
        content:
          require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/android/ControlsRequest.md') as string,
      };
    case 'mac':
      return {
        sectionName: "Need a control you don't see here?",
        content:
          require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/mac/ControlsRequest.md') as string,
      };
    case 'cross':
      return {
        sectionName: "Need a control you don't see here?",
        content:
          require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/cross/ControlsRequest.md') as string,
      };
  }
  return undefined;
}

export const ControlsPage: React.FunctionComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <ControlsPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
