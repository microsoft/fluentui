/// <amd-dependency path="../TeachingDialog.scss" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from '../../Utilities';
import './TeachingDialog.scss';
import * as stylesImport from './TeachingDialog.scss';
const styles: any = stylesImport;

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
    return <div className={ css('ms-TeachingDialog-content', styles.content) } >
      <div className={ css('ms-TeachingDialog-header', styles.header) } >
        <img
          className={ css('ms-TeachingDialog-header-image', styles.headerImg) }
          src={ this.props.image }
        />
      </div>
      <div className={ css('ms-TeachingDialog-contentbody', styles.contentBody) } >
        <div className={ css('ms-TeachingDialog-contenttile', styles.contentTitle) } >
          { this.props.title }
        </div>
        <div className={ css('ms-TeachingDialog-contenttext', styles.contentText) } >
          { this.props.textContent }
        </div>
      </div>
    </div> as React.ReactElement<{}>;
  }
}

export default TeachingDialogContent;