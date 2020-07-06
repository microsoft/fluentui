import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SpeakerPersonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M12.656,17.672a.882.882,0,0,1,.891-.875h4.914c.617,0,.883.469.883,1.023,0,1.742-1.93,2.25-3.344,2.25C14.422,20.07,12.656,19.547,12.656,17.672Zm1.235-3.695A2.11,2.11,0,1,1,16,16.031,2.082,2.082,0,0,1,13.891,13.977ZM8,16a8,8,0,1,1,8,8A8,8,0,0,1,8,16Zm.914,0A7.086,7.086,0,1,0,16,8.914,7.1,7.1,0,0,0,8.914,16Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,3.93a2.051,2.051,0,1,1-2.109,2.047A2.082,2.082,0,0,1,16,11.93Zm3.344,5.89c0,1.742-1.93,2.25-3.344,2.25-1.586,0-3.344-.523-3.344-2.406a.875.875,0,0,1,.891-.867h4.906C19.078,16.8,19.344,17.258,19.344,17.82Z"
      />
    </svg>
  ),
  displayName: 'SpeakerPersonIcon',
});
