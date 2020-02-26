import * as React from 'react';
import { Avatar, AvatarProps, StatusProps, ShorthandRenderer } from '../../../react/src';
// import { Presence, PresenceSource } from '@msteams/components-presence'
import { defaultGroupImageSvg, defaultImageSvg, defaultEmergencyImageSvg } from './default-images';
import { ProfilePictureType } from './avatar.interface';

export interface IAvatarRendererProps extends Partial<AvatarProps> {
  alt?: string;

  /** Defines the element the component should render as (e.g. as="div") */
  as?: string;

  /** Url of the retrieved profile picture */
  url: string;

  /** UserId of the user provided to show presence for (if presence is needed - e.g. for 1:1 chat)  */
  presenceUserId?: string;

  /** The type of the profile, used to determine the correct styling */
  type: ProfilePictureType;

  /** is Sfb or federated interop */
  isInteropChat?: boolean;

  /** Accessibility role */
  role?: string;

  /** true when e911 call show emergency avatar */
  isEmergencyCallTarget?: boolean;
  /** If rendered for calling screen, allow event propagation for context menu */
  shouldAllowContextMenu?: boolean;

  /** True if avatar is focusable */
  isFocusable?: boolean;
}

const AvatarRenderer: React.FunctionComponent<IAvatarRendererProps> = ({
  alt,
  url,
  presenceUserId,
  type,
  isInteropChat,
  isEmergencyCallTarget,
  shouldAllowContextMenu,
  isFocusable,
  ...rest
}) => {
  const props = {
    image: {
      alt,
      src: url,
      onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src =
          type === ProfilePictureType.User ? (isEmergencyCallTarget ? defaultEmergencyImageSvg : defaultImageSvg) : defaultGroupImageSvg; // Teams and Group default images are the same

        // Don't prevent bubbling the error in case it needs to be caught by telemetry handlers
        return false;
      },
      onContextMenu: (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (!shouldAllowContextMenu) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    status: presenceUserId
      ? (render: ShorthandRenderer<StatusProps>) =>
          render(undefined, (ProvidedStatus: React.ReactType, providedProps: StatusProps) => <div />)
      : undefined,
    ...rest
  };

  const variables = {
    ...(type === ProfilePictureType.Team && { isTeamProfilePicture: true }),
    ...(isFocusable && {
      hasCursorPointer: true
    })
  };

  return <Avatar {...props} variables={{ ...props.variables, ...variables }} />;
};

AvatarRenderer.displayName = 'AvatarRenderer';
export default AvatarRenderer;
