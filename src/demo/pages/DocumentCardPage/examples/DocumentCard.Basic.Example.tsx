import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle
} from '../../../../index';

export class DocumentCardBasicExample extends React.Component<any, any> {
  public render() {
    return (
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardPreview
            previewImageSrc='dist/document-preview.png'
            iconSrc='dist/icon-ppt.png'
            accentColor='#ce4b1f'/>
          <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx'/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' }
              ]
            }
          />
        </DocumentCard>
    );
  }

}
