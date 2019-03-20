import * as React from 'react';
import { Card } from '@uifabric/react-cards';
//import { ColorsPage } from '@uifabric/fabric-website-resources/lib/components/pages/ColorsPage';

export class AccChecker extends React.Component {
  render() {
    return (
      <Card styles={{ root: { width: '800px' } }}>
        <h1>Accessibility Checker</h1>
        {/* <ColorsPage /> */}
      </Card>
    );
  }
}
