import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TiltPanZoomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16,15.859l3.453-2.078L16,11.7l-3.461,2.078Zm3.828-1.421-3.43,2.07V20.3l3.43-2.07Zm-7.664,0v3.789l3.43,2.07V16.508ZM16.023,8A.5.5,0,0,0,16,9a10.615,10.615,0,0,1,1.414.141,7,7,0,1,1-6.555,2.109v1.633a.5.5,0,0,0,1,0v-2.86a.5.5,0,0,0-.5-.5H8.5a.5.5,0,0,0,0,1h1.672A8,8,0,1,0,16.023,8Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16,15.859l3.453-2.078L16,11.7l-3.461,2.078Zm3.828-1.421-3.43,2.07V20.3l3.43-2.07ZM15.594,20.3V16.508l-3.43-2.07v3.789ZM16,8a.762.762,0,1,0,0,1.523,6.492,6.492,0,1,1-5.141,2.547v.547a.762.762,0,1,0,1.524,0V10.289a.767.767,0,0,0-.766-.766.576.576,0,0,0-.117.008.576.576,0,0,0-.117-.008H8.766A.767.767,0,0,0,8,10.289c0,.938,1.117.758,1.719.758A8,8,0,1,0,16,8Z"
      />
    </svg>
  ),
  displayName: 'TiltPanZoomIcon',
});
