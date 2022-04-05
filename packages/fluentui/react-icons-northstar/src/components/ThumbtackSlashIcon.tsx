import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ThumbtackSlashIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      style={{ overflow: 'visible' }}
      role="presentation"
      focusable="false"
      viewBox="2 2 16 16"
      className={classes.svg}
    >
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M3.58 8.718L6.903 7.61 2.146 2.854a.5.5 0 11.708-.708L8.746 8.04l3.218 3.218 5.89 5.89a.5.5 0 01-.708.707l-4.754-4.755-1.108 3.323a.5.5 0 01-.828.195l-3.182-3.182-3.567 3.567L3.705 17h-.703v-.703L3 16.295l3.567-3.567-3.182-3.182a.5.5 0 01.196-.828zm8.021 3.59L7.694 8.401l-3.03 1.01 5.927 5.927 1.01-3.03zM12.697 10.538l-.026.012.755.755 4.195-1.907a1.5 1.5 0 00.44-2.426l-5.03-5.03a1.5 1.5 0 00-2.426.44L8.7 6.577l.755.755.012-.027 2.05-4.51a.5.5 0 01.808-.146l5.03 5.03a.5.5 0 01-.146.809l-4.511 2.05z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M3.58 8.718L6.904 7.61 2.146 2.854a.5.5 0 11.708-.708l15 15a.5.5 0 01-.708.708l-4.754-4.755-1.108 3.323a.5.5 0 01-.828.195l-3.182-3.182-3.567 3.567L3.705 17h-.703v-.703L3 16.295l3.567-3.567-3.182-3.182a.5.5 0 01.196-.828zM17.621 9.398l-4.195 1.907-4.727-4.728 1.906-4.195a1.5 1.5 0 012.426-.44l5.03 5.03a1.5 1.5 0 01-.44 2.426z" />
      </g>
    </svg>
  ),
  displayName: 'ThumbtackSlashIcon',
});
