import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeleteTableIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1819 1728l227 227-91 90-227-227-227 227-90-90 227-227-227-227 91-90 226 226 227-226 90 90-226 227zm226 0l3-3v6l-3-3zm3-1600v1152h-642l-126 126v-126H768v384h512v128H0V128h2048zM640 1280H128v384h512v-384zm0-512H128v384h512V768zm0-512H128v384h512V256zm640 512H768v384h512V768zm0-512H768v384h512V256zm640 512h-512v384h512V768zm0-512h-512v384h512V256z" />
    </svg>
  ),
  displayName: 'DeleteTableIcon',
});

export default DeleteTableIcon;
