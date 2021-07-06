import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ResponsesMenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1536v-384h384v384H640zm128-256v128h128v-128H768zm256-768v384H640V512h384zM896 768V640H768v128h128zm512-128v128h-256V640h256zM256 0h1536v2048H546l128-128h990V128H384v1118l-61-61-67 66V0zm896 1408v-128h256v128h-256zm-384 384H250l163 163-90 90L6 1728l317-317 90 90-163 163h518v128z" />
    </svg>
  ),
  displayName: 'ResponsesMenuIcon',
});

export default ResponsesMenuIcon;
