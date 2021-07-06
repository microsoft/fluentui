import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const KeyPhraseExtractionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1152v128H0v-128h896zm640-256v128H640V896h896zM1371 0l549 549v1499H256v-640h128v512h1408V640h-512V128H384v896H256V0h1115zm37 512h293l-293-293v293zM640 1536v-128h896v128H640z" />
    </svg>
  ),
  displayName: 'KeyPhraseExtractionIcon',
});

export default KeyPhraseExtractionIcon;
