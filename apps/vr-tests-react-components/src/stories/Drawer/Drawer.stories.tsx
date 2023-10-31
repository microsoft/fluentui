import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerHeaderNavigation,
  DrawerProps,
  OverlayDrawer,
  InlineDrawer,
  InlineDrawerProps,
  DrawerFooter,
} from '@fluentui/react-drawer';
import { Toolbar, ToolbarButton, ToolbarGroup } from '@fluentui/react-toolbar';
import { Button } from '@fluentui/react-button';
import {
  ArrowLeft24Regular,
  ArrowClockwise24Regular,
  Settings24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons';

import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Drawer',
} as ComponentMeta<typeof Drawer>;

const ExampleDrawerHeader = () => (
  <DrawerHeader>
    <DrawerHeaderNavigation>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <ToolbarButton aria-label="Back" appearance="subtle" icon={<ArrowLeft24Regular />} />

        <ToolbarGroup>
          <ToolbarButton aria-label="Reload content" appearance="subtle" icon={<ArrowClockwise24Regular />} />
          <ToolbarButton aria-label="Settings" appearance="subtle" icon={<Settings24Regular />} />
          <ToolbarButton aria-label="Close panel" appearance="subtle" icon={<Dismiss24Regular />} />
        </ToolbarGroup>
      </Toolbar>
    </DrawerHeaderNavigation>

    <DrawerHeaderTitle>Title goes here</DrawerHeaderTitle>
  </DrawerHeader>
);
const ExampleDrawerFooter = () => (
  <DrawerFooter>
    <Button appearance="primary">Primary</Button>
    <Button>Secondary</Button>
  </DrawerFooter>
);

const ExampleDrawer = ({
  Component = Drawer,
  ...props
}: { Component?: React.ComponentType<DrawerProps> } & DrawerProps) => (
  <Component open {...props}>
    <ExampleDrawerHeader />

    <DrawerBody>
      <p>Drawer content</p>
    </DrawerBody>

    <ExampleDrawerFooter />
  </Component>
);

const ExampleLargeContentScrollDrawer = ({
  Component = Drawer,
  ...props
}: { Component?: React.ComponentType<DrawerProps> } & DrawerProps) => (
  <Component open {...props}>
    <ExampleDrawerHeader />

    <DrawerBody>
      {new Array(20).fill(0).map((_, index) => (
        <p key={index}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, cumque veniam quis unde laboriosam
          libero harum aspernatur dolorem, laudantium adipisci sit similique repudiandae, ducimus vero facilis!
          Praesentium placeat sed accusamus!
        </p>
      ))}
    </DrawerBody>

    <ExampleDrawerFooter />
  </Component>
);

const ExampleInlineDrawer = (props: InlineDrawerProps) => {
  const pageContent = (
    <div style={{ flex: 1, padding: '16px' }}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ullam repellat quis explicabo, alias consectetur
      rem quas iure assumenda cum ad esse hic itaque obcaecati? Nisi earum quo adipisci corrupti.
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      {props.position === 'end' && pageContent}
      <ExampleDrawer Component={InlineDrawer} {...props} style={{ height: '500px' }} />
      {props.position === 'start' && pageContent}
    </div>
  );
};

export const Default = () => <ExampleDrawer />;

Default.storyName = 'default drawer';

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Overlay = () => <ExampleDrawer Component={OverlayDrawer} />;

Overlay.storyName = 'overlay drawer';

export const OverlayDarkMode = getStoryVariant(Overlay, DARK_MODE);
export const OverlayHighContrast = getStoryVariant(Overlay, HIGH_CONTRAST);
export const OverlayRTL = getStoryVariant(Overlay, RTL);

export const PositionStartOverlay = () => <ExampleDrawer Component={OverlayDrawer} position="start" />;

PositionStartOverlay.storyName = 'overlay drawer position start';

export const PositionStartOverlayDarkMode = getStoryVariant(PositionStartOverlay, DARK_MODE);
export const PositionStartOverlayHighContrast = getStoryVariant(PositionStartOverlay, HIGH_CONTRAST);
export const PositionStartOverlayRTL = getStoryVariant(PositionStartOverlay, RTL);

export const PositionEndOverlay = () => <ExampleDrawer Component={OverlayDrawer} position="end" />;

PositionEndOverlay.storyName = 'overlay drawer position end';

export const PositionEndOverlayDarkMode = getStoryVariant(PositionEndOverlay, DARK_MODE);
export const PositionEndOverlayHighContrast = getStoryVariant(PositionEndOverlay, HIGH_CONTRAST);
export const PositionEndOverlayRTL = getStoryVariant(PositionEndOverlay, RTL);

export const NonModalOverlay = () => <ExampleDrawer Component={OverlayDrawer} modalType="non-modal" />;

NonModalOverlay.storyName = 'overlay drawer non modal';

export const NonModalOverlayDarkMode = getStoryVariant(NonModalOverlay, DARK_MODE);
export const NonModalOverlayHighContrast = getStoryVariant(NonModalOverlay, HIGH_CONTRAST);
export const NonModalOverlayRTL = getStoryVariant(NonModalOverlay, RTL);

export const AlertOverlay = () => <ExampleDrawer Component={OverlayDrawer} modalType="alert" />;

AlertOverlay.storyName = 'overlay drawer alert';

export const AlertOverlayDarkMode = getStoryVariant(AlertOverlay, DARK_MODE);
export const AlertOverlayHighContrast = getStoryVariant(AlertOverlay, HIGH_CONTRAST);
export const AlertOverlayRTL = getStoryVariant(AlertOverlay, RTL);

export const MediumOverlay = () => <ExampleDrawer Component={OverlayDrawer} size="medium" />;

MediumOverlay.storyName = 'overlay drawer medium';

export const MediumOverlayDarkMode = getStoryVariant(MediumOverlay, DARK_MODE);
export const MediumOverlayHighContrast = getStoryVariant(MediumOverlay, HIGH_CONTRAST);
export const MediumOverlayRTL = getStoryVariant(MediumOverlay, RTL);

export const LargeOverlay = () => <ExampleDrawer Component={OverlayDrawer} size="large" />;

LargeOverlay.storyName = 'overlay drawer large';

export const LargeOverlayDarkMode = getStoryVariant(LargeOverlay, DARK_MODE);
export const LargeOverlayHighContrast = getStoryVariant(LargeOverlay, HIGH_CONTRAST);
export const LargeOverlayRTL = getStoryVariant(LargeOverlay, RTL);

export const FullOverlay = () => <ExampleDrawer Component={OverlayDrawer} size="full" />;

FullOverlay.storyName = 'overlay drawer full';

export const FullOverlayDarkMode = getStoryVariant(FullOverlay, DARK_MODE);
export const FullOverlayHighContrast = getStoryVariant(FullOverlay, HIGH_CONTRAST);
export const FullOverlayRTL = getStoryVariant(FullOverlay, RTL);

export const Inline = () => <ExampleInlineDrawer />;

Inline.storyName = 'inline drawer';

export const InlineDarkMode = getStoryVariant(Inline, DARK_MODE);
export const InlineHighContrast = getStoryVariant(Inline, HIGH_CONTRAST);
export const InlineRTL = getStoryVariant(Inline, RTL);

export const PositionStartInline = () => <ExampleInlineDrawer position="start" />;

PositionStartInline.storyName = 'inline drawer position start';

export const PositionStartInlineDarkMode = getStoryVariant(PositionStartInline, DARK_MODE);
export const PositionStartInlineHighContrast = getStoryVariant(PositionStartInline, HIGH_CONTRAST);
export const PositionStartInlineRTL = getStoryVariant(PositionStartInline, RTL);

export const PositionEndInline = () => <ExampleInlineDrawer position="end" />;

PositionEndInline.storyName = 'inline drawer position end';

export const PositionEndInlineDarkMode = getStoryVariant(PositionEndInline, DARK_MODE);
export const PositionEndInlineHighContrast = getStoryVariant(PositionEndInline, HIGH_CONTRAST);
export const PositionEndInlineRTL = getStoryVariant(PositionEndInline, RTL);

export const SeparatorPositionEndInline = () => <ExampleInlineDrawer separator position="end" />;

SeparatorPositionEndInline.storyName = 'inline drawer separator position end';

export const SeparatorPositionEndInlineDarkMode = getStoryVariant(SeparatorPositionEndInline, DARK_MODE);
export const SeparatorPositionEndInlineHighContrast = getStoryVariant(SeparatorPositionEndInline, HIGH_CONTRAST);
export const SeparatorPositionEndInlineRTL = getStoryVariant(SeparatorPositionEndInline, RTL);

export const SeparatorPositionStartInline = () => <ExampleInlineDrawer separator position="start" />;

SeparatorPositionStartInline.storyName = 'inline drawer separator position start';

export const SeparatorPositionStartInlineDarkMode = getStoryVariant(SeparatorPositionStartInline, DARK_MODE);
export const SeparatorPositionStartInlineHighContrast = getStoryVariant(SeparatorPositionStartInline, HIGH_CONTRAST);
export const SeparatorPositionStartInlineRTL = getStoryVariant(SeparatorPositionStartInline, RTL);

export const MediumInline = () => <ExampleInlineDrawer size="medium" />;

MediumInline.storyName = 'inline drawer large';

export const MediumInlineDarkMode = getStoryVariant(MediumInline, DARK_MODE);
export const MediumInlineHighContrast = getStoryVariant(MediumInline, HIGH_CONTRAST);
export const MediumInlineRTL = getStoryVariant(MediumInline, RTL);

export const LargeInline = () => <ExampleInlineDrawer size="large" />;

LargeInline.storyName = 'inline drawer large';

export const LargeInlineDarkMode = getStoryVariant(LargeInline, DARK_MODE);
export const LargeInlineHighContrast = getStoryVariant(LargeInline, HIGH_CONTRAST);
export const LargeInlineRTL = getStoryVariant(LargeInline, RTL);

export const FullInline = () => <ExampleInlineDrawer size="full" />;

FullInline.storyName = 'inline drawer full';

export const FullInlineDarkMode = getStoryVariant(FullInline, DARK_MODE);
export const FullInlineHighContrast = getStoryVariant(FullInline, HIGH_CONTRAST);
export const FullInlineRTL = getStoryVariant(FullInline, RTL);

export const LargeContentScrollInline = () => (
  <div style={{ display: 'flex' }}>
    <ExampleLargeContentScrollDrawer Component={InlineDrawer} style={{ height: '500px' }} />
    <div style={{ flex: 1, padding: '16px' }}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ullam repellat quis explicabo, alias consectetur
      rem quas iure assumenda cum ad esse hic itaque obcaecati? Nisi earum quo adipisci corrupti.
    </div>
  </div>
);

LargeContentScrollInline.storyName = 'inline drawer large content scroll';

export const LargeContentScrollInlineDarkMode = getStoryVariant(LargeContentScrollInline, DARK_MODE);
export const LargeContentScrollInlineHighContrast = getStoryVariant(LargeContentScrollInline, HIGH_CONTRAST);
export const LargeContentScrollInlineRTL = getStoryVariant(LargeContentScrollInline, RTL);

export const LargeContentScrollOverlay = () => <ExampleLargeContentScrollDrawer Component={OverlayDrawer} />;

LargeContentScrollOverlay.storyName = 'overlay drawer large content scroll';

export const LargeContentScrollOverlayDarkMode = getStoryVariant(LargeContentScrollOverlay, DARK_MODE);
export const LargeContentScrollOverlayHighContrast = getStoryVariant(LargeContentScrollOverlay, HIGH_CONTRAST);
export const LargeContentScrollOverlayRTL = getStoryVariant(LargeContentScrollOverlay, RTL);
