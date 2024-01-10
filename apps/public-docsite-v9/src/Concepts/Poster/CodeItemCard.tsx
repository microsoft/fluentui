import * as React from 'react';

import { ComponentIcon, ConstantIcon, HookIcon, MethodIcon, TypeIcon } from './CodeItemIcons';
import { useCodeItemCardStyles } from './CodeItemCard.styles';
import { CodeItemInfo } from './types';

type Props = {
  codeItemInfo: CodeItemInfo;
};

export const CodeItemCard: React.FunctionComponent<Props> = props => {
  const { codeItemInfo } = props;

  const styles = useCodeItemCardStyles();

  return (
    <div className={styles.root}>
      {codeItemInfo.componentType === 'component' && <ComponentIcon />}
      {codeItemInfo.componentType === 'hook' && <HookIcon />}
      {codeItemInfo.componentType === 'constant' && <ConstantIcon />}
      {codeItemInfo.componentType === 'method' && <MethodIcon />}
      {codeItemInfo.componentType === 'type' && <TypeIcon />}
      <div className={styles.name}>{codeItemInfo.name}</div>
    </div>
  );
};
