/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: React.PropsWithChildren<P>, context?: any): React.ReactElement<any, any> | null;
  }
}
