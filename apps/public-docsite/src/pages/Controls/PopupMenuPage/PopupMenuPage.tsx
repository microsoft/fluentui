import * as React from 'react';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PopupMenuPageProps } from './PopupMenuPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PopupMenuPage/';

export const PopupMenuPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Popup Menu"
      {...PopupMenuPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/PopupMenuImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PopupMenuPage/docs/ios/PopupMenuImplementation.md') as string,
        },
      ];
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/PopupMenuImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PopupMenuPage/docs/android/PopupMenuImplementation.md') as string,
        },
      ];
  }
}
