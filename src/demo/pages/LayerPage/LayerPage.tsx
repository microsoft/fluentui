
import * as React from 'react';
import {
  ExampleCard
} from '../../components/index';
import LayerBasicExample from './examples/Layer.Basic.Example';
import LayerInteractiveExample from './examples/Layer.Interactive.Example';

const LayerBasicExampleCode = require('./examples/Layer.Basic.Example.tsx');
const LayerInteractiveExampleCode = require('./examples/Layer.Interactive.Example.tsx');

export default class LayerPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Layer</h1>
        <div>
          Layers are used to stack components in a presentation
          order appropriate for popups, panels, dialogs, and other modal behaviors.
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Basic' code={ LayerBasicExampleCode }>
          <LayerBasicExample />
        </ExampleCard>
        <ExampleCard title='Interactive' code={ LayerInteractiveExampleCode }>
          <LayerInteractiveExample />
        </ExampleCard>
      </div>
    );
  }
}
