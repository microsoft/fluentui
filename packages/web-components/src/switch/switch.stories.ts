import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/switch.html';
import { FluentSwitch } from './';

// Prevent tree-shaking
FluentSwitch;
FluentDesignSystemProvider;

export default {
  title: 'Switch',
};

export const Switch = (): string => Examples;
