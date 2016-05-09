import * as React from 'react';
import { IDocumentCardEntityProps } from './DocumentCard.Props';
import './DocumentCardEntity.scss';
import { css } from '../../utilities/css';

export default class DocumentCardEntity extends React.Component<IDocumentCardEntityProps, any> {
  public render() {
    let { imagePath, details } = this.props;

    return (
      <div className='ms-DocumentCard-entity'>
        <img className='ms-DocumentCard-entity-image' src={ imagePath }/>
        <div className='ms-DocumentCard-entity-details'>
          { details.map((detail, index) => (
            <span key={ index } className={
              css(
                'ms-DocumentCard-entity-detail',
                { 'ms-DocumentCard-entity-detail--bold' : detail.isBold }
              )
            }>{ detail.text }</span>
          )) }
        </div>
      </div>
    );
  }
}
