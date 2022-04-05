import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MusicNoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 0q0 104 46 186t123 149q99 86 157 193t58 240h-128q0-104-46-186t-123-149q-24-20-45-42t-42-46v1415q0 9-3 21t-7 26-9 25-10 20q-25 48-64 85t-86 61-100 37-105 13q-68 0-136-22t-124-63-89-100-35-135q0-75 34-134t90-101 123-63 137-22q69 0 135 20t121 63V0h128zM768 1920q41 0 86-12t83-36 62-60 25-84q0-48-24-84t-63-60-83-36-86-12q-41 0-86 12t-83 36-62 60-25 84q0 48 24 84t63 60 83 36 86 12z" />
    </svg>
  ),
  displayName: 'MusicNoteIcon',
});

export default MusicNoteIcon;
