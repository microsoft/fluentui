import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

export class DocumentCardBasicExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ],
    };

    return (
      <DocumentCard onClickHref='http://bing.com'>
        <DocumentCardPreview { ...previewProps } />
        <DocumentCardTitle
          title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx'
          shouldTruncate={ true } />
        <DocumentCardActivity
          activity='Created a few minutes ago'
          people={
            [
              { name: 'Annie Lindqvist', profileImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png' }
            ]
          }
        />
      </DocumentCard>
    );
  }

}
