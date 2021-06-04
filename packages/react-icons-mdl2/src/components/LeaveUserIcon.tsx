import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LeaveUserIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1536v128h-646l211 211-90 90-365-365 365-365 90 90-211 211h646zm-756-433l-88 93q-89-84-201-128t-235-44q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-117 35-229t101-207 157-169 203-113q-56-36-100-83t-76-103-47-118-17-130q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 137-63 248t-177 186q70 26 133 66t119 91zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149z" />
    </svg>
  ),
  displayName: 'LeaveUserIcon',
});

export default LeaveUserIcon;
