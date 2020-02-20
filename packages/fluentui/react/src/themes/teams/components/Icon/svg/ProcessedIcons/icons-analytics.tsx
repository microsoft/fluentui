import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.148 13.852c.1.099.216.148.352.148s.253-.05.352-.148A.481.481 0 0 0 24 13.5v-4c0-.145-.056-.27-.168-.371s-.243-.145-.395-.129l-4 .5a.518.518 0 0 0-.437.492c0 .14.05.26.148.36a.472.472 0 0 0 .344.148l.07-.008 2.696-.336-5.781 6.61-2.125-2.117a.456.456 0 0 0-.344-.149c-.073 0-.144.016-.211.047s-.128.076-.18.133L9 20.136V9.5a.5.5 0 1 0-1 0v13a.5.5 0 0 0 .5.5h15a.5.5 0 1 0 0-1H9v-.318l5.031-5.948 2.117 2.118A.46.46 0 0 0 16.5 18a.471.471 0 0 0 .375-.172l6.125-7V13.5c0 .136.05.253.148.352z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M22.293 14.707c.195.195.43.293.707.293a1 1 0 0 0 1-1v-4a.987.987 0 0 0-.344-.75.976.976 0 0 0-.781-.242l-4 .5a.966.966 0 0 0-.625.332.97.97 0 0 0-.25.66.981.981 0 0 0 .496.867.973.973 0 0 0 .621.125l1.414-.18-4.086 4.72-1.742-1.743a.961.961 0 0 0-.328-.215 1.053 1.053 0 0 0-.39-.074.97.97 0 0 0-.758.36L10 18.23V10a1 1 0 0 0-2 0v12a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H10.3l3.762-4.516 1.727 1.72c.094.093.2.166.32.218a1.013 1.013 0 0 0 .8-.012.96.96 0 0 0 .341-.254L22 12.68V14c0 .276.098.512.293.707z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
