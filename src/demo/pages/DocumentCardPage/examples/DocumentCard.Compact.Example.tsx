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
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ],
    };

    return (
        <DocumentCard type={ DocumentCardType.compact } onClickHref='http://bing.com'>
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardTitle
            title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx +2'
            shouldTruncate={ true }/>
          <DocumentCardActivity
            activity='Created a few minutes ago'
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
