import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileSQLIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h128v128H128V0h1115l549 549v731h-128V640h-512V128H256v1792zM1280 512h293l-293-293v293zM675 1558q0 26 19 44t48 35 63 32 62 37 48 51 20 72q0 45-18 74t-49 47-67 25-75 7q-15 0-35-2t-40-5-40-10-32-14v-95q12 12 30 21t37 16 40 9 37 4q19 0 39-2t37-11 28-23 11-39q0-27-19-45t-48-34-63-31-62-37-48-50-20-73q0-41 19-70t49-47 66-27 72-9q30 0 65 3t62 17v91q-26-19-58-26t-64-8q-17 0-37 3t-37 12-28 22-12 36zm860 130q0 35-5 69t-19 65-33 60-48 50l161 116h-140l-100-77q-22 5-42 8t-43 3q-62 0-111-21t-84-58-52-89-18-112q0-63 18-117t53-93 86-62 117-22q61 0 109 22t82 59 51 89 18 110zm-269 214q46 0 78-16t54-45 30-65 10-79q0-40-9-78t-29-66-52-46-78-18q-44 0-76 17t-53 47-32 66-11 77q0 39 10 76t30 66 52 46 76 18zm679-7v78h-308v-556h92v478h216z" />
    </svg>
  ),
  displayName: 'FileSQLIcon',
});

export default FileSQLIcon;
