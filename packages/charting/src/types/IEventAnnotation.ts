import * as React from 'react';

export interface IEventAnnotation {
  date: Date;
  event: string;
  onRenderCard?: () => React.ReactNode;
}
