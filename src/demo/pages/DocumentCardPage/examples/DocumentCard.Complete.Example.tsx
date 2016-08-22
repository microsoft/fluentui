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
