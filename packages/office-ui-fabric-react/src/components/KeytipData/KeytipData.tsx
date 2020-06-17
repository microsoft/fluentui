import * as React from 'react';
import { IRenderComponent } from '../../Utilities';
import { IKeytipDataProps } from './KeytipData.types';
import { useKeytipData } from './useKeytipData';

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
export const KeytipData: React.FunctionComponent<IKeytipDataProps & IRenderComponent<{}>> = props => {
  const { children, ...keytipDataProps } = props;
  const { targetElementAttributes, executeElementAttributes } = useKeytipData(keytipDataProps);

  return children({ ...targetElementAttributes, ...executeElementAttributes });
};
