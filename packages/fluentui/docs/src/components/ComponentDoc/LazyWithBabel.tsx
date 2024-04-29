import * as React from 'react';
import useScript from '@charlietango/use-script';
import { Loader } from '@fluentui/react-northstar';

export const LazyWithBabel: React.FunctionComponent = ({ children }) => {
  const url = `https://cdn.jsdelivr.net/npm/@babel/standalone@${window['versions'].babelStandalone}/babel.min.js`;
  const [ready] = useScript(url);

  return ready ? <React.Suspense fallback={<Loader />}>{children}</React.Suspense> : <Loader />;
};
