export * from './index';
export * from '@microsoft/fast-element';
export * from '@microsoft/fast-foundation';

// Re-export Design system to avoid conflicts with the new class from FAST Foundation
// TODO: Update name to FluentDesignSystem once DI is implemented and published from FAST
export { DesignSystem, DesignSystemDefaults } from './fluent-design-system';
