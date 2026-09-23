import { getDependencies, openInStackBlitz, scaffoldVite } from './sandbox';
import type { SandboxData } from './sandbox';

function example(): SandboxData {
  return {
    storyFile: `import { Button } from '@fluentui/react-headless-components-preview/button';
import { AddRegular } from '@fluentui/react-icons';
import styles from './button.module.css';
export const Default = () => <Button className={styles.button} icon={<AddRegular />}>Create</Button>;`,
    storyExportToken: 'Default',
    title: 'Fluent UI',
    description: 'Headless Button',
    requiredDependencies: { react: '^19', 'react-dom': '^19', '@fluentui/react-components': '^9.0.0' },
    optionalDependencies: { '@fluentui/react-icons': '^2.0.0' },
    devDependencies: { '@types/react': '^19', '@types/react-dom': '^19', typescript: '~5.7.0' },
    cssModuleSources: {
      cssModules: [{ name: 'button.module.css', source: '.button { display: flex; }' }],
      tokensSource: ':root { --fixture: initial; }',
    },
  };
}

describe('docsite sandbox export', () => {
  it('detects package names from static and dynamic imports while ignoring local and React subpaths', () => {
    const data = example();
    data.storyFile += `\nimport('lodash/debounce');\nimport('./local');\nimport 'react/jsx-runtime';`;
    expect(getDependencies(data)).toEqual({
      react: '^19',
      'react-dom': '^19',
      '@fluentui/react-components': '^9.0.0',
      '@fluentui/react-headless-components-preview': 'latest',
      '@fluentui/react-icons': '^2.0.0',
      lodash: 'latest',
    });
  });

  it('generates a standalone Vite project without depending on the Storybook addon scaffold', () => {
    const files = scaffoldVite(example());
    expect(Object.keys(files)).toEqual(
      expect.arrayContaining([
        'index.html',
        'src/index.tsx',
        'src/App.tsx',
        'src/example.tsx',
        'vite.config.ts',
        'tsconfig.json',
        'tsconfig.node.json',
        'package.json',
        '.stackblitzrc',
      ]),
    );
    expect(files['src/index.tsx']).toContain("from 'react-dom/client'");
    expect(files['src/App.tsx']).toContain('FluentProvider');
    expect(JSON.parse(files['tsconfig.json']).compilerOptions.moduleResolution).toBe('bundler');
    expect(JSON.parse(files['package.json']).scripts.build).toBe('tsc && vite build');
  });

  it('submits shared scaffold output, React overrides and headless CSS through the supplied document', () => {
    const host = document.implementation.createHTMLDocument('sandbox host');
    let fields: Record<string, string> = {};
    const submit = jest.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(function (this: HTMLFormElement) {
      expect(this.ownerDocument).toBe(host);
      expect(host.body.contains(this)).toBe(true);
      expect(this.action).toBe('https://stackblitz.com/run?file=src%2Fexample.tsx');
      expect(this.method).toBe('post');
      expect(this.target).toBe('_blank');
      fields = Object.fromEntries(Array.from(this.querySelectorAll('input'), input => [input.name, input.value]));
    });

    openInStackBlitz(example(), host);

    expect(submit).toHaveBeenCalledTimes(1);
    expect(fields['project[template]']).toBe('node');
    expect(fields['project[description]']).toBe('# Headless Button');
    const manifest = JSON.parse(fields['project[files][package.json]']);
    expect(manifest.dependencies).toEqual({
      react: '^19',
      'react-dom': '^19',
      '@fluentui/react-components': '^9.0.0',
      '@fluentui/react-headless-components-preview': 'latest',
      '@fluentui/react-icons': '^2.0.0',
    });
    expect(manifest.devDependencies).toMatchObject({
      '@types/react': '^19',
      '@types/react-dom': '^19',
      typescript: '~5.7.0',
    });
    expect(fields['project[files][src/example.tsx]']).toContain('export { Default as Example }');
    expect(fields['project[files][src/example.tsx]']).toContain("'./styles/button.module.css'");
    expect(fields['project[files][src/styles/button.module.css]']).toBe('.button { display: flex; }');
    expect(fields['project[files][src/styles/tokens.css]']).toBe(':root { --fixture: initial; }');
    expect(fields['project[files][src/App.tsx]']).toContain("import './styles/tokens.css'");
    expect(host.body.querySelector('form')).toBeNull();
    expect(document.body.querySelector('form')).toBeNull();
  });

  it('removes the form and propagates submission failures for the UI to report', () => {
    const host = document.implementation.createHTMLDocument('sandbox host');
    jest.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {
      throw new Error('Submission blocked');
    });
    expect(() => openInStackBlitz(example(), host)).toThrow('Submission blocked');
    expect(host.body.querySelector('form')).toBeNull();
  });
});
