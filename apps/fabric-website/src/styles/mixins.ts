import { IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import {
  contentPaddingSmall,
  contentPaddingLg,
  contentPaddingXl,
  contentPaddingBottom,
  queryUhfMobileMin,
  queryXLargeMin
} from './constants';

export function fullWidth(): IRawStyle {
  // Use negative margins to reach edge of a container that uses contentPadding()
  return {
    marginLeft: -contentPaddingSmall,
    marginRight: -contentPaddingSmall,
    selectors: {
      [queryUhfMobileMin]: {
        marginLeft: -contentPaddingLg,
        marginRight: -contentPaddingLg
      },
      [queryXLargeMin]: {
        marginLeft: -contentPaddingXl,
        marginRight: -contentPaddingXl
      }
    }
  };
}

export function fullHeight(): IRawStyle {
  // Use negative margin to remove the bottom padding from the app's content area
  return { marginBottom: -contentPaddingBottom };
}

export function contentPadding(paddingTop: string = '0', paddingBottom: string = `${contentPaddingBottom}px`): IRawStyle {
  // Apply content padding, based on device size
  return {
    padding: `${paddingTop} ${contentPaddingSmall} ${paddingBottom}`,
    selectors: {
      [queryUhfMobileMin]: {
        padding: `${paddingTop} ${contentPaddingLg} ${paddingBottom}`
      },
      [queryXLargeMin]: {
        padding: `${paddingTop} ${contentPaddingXl} ${paddingBottom}`
      }
    }
  };
}
