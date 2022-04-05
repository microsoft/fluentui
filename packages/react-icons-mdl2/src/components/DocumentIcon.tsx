import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M549 0h1243v1755l-293 293H256V293L549 0zm1115 1701V128H603L384 347v1573h1061l219-219z" />
    </svg>
  ),
  displayName: 'DocumentIcon',
});

export default DocumentIcon;
