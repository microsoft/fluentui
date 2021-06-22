import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VideoOff2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 760l512-256v1040l-250-125q-18-9-33-15t-31-13-29-15-32-20q-15-10-26-20t-20-21-19-22-23-25l-177-177V640H957L829 512h707v248zm384 577V711l-384 193v240l384 193zM19 109l90-90 1920 1920-90 90-494-493H0V512h421L19 109zm109 1299h1189L549 640H128v768z" />
    </svg>
  ),
  displayName: 'VideoOff2Icon',
});

export default VideoOff2Icon;
