import * as React from 'react';
import { IRenderComponent } from '../../Utilities';
import { DATAKTP_TARGET, DATAKTP_EXECUTE_TARGET } from '../../utilities/keytips/index';
import { IKeytipDataProps } from './KeytipData.types';
import { useKeytipData } from './useKeytipData';

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
export const KeytipData: React.FunctionComponent<IKeytipDataProps & IRenderComponent<{}>> = props => {
  const { children, ...keytipDataProps } = props;
  const { keytipId, ariaDescribedBy } = useKeytipData(keytipDataProps);

  return children({
    [DATAKTP_TARGET]: keytipId,
    [DATAKTP_EXECUTE_TARGET]: keytipId,
    'aria-describedby': ariaDescribedBy,
  });
};
