import * as React from 'react';
import TextField from '../../../../components/TextField';
import Label from '../../../../components/Label';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class TextFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1 className='ms-font-xxl'>Table</h1>
        <div><Link text='TextFields' url='http://dev.office.com/fabric/components/textfields' /> allow the user to enter text.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Default text field'>
          <TextField label="Some Label" />
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
