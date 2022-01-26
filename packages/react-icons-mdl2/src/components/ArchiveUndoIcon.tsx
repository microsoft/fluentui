import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArchiveUndoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 1152q67 0 125 25t102 69 68 103 25 126q0 91-34 171t-97 146q-26 26-53 50t-54 48q-45 40-88 79t-88 79l-98-91q46-39 91-78t90-79q28-24 55-48t54-51q47-48 70-104t24-125q0-41-15-76t-42-61-62-40-76-15q-66 0-116 21t-92 58-77 82-69 95h293v128h-512v-512h128v286q46-61 91-113t96-90 115-61 146-22zM0 128h2048v640h-128v256h-128V768H256v1024h1152v128H128V768H0V128zm1920 512V256H128v384h1792zm-896 512H640v-128h384v128z" />
    </svg>
  ),
  displayName: 'ArchiveUndoIcon',
});

export default ArchiveUndoIcon;
