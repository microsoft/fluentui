import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CompareIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1603 256l214 640h103v128h-22q-20 57-56 104t-84 81-104 52-118 19q-61 0-117-18t-104-52-84-81-57-105h-22V896h103l214-640h-445v1410q167 11 316 75t273 179h179v128H128v-128h179q123-114 272-178t317-76V256H451l214 640h103v128h-22q-20 57-56 104t-84 81-104 52-118 19q-61 0-117-18t-104-52-84-81-57-105H0V896h103l214-640H0V128h896V0h128v128h896v128h-317zM384 458L238 896h292L384 458zm0 694q69 0 128-34t94-94H162q35 60 94 94t128 34zm1020 768q-100-63-213-95t-231-33q-118 0-231 32t-213 96h888zm132-1462l-146 438h292l-146-438zm0 694q69 0 128-34t94-94h-444q35 60 94 94t128 34z" />
    </svg>
  ),
  displayName: 'CompareIcon',
});

export default CompareIcon;
