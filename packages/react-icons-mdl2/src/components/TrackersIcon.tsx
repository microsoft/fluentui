import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrackersIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256v1792H256V256h512q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h512zM640 512h768V384h-256V256q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128H640v128zm1024-128h-128v256H512V384H384v1536h1280V384zm-640 512h512v128h-512V896zm0 384h512v128h-512v-128zm0 384h512v128h-512v-128zM851 723l90 90-237 237-173-173 90-90 83 83 147-147zm0 384l90 90-237 237-173-173 90-90 83 83 147-147zm0 384l90 90-237 237-173-173 90-90 83 83 147-147z" />
    </svg>
  ),
  displayName: 'TrackersIcon',
});

export default TrackersIcon;
