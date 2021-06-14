import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuickNoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H640l-512-512V128h1792zM640 1739v-331H309l331 331zM1792 256H256v1024h512v512h1024V256z" />
    </svg>
  ),
  displayName: 'QuickNoteIcon',
});

export default QuickNoteIcon;
