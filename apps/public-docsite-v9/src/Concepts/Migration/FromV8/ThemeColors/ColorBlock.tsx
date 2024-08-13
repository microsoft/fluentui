import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';

import { ColorInfo } from './types';
import { useColorBlockStyles } from './ColorBlock.styles';

type Props = ColorInfo & {
  flipAlign?: boolean;
  comment?: string;
};

const getLabels = (kind: string) => {
  switch (kind) {
    case 'v8-semantic':
      return {
        name: 'semantic',
        colorName: 'palette',
        colorValue: 'value',
      };
    case 'v8-palette':
      return {
        name: 'palette',
        colorName: '',
        colorValue: 'value',
      };
    case 'v9-alias':
      return {
        name: 'alias',
        colorName: 'global',
        colorValue: 'value',
      };
    case 'v9-global':
      return {
        name: 'global',
        colorName: '',
        colorValue: 'value',
      };
    default:
      return {
        name: 'name',
        colorName: 'color',
        colorValue: 'value',
      };
  }
};

export const ColorBlock = (props: Props) => {
  const { name, colorName, colorValue, kind, comment, flipAlign } = props;

  const styles = useColorBlockStyles();
  const labels = getLabels(kind);

  const className = mergeClasses(styles.root, flipAlign && styles.flipAlign);

  const blockColorStyle = {
    ['--ColorBlock__background-color' as any]: `${colorValue || 'tranparent'}`,
  };

  return (
    <div className={className} style={blockColorStyle}>
      {!flipAlign && <div className={styles.color} />}
      <div className={styles.names}>
        <label>{labels.name}</label>
        <div className={styles.blockName}>{name}</div>
        <label>{labels.colorName}</label>
        <div className={styles.colorName}>{colorName}</div>
        <label>{labels.colorValue}</label>
        <div className={styles.colorValue}>{colorValue}</div>
        <label>{comment ? '//' : ' '}</label>
        <div className={styles.comment}>{comment}</div>
      </div>
      {flipAlign && <div className={styles.color} />}
    </div>
  );
};
