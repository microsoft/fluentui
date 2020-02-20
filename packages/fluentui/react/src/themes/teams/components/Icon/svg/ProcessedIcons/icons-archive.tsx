import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.375 10.078a1.004 1.004 0 0 1 .547.547A.97.97 0 0 1 24 11v1c0 .266-.1.498-.297.695-.094.094-.203.168-.328.223S23.125 13 23 13v7.5c0 .198-.039.387-.117.566s-.188.34-.328.48c-.146.146-.309.258-.488.336s-.37.118-.567.118h-11c-.198 0-.387-.039-.566-.117s-.34-.189-.48-.336c-.146-.141-.258-.301-.336-.48S9 20.698 9 20.5V13a.923.923 0 0 1-.695-.305A.923.923 0 0 1 8 12v-1c0-.125.027-.25.082-.375s.129-.234.223-.328A.95.95 0 0 1 9 10h14a.97.97 0 0 1 .375.078zM9 11v1h14v-1H9zm1 2v7.5a.48.48 0 0 0 .148.352.48.48 0 0 0 .352.148h11a.483.483 0 0 0 .352-.148A.484.484 0 0 0 22 20.5V13H10zm9 4h-6v-3h6v3zm-5-2v1h4v-1h-4z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M23.375 10.078a1.004 1.004 0 0 1 .547.547A.97.97 0 0 1 24 11v1c0 .266-.1.498-.297.695-.094.094-.203.168-.328.223S23.125 13 23 13H9a.923.923 0 0 1-.695-.305A.923.923 0 0 1 8 12v-1c0-.125.027-.25.082-.375s.129-.234.223-.328A.95.95 0 0 1 9 10h14a.97.97 0 0 1 .375.078zM23 20.5c0 .198-.039.389-.117.57a1.547 1.547 0 0 1-.812.812A1.428 1.428 0 0 1 21.5 22h-11c-.198 0-.388-.039-.57-.117a1.536 1.536 0 0 1-.812-.812A1.421 1.421 0 0 1 9 20.5v-7h14v7zm-9.5-6v2h5v-2h-5z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
