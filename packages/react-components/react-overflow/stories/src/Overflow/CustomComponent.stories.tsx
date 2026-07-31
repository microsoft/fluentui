import { Button, Overflow, OverflowItem, useIsOverflowItemVisible } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, ForwardRefComponent } from '@fluentui/react-components';

import styles from './CustomComponent.module.css';

const ItemVisibleCustomComponent: ForwardRefComponent<{
  appId: string;
}> = React.forwardRef((props, ref) => {
  const isVisible = useIsOverflowItemVisible(props.appId);

  console.log(`Item ${props.appId} is ${isVisible ? '' : 'not '}visible'`);
  return <Button ref={ref}>Item {props.appId}</Button>;
});

export const CustomComponent = (): JSXElement => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow>
      <div className={`${styles.container} ${styles.resizableArea}`}>
        {itemIds.map(i => (
          <OverflowItem key={i} id={i}>
            <ItemVisibleCustomComponent appId={i} />
          </OverflowItem>
        ))}
      </div>
    </Overflow>
  );
};

CustomComponent.parameters = {
  docs: {
    description: {
      story:
        'It is possible to wrap the `OverflowItem` children with a custom component instead of rendering them directly.\n\n__In this case it is important to use `React.forwardRef` and to pass the ref to the underlying component__, otherwise React will fail to attach the internal ref, resulting in an error.',
    },
  },
};
