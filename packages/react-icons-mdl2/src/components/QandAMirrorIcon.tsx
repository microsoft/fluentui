import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QandAMirrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M587 1536h437l128 128H640l-384 384v-384H0V384h128v1152h256v203l203-203zM256 0h1664v1408h-384v384l-384-384H256V0zm1536 1280V128H384v1152h821l203 203v-203h384zm-768-128v-128h128v128h-128zM832 512q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 29 14 52t35 45 47 44 46 51 36 63 14 81v48h-128v-48q0-29-14-52t-35-45-47-44-46-51-36-62-14-82z" />
    </svg>
  ),
  displayName: 'QandAMirrorIcon',
});

export default QandAMirrorIcon;
