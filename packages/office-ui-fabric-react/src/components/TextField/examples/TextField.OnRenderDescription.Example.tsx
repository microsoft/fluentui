import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldOnRenderDescriptionExample extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <TextField
          description={ 'A custom description that appends a link.' }
          onRenderDescription={ this._onRenderDescription }
        />
      </div>
    );
  }

  private _onRenderDescription = (props: ITextFieldProps): JSX.Element => {
    return (
      <div>
        { props.description }{ ' ' }
        <a href='#' onClick={ (e) => e.preventDefault() } >Link</a>
      </div>);
  }
}
