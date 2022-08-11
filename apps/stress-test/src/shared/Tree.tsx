import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

export type TreeProps = {
  breadth?: number;
  depth?: number;
};

export type BoxProps = {
  backgroundColor?: string;
  width?: number;
  height?: number;
};

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export const Box: React.FC<BoxProps> = ({ backgroundColor, width, height, style, ...props }) => {
  return <div {...props} style={{ ...style, backgroundColor, width, height, padding: 10 }} />;
};

export const Tree: React.FC<TreeProps> = ({ breadth = 1, depth = 1, children, className, ...props }) => {
  const styles = useStyles();

  let render;

  if (depth === 0) {
    render = <Box backgroundColor="red">{children}</Box>;
  } else {
    render = Array.from({ length: breadth }).map((el, i) => {
      return (
        <Tree breadth={breadth} depth={depth - 1} key={i} className={styles.layout}>
          {children}
        </Tree>
      );
    });
  }
  return (
    <Box {...props} className={mergeClasses(className, `depth-${depth}`)}>
      {render}
    </Box>
  );
};
