import { SearchBox } from 'office-ui-fabric-react';

class SearchBoxFullSizeExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-SearchBoxExample">
        <SearchBox onChange={() => console.log('onChange called')} />
        <SearchBox onChange={() => console.log('onChange called')}>Has children...</SearchBox>
      </div>
    );
  }
}
