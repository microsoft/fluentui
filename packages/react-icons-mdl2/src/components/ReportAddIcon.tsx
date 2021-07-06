import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReportAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1280h-384V384h384v896zM0 1024h384v640H0v-640zm1408 512h-128v128h-256V0h384v1536zM512 384h384v1280H512V384zm1536 1280v128h-256v256h-128v-256h-256v-128h256v-256h128v256h256z" />
    </svg>
  ),
  displayName: 'ReportAddIcon',
});

export default ReportAddIcon;
