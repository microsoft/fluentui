import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SurveyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M15.85,8.13l.07.06,2,1.86a.49.49,0,0,1,.1.6l-.05.08-1.74,2.14a.5.5,0,0,1-.7.07.51.51,0,0,1-.13-.63l0-.07,1-1.24H16a6,6,0,1,0,6,6,.5.5,0,0,1,1,0,7,7,0,1,1-7.24-7h.64L15.24,8.92a.5.5,0,0,1-.08-.64l.05-.07A.5.5,0,0,1,15.85,8.13Zm6,3.47a.5.5,0,0,1,.14.63l0,.07-5,6.5a.51.51,0,0,1-.68.12l-.07-.07-3-3a.48.48,0,0,1,0-.7.48.48,0,0,1,.63-.06l.07.06,2.6,2.59,4.65-6A.51.51,0,0,1,21.8,11.6Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M15.85,8.13l.07.06,2,1.86a.49.49,0,0,1,.1.6l-.05.08-1.74,2.14a.5.5,0,0,1-.7.07.51.51,0,0,1-.13-.63l0-.07,1-1.24H16a6,6,0,1,0,6,6,.5.5,0,0,1,1,0,7,7,0,1,1-7.24-7h.64L15.24,8.92a.5.5,0,0,1-.08-.64l.05-.07A.5.5,0,0,1,15.85,8.13Zm6.26,3.08a1,1,0,0,1,.25,1.3l-.07.1-5,6.5a1,1,0,0,1-1.41.18l-.09-.08-3-3a1,1,0,0,1,0-1.42,1,1,0,0,1,1.32-.08l.1.08L16.4,17l4.31-5.6A1,1,0,0,1,22.11,11.21Z"
      />
    </svg>
  ),
  displayName: 'SurveyIcon',
});
