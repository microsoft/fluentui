import * as React from 'react';
import { DocumentTitleBar } from '../DocumentTitleBar';

export interface IDocumentTitleBarExampleState {
  documentTitle: string;
  statusText: string;
}

export class DocumentTitleBarExample extends React.Component<any, IDocumentTitleBarExampleState> {
  constructor() {
    super();
    this.state = {
      documentTitle: 'Climate Change',
      statusText: undefined
    };
    this._onRenameDocument = this._onRenameDocument.bind(this);
  }

  public render() {
    return (
      <DocumentTitleBar
        title={ this.state.documentTitle }
        statusText={ this.state.statusText }
        filePath='OneDrive > Document'
        hasVersions={ true }
        onClickSavedLocationMenuItem={ () => console.log('Clicked Saved Location') }
        onClickVersionsMenuItem={ () => console.log('Clicked Versions') }
        onRenameDocument={ this._onRenameDocument } />
    );
  }

  private _onRenameDocument(newName: string) {
    this.setState({
      documentTitle: newName,
      statusText: 'Saved'
    });
  }
}
