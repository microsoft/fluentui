import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TestPlanIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 640H512V512h640v128zM256 1664h681l-64 128H128V128h1408v640h-128V256H256v1408zm256-384h617l-64 128H512v-128zm512-384v128H512V896h512zm939 967q14 28 14 57 0 26-10 49t-27 41-41 28-50 10h-754q-26 0-49-10t-41-27-28-41-10-50q0-29 14-57l299-598v-241h-128V896h640v128h-128v241l299 598zm-242-199l-185-369v-271h-128v271l-185 369h498z" />
    </svg>
  ),
  displayName: 'TestPlanIcon',
});

export default TestPlanIcon;
