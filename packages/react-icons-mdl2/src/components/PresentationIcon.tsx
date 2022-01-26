import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PresentationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h1920v128h-128v896q0 26-10 49t-27 41-41 28-50 10h-640v640h512v128H384v-128h512v-640H256q-26 0-49-10t-41-27-28-41-10-50V128H0V0zm1664 1024V128H256v896h1408zm-256-512v128H512V512h896z" />
    </svg>
  ),
  displayName: 'PresentationIcon',
});

export default PresentationIcon;
