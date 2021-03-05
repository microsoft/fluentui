import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/tabs.html';
import { FluentTab } from './tab';
import { FluentTabPanel } from './tab-panel';
import { FluentTabs } from './';

// Prevent tree-shaking
FluentTab;
FluentTabPanel;
FluentTabs;
FluentDesignSystemProvider;

export default {
  title: 'Tabs',
};

export const Base = (): string => Examples;
