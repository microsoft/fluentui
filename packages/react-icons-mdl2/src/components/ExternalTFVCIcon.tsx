import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExternalTFVCIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h384v128H128V128h1792v512h-128V256H256v1536zm1600-640q-60 0-109-34t-71-90l-147 49q7 35 7 75 0 66-21 128t-64 113l255 291q42-20 86-20 40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-29 8-57t25-51l-251-288q-50 37-108 56t-122 20h-17q-9 0-17-1l-54 160q41 26 64 69t24 92q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-44 16-79t44-61 65-38 80-14l50-150q-57-20-104-56t-80-84-52-104-19-118q0-79 30-149t82-122 122-83 150-30q55 0 107 15t97 44 81 69 61 90l168-56q6-35 23-64t42-52 57-34 68-12q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15zm-704 192q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15z" />
    </svg>
  ),
  displayName: 'ExternalTFVCIcon',
});

export default ExternalTFVCIcon;
