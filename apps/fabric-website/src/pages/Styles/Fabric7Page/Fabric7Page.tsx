import * as React from 'react';
import { StylesAreaPage, IStylesPageProps } from '../StylesAreaPage';

export const Fabric7Page: React.FunctionComponent<IStylesPageProps> = props => {
  return (
    <StylesAreaPage
      {...props}
      title="Fabric 7 Updates"
      componentUrl="https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Fabric7Page"
      overview={require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Fabric7Page/docs/web/Fabric7Overview.md') as string}
    />
  );
};
