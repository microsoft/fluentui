import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, addProjectConfiguration, readJson, writeJson } from '@nx/devkit';

import generator from './index';
import { PackageJson } from '../../types';

describe('verify-peer-dependencies generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'info').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('missing-peer-forward (opt-in)', () => {
    const checks = 'missing-peer-forward';

    it('should fail when a package does not forward a peer required by its dependency', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'missing-peer-forward' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });

    it('should pass when the peer is forwarded', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree, { checks })).resolves.toBeUndefined();
    });

    it('should pass when the peer is provided as a hard dependency, terminating the chain', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'app', {
        dependencies: { '@proj/react-portal': '*', 'react-dom': '18.3.1' },
      });

      await expect(generator(tree, { checks })).resolves.toBeUndefined();
    });

    it('should ignore optional peers', async () => {
      setupPackage(tree, 'react-portal', {
        peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' },
        peerDependenciesMeta: { 'react-dom': { optional: true } },
      });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks })).resolves.toBeUndefined();
    });

    it('should not verify private packages', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'private-app', {
        private: true,
        dependencies: { '@proj/react-portal': '*' },
      });

      await expect(generator(tree, { checks })).resolves.toBeUndefined();
    });

    it('should reject devDependencies for publishable packages', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        devDependencies: { 'react-dom': '18.3.1' },
      });

      await expect(generator(tree, { checks })).rejects.toThrow('peer dependency violations found (1)');
    });
  });

  describe('--project filter', () => {
    it('should only verify the requested project', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });
      setupPackage(tree, 'react-menu', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'all', project: 'react-dialog' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });

    it('should accept a package name as well as a project name', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'all', project: '@proj/react-dialog' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });

    it('should pass when the scoped project is clean even though others are not', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });
      setupPackage(tree, 'react-menu', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree, { checks: 'all', project: 'react-menu' })).resolves.toBeUndefined();
    });

    it('should throw on an unknown project rather than silently verifying nothing', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });

      await expect(generator(tree, { checks: 'all', project: 'does-not-exist' })).rejects.toThrow(
        'Unknown project(s): does-not-exist',
      );
    });
  });

  describe('incompatible-peer-range', () => {
    it('should detect a range unbounded below', async () => {
      // `*` contributes no lower comparator, so probing only comparator versions would miss that
      // it permits everything beneath the required floor
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '*' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should detect an upper-bounded range that is still unbounded below', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '<20.0.0' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should validate the range of an optional peer that this package declares', async () => {
      // optional means the peer may be absent, not that its version constraint disappears
      setupPackage(tree, 'react-portal', {
        peerDependencies: { 'react-dom': '^18.0.0' },
        peerDependenciesMeta: { 'react-dom': { optional: true } },
      });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { 'react-dom': '^19.0.0' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should still not require forwarding of an optional peer', async () => {
      setupPackage(tree, 'react-portal', {
        peerDependencies: { 'react-dom': '^18.0.0' },
        peerDependenciesMeta: { 'react-dom': { optional: true } },
      });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'all' })).resolves.toBeUndefined();
    });

    it('should fail when the forwarded range is wider than what the dependency supports', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>=16.8.0 <20.0.0' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should pass when the forwarded range is narrower than what the dependency supports', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.8.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree)).resolves.toBeUndefined();
    });

    it('should treat a union of carets as its combined range', async () => {
      // `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0` is exactly `>=16.8.0 <20.0.0`.
      // semver.subset() reports this as a violation because it compares against each
      // comparator set in isolation.
      setupPackage(tree, 'use-sync-external-store-like', {
        peerDependencies: { react: '^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0' },
      });
      setupPackage(tree, 'react-positioning', {
        dependencies: { '@proj/use-sync-external-store-like': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree)).resolves.toBeUndefined();
    });

    it('should still detect a union of carets that stops short of the declared range', async () => {
      // missing `^19.0.0`, so react 19 is promised but unsupported
      setupPackage(tree, 'use-sync-external-store-like', {
        peerDependencies: { react: '^16.8.0 || ^17.0.0 || ^18.0.0' },
      });
      setupPackage(tree, 'react-positioning', {
        dependencies: { '@proj/use-sync-external-store-like': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should detect an exclusive lower bound that escapes the required range', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.15.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>16.14.0' },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });
  });

  describe('manifest validation', () => {
    it('should fail on an invalid semver range', async () => {
      setupPackage(tree, 'react-one', { peerDependencies: { react: 'not-a-range' } });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should fail on peerDependenciesMeta without a matching peerDependencies entry', async () => {
      setupPackage(tree, 'react-one', {
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
        peerDependenciesMeta: { 'react-dom': { optional: true } },
      });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });
  });

  describe('--peers filter', () => {
    it('should only check the requested peers', async () => {
      setupPackage(tree, 'react-portal', {
        peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0', scheduler: '>=0.19.0' },
      });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'all', peers: 'scheduler' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });
  });

  describe('--tag filter', () => {
    it('should only verify projects carrying the tag', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } }, ['vNext']);
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } }, ['vNext']);
      setupPackage(tree, 'legacy-thing', { dependencies: { '@proj/react-portal': '*' } }, ['v8']);

      await expect(generator(tree, { checks: 'all', tag: 'vNext' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });

    it('should pass when every violation sits outside the tag', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } }, ['vNext']);
      setupPackage(tree, 'legacy-thing', { dependencies: { '@proj/react-portal': '*' } }, ['v8']);

      await expect(generator(tree, { checks: 'all', tag: 'vNext' })).resolves.toBeUndefined();
    });

    it('should throw on an unknown tag rather than silently verifying nothing', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } }, ['vNext']);

      await expect(generator(tree, { checks: 'all', tag: 'nope' })).rejects.toThrow('Unknown tag(s): nope');
    });
  });

  describe('optional peer metadata', () => {
    it('should not require forwarding of a peer marked optional by the dependency', async () => {
      setupPackage(tree, 'react-utilities', {
        peerDependencies: { '@types/react': '>=16.14.0 <20.0.0', react: '>=16.14.0 <20.0.0' },
        peerDependenciesMeta: { '@types/react': { optional: true } },
      });
      setupPackage(tree, 'react-button', {
        dependencies: { '@proj/react-utilities': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree)).resolves.toBeUndefined();
    });
  });

  describe('default checks', () => {
    it('should not report missing-peer-forward by default', async () => {
      // hoisted and isolated-mode installers resolve the peer from the nearest ancestor that
      // provides it, so forwarding is only required under Yarn PnP strict
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree)).resolves.toBeUndefined();
    });

    it('should still report the installer-independent checks by default', async () => {
      setupPackage(tree, 'react-one', { peerDependencies: { react: 'not-a-range' } });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should report missing-peer-forward when explicitly requested', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await expect(generator(tree, { checks: 'all' })).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should throw on an unknown check', async () => {
      setupPackage(tree, 'react-one', {});

      await expect(generator(tree, { checks: 'nonsense' })).rejects.toThrow('Unknown check(s): nonsense');
    });
  });

  describe('--verbose', () => {
    // nx strips `--verbose` from the generator schema but sets NX_VERBOSE_LOGGING, which is what
    // logger.verbose is gated on
    beforeEach(() => {
      process.env.NX_VERBOSE_LOGGING = 'true';
    });

    afterEach(() => {
      delete process.env.NX_VERBOSE_LOGGING;
    });

    it('should report what was verified and what was skipped', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });
      setupPackage(tree, 'private-app', { private: true, dependencies: { '@proj/react-portal': '*' } });

      const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);

      await expect(generator(tree)).resolves.toBeUndefined();

      const output = log.mock.calls.flat().join('\n');

      expect(output).toContain('scope');
      expect(output).toContain('skipped');
      expect(output).toContain('private');
      expect(output).toContain('@proj/react-dialog');
      expect(output).toContain('required by @proj/react-portal');
      expect(output).toContain('peer requirement(s) checked');
    });

    it('should not change the outcome', async () => {
      setupPackage(tree, 'react-one', { peerDependencies: { react: 'not-a-range' } });

      await expect(generator(tree)).rejects.toThrow('peer dependency violations found (1)');
    });

    it('should stay silent without NX_VERBOSE_LOGGING', async () => {
      delete process.env.NX_VERBOSE_LOGGING;
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });

      const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);

      await generator(tree);

      expect(log.mock.calls.flat().join('\n')).not.toContain('peer requirement(s) checked');
    });
  });

  describe('unverified-peer-range', () => {
    it('should be off by default', async () => {
      setupPackage(tree, 'react-one', {
        dependencies: { 'external-dep': '^1.0.0' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });
      writeJson(tree, 'node_modules/external-dep/package.json', {
        name: 'external-dep',
        version: '1.5.0',
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree)).resolves.toBeUndefined();
    });

    it('should report when the declared range permits a version that was not inspected', async () => {
      setupPackage(tree, 'react-one', {
        dependencies: { 'external-dep': '^1.0.0' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });
      writeJson(tree, 'node_modules/external-dep/package.json', {
        name: 'external-dep',
        version: '1.5.0',
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree, { checks: 'unverified-peer-range' })).rejects.toThrow(
        'peer dependency violations found (1)',
      );
    });

    it('should stay silent when the declared floor is the inspected version', async () => {
      setupPackage(tree, 'react-one', {
        dependencies: { 'external-dep': '1.5.0' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });
      writeJson(tree, 'node_modules/external-dep/package.json', {
        name: 'external-dep',
        version: '1.5.0',
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree, { checks: 'unverified-peer-range' })).resolves.toBeUndefined();
    });

    it('should not apply to workspace dependencies', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { react: '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '^9.0.0' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await expect(generator(tree, { checks: 'unverified-peer-range' })).resolves.toBeUndefined();
    });
  });

  describe('--fix', () => {
    it('should enable missing-peer-forward even though it is not a default check', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      const { readPackageJson } = setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
      });

      await generator(tree, { fix: true });

      expect(readPackageJson().peerDependencies).toEqual({ 'react-dom': '>=16.14.0 <20.0.0' });
    });
    it('should add the missing peer using the range required by the dependency', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      const { readPackageJson } = setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>=16.14.0 <20.0.0' },
      });

      await generator(tree, { checks: 'all', fix: true });

      expect(readPackageJson().peerDependencies).toEqual({
        react: '>=16.14.0 <20.0.0',
        'react-dom': '>=16.14.0 <20.0.0',
      });
    });

    it('should pick the narrowest range when dependencies disagree', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.8.0 <20.0.0' } });
      setupPackage(tree, 'react-combobox', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      const { readPackageJson } = setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*', '@proj/react-combobox': '*' },
      });

      await generator(tree, { checks: 'all', fix: true });

      expect(readPackageJson().peerDependencies).toEqual({ 'react-dom': '>=16.14.0 <20.0.0' });
    });

    it('should be idempotent', async () => {
      setupPackage(tree, 'react-portal', { peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-portal': '*' } });

      await generator(tree, { checks: 'all', fix: true });
      await expect(generator(tree, { checks: 'all' })).resolves.toBeUndefined();
    });

    it('should persist fixes even when unfixable violations remain', async () => {
      // an incompatible range cannot be auto-fixed; the missing forward still must be written
      setupPackage(tree, 'react-portal', {
        peerDependencies: { 'react-dom': '>=16.14.0 <20.0.0', react: '>=16.14.0 <20.0.0' },
      });
      const { readPackageJson } = setupPackage(tree, 'react-dialog', {
        dependencies: { '@proj/react-portal': '*' },
        peerDependencies: { react: '>=16.8.0 <20.0.0' },
      });

      await expect(generator(tree, { checks: 'all', fix: true })).resolves.toBeUndefined();

      expect(readPackageJson().peerDependencies).toEqual({
        react: '>=16.8.0 <20.0.0',
        'react-dom': '>=16.14.0 <20.0.0',
      });
    });

    it('should resolve a cascading chain in a single run', async () => {
      // scheduler originates in the leaf and has to reach the top of the chain
      setupPackage(tree, 'react-context-selector', { peerDependencies: { scheduler: '>=0.19.0' } });
      setupPackage(tree, 'react-menu', { dependencies: { '@proj/react-context-selector': '*' } });
      setupPackage(tree, 'react-dialog', { dependencies: { '@proj/react-menu': '*' } });
      const { readPackageJson } = setupPackage(tree, 'react-components', {
        dependencies: { '@proj/react-dialog': '*' },
      });

      await generator(tree, { checks: 'all', fix: true });

      expect(readPackageJson().peerDependencies).toEqual({ scheduler: '>=0.19.0' });
      await expect(generator(tree, { checks: 'all' })).resolves.toBeUndefined();
    });
  });
});

function setupPackage(tree: Tree, name: string, packageJson: Partial<PackageJson>, tags: string[] = []) {
  const root = `packages/${name}`;

  addProjectConfiguration(tree, name, { root, projectType: 'library', tags });

  const packageJsonPath = `${root}/package.json`;

  writeJson<Partial<PackageJson>>(tree, packageJsonPath, {
    name: `@proj/${name}`,
    version: '9.0.0',
    ...packageJson,
  });

  return {
    readPackageJson: () => readJson<PackageJson>(tree, packageJsonPath),
  };
}
