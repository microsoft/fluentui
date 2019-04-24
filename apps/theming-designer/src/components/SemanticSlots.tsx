import * as React from 'react';
import { Card } from '@uifabric/react-cards';
// import { SemanticColorSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';

export class SemanticSlots extends React.Component {
  public render() {
    return (
      <Card styles={{ root: { minWidth: '800px', maxWidth: '1200px', height: 'auto' } }}>
        <h1>Semantic Slots</h1>
      </Card>
    );
  }
}
