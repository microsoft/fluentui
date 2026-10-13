Headless Drawer provides supplementary content without built-in styles. Overlay drawers use native dialogs; inline drawers render in the page flow.

The overlay story uses exit keyframes with `unmountOnClose`. Focus restores immediately; removal waits for finite surface and backdrop motion. Display keyframes and discrete overlay transitions retain visibility during exit; reduced-motion styles disable motion.

Overlay NavDrawer shares this lifecycle. Inline drawers do not delay removal; the Inline story uses `unmountOnClose={false}` to animate while remaining mounted.
