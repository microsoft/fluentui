import * as React from 'react';
import { IImageProps } from '../Image/Image.Props';
import { IStyle } from '../../Styling';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

// Please keep alphabetized
export interface IActivityItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates what type of activity occurred. A type of custom allows you to pass in your own renderer.
   */
  activityType: IActivityType;

  /**
   * An array of personas of people that are involved in this activity, only imageUrl and primaryText properties are used. At least one person is required.
   */
  people: Array<IPersonaProps>;

  /**
   * Text shown if the activity type is a comment or a mention.
   */
  commentString?: string | null;

  /**
   * Used to describe what occured if the activity involved a file or folder.
   */
  fileActivity?: IFileActivity;

  /**
   * Optional styling for the elements within the Activity Item.
   */
  styles?: IActivityItemStyles;

  /**
   * Text shown as a timestamp on this activity. If not included, no timestamp is shown.
   */
  timeString?: string;
}

export interface IActivityItemStyles {
  /**
   * Styles applied to the root activity item container.
   */
  root?: IStyle;

  /**
   * Styles applied to the container of the persona image or activity type icon.
   */
  personaContainer?: IStyle;

  /**
   * Styles applied to the main container of the activity's description.
   */
  activityContent?: IStyle;

  /**
   * Styles applied to the text of comments.
   */
  commentText?: IStyle;

  /**
   * Styles applied to the names mentioned in the activity item.
   */
  nameText?: IStyle;

  /**
   * Styles applied to the timestamp at the end of each activity item.
   */
  timeStamp?: IStyle;
}

export enum IActivityType {
  commented,
  mentioned,
  edited,
  moved,
  renamed,
  shared,
  added,
  deleted,
  restored,
  versioned,
  custom
}

export interface IFileActivity {
  /**
   * Name of the file that was acted on.
   */
  fileName?: string;

  /**
   * If this is included, the fileName prop will be displayed as a link to this address.
   */
  fileHref?: string;

  /**
   * If a Fabric icon name or the url of an icon image is included, the fileName prop will be displayed next to this icon.
   */
  fileIcon?: any;

  /**
   * Name of the folder a file was moved from.
   */
  sourceFolderName?: string;

  /**
   * If this is included, the sourceFolderName property will be displayed as a link to this address.
   */
  sourceFolderHref?: string;

  /**
   * Name of the folder a file was moved from, or renamed inside of.
   */
  destinationFolderName?: string;

  /**
   * If this is included, the fileName destinationFolderName will be displayed as a link to this address.
   */
  destinationFolderHref?: string;
}