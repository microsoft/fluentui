'use client';

const portalMountNodeClassNames = {
  root: 'fui-PortalMountNode',
};

/**
 * Applies class names to the Portal mount node
 */
export const usePortalMountNodeClassName = (themeClassName: string, className?: string) => {
  return [portalMountNodeClassNames.root, themeClassName, className].filter(Boolean).join(' ');
};
