import * as React from 'react';
import { useFluent } from '@fluentui/react-components';

let isTitleSet = false;
export function useTitle(title: string) {
  const { targetDocument } = useFluent();

  React.useEffect(() => {
    if (targetDocument && !isTitleSet) {
      targetDocument.title = `Picker / ${title}`;
      isTitleSet = true;
    }
  }, [targetDocument, title]);
}
