import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SettingsAudioIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16.49,10a.5.5,0,0,1,.5.5V18h1.5a.5.5,0,0,1,0,1h-4a.5.5,0,0,1,0-1H16V10.5A.51.51,0,0,1,16.49,10ZM12,21.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V15h1Zm5,0a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V20h1ZM11.49,10a.5.5,0,0,1,.5.5V13h1.5a.5.5,0,1,1,0,1h-4a.5.5,0,0,1,0-1H11V10.5A.51.51,0,0,1,11.49,10ZM22,21.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V17h1ZM21.49,10a.5.5,0,0,1,.5.5V15h1.5a.5.5,0,0,1,0,1h-4a.5.5,0,1,1,0-1H21V10.5A.51.51,0,0,1,21.49,10Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16,10a1,1,0,0,1,1,1v6h.54c.73,0,1.46.11,1.46,1a1,1,0,0,1-1,1H14a1,1,0,0,1-1-1c0-1.15,1.2-1,2-1V11A1,1,0,0,1,16,10ZM12,22a1,1,0,0,1-2,0V16h2Zm5,0a1,1,0,0,1-2,0V21h2ZM11,10c1.15,0,1,1.2,1,2h.54c.73,0,1.46.11,1.46,1a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1c0-1.15,1.2-1,2-1,0-.18,0-.36,0-.54C10,10.73,10.1,10,11,10ZM22,22a1,1,0,0,1-2,0V17h2ZM21,10a1,1,0,0,1,1,1v2h.54c.73,0,1.46.11,1.46,1a1,1,0,0,1-1,1H19a1,1,0,0,1-1-1c0-1.15,1.2-1,2-1V11A1,1,0,0,1,21,10Z"
      />
    </svg>
  ),
  displayName: 'SettingsAudioIcon',
});
