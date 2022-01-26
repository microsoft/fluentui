import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReadOutLoudIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M928 1152l384-384h96v1280h-96l-384-384H640v-512h288zm352 683V981l-299 299H768v256h213l299 299zm325-880q91 91 139 208t48 245q0 128-48 245t-139 208l-91-91q72-72 111-165t39-197q0-103-39-196t-111-166l91-91zm443 453q0 180-68 343t-194 291l-91-91q109-109 167-249t58-294q0-154-58-294t-167-249l91-91q126 128 194 291t68 343zM614 128H128v1536h384v128H0V0h614q108 0 197 42t149 135q58-93 148-135t198-42h614v685q-26-35-61-67t-67-63V128h-486q-88 0-155 37t-105 119q-3 6-6 16t-7 21-6 21-3 18v470L896 958V360q0-7-2-17t-6-22-7-21-7-16q-37-82-104-119t-156-37z" />
    </svg>
  ),
  displayName: 'ReadOutLoudIcon',
});

export default ReadOutLoudIcon;
