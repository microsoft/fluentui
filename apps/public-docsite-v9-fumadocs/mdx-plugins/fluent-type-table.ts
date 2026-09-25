import { relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGenerator } from 'fumadocs-typescript';
import type { Generator, GeneratorOptions, GenerateOptions, GeneratedDoc, DocEntry } from 'fumadocs-typescript';

const componentsRoot = fileURLToPath(new URL('../../../packages/react-components/', import.meta.url));

function isFluentProperty(symbol: Parameters<NonNullable<GenerateOptions['transform']>>[2]): boolean {
  return symbol.getDeclarations().some(declaration => {
    const path = relative(componentsRoot, declaration.getSourceFile().getFilePath()).replaceAll('\\', '/');
    return !isAbsolute(path) && !path.startsWith('../') && !path.includes('/node_modules/') && path.includes('/src/');
  });
}

export function createFluentTypeTableGenerator(options: GeneratorOptions = {}): Generator {
  const generator = createGenerator({ ...options, cache: false });

  async function generate<T extends GenerateOptions>(run: (options: T) => Promise<GeneratedDoc[]>, runOptions: T) {
    const excluded = new WeakSet<DocEntry>();

    const filteredOptions: T = {
      ...runOptions,
      transform(entry, type, symbol) {
        if (!isFluentProperty(symbol)) {
          excluded.add(entry);
        }

        if (/\bWithSlotShorthandValue\s*</.test(entry.type)) {
          const element = entry.type.match(/as\?:\s*"([^"]+)"/)?.[1];
          entry.type = element ? `Slot<"${element}">` : 'Slot';
          entry.simplifiedType = entry.type;
        }

        runOptions?.transform?.call(this, entry, type, symbol);
      },
    };

    const docs = await run(filteredOptions);

    return docs.map(doc => ({
      ...doc,
      entries: doc.entries.filter(entry => !excluded.has(entry)).sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }

  return {
    generateDocumentation: (file, name, runOptions = {}) =>
      generate(filteredOptions => generator.generateDocumentation(file, name, filteredOptions), runOptions),
    generateTypeTable: (props, runOptions = {}) =>
      generate(filteredOptions => generator.generateTypeTable(props, filteredOptions), runOptions),
  };
}
