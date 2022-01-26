import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GripperToolIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q132 0 248 50t204 138 137 203 51 249v768q0 132-50 248t-138 204-203 137-249 51q-132 0-248-50t-204-138-137-203-51-249V640q0-132 50-248t138-204T775 51t249-51zm0 1024q79 0 149-30t122-83 82-122 31-149q0-79-30-149t-83-122-122-82-149-31q-79 0-149 30t-122 83-82 122-31 149q0 79 30 149t83 122 122 82 149 31zm0-651q55 0 103 21t85 57 58 85 21 104q0 55-21 103t-57 85-85 58-104 21q-55 0-103-21t-85-57-58-85-21-104q0-55 21-103t57-85 85-58 104-21z" />
    </svg>
  ),
  displayName: 'GripperToolIcon',
});

export default GripperToolIcon;
