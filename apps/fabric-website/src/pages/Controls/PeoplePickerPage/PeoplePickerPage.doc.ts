import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PeoplePickerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PeoplePickerPage/docs/PeoplePickerRelated.md') as string;

export const PeoplePickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl:
      'https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/pickers/PeoplePicker',
    related
  }
};
