import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';

const useDrawerRef = (ref: React.Ref<HTMLElement>) => {
  return useMergedRefs(ref, React.useRef<HTMLDivElement>(null));
};

export default useDrawerRef;
