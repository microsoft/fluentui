import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReminderPersonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1453l-557 558-269-270 90-90 179 178 467-466 90 90zm-434 72q-111-122-259-183t-312-62q-108 0-206 27t-184 76-155 119-119 155-77 184-27 207H128q0-143 41-275t119-243 186-195 245-132q-78-42-140-102T474 968t-67-156-23-172q0-133 50-249t137-204T774 50t250-50q133 0 249 50t204 137 137 203 50 250q0 89-23 172t-67 156-106 133-140 102q102 36 192 95t163 139l-88 88zM512 640q0 106 40 199t110 162 163 110 199 41q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40T663 278 553 441t-41 199z" />
    </svg>
  ),
  displayName: 'ReminderPersonIcon',
});

export default ReminderPersonIcon;
