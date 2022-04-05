import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReadingModeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1664q43 0 75 9t60 26 53 41 54 52H0V256h128v1408h512zm0-1536q67 0 132 16t124 50v1435q-54-45-120-69t-136-24H256V128h384zm1280 128v1536h-882q28-28 53-52t53-40 60-26 76-10h512V256h128zm-640 1280q-70 0-136 24t-120 69V194q59-33 124-49t132-17h384v1408h-384z" />
    </svg>
  ),
  displayName: 'ReadingModeSolidIcon',
});

export default ReadingModeSolidIcon;
