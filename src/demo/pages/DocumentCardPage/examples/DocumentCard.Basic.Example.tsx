import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  ImageFit
} from '../../../../index';

export class DocumentCardBasicExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      previewImageSrc: 'dist/document-preview.png',
      imageFit: ImageFit.none,
      width: 318,
      height: 196,
      iconSrc: 'dist/icon-ppt.png',
      accentColor: '#ce4b1f'
    };

    return (
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardPreview { ...previewProps } />
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
