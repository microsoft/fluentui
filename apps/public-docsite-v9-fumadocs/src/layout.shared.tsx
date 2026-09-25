import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ExternalLink, Github } from 'lucide-react';

export const baseOptions = {
  nav: {
    url: '/react',
    title: (
      <img
        src={`${import.meta.env.BASE_URL}fui-logo.svg`}
        width={163}
        height={29}
        alt="Fluent UI home"
        className="dark:invert"
      />
    ),
  },
  links: [
    {
      text: 'Headless',
      url: '/headless',
      icon: <ExternalLink aria-hidden="true" />,
    },
    {
      text: 'Charts',
      url: 'https://storybooks.fluentui.dev/charts/',
      external: true,
      icon: <ExternalLink aria-hidden="true" />,
    },
    {
      type: 'icon',
      text: 'GitHub',
      label: 'Fluent UI on GitHub',
      url: 'https://github.com/microsoft/fluentui',
      external: true,
      // The link supplies the name; Fumadocs' default GitHub icon lacks alternative text.
      icon: <Github aria-hidden="true" />,
    },
  ],
} satisfies BaseLayoutProps;

export const headlessOptions = {
  ...baseOptions,
  nav: {
    url: '/headless',
    title: (
      <img
        src={`${import.meta.env.BASE_URL}fui-headless.svg`}
        width={135.2}
        height={32}
        alt="Fluent UI Headless home"
        className="dark:invert"
      />
    ),
  },
  links: baseOptions.links.filter(
    link => link.url !== '/headless' && link.url !== 'https://storybooks.fluentui.dev/charts/',
  ),
} satisfies BaseLayoutProps;

export const headlessHomeOptions = {
  ...headlessOptions,
  links: [
    { text: 'Docs', url: '/headless/getting-started' },
    { text: 'Components', url: '/headless/components', active: 'nested-url' },
    { text: 'React v9', url: '/react/getting-started' },
    ...headlessOptions.links,
  ],
} satisfies BaseLayoutProps;

export const homeOptions = {
  ...baseOptions,
  links: [
    { text: 'Docs', url: '/react/getting-started' },
    { text: 'Components', url: '/react/components', active: 'nested-url' },
    ...baseOptions.links,
  ],
} satisfies BaseLayoutProps;
