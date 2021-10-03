import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WorkItemAlertIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 384v1536h896v128H256V256h512q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h512v768h-128V384h-128v256H512V384H384zm256 0v128h768V384h-256V256q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128H640zm1280 1280h128v128h-256v64q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-64h-256v-128h128v-192q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124v192zm-256 192v-64h-128v64q0 26 19 45t45 19q26 0 45-19t19-45zm-256-192h384v-192q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v192z" />
    </svg>
  ),
  displayName: 'WorkItemAlertIcon',
});

export default WorkItemAlertIcon;
