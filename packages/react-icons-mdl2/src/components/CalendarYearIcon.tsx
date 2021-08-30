import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalendarYearIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z" />
    </svg>
  ),
  displayName: 'CalendarYearIcon',
});

export default CalendarYearIcon;
