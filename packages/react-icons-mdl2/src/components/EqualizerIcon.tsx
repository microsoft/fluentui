import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EqualizerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v128h-768v64q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-64H0V256h896v-64q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75v64h768zm-448 1024q40 0 75 15t61 41 41 61 15 75v64h256v128h-256v64q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-64H0v-128h1408v-64q0-40 15-75t41-61 61-41 75-15zM448 640q40 0 75 15t61 41 41 61 15 75v64h1408v128H640v64q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75v-64H0V896h256v-64q0-40 15-75t41-61 61-41 75-15zm64 192q0-26-19-45t-45-19q-26 0-45 19t-19 45v256q0 26 19 45t45 19q26 0 45-19t19-45V832zm640-640q0-26-19-45t-45-19q-26 0-45 19t-19 45v256q0 26 19 45t45 19q26 0 45-19t19-45V192zm512 1280q0-26-19-45t-45-19q-26 0-45 19t-19 45v256q0 26 19 45t45 19q26 0 45-19t19-45v-256z" />
    </svg>
  ),
  displayName: 'EqualizerIcon',
});

export default EqualizerIcon;
