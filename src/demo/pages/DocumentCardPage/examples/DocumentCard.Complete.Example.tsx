import * as React from 'react';
import {
  DocumentCard,
  IDocumentCardPreviewProps,
  ImageFit
} from '../../../../index';

import { DocumentCardActions } from '../../../../components/DocumentCard/DocumentCardActions';
import { DocumentCardActivity } from '../../../../components/DocumentCard/DocumentCardActivity';
import { DocumentCardLocation } from '../../../../components/DocumentCard/DocumentCardLocation';
import { DocumentCardPreview } from '../../../../components/DocumentCard/DocumentCardPreview';
import { DocumentCardTitle } from '../../../../components/DocumentCard/DocumentCardTitle';

export class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    let previewProps: IDocumentCardPreviewProps = {
      overflowDocumentCountFormatText: '+{0} more',
      previewImages: [
        {
          name: '2016 Conference Presentation',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Contoso Marketing Presentation',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'Notes from Ignite conference',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          name: 'FY17 Cost Projections',
          url: 'http://bing.com',
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
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
          <DocumentCardPreview { ...previewProps }/>
          <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents'/>
          <DocumentCardTitle title='6 files were uploaded'/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
              ]
            }
          />
          <DocumentCardActions
          actions={
            [
              {
                icon: 'share',
                onClick: (ev: any) => {
                  console.log('You clicked the share action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'share action'
              },
              {
                icon: 'pinLeft',
                onClick: (ev: any) => {
                  console.log('You clicked the pin action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'pin left action'
              },
              {
                icon: 'bell',
                onClick: (ev: any) => {
                  console.log('You clicked the bell action.');
                  ev.preventDefault();
                  ev.stopPropagation();
                },
                ariaLabel: 'bell action'
              },
            ]
          }
            views={ 432 }
          />
        </DocumentCard>
    );
  }

}
