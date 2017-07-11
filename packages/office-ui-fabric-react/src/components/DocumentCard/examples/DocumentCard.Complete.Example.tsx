import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '../../../common/TestImages';

export class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: '2016 Conference Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Contoso Marketing Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Notes from Ignite conference',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'FY17 Cost Projections',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ],

    };

    return (
      <DocumentCard
        onClick={ () => { console.log('You clicked the card.'); } }
      >
        <DocumentCardPreview { ...previewProps } />
        <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents' />
        <DocumentCardTitle title='6 files were uploaded' />
        <DocumentCardActivity
          activity='Created Feb 23, 2016'
          people={
            [
              { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
              { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
              { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
            ]
          }
        />
        <DocumentCardActions
          actions={
            [
              {
                iconProps: { iconName: 'Share' },
                onClick: (ev: any) => {
                  console.log('You clicked the share action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'share action'
              },
              {
                iconProps: { iconName: 'Pin' },
                onClick: (ev: any) => {
                  console.log('You clicked the pin action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'pin action'
              },
              {
                iconProps: { iconName: 'Ringer' },
                onClick: (ev: any) => {
                  console.log('You clicked the ringer action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'ringer action'
              },
            ]
          }
          views={ 432 }
        />
      </DocumentCard>
    );
  }

}
