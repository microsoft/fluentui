import { useRef, useEffect } from 'react';
import { getDocument } from '@uifabric/utilities/lib/dom';

/**
 * Hook that returns the document ref from a provided element ref.
 */
export const useDocumentRef = (elementRef: React.RefObject<HTMLElement | null>) => {
  const documentRef = useRef<Document>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (documentRef as any).current = getDocument(elementRef.current);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (documentRef as any).current = null;
    };
  }, [elementRef]);

  return documentRef;
};
