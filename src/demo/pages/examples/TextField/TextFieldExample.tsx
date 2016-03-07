import * as React from 'react';
import TextField from '../../../../components/TextField/index';
import Label from '../../../../components/Label/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class TextFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1 className='ms-font-xxl'>TextField</h1>
        <div><Link target='_blank' text='TextFields' url='http://dev.office.com/fabric/components/textfields' /> allow the user to enter text.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Default text field'>
          <TextField label="Some Label"/>
        </ExampleCard>

        <ExampleCard title='Placeholder'>
          <TextField placeholder="Now I am a Placeholder" />
        </ExampleCard>

        <ExampleCard title='Placeholder'>
          <TextField placeholder="A Placeholder" label="A Label" />
        </ExampleCard>

        <ExampleCard title='Multiline'>
          <TextField label="Label" multiline />
        </ExampleCard>

        <ExampleCard title='Underlined'>
          <TextField label="Label" underlined />
        </ExampleCard>

      </div>
    );
  }
}
