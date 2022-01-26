import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DocumentSearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 896q79 0 149 30t122 82 82 123 30 149q0 80-30 149t-82 122-122 83-149 30q-60 0-117-18t-105-53l-437 436q-19 19-45 19t-45-19-19-45q0-26 19-45l436-437q-35-48-53-105t-18-117q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20zm-656 128l-128 128H256V0h859l549 549v219h-128V640h-512V128H384v1536h624zm144-1152h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'DocumentSearchIcon',
});

export default DocumentSearchIcon;
