import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { AnnouncedLazyLoadingExample } from '../Announced/Announced.LazyLoading.Example';

export const ShadowDOMAnnouncedExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <AnnouncedLazyLoadingExample />
    </Shadow>
  );
};
