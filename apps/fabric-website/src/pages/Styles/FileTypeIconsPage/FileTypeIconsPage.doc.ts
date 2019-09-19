import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'File Type Icons';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FileTypeIconsPage/docs/FileTypeIconsRelated.md') as string;
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/FileTypeIconsPage';

export const FileTypeIconsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl
  }
};
