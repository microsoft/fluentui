import {
  Button,
  ForwardRefComponent,
  makeStyles,
  mergeClasses,
  Overflow,
  OverflowItem,
  tokens,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';
import * as React from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

const ItemVisibleCustomComponent: ForwardRefComponent<{
  appId: string;
}> = React.forwardRef((props, ref) => {
  const isVisible = useIsOverflowItemVisible(props.appId);

  console.log(`Item ${props.appId} is ${isVisible ? '' : 'not '}visible'`);
  return <Button ref={ref}>Item {props.appId}</Button>;
});

export const CustomComponent = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow>
      <div className={mergeClasses(styles.container, styles.resizableArea)}>
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
