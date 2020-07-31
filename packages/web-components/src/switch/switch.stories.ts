import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/switch.html';
import { FASTSwitch } from './';

// Prevent tree-shaking
FASTSwitch;
FASTDesignSystemProvider;

export default {
  title: 'Switch',
};

export const Switch = (): string => Examples;
