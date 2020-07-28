import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ApprovalsAppbarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M17.015,8.063l.057.044,1.6,1.488a.4.4,0,0,1,.081.481l-.043.064-1.39,1.712a.4.4,0,0,1-.662-.444l.041-.06.768-.948H16a6.4,6.4,0,1,0,6.4,6.4.4.4,0,1,1,.8,0,7.2,7.2,0,1,1-7.412-7.2L16,9.6h1.5l-.974-.907a.4.4,0,0,1-.065-.508l.044-.057A.4.4,0,0,1,17.015,8.063Z" />
        <path d="M22.935,9.677a.4.4,0,0,1,.126.5l-.037.062-6.4,8.8a.4.4,0,0,1-.568.082L16,19.066l-3.2-3.6a.4.4,0,0,1,.545-.581l.053.049,2.869,3.228,6.109-8.4A.4.4,0,0,1,22.935,9.677Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M22.85,16.4a.4.4,0,0,0-.4.4,6.4,6.4,0,1,1-6.4-6.4h1.467l-.768.948-.041.06a.4.4,0,0,0,.662.444l1.39-1.712.043-.064a.4.4,0,0,0-.081-.481l-1.6-1.488-.057-.044a.4.4,0,0,0-.508.065l-.044.057a.4.4,0,0,0,.065.508l.974.907h-1.5l-.212,0a7.2,7.2,0,1,0,7.412,7.2A.4.4,0,0,0,22.85,16.4Z" />
        <path d="M23.465,8.869a1.3,1.3,0,0,0-1.816.287L16.2,16.649l-2.15-2.417-.092-.089a1.3,1.3,0,0,0-2.155.9,1.287,1.287,0,0,0,.327.939l3.219,3.621.1.094a1.3,1.3,0,0,0,.856.322,1.394,1.394,0,0,0,.145-.008,1.3,1.3,0,0,0,.906-.528l6.419-8.826.069-.111A1.3,1.3,0,0,0,23.465,8.869Z" />
      </g>
    </svg>
  ),
  displayName: 'ApprovalsAppbarIcon',
});
