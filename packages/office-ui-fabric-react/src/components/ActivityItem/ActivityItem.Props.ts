import * as React from 'react';
import { IImageProps } from '../Image/Image.Props';
import { IStyle } from '../../Styling';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

// Please keep alphabetized
export interface IActivityItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates what type of activity occurred. A type of custom allows you to pass in your own renderer.
   */
  activityType: ActivityType;

  /**
   * An array of personas of people that are involved in this activity, only imageUrl and primaryText properties are used. At least one person is required.
   */
  people: Array<IPersonaProps>;

  /**
   * Text shown if the activity type is a comment or a mention.
   */
  commentString?: string;

  /**
   * Used to describe what occured if the activity involved a file or folder.
   */
  fileActivity?: IFileActivity;

  /**
   * The name of the user mentioned. If used with ActivityType set to Mention and a commentString, the mentioned user's name will be highlighted in the commentString.
   */
  mentionedName?: string;

  /**
   * If this is included and the mentionedName is shown, the mentionedName will be a link to this URL.
   */
  mentionedHref?: string;

  /**
   * The name of the user a file was shared with.
   */
  sharedWithName?: string;

  /**
   * The URL that sharedWithName should point to if it is shown.
   */
  sharedWithHref?: string;

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
   * Styles applied to the main container of the activity's description.
   */
  activityContent?: IStyle;

  /**
   * Styles applied to the persona of the user that did this activity.
   */
  activityPersona?: IStyle;

  /**
   * Styles applied to the icon indicating the type of the activity. Only shown when personas are unavailable.
   */
  activityTypeIcon?: IStyle;

  /**
   * Styles applied to the text of comments.
   */
  commentText?: IStyle;

  /**
   * Styles applied to personas when two users are involved in a single activity.
   */
  doublePersona?: IStyle;

  /**
   * Styles applied to documents, folders, and usernames that are hyperlinks or have other on click actions.
   */
  docLink?: IStyle;

  /**
   * Styles applied to the names mentioned in the activity item.
   */
  nameText?: IStyle;

  /**
   * Styles applied to the container of the persona image or activity type icon.
   */
  personaContainer?: IStyle;

  /**
   * Styles applied to the timestamp at the end of each activity item.
   */
  timeStamp?: IStyle;
}

export enum ActivityType {
  Message,
  CommentInDocument,
  Mention,
  Edit,
  Move,
  Rename,
  Share,
  Add,
  Delete,
  Restore,
  Version
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
   * New name of a renamed file.
   */
  newFileName?: string;

  /**
   * If shown, newFileName will be displayed as a link to this URL.
   */
  newFileHref?: string;

  /**
   * The name of the folder a file was moved from.
   */
  sourceFolderName?: string;

  /**
   * If this and sourceFolderName included, the sourceFolderName property will be displayed as a link to this address.
   */
  sourceFolderHref?: string;

  /**
   * The name of the folder a file was moved from, or renamed inside of.
   */
  destinationFolderName?: string;

  /**
   * If this and destinationFolderName are included, destinationFolderName will be displayed as a link to this address.
   */
  destinationFolderHref?: string;
}