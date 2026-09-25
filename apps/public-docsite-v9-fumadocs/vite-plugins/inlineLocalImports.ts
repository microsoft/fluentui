import type * as Babel from '@babel/core';
import * as fs from 'fs';
import * as path from 'path';

export interface InlinedSource {
  code: string;
  cssModules: Array<{ name: string; source: string }>;
}

/** Include local example helpers in docsite exports, leaving the running story untouched. */
export function inlineLocalImports(babel: typeof Babel, source: string, filename: string): InlinedSource {
  const t = babel.types;
  const modules = new Map<string, Map<string, string>>();
  const visiting = new Set<string>();
  const statements: Babel.types.Statement[] = [];
  const imports: Babel.types.ImportDeclaration[] = [];
  const importedBindings = new Map<string, string>();
  const cssModules = new Map<string, { filename: string; source: string }>();
  const usedNames = new Set<string>();

  function uniqueName(name: string): string {
    let candidate = name;
    for (let suffix = 1; usedNames.has(candidate); suffix++) {
      candidate = `${name}${suffix}`;
    }
    usedNames.add(candidate);
    return candidate;
  }

  function resolveImport(specifier: string, importer: string): string {
    const base = path.resolve(path.dirname(importer), specifier);
    const resolved = [base, ...['.tsx', '.ts', '.jsx', '.js'].map(ext => base + ext)].find(
      candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
    );
    if (!resolved) {
      throw new Error(`Cannot inline local example import '${specifier}' from ${importer}`);
    }
    return resolved;
  }

  function visit(code: string, file: string, root = false): Map<string, string> {
    if (visiting.has(file)) {
      throw new Error(`Circular local example import: ${file}`);
    }
    const cached = modules.get(file);
    if (cached) {
      return cached;
    }
    visiting.add(file);
    const exports = new Map<string, string>();
    const result = babel.transformSync(code, {
      filename: file,
      babelrc: false,
      configFile: false,
      ast: true,
      code: false,
      parserOpts: { plugins: ['typescript', 'jsx'] },
      plugins: [
        () => ({
          visitor: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Program(program: Babel.NodePath<Babel.types.Program>) {
              // Reserve entry-point names first so helper declarations cannot shadow the story.
              if (root) {
                program.traverse({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  Identifier(identifier) {
                    usedNames.add(identifier.node.name);
                  },
                });
              }
              const renames = new Map<string, string>();
              for (const statement of program.node.body) {
                if (t.isImportDeclaration(statement)) {
                  continue;
                }
                const declaration = t.isExportNamedDeclaration(statement) ? statement.declaration : statement;
                if (!declaration) {
                  continue;
                }
                const names = Object.keys(t.getBindingIdentifiers(declaration));
                if (t.isTSTypeAliasDeclaration(declaration) || t.isTSInterfaceDeclaration(declaration)) {
                  names.push(declaration.id.name);
                }
                for (const name of new Set(names)) {
                  const renamed = root ? name : uniqueName(name);
                  renames.set(name, renamed);
                  if (t.isExportNamedDeclaration(statement)) {
                    exports.set(name, renamed);
                  }
                }
              }

              for (const node of program.node.body) {
                if (!t.isImportDeclaration(node)) {
                  continue;
                }
                const specifier = node.source.value;
                const local = specifier.startsWith('.') && !specifier.endsWith('./index');
                if (local && /\.(md|mdx)$/.test(specifier)) {
                  continue; // Story descriptions are removed by the existing source pipeline.
                }
                if (local && !/\.module\.css$/.test(specifier)) {
                  const resolved = resolveImport(specifier, file);
                  const helperExports = visit(fs.readFileSync(resolved, 'utf8'), resolved);
                  for (const binding of node.specifiers) {
                    if (!t.isImportSpecifier(binding)) {
                      throw new Error(`Local example helpers require named imports: ${specifier} in ${file}`);
                    }
                    const name = t.isIdentifier(binding.imported) ? binding.imported.name : binding.imported.value;
                    const replacement = helperExports.get(name);
                    if (!replacement) {
                      throw new Error(`Missing helper export '${name}' in ${resolved}`);
                    }
                    renames.set(binding.local.name, replacement);
                  }
                  continue;
                }
                let importSource = specifier;
                if (local && /\.module\.css$/.test(specifier)) {
                  const resolved = resolveImport(specifier, file);
                  const basename = path.basename(resolved);
                  const previous = cssModules.get(basename);
                  if (previous && previous.filename !== resolved) {
                    throw new Error(`Conflicting example CSS module basename '${basename}': ${resolved}`);
                  }
                  cssModules.set(basename, { filename: resolved, source: fs.readFileSync(resolved, 'utf8') });
                  importSource = `./styles/${basename}`;
                }
                const retained: Babel.types.ImportDeclaration['specifiers'] = [];
                for (const binding of node.specifiers) {
                  const imported = t.isImportSpecifier(binding)
                    ? t.isIdentifier(binding.imported)
                      ? binding.imported.name
                      : binding.imported.value
                    : t.isImportDefaultSpecifier(binding)
                    ? 'default'
                    : '*';
                  const kind =
                    node.importKind === 'type' || (t.isImportSpecifier(binding) && binding.importKind === 'type')
                      ? 'type'
                      : 'value';
                  const key = `${importSource}:${kind}:${imported}`;
                  const existing = importedBindings.get(key);
                  const name = existing ?? (root ? binding.local.name : uniqueName(binding.local.name));
                  renames.set(binding.local.name, name);
                  if (!existing) {
                    importedBindings.set(key, name);
                    const copy = t.cloneNode(binding);
                    copy.local = t.identifier(name);
                    retained.push(copy);
                  }
                }
                if (retained.length || !node.specifiers.length) {
                  const copy = t.cloneNode(node);
                  copy.source = t.stringLiteral(importSource);
                  copy.specifiers = retained;
                  imports.push(copy);
                }
              }

              for (const [name, replacement] of renames) {
                if (name === replacement) {
                  continue;
                }
                program.scope.rename(name, replacement);
                // Babel does not register TypeScript-only declarations in its value scope.
                program.traverse({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  TSTypeReference(ref) {
                    if (t.isIdentifier(ref.node.typeName, { name })) {
                      ref.node.typeName.name = replacement;
                    }
                  },
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  TSTypeAliasDeclaration(ref) {
                    if (ref.node.id.name === name) {
                      ref.node.id.name = replacement;
                    }
                  },
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  TSInterfaceDeclaration(ref) {
                    if (ref.node.id.name === name) {
                      ref.node.id.name = replacement;
                    }
                  },
                });
              }
              for (const node of program.node.body) {
                if (t.isImportDeclaration(node)) {
                  continue;
                }
                if (!root && t.isExportDefaultDeclaration(node)) {
                  throw new Error(`Local example helpers require named exports: ${file}`);
                }
                if (!root && t.isExportNamedDeclaration(node)) {
                  if (node.source) {
                    throw new Error(`Local helper re-exports are not supported: ${file}`);
                  }
                  if (node.declaration) {
                    statements.push(node.declaration);
                  }
                  for (const binding of node.specifiers) {
                    if (t.isExportSpecifier(binding)) {
                      const name = t.isIdentifier(binding.exported) ? binding.exported.name : binding.exported.value;
                      exports.set(name, binding.local.name);
                    }
                  }
                } else {
                  statements.push(node);
                }
              }
            },
          },
        }),
      ],
    });
    if (!result?.ast) {
      throw new Error(`Unable to parse local example module: ${file}`);
    }
    visiting.delete(file);
    modules.set(file, exports);
    return exports;
  }

  visit(source, filename, true);
  const result = babel.transformFromAstSync(t.file(t.program([...imports, ...statements])), undefined, {
    babelrc: false,
    configFile: false,
  });
  if (!result?.code) {
    throw new Error(`Unable to generate inlined example: ${filename}`);
  }
  return {
    code: result.code,
    cssModules: [...cssModules].map(([name, data]) => ({ name, source: data.source })),
  };
}
