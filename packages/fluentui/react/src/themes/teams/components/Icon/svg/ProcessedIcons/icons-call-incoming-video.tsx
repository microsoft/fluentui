import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M23.697 12.04a.5.5 0 0 0-.542.098l-2.532 2.417A1.981 1.981 0 0 0 20 16c0 .548.221 1.062.623 1.445l2.532 2.417A.5.5 0 0 0 24 19.5v-7a.5.5 0 0 0-.303-.46zM23 18.331l-1.687-1.61a.99.99 0 0 1 0-1.443L23 13.668v4.663zM17.5 11H9.82c-.706 0-1.324.54-1.47 1.282C8.118 13.462 8 14.712 8 16s.118 2.538.35 3.717c.146.744.764 1.283 1.47 1.283h7.68c.827 0 1.5-.673 1.5-1.5v-7c0-.827-.673-1.5-1.5-1.5zm.5 8.5a.5.5 0 0 1-.5.5H9.82c-.23 0-.435-.2-.489-.476C9.111 18.408 9 17.222 9 16s.111-2.408.332-3.525c.053-.275.259-.475.487-.475H17.5a.5.5 0 0 1 .5.5v7z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M23.697 12.04a.5.5 0 0 0-.542.098l-2.532 2.417A1.981 1.981 0 0 0 20 16c0 .548.221 1.062.623 1.445l2.532 2.417A.5.5 0 0 0 24 19.5v-7a.5.5 0 0 0-.303-.46zM17.5 11H9.82c-.706 0-1.324.54-1.47 1.282C8.118 13.462 8 14.712 8 16s.118 2.538.35 3.717c.146.744.764 1.283 1.47 1.283h7.68c.827 0 1.5-.673 1.5-1.5v-7c0-.827-.673-1.5-1.5-1.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
