import * as React from 'react';

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { CodeItemInfo } from './types';
import { ComponentIcon, ConstantIcon, HookIcon, MethodIcon, TypeIcon } from './CodeItemIcons';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
    boxSizing: 'border-box',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground5),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...shorthands.margin(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {
    display: 'inline',
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});

type Props = {
  codeItemInfo: CodeItemInfo;
};

export const CodeItemCard: React.FunctionComponent<Props> = props => {
  const { codeItemInfo } = props;

  const styles = useStyles();

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
