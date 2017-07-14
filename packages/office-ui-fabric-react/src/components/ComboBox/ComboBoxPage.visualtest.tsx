import { ComboBox } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ComboBoxVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <ComboBox
        defaultSelectedKey='C'
        label='Basic uncontrolled example (allowFreeform: T, AutoComplete: T):'
        id='Basicdrop1'
        ariaLabel='Basic ComboBox example'
        allowFreeform={ true }
        autoComplete='on'
        options={
          [
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' },
          ]
        }
      />
    </div>;
  }
}