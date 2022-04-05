import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReminderTimeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1453l-557 558-269-270 90-90 179 178 467-466 90 90zM1024 384v512h384v128H896V384h128zm-64 1408q16 0 32-1t32-2l114 114q-45 8-89 12t-89 5q-132 0-254-34t-230-97-194-150-150-195-97-229T0 960q0-132 34-254t97-230 150-194 195-150 229-97T960 0q132 0 254 34t230 97 194 150 150 195 97 229 35 255q0 50-6 101l-168 169q46-133 46-270 0-115-30-221t-84-198-130-169-168-130-199-84-221-30q-115 0-221 30t-198 84-169 130-130 168-84 199-30 221q0 115 30 221t84 198 130 169 168 130 199 84 221 30z" />
    </svg>
  ),
  displayName: 'ReminderTimeIcon',
});

export default ReminderTimeIcon;
