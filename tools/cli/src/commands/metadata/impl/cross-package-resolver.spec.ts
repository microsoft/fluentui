import type { MetadataOutput } from './types';
import { loadDependencyMetadata, buildCrossPackageRef } from './cross-package-resolver';

describe('cross-package-resolver', () => {
  const mockMetadata: MetadataOutput = {
    package: { name: '@fluentui/react-utilities', version: '1.0.0' },
    legend: {},
    categories: {
      components: {},
      hooks: {},
      types: {
        ComponentProps: {
          name: 'ComponentProps',
          description: 'Base component props type.',
          typeSignature: '...',
          tags: {},
          kind: 'type-alias',
          members: {},
        },
      },
      others: {
        slot: {
          name: 'slot',
          description: 'Slot utility.',
          typeSignature: '...',
          tags: {},
          kind: 'function',
        },
      },
    },
  };

  describe('buildCrossPackageRef', () => {
    it('should return a $ref when the symbol exists in types', () => {
      const result = buildCrossPackageRef('@fluentui/react-utilities', 'ComponentProps', mockMetadata);

      expect(result).toEqual({ $ref: '@fluentui/react-utilities#/categories/types/ComponentProps' });
    });

    it('should return a $ref when the symbol exists in others', () => {
      const result = buildCrossPackageRef('@fluentui/react-utilities', 'slot', mockMetadata);

      expect(result).toEqual({ $ref: '@fluentui/react-utilities#/categories/others/slot' });
    });

    it('should return null when the symbol does not exist', () => {
      const result = buildCrossPackageRef('@fluentui/react-utilities', 'NonExistent', mockMetadata);

      expect(result).toBeNull();
    });
  });

  describe('loadDependencyMetadata', () => {
    it('should return null for a non-existent package', () => {
      const result = loadDependencyMetadata('__non_existent_package__', '/');

      expect(result).toBeNull();
    });
  });
});
