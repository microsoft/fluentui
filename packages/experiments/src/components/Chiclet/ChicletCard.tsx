import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { IChicletCardProps } from './Chiclet.types';

export class ChicletCard extends BaseComponent<IChicletCardProps, any> {
  public render() {
    const { title, description, image, imageType, url } = this.props;

    return (
      <div> // style these
        { title ? (<div>{ title }</div>) : (null) }
        { image ? (<div>{ image }</div>) : (null) }
        { imageType ? (<div>{ imageType }</div>) : (null) }
        { url ? (<div>{ url }</div>) : (null) }
        { description ? (<div>{ description }</div>) : (null) }
        ...
    </div >
    );
  }

}