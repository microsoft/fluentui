import * as React from 'react';
import {
  DocumentCard
} from '../../../../components/index';
import DocumentCardActions from '../../../../components/DocumentCard/DocumentCardActions';
import DocumentCardEntity from '../../../../components/DocumentCard/DocumentCardEntity';
import DocumentCardLocation from '../../../../components/DocumentCard/DocumentCardLocation';
import DocumentCardPreview from '../../../../components/DocumentCard/DocumentCardPreview';
import DocumentCardTitle from '../../../../components/DocumentCard/DocumentCardTitle';

export default class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    return (
        <DocumentCard
          onClickFunction={ function() { console.log('You clicked the card.'); } }
          width={ 236 }
        >
          <DocumentCardPreview
            previewImagePath='src/demo/pages/DocumentCardPage/images/document-preview.png'
            iconPath='src/demo/pages/DocumentCardPage/images/icon-ppt.png'
            accentColor='#ce4b1f'/>
          <DocumentCardLocation location='Marketing Documents' locationURL='http://microsoft.com'/>
          <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02'/>
          <DocumentCardEntity
            imagePath='src/demo/pages/DocumentCardPage/images/avatar-kat.png'
            details={
              [
                { text: 'Kat Larrson', isBold: true },
                { text: 'Created Feb 23, 2016' }
              ]
            }
          />
          <DocumentCardActions
            actions={
              [
                { icon: 'share', onClickFunction:
                  function(ev: any) {
                    console.log('You clicked the share action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                },
                { icon: 'pinLeft', onClickFunction:
                  function(ev: any) {
                    console.log('You clicked the pin action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  }
                },
                { icon: 'bell', onClickFunction:
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
