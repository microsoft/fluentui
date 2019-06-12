import { ComboBox, Fabric } from 'office-ui-fabric-react';

class ComboBoxControlledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          selectedKey={state.selectedOptionKey}
          label="Controlled single-select ComboBox (allowFreeform: T)"
          allowFreeform={true}
          autoComplete="on"
          options={state.options}
          onChanged={this._onChange}
          onResolveOptions={this._getOptions}
          value={state.initialDisplayValue}
        />
      </Fabric>
    );
  }
}
