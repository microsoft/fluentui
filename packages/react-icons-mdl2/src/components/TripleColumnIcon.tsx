import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TripleColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1792V256h512v1536H128zM256 384v1280h256V384H256zm512 1408V256h512v1536H768zM896 384v1280h256V384H896zm512-128h512v1536h-512V256zm384 1408V384h-256v1280h256z" />
    </svg>
  ),
  displayName: 'TripleColumnIcon',
});

export default TripleColumnIcon;
