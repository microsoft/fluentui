import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SectionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 896q24 0 47 8t42 21 33 33 24 42q5 14 20 52t35 88 40 105 38 103 29 82 12 42q0 27-19 45t-45 19H832q-26 0-45-18t-19-46q0-12 8-38t20-56 23-57 17-41H448q-26 0-45-18t-19-46q0-12 8-38t20-56 23-57 17-41H64q-26 0-45-18T0 960q0-8 11-42t29-82 39-103 40-106 34-88 21-53q17-45 57-73t89-29h640q24 0 47 8t42 21 33 33 24 42l58 152h180q24 0 47 8t42 21 33 33 24 42l58 152h180zm-1228 0l58-154q17-45 57-73t89-29h323l-41-109q-2-6-10-12t-16-7H320q-7 0-15 6t-10 12L156 896h344zm384 256l58-154q17-45 57-73t89-29h323l-41-109q-2-6-10-12t-16-7H704q-7 0-15 6t-10 12q-35 92-69 183t-70 183h344zm1008 256l-138-365q-2-6-10-12t-16-7h-640q-7 0-15 6t-10 12l-42 110-48 128q-24 64-49 128h968z" />
    </svg>
  ),
  displayName: 'SectionsIcon',
});

export default SectionsIcon;
