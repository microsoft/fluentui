import * as React from 'react';
import { IStyle } from '../../Styling';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

// Please keep alphabetized
export interface IActivityItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates what type of activity occurred.
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
   * If this is included and the mentionedName is shown, the mentionedName will use this behavior when clicked.
   */
  onMentionedClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;

  /**
   * A renderer that adds a list of names that executed this activity. If not included, up to two names will be listed and any further names will only be referred to by the number of names.
   */
  onRenderNameList?: (props?: IActivityItemProps) => JSX.Element;

  /**
   * A renderer that adds a comment. If not included, the commentString is displayed as plain text.
   */
  onRenderComment?: (props?: IActivityItemProps) => JSX.Element;

  /**
   * A renderer that adds an element describing what activity took place. If not included, text determined by activityType and fileActivity will be used instead.
   */
  onRenderDescription?: (props?: IActivityItemProps) => JSX.Element;

  /**
   * A renderer that adds an icon to the left of the item. If not included, the icon will be a persona based on the contents of people or an icon based on fileActivity.
   */
  onRenderIcon?: (props?: IActivityItemProps) => JSX.Element;

  /**
   * A renderer adds a time stamp. If not included, timeString is shown as plain text below the activity.
   */
  onRenderTimeStamp?: (props?: IActivityItemProps) => JSX.Element;

  /**
   * The name of the user mentioned. If used with the Mention ActivityType and a commentString, the mentioned user's name will be highlighted in the commentString.
   */
  mentionedName?: string;

  /**
   * The name of the user a file was shared with.
   */
  sharedWithName?: string;

  /**
   * A handler for what should happen when sharedWithName is clicked.
   */
  onSharedWithClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;

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
  /**
   * Created a file or added some other element.
   */
  Add,
  /**
   * Added a comment inside a document, comment text may not be available.
   */
  CommentInDocument,
  /**
   * Deleted or moved a file to the recycle bin.
   */
  Delete,
  /**
   * Edited a file.
   */
  Edit,
  /**
   * Added a comment or sent a message.
   */
  Message,
  /**
   * Made a comment that referred to someone with an @mention.
   */
  Mention,
  /**
   * Moved a file from one location to another.
   */
  Move,
  /**
   * Renamed a file.
   */
  Rename,
  /**
   * Restored a file from the recycle bin or to a previous version.
   */
  Restore,
  /**
   * Shared a file with another user.
   */
  Share,
  /**
   * Changed the version of a file.
   */
  Version
}

export interface IFileActivity {
  /**
   * The name of the folder a file was moved from, or renamed inside of.
   */
  destinationFolderName?: string;

  /**
   * If this and destinationFolderName are included, destinationFolderName will use this behavior when clicked.
   */
  onDestinationFolderClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;

  /**
   * Name of the file that was acted on.
   */
  fileName?: string;

  /**
   * If this is included, fileName will use this behavior when clicked
   */
  onFileClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;

  /**
   * New name of a renamed file.
   */
  newFileName?: string;

  /**
   * If this and newFileName are included, newFileName will use this behavior when clicked.
   */
  onNewFileClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;

  /**
   * The name of the folder a file was moved from.
   */
  sourceFolderName?: string;

  /**
   * If this and sourceFolderName included, sourceFolderName wil use this behavior when clicked.
   */
  onSourceFolderClick?: (ev?: React.MouseEvent<HTMLElement>, props?: IActivityItemProps) => void;
}