import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { Text } from 'office-ui-fabric-react/lib/Text';

export class SemanticSlots extends React.Component {
  render() {
    return (
      <Card styles={{ root: { width: '800px' } }}>
        <Text>SemanticSlots</Text>
      </Card>
    );
  }
}
