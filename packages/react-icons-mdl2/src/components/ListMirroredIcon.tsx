import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ListMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1536v-128H768v128h1280zm0-640H0v128h2048V896zM384 384v128h1664V384H384z" />
    </svg>
  ),
  displayName: 'ListMirroredIcon',
});

export default ListMirroredIcon;
