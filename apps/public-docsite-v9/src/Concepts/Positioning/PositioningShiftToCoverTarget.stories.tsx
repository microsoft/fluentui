import * as React from 'react';
import {
  Button,
  makeStyles,
  SpinButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  PositioningImperativeRef,
  useMergedRefs,
  Checkbox,
  RadioGroup,
  Field,
  Radio,
  PositioningProps,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    width: '300px',
    height: '300px',
    overflow: 'auto',
    resize: 'both',
  },
  trigger: {
    display: 'block',
    width: '150px',
    margin: '200px auto',
  },
});

const ResizableBoundary = React.forwardRef<
  HTMLDivElement,
  {
    onResize: ResizeObserverCallback;
    children: React.ReactNode;
  }
>(({ onResize, children }, ref) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onResize]);

  const styles = useStyles();

  return (
    <div ref={useMergedRefs(ref, containerRef)} className={styles.boundary}>
      {children}
    </div>
  );
});

export const CoverTargetForSmallViewport = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);

  const [menuItemCount, setMenuItemCount] = React.useState(6);

  const positioningRef = React.useRef<PositioningImperativeRef>(null);

  const [open, setOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<PositioningProps['position']>('above');

  return (
    <>
      <div>
        <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />{' '}
        <Field label="Menu position">
          <RadioGroup
            value={menuPosition}
            onChange={(_, data) => setMenuPosition(data.value as PositioningProps['position'])}
          >
            <Radio value="above" label="above" />
            <Radio value="after" label="after" />
          </RadioGroup>
        </Field>
        <Field label="Menu Item Count">
          <SpinButton value={menuItemCount} onChange={(_e, { value }) => value && setMenuItemCount(value)} />
        </Field>
      </div>
      <ResizableBoundary
        ref={setBoundaryRef}
        onResize={() => {
          positioningRef.current?.updatePosition();
        }}
      >
        <Menu
          open={open}
          positioning={{
            positioningRef,
            overflowBoundary: boundaryRef,
            flipBoundary: boundaryRef,
            autoSize: true,
            shiftToCoverTarget: true,
            position: menuPosition,
          }}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Open Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Array.from({ length: menuItemCount }, (_, i) => (
                <MenuItem key={i}>Item {i}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </ResizableBoundary>
    </>
  );
};

CoverTargetForSmallViewport.parameters = {
  docs: {
    description: {
      story:
        "`shiftToCoverTarget` is a positioning option that allows the positioned element to shift and cover the target element when there isn't enough space available to fit it.",
    },
  },
};
