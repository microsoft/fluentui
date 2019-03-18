import * as React from 'react';
import * as stylesImport from './app.scss';
import { Card } from '@uifabric/react-cards';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextFieldBasicExample } from './TextField.Basic.Example';
import './TextField.Examples.scss';

const styles: any = stylesImport;

export class Samples extends React.Component {
  render() {
    return (
      <Card styles={{ root: { width: '800px' } }}>
        <Text>Samples</Text>
        <div style={{ display: 'flex', height: '300px' }}>
          <div className="docs-TextFieldExample">
            <TextFieldBasicExample />
          </div>
        </div>
      </Card>
    );
  }
}
