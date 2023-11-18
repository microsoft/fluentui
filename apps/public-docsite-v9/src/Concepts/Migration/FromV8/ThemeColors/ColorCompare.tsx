import * as React from 'react';
import { ColorBlock } from './ColorBlock';
import { getColorBlockInfo } from './colorUtils';
import { ColorCompareInfo, ColorKind } from './types';

type Props = ColorCompareInfo;

const EmptyColorBlock = React.memo((props: { kind: ColorKind }) => {
  return <ColorBlock name="" kind={props.kind} />;
});

export const ColorCompare = (props: Props) => {
  const { name, match: bestMatch, comment, kind } = props;

  let toKind = kind;
  switch (kind) {
    case 'v8-palette':
      toKind = 'v9-global';
      break;
    case 'v8-semantic':
      toKind = 'v9-alias';
      break;
    case 'v9-global':
      toKind = 'v8-palette';
      break;
    case 'v9-alias':
      toKind = 'v8-semantic';
      break;
  }

  const semanticInfo = name && getColorBlockInfo(name, kind);
  const colorMatchInfo = bestMatch && getColorBlockInfo(bestMatch, toKind);

  return (
    <>
      {semanticInfo ? <ColorBlock {...semanticInfo} flipAlign /> : <EmptyColorBlock kind={kind} />}
      {colorMatchInfo ? <ColorBlock {...colorMatchInfo} comment={comment} /> : <EmptyColorBlock kind={toKind} />}
    </>
  );
};
