/// <amd-dependency path="../TeachingDialog.scss" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from '../../Utilities';
import './TeachingDialog.scss';
import { IImageProps } from '../Image/Image.Props';
import { Image, ImageFit } from '../../Image';
export interface ITeachingDialogContentProps {

  /**
  * Optional callback to access the ISlider interface. Use this instead of ref for accessing
  * the public methods and properties of the component.
  */
  componentRef?: (component: TeachingDialogContent) => void;

  /**
   * The page title inside the dialog.
   */
  title: string;

  /**
   * The page text content.
   */
  textContent: string;

  /**
   * The string for the image displayed on the page
   */
  image: string;
}

/**
 * Represents the TeachingDialogContent react component
 */
export class TeachingDialogContent extends BaseComponent<ITeachingDialogContentProps, {}> {

  // Specify default props values
  public static defaultProps = {
    title: '',
    textContent: '',
    image: ''
  };

  /**
   * TeachingDialogContent constructor
   */
  constructor(props: ITeachingDialogContentProps) {
    super(props);
  }

  /**
   * Invoked when the component is rendered
   */
  public render(): React.ReactElement<{}> {
    return <div className='ms-TeachingDialogContent'>
      <div className='ms-TeachingDialogContent-imageArea'>
        <Image className='ms-TeachingDialogContent-image' src={ this.props.image } />
      </div>
      <div className='ms-TeachingDialogContent-desc'>
        <div className='ms-TeachingDialogContent-descTitle'>
          <p>{ this.props.title }</p>
        </div>
        <div className='ms-TeachingDialogContent-descText'>
          <p>{ this.props.textContent }</p>
        </div>
      </div>
    </div> as React.ReactElement<{}>;
  }
}

export default TeachingDialogContent;