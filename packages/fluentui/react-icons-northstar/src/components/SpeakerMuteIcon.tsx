import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SpeakerMuteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M11.996 3.006c0-.873-1.04-1.327-1.68-.733L6.444 5.866a.5.5 0 01-.34.134H3.496a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 001.5 1.5h2.608a.5.5 0 01.34.133l3.872 3.594c.64.594 1.68.14 1.68-.733V3.006zM7.124 6.6l3.872-3.593v13.988L7.124 13.4a1.5 1.5 0 00-1.02-.4H3.496a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h2.608a1.5 1.5 0 001.02-.4zM13.143 7.646a.5.5 0 01.707 0l1.646 1.647 1.646-1.647a.5.5 0 11.708.708L16.203 10l1.647 1.646a.5.5 0 01-.708.708l-1.646-1.647-1.646 1.647a.5.5 0 01-.707-.708L14.788 10l-1.646-1.646a.5.5 0 010-.708z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M11.996 3.006c0-.873-1.04-1.327-1.68-.733L6.444 5.867a.5.5 0 01-.34.133H3.496a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 001.5 1.5h2.608a.5.5 0 01.34.133l3.872 3.594c.64.594 1.68.14 1.68-.733V3.006zM13.143 7.646a.5.5 0 01.707 0l1.646 1.647 1.646-1.647a.5.5 0 11.708.708L16.203 10l1.647 1.646a.5.5 0 01-.708.708l-1.646-1.647-1.646 1.647a.5.5 0 01-.707-.708L14.788 10l-1.646-1.646a.5.5 0 010-.708z" />
      </g>
    </svg>
  ),
  displayName: 'SpeakerMuteIcon',
});
