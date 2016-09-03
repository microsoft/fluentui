import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType,
  ImageFit
} from '../../../../index';

export class DocumentCardCompactExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          width: 144,
          height: 106
        }
      ],
    };

    return (
        <DocumentCard type={ DocumentCardType.compact } onClickHref='http://bing.com' accentColor='#ce4b1f'>
          <DocumentCardPreview { ...previewProps } />
          <div className='ms-DocumentCard-details'>
            <DocumentCardTitle
              title='Revenue stream proposal fiscal year 2016 version02.pptx'
              shouldTruncate={ true }/>
            <DocumentCardActivity
              activity='Created a few minutes ago'
              people={
                [
                  { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' }
                ]
              }
            />
          </div>
        </DocumentCard>
    );
  }

}
