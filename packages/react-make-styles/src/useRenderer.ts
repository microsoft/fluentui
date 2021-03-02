import { createDOMRenderer, MakeStylesRenderer } from '@fluentui/make-styles';
import * as React from 'react';

export function useRenderer(document: Document | undefined): MakeStylesRenderer {
  return React.useMemo(() => {
    return createDOMRenderer(document);
  }, [document]);
}
