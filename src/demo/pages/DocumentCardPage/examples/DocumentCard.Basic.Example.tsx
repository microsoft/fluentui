import * as React from 'react';
import {
  DocumentCard
} from '../../../../components/index';
import DocumentCardEntity from '../../../../components/DocumentCard/DocumentCardEntity';
import DocumentCardPreview from '../../../../components/DocumentCard/DocumentCardPreview';
import DocumentCardTitle from '../../../../components/DocumentCard/DocumentCardTitle';

export default class DocumentCardBasicExample extends React.Component<any, any> {
  public render() {
    return (
        <DocumentCard onClickURL='http://bing.com' width={ 236 }>
          <DocumentCardPreview
            previewImagePath='src/demo/pages/DocumentCardPage/images/document-preview.png'
            iconPath='src/demo/pages/DocumentCardPage/images/icon-ppt.png'
            accentColor='#ce4b1f'/>
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
        </DocumentCard>
    );
  }

}
