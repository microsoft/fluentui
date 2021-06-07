import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ItalicIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1568 256h-217L882 1664h366l-128 128H416l128-128h161l469-1408H864l128-128h704l-128 128z" />
    </svg>
  ),
  displayName: 'ItalicIcon',
});

export default ItalicIcon;
