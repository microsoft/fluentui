import * as React from 'react';
import {
  DocumentCard
} from '../../../../index';
import DocumentCardActions from '../../../../components/DocumentCard/DocumentCardActions';
import DocumentCardActivity from '../../../../components/DocumentCard/DocumentCardActivity';
import DocumentCardLocation from '../../../../components/DocumentCard/DocumentCardLocation';
import DocumentCardPreview from '../../../../components/DocumentCard/DocumentCardPreview';
import DocumentCardTitle from '../../../../components/DocumentCard/DocumentCardTitle';

export default class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    return (
        <DocumentCard
          onClick={ function() { console.log('You clicked the card.'); } }
        >
          <DocumentCardPreview
            previewImageSrc='dist/document-preview.png'
            iconSrc='dist/icon-ppt.png'
            accentColor='#ce4b1f'/>
          <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com'/>
          <DocumentCardTitle title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx'
          shouldTruncate={ true }/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: 'dist/avatar-josh.png' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
              ]
            }
          />
          <DocumentCardActions
            actions={
              [
                { icon: 'share', onClick:
                  function(ev: any) {
                    console.log('You clicked the share action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                },
                { icon: 'pinLeft', onClick:
                  function(ev: any) {
                    console.log('You clicked the pin action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                },
                { icon: 'bell', onClick:
                  function(ev: any) {
                    console.log('You clicked the bell action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                },
              ]
            }
            views={ 432 }
          />
        </DocumentCard>
    );
  }

}
