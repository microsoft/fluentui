import { formatMetadataAsMarkdown } from './markdown-formatter';
import type { MetadataOutput } from './types';

describe('formatMetadataAsMarkdown', () => {
  it('should escape dynamic Markdown table cell content', () => {
    const data: MetadataOutput = {
      package: { name: '@fluentui/example', version: '1.0.0' },
      legend: {
        types: { name: 'Type | API', description: 'A <type>\ncategory' },
      },
      categories: {
        components: {},
        hooks: {
          useExample: {
            name: 'useExample',
            description: '',
            typeSignature: '() => void',
            tags: {},
            parameters: [
              { name: 'value', type: 'string | undefined', required: false, description: 'First | second\nline' },
            ],
            returnType: 'void',
          },
        },
        types: {
          ExampleProps: {
            name: 'ExampleProps',
            description: '',
            typeSignature: '{}',
            tags: {},
            kind: 'interface',
            members: {
              value: {
                name: 'value',
                type: 'string | undefined',
                required: false,
                defaultValue: '<default> | none',
                description: 'A <script>value</script> | fallback',
              },
            },
          },
        },
        others: {},
      },
      externalReferences: {
        '@fluentui/example-dependency': {
          metadataRef: '@fluentui/example-dependency/metadata.json',
          symbols: { 'External|Type': { inline: 'string | number' } },
        },
      },
    };

    const output = formatMetadataAsMarkdown(data);

    expect(output).toContain('Type \\| API');
    expect(output).toContain('A &lt;type&gt; category');
    expect(output).toContain('`string \\| undefined`');
    expect(output).toContain('First \\| second line');
    expect(output).toContain('`&lt;default&gt; \\| none`');
    expect(output).toContain('A &lt;script&gt;value&lt;/script&gt; \\| fallback');
    expect(output).toContain('`External\\|Type`');
    expect(output).toContain('`string \\| number`');
  });
});
