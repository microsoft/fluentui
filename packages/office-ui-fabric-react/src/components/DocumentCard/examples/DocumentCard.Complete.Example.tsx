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

export class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: '2016 Conference Presentation',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview2.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview3.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Contoso Marketing Presentation',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Notes from Ignite conference',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview2.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'FY17 Cost Projections',
          url: 'http://bing.com',
          previewImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview3.png',
          iconSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
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
              { name: 'Annie Lindqvist', profileImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png' },
              { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
              { name: 'Greta Lundberg', profileImageSrc: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png' }
            ]
          }
        />
        <DocumentCardActions
          actions={
            [
              {
                icon: 'Share',
                onClick: (ev: any) => {
                  console.log('You clicked the share action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'share action'
              },
              {
                icon: 'Pin',
                onClick: (ev: any) => {
                  console.log('You clicked the pin action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'pin action'
              },
              {
                icon: 'Ringer',
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
