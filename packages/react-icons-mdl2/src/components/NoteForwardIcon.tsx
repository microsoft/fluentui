import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NoteForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2042 1600l-317 317-90-90 163-163h-518v-128h518l-163-163 90-90 317 317zm-666 192l127 128H677l-549-549V128h1792v1123l-128-128V256H256v1024h512v512h608zm-736-384H347l293 293v-293z" />
    </svg>
  ),
  displayName: 'NoteForwardIcon',
});

export default NoteForwardIcon;
