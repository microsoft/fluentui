// import { I18n } from "@msteams/components-i18n";

/**
 * Subset of User object that this component expects as input
 */
export interface IUserFields {
  id: string;
  displayName: string | null; // !!! StrictNullCheck Violation
}

/**
 * Subset of team object which includes required fields for generating a profile picture
 */
export interface ITeamFields {
  pictureETag?: string | null; // CSA sometimes responds with a null pictureETag
  groupId: string;
  displayName: string;
}

/**
 * Different types of profile pictures
 */
export enum ProfilePictureType {
  User,
  Group,
  Team
}

/**
 * This Enum matches size requirements from MT.
 * It is used to specify the size of the image requested.
 */
export enum ProfilePictureSize {
  Large = 'HR196x196',
  Medium = 'HR96x96',
  Small = 'HR64x64',
  XMedium = 'HR120x120',
  XSmall = 'HR32x32'
}

export const botDefaultIconUrl = 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png';

/**
 * A generator has functions that can be called with an entity (User, User list, or Team)
 * and appropriately generate the profile picture url, alt text, or other fields
 */
export interface IAvatarUrlGenerator<T> {
  profilePictureType: ProfilePictureType;
  generateUrl(entity: T, baseImageUrl: string, profilePictureSize?: ProfilePictureSize, isEmergencyCall?: boolean): string;
  generateAltText(entity: T, i18n: I18n): string | undefined;
  getPresenceUserId(entity: T): string | undefined;
}
