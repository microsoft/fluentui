import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 768q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-80 0-149-30t-122-82-83-122-30-150q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20zm0-1152q143 0 284 35t266 105 226 170 166 234q40 83 61 171t21 181h-128q0-118-36-221t-99-188-150-152-185-113-209-70-217-24q-108 0-217 24t-208 70-186 113-149 152-100 188-36 221H0q0-92 21-180t61-172q64-132 165-233t227-171 266-104 284-36z" />
    </svg>
  ),
  displayName: 'ViewIcon',
});

export default ViewIcon;
