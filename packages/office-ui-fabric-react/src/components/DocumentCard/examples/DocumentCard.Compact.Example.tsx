import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
import { TestImages } from '../../../common/TestImages';

export class DocumentCardCompactExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          width: 144
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          width: 144
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          width: 144
        },
        {
          name: 'Contoso Marketing Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          width: 144
        },
      ],
    };

    return (
      <div>
        <DocumentCard type={ DocumentCardType.compact } onClickHref='http://bing.com'>
          <DocumentCardPreview { ...previewProps } />
          <div className='ms-DocumentCard-details'>
            <DocumentCardTitle
              title='4 files were uploaded'
              shouldTruncate={ true } />
            <DocumentCardActivity
              activity='Created a few minutes ago'
              people={
                [
                  { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale }
                ]
              }
            />
          </div>
        </DocumentCard>
        <p />
        <DocumentCard type={ DocumentCardType.compact } onClickHref='http://bing.com'>
          <DocumentCardPreview previewImages={ [previewProps.previewImages[0]] } />
          <div className='ms-DocumentCard-details'>
            <DocumentCardTitle
              title='Revenue stream proposal fiscal year 2016 version02.pptx'
              shouldTruncate={ true } />
            <DocumentCardActivity
              activity='Created a few minutes ago'
              people={
                [
                  { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale }
                ]
              }
            />
          </div>
        </DocumentCard>
      </div>
    );
  }

}
