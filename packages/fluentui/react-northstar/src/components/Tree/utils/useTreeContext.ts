import * as React from 'react';
import { TreeContext } from './index';

const useTreeContext = () => {
  const treeContextValue = React.useContext(TreeContext);

  return treeContextValue;
};

export default useTreeContext;
