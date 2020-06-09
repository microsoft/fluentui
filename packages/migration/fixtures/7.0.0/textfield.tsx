import { TextField } from 'office-ui-fabric-react';

class TextFieldExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="ms-TextFieldExample">
        <TextField componentId="TextFieldId" addonString="prefix" onRenderAddon={this._onRenderAddon} />
        <TextField onChanged={this._onChanged} onBeforeChange={this._onBeforeChange} iconClass="iconClassName" />
      </div>
    );
  }

  private _onRenderAddon = () => {
    return <span>prefix</span>;
  };

  private _onChanged = () => {
    console.log('onChanged called');
  };

  private _onBeforeChange = () => {
    console.log('onChanged called');
  };
}
