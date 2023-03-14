import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PeoplePickerPageProps } from './PeoplePickerPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PeoplePickerPage/';

export const PeoplePickerPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="People Picker"
      {...PeoplePickerPageProps[platform!]}
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
          editUrl: baseUrl + 'docs/android/PeoplePickerImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PeoplePickerPage/docs/android/PeoplePickerImplementation.md') as string,
        },
      ];
  }
}
