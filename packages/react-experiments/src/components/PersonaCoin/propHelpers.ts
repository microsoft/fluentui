import type { IPersonaCoinViewProps } from './PersonaCoin.types';

export function hideInitialsWhenImageIsLoaded(props: IPersonaCoinViewProps): boolean {
  // When the picture is loaded we can remove the initials from the dom.
  // We should leave them in the dom however when the image fade in option is used
  // so we do not remove the initials while the image is fading in.
  return Boolean(props.isPictureLoaded) && !props.imageShouldFadeIn;
}
