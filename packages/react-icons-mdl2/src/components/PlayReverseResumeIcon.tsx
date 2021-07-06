import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlayReverseResumeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 256v1536h-128V256h128zM192 1024l1088-768v1536L192 1024zm960-521l-738 521 738 521V503z" />
    </svg>
  ),
  displayName: 'PlayReverseResumeIcon',
});

export default PlayReverseResumeIcon;
