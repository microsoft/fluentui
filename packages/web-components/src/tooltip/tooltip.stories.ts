import { FluentDesignSystemProvider } from '../design-system-provider';
import { STORY_RENDERED } from '@storybook/core-events';
import TooltipTemplate from './fixtures/tooltip.html';
import { FluentTooltip } from '.';
import addons from '@storybook/addons';

// Prevent tree-shaking
FluentTooltip;
FluentDesignSystemProvider;

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('tooltip')) {
    connectAnchors();
  }
});

function onAnchorMouseEnter(e: MouseEvent): void {
  if (e.target === null) {
    return;
  }
  const tooltipInstance: HTMLElement | null = document.getElementById('tooltip-anchor-switch');
  (tooltipInstance as FluentTooltip).anchorElement = e.target as HTMLElement;
}

function connectAnchors(): void {
  document.querySelectorAll('fast-button').forEach(el => {
    if (el !== null && el.id.startsWith('anchor-anchor-switch')) {
      (el as HTMLElement).onmouseenter = onAnchorMouseEnter;
    }
  });
}

export default {
  title: 'Tooltip',
};

export const Tooltip = (): string => TooltipTemplate;
