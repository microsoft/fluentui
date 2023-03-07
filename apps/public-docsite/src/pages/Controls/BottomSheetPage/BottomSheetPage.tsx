import * as React from 'react';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { BottomSheetPageProps } from './BottomSheetPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/BottomSheetPage/';

export const BottomSheetPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="BottomSheet"
      {...BottomSheetPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/BottomSheetImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/BottomSheetPage/docs/android/BottomSheetImplementation.md') as string,
        },
      ];
  }
}
