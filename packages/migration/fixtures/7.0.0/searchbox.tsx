import { SearchBox } from 'office-ui-fabric-react';

class SearchBoxFullSizeExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="ms-SearchBoxExample">
        <SearchBox onChange={this._onChange} />
        <SearchBox onChange={this._onChange}>Has children...</SearchBox>
      </div>
    );
  }

  private _onChange = () => {
    console.log('onChange called');
  };
}
