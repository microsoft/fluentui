import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  makeStyles,
  Slider,
  Switch,
  Text,
  tokens,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '680px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  row: {
    display: 'flex',
    gap: '20px',
    alignItems: 'start',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  codeBlock: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    borderRadius: tokens.borderRadiusMedium,
    padding: '8px 12px',
    whiteSpace: 'pre',
  },
});

/**
 * When a component's motion slot type includes generic parameters, those parameters
 * can be passed directly as props on the slot object — no `children` render function needed.
 *
 * Dialog's `surfaceMotion` slot is typed with `ScaleParams`; Accordion's and Tree's
 * `collapseMotion` slots are typed with `CollapseParams`. Each exposes its own set of
 * direct props — all following the same pattern as any regular Fluent UI slot
 * (`badge=&#123;&#123; status: 'available' &#125;&#125;`).
 */
export const DirectParams = (): JSXElement => {
  const classes = useStyles();

  // Shared controls driving all three sections
  const [duration, setDuration] = React.useState(600);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  // Dialog-specific
  const [outScale, setOutScale] = React.useState(0.5);

  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <Field label={`Duration: ${duration}ms (shared)`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Field label={`Dialog outScale: ${outScale.toFixed(2)}`}>
          <Slider min={0} max={1} step={0.05} value={outScale} onChange={(_, data) => setOutScale(data.value)} />
        </Field>
        <Switch
          label="Accordion/Tree animateOpacity"
          checked={animateOpacity}
          onChange={(_, data) => setAnimateOpacity(data.checked)}
        />
      </div>

      <div className={classes.section}>
        <Text weight="semibold">
          Dialog (<code>{'surfaceMotion: Slot<PresenceMotionSlotProps<ScaleParams>>'}</code>)
        </Text>
        <div className={classes.row}>
          <div className={classes.column}>
            <Text size={200}>Direct params (concise)</Text>
            <Dialog
              surfaceMotion={{
                duration,
                outScale,
              }}
            >
              <DialogTrigger disableButtonEnhancement>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Direct param override</DialogTitle>
                  <DialogContent>
                    The <code>duration</code> and <code>outScale</code> props are passed directly on the{' '}
                    <code>surfaceMotion</code> slot object.
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Close</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
            <div className={classes.codeBlock}>
              {`<Dialog
  surfaceMotion={{
    duration: ${duration},
    outScale: ${outScale.toFixed(2)},
  }}
>`}
            </div>
          </div>

          <div className={classes.column}>
            <Text size={200}>Children render function (verbose)</Text>
            <Dialog
              surfaceMotion={{
                children: (Motion, props) => (
                  <Motion {...props} duration={duration} outScale={outScale}>
                    {props.children}
                  </Motion>
                ),
              }}
            >
              <DialogTrigger disableButtonEnhancement>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Render function override</DialogTitle>
                  <DialogContent>
                    The same override using a <code>children</code> render function — functionally identical but more
                    verbose.
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Close</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
            <div className={classes.codeBlock}>
              {`<Dialog
  surfaceMotion={{
    children: (Motion, props) => (
      <Motion
        {...props}
        duration={${duration}}
        outScale={${outScale.toFixed(2)}}
      >
        {props.children}
      </Motion>
    ),
  }}
>`}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <Text weight="semibold">
          Accordion (<code>{'collapseMotion: Slot<PresenceMotionSlotProps<CollapseParams>>'}</code>)
        </Text>
        <Text size={200}>Same pattern — different param shape (CollapseParams):</Text>
        <Accordion collapsible>
          <AccordionItem value="1">
            <AccordionHeader>Panel A — tweaks via direct params</AccordionHeader>
            <AccordionPanel collapseMotion={{ duration, animateOpacity }}>
              <Text>
                Expand/collapse timing controlled by{' '}
                <code>
                  duration={'{'}duration{'}'}
                </code>{' '}
                and{' '}
                <code>
                  animateOpacity={'{'}animateOpacity{'}'}
                </code>{' '}
                on <code>collapseMotion</code>.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>Panel B</AccordionHeader>
            <AccordionPanel collapseMotion={{ duration, animateOpacity }}>
              <Text>Panel B content — shares the same motion params.</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div className={classes.codeBlock}>
          {`<AccordionPanel
  collapseMotion={{
    duration: ${duration},
    animateOpacity: ${animateOpacity},
  }}
>`}
        </div>
      </div>

      <div className={classes.section}>
        <Text weight="semibold">
          Tree (<code>{'collapseMotion: Slot<PresenceMotionSlotProps<CollapseParams>>'}</code>)
        </Text>
        <Text size={200}>Same CollapseParams shape, applied at subtree level:</Text>
        <Tree aria-label="Direct params demo">
          <TreeItem itemType="branch">
            <TreeItemLayout>Team A</TreeItemLayout>
            <Tree collapseMotion={{ duration, animateOpacity }}>
              <TreeItem itemType="leaf">
                <TreeItemLayout>Alice</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>Bob</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem itemType="branch">
            <TreeItemLayout>Team B</TreeItemLayout>
            <Tree collapseMotion={{ duration, animateOpacity }}>
              <TreeItem itemType="leaf">
                <TreeItemLayout>Carol</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>Dan</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
        <div className={classes.codeBlock}>
          {`<Tree
  collapseMotion={{
    duration: ${duration},
    animateOpacity: ${animateOpacity},
  }}
>`}
        </div>
      </div>
    </div>
  );
};

DirectParams.parameters = {
  docs: {
    description: {
      story:
        'Motion slot parameters can be passed directly as props on the slot object, ' +
        'without using the `children` render function. This works when the component ' +
        'declares its motion slot with typed parameters ' +
        '(e.g. `Slot<PresenceMotionSlotProps<ScaleParams>>`). ' +
        'The sections below show the same pattern applied across three param shapes — ' +
        "Dialog's `ScaleParams`, Accordion's and Tree's `CollapseParams` — all driven by " +
        'one shared set of controls.',
    },
  },
};
