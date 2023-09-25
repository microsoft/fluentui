import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CalendarPageProps } from './CalendarPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/CalendarPage/';

export const CalendarPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Calendar"
      {...CalendarPageProps[props.platform!]}
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
          editUrl: baseUrl + 'docs/android/CalendarImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/CalendarPage/docs/android/CalendarImplementation.md') as string,
        },
      ];
  }
}
