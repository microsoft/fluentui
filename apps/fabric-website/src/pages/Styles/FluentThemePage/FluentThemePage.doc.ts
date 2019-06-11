import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Fluent Theme';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FluentThemePage/docs/FluentThemeRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/FluentThemePage';

export const FluentThemePageProps: TFabricPlatformPageProps = {
  web: {
    title,
    componentUrl,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FluentThemePage/docs/web/FluentThemeOverview.md') as string,
    related
  }
};
