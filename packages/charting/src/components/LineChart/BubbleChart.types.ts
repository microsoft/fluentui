import * as React from 'react';

export interface EventAnnotation {
  date: Date;
  event: string;
  onRenderCard?: () => React.ReactNode;
}
