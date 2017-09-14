import { DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity, IDocumentCardPreviewProps } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class DocumentCardVPage extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: 'DocumentCard',
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          width: 318,
          height: 196
        }
      ],
    };
    return (
      <div >
        <DocumentCard className='DocumentCard'>
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardTitle
            title='Document Card'
            shouldTruncate={ true }
          />
          <DocumentCardActivity
            activity='Created a few minutes ago'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: 'images/persona-female.png' }
              ]
            }
          />
        </DocumentCard>
      </div>
    );
  }
}