import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/tabs.html';
import { FASTTab } from './tab';
import { FASTTabPanel } from './tab-panel';
import { FASTTabs } from './';

// Prevent tree-shaking
FASTTab;
FASTTabPanel;
FASTTabs;
FASTDesignSystemProvider;

export default {
  title: 'Tabs',
};

export const Base = (): string => Examples;
