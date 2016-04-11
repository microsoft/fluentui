const NavProps = [
  { name: 'groups', type: 'INavLinkGroup[]', defaultValue: 'null', description: 'A collection of link groups to display in the navigation bar' },
  { name: 'onRenderLink', type: 'Function', defaultValue: 'Default link rendering', description: 'Used to customize how content inside the link tag is rendered' },
  { name: 'onLinkClick', type: 'Function', defaultValue: 'null', description: 'Function callback invoked when a link in the navigation is clicked' },
  { name: 'isOnTop', type: 'boolean', defaultValue: 'false', description: 'Indicates whether the navigation component renders on top of other content in the UI' }
];

export default NavProps;
