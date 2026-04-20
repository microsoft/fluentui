import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, Slider, Switch, tokens, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    padding: '12px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const MotionCustom = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(300);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);

  return (
    <>
      <div className={classes.controls}>
        <Field label={`Duration: ${duration}ms`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Switch
          label="Animate opacity"
          checked={animateOpacity}
          onChange={(_, data) => setAnimateOpacity(data.checked)}
        />
      </div>

      <Tree aria-label="Motion Custom" collapseMotion={{ duration, animateOpacity }}>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 1, item 2</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'The `collapseMotion` slot on `Tree` is typed with `CollapseParams`, so motion ' +
        'parameters like `duration` and `animateOpacity` can be passed directly as props — ' +
        'no `children` render function needed.',
    },
  },
};
