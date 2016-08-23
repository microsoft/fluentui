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
      previewImages: [
        {
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
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
          <DocumentCardTitle title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx +2'
          shouldTruncate={ true }/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: 'images/persona-female.png' },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: 'images/persona-female.png' }
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
