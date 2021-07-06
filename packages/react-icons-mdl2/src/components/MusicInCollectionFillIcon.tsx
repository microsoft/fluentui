import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MusicInCollectionFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1408q0 62-29 109t-76 80-104 50-111 17q-54 0-111-17t-103-49-76-80-30-110q0-61 29-109t76-80 104-50 111-17q51 0 100 12t92 39V226L768 450v1214q0 62-29 109t-76 80-104 50-111 17q-54 0-111-17t-103-49-76-80-30-110q0-61 29-109t76-80 104-50 111-17q51 0 100 12t92 39V350L1792 62v1346z" />
    </svg>
  ),
  displayName: 'MusicInCollectionFillIcon',
});

export default MusicInCollectionFillIcon;
