import * as Babel from '@babel/core';

/**
 * Options for {@link sliceStorySource}.
 */
export interface SliceStoryOptions {
  /** Name of the story export to keep (all other stories are removed). */
  targetStory: string;
  /** Absolute path of the story file being processed (used by the parser). */
  filename?: string;
}

/**
 * Produces a minimal, single-story source string for a given story export.
 *
 * Given a Component Story Format file that contains multiple story exports, this
 * keeps only the `targetStory` export and the module-level imports / helper
 * declarations it actually references. The story is normalized into a renderable
 * function so the output is valid for both the "Show code" panel and the
 * "Open in Sandbox" flow (which renders the exported story as a component).
 *
 * - CSF2 function stories (`export const X = () => <…/>`) are kept as-is.
 * - CSF3 object stories (`export const X = { render: … }`) are unwrapped into a
 *   function. Their `args` (merged with the meta's `args`) are re-declared as a
 *   local `const args` so the render body keeps working.
 * - CSF3 render-less stories (only `args`) are synthesized into
 *   `() => { const args = {…}; return <Component {...args} />; }` using the
 *   `component` referenced by the default export (meta).
 *
 * The default export (meta), sibling stories, `play`/`parameters` and any
 * declaration not reachable from the target story are dropped.
 *
 * @returns the sliced source string, or `null` when the story cannot be sliced
 * (e.g. render-less story without a resolvable meta `component`).
 */
export function sliceStorySource(babel: typeof Babel, source: string, options: SliceStoryOptions): string | null {
  const context = { handled: false };

  const result = babel.transformSync(source, {
    configFile: false,
    babelrc: false,
    filename: options.filename,
    code: true,
    ast: false,
    // Mutate the original AST in place and print with `retainLines` (mirroring
    // `file` granularity) so retained nodes keep their authored formatting and
    // the downstream prettier output matches — avoiding cosmetic churn.
    retainLines: true,
    // Preserve comments so the sliced source matches `file` granularity output
    // (comment stripping, if any, happens in the shared downstream pass).
    comments: true,
    compact: false,
    parserOpts: {
      plugins: ['jsx', 'typescript', 'classProperties', 'objectRestSpread'],
    },
    plugins: [createSliceStoryPlugin(babel, options, context)],
  });

  return context.handled ? result?.code ?? null : null;
}

function createSliceStoryPlugin(
  babel: typeof Babel,
  options: SliceStoryOptions,
  context: { handled: boolean },
): Babel.PluginObj {
  const { types: t } = babel;
  const { targetStory } = options;

  return {
    name: 'storybook-stories-slice-story',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Program(path) {
        const body = path.get('body');

        // --- Discovery -------------------------------------------------------
        let metaObject: Babel.types.ObjectExpression | undefined;
        let metaLocalName: string | undefined;
        let targetPath: Babel.NodePath<Babel.types.ExportNamedDeclaration> | undefined;
        // Map of `const X = {…}` initializers (exported or not) for spread resolution.
        const objectConstsByName = new Map<string, Babel.types.ObjectExpression>();
        // Map of local type declarations (`type`/`interface`/`enum`) by name, used
        // to resolve type references (babel scope bindings don't track type-only decls).
        const typeDeclsByName = new Map<string, Babel.NodePath>();

        for (const statementPath of body) {
          collectObjectConst(t, statementPath, objectConstsByName);
          collectTypeDecl(t, statementPath, typeDeclsByName);

          if (statementPath.isExportDefaultDeclaration()) {
            const resolved = resolveMetaObject(t, statementPath.node.declaration, body);
            metaObject = resolved.object;
            metaLocalName = resolved.localName;
            continue;
          }

          if (statementPath.isExportNamedDeclaration()) {
            const name = getExportedStoryName(t, statementPath.node);
            if (name === targetStory) {
              targetPath = statementPath;
            }
          }
        }

        if (!targetPath) {
          return;
        }

        const metaComponentName = metaObject ? getMetaComponentName(t, metaObject) : undefined;
        const metaArgs = metaObject ? getObjectProperty(t, metaObject, 'args') : undefined;

        // --- Normalize the target story into a renderable function ----------
        const normalized = normalizeStory(t, targetPath.node, {
          metaArgs: metaArgs && t.isObjectExpression(metaArgs) ? metaArgs : undefined,
          metaComponentName,
          objectConstsByName,
        });

        if (!normalized) {
          // Cannot produce a renderable function (e.g. render-less without meta component).
          return;
        }

        // Replace only when normalization produced a NEW node (CSF3 transforms).
        // For CSF2 the original node is kept in place so `retainLines` preserves
        // its authored source formatting.
        if (normalized !== targetPath.node) {
          targetPath.replaceWith(normalized);
        }

        // Rebuild bindings so references introduced by normalization (args,
        // the meta component) resolve correctly during reachability analysis.
        path.scope.crawl();

        // --- Reachability from the normalized story --------------------------
        const neededBindings = collectReachableBindings(path, targetPath, typeDeclsByName);

        // Map each comment to the node it leads, so comments belonging to removed
        // nodes (e.g. sibling stories) can be dropped instead of leaking onto
        // retained neighbours (comments are shared as leading/trailing).
        const commentOwner = new Map<Babel.types.Comment, Babel.types.Node>();
        path.traverse({
          enter(nodePath) {
            for (const comment of nodePath.node.leadingComments ?? []) {
              if (!commentOwner.has(comment)) {
                commentOwner.set(comment, nodePath.node);
              }
            }
          },
        });
        const removedNodes = new Set<Babel.types.Node>();
        const remove = (statementPath: Babel.NodePath) => {
          removedNodes.add(statementPath.node);
          statementPath.remove();
        };

        // --- Prune the program body -----------------------------------------
        for (const statementPath of path.get('body')) {
          if (statementPath.node === targetPath.node) {
            continue;
          }

          if (statementPath.isImportDeclaration()) {
            pruneImportDeclaration(t, statementPath, neededBindings);
            continue;
          }

          if (statementPath.isExportDefaultDeclaration()) {
            remove(statementPath);
            continue;
          }

          // Remove the `const meta = {…}` declaration backing the default export.
          if (metaLocalName && isDeclarationOf(t, statementPath, metaLocalName)) {
            remove(statementPath);
            continue;
          }

          // Remove sibling story exports.
          if (statementPath.isExportNamedDeclaration()) {
            remove(statementPath);
            continue;
          }

          // Remove CSF2 story annotations (`Story.parameters = …`, `Story.args = …`).
          if (isStoryAnnotationAssignment(t, statementPath)) {
            remove(statementPath);
            continue;
          }

          // Keep only declarations reachable from the target story.
          if (isModuleLevelDeclaration(t, statementPath)) {
            if (!isDeclarationReachable(statementPath, neededBindings)) {
              remove(statementPath);
            }
            continue;
          }
        }

        // Drop comments that belonged to removed nodes but linger on retained ones.
        if (removedNodes.size > 0) {
          const keep = (comments: readonly Babel.types.Comment[] | null | undefined) =>
            comments ? comments.filter(c => !removedNodes.has(commentOwner.get(c) as Babel.types.Node)) : comments;
          path.traverse({
            enter(nodePath) {
              const node = nodePath.node;
              node.leadingComments = keep(node.leadingComments) as Babel.types.Comment[] | null;
              node.trailingComments = keep(node.trailingComments) as Babel.types.Comment[] | null;
              node.innerComments = keep(node.innerComments) as Babel.types.Comment[] | null;
            },
          });
        }

        context.handled = true;
      },
    },
  };
}

/**
 * Resolves the meta object expression from a default export declaration, whether
 * it is inline (`export default {…}`), TS-wrapped (`… satisfies Meta`) or a
 * reference to a `const meta = {…}` declaration.
 */
function resolveMetaObject(
  t: typeof Babel.types,
  declaration: Babel.types.ExportDefaultDeclaration['declaration'],
  body: Array<Babel.NodePath<Babel.types.Node>>,
): { object?: Babel.types.ObjectExpression; localName?: string } {
  const unwrapped = unwrapExpression(t, declaration);

  if (t.isObjectExpression(unwrapped)) {
    return { object: unwrapped };
  }

  if (t.isIdentifier(unwrapped)) {
    const localName = unwrapped.name;
    for (const statementPath of body) {
      if (statementPath.isVariableDeclaration()) {
        for (const declarator of statementPath.node.declarations) {
          if (t.isIdentifier(declarator.id) && declarator.id.name === localName && declarator.init) {
            const init = unwrapExpression(t, declarator.init);
            if (t.isObjectExpression(init)) {
              return { object: init, localName };
            }
          }
        }
      }
    }
    return { localName };
  }

  return {};
}

/** Unwraps TS `as`/`satisfies` and parenthesized expressions. */
function unwrapExpression<T extends Babel.types.Node>(t: typeof Babel.types, node: T): Babel.types.Node {
  let current: Babel.types.Node = node;
  while (t.isTSAsExpression(current) || t.isTSSatisfiesExpression(current) || t.isParenthesizedExpression(current)) {
    current = current.expression;
  }
  return current;
}

/** Returns the exported story identifier name from a named export, if any. */
function getExportedStoryName(t: typeof Babel.types, node: Babel.types.ExportNamedDeclaration): string | undefined {
  const declaration = node.declaration;

  if (t.isFunctionDeclaration(declaration) && t.isIdentifier(declaration.id)) {
    return isComponentLikeName(declaration.id.name) ? declaration.id.name : undefined;
  }

  if (t.isVariableDeclaration(declaration) && declaration.declarations.length === 1) {
    const id = declaration.declarations[0].id;
    if (t.isIdentifier(id) && isComponentLikeName(id.name)) {
      return id.name;
    }
  }

  return undefined;
}

/** Reads the `component` identifier name from a meta object expression. */
function getMetaComponentName(t: typeof Babel.types, metaObject: Babel.types.ObjectExpression): string | undefined {
  const component = getObjectProperty(t, metaObject, 'component');
  return component && t.isIdentifier(component) ? component.name : undefined;
}

/** Reads a property value from an object expression by key. */
function getObjectProperty(
  t: typeof Babel.types,
  object: Babel.types.ObjectExpression,
  key: string,
): Babel.types.Expression | undefined {
  for (const property of object.properties) {
    if (t.isObjectProperty(property) && !property.computed) {
      const propKey = property.key;
      const name = t.isIdentifier(propKey) ? propKey.name : t.isStringLiteral(propKey) ? propKey.value : undefined;
      if (name === key && t.isExpression(property.value)) {
        return property.value;
      }
    }
  }
  return undefined;
}

/**
 * Returns the story's `render` as a function expression, supporting both the
 * property form (`render: (args) => …` / `render: function () {…}`) and the ES
 * method shorthand (`render(args) {…}`). Method shorthands are converted to an
 * equivalent function expression so downstream normalization is uniform.
 */
function getRenderFunction(
  t: typeof Babel.types,
  object: Babel.types.ObjectExpression,
): Babel.types.ArrowFunctionExpression | Babel.types.FunctionExpression | undefined {
  for (const property of object.properties) {
    if (t.isObjectMethod(property) && !property.computed) {
      const key = property.key;
      const name = t.isIdentifier(key) ? key.name : t.isStringLiteral(key) ? key.value : undefined;
      if (name === 'render') {
        return t.functionExpression(null, property.params, property.body, property.generator, property.async);
      }
    }
  }

  const value = getObjectProperty(t, object, 'render');
  return value && (t.isArrowFunctionExpression(value) || t.isFunctionExpression(value)) ? value : undefined;
}

interface NormalizeContext {
  metaArgs?: Babel.types.ObjectExpression;
  metaComponentName?: string;
  objectConstsByName: Map<string, Babel.types.ObjectExpression>;
}

/**
 * Normalizes a story export into a renderable function export. Returns the new
 * export node, or `null` when normalization is not possible.
 */
function normalizeStory(
  t: typeof Babel.types,
  node: Babel.types.ExportNamedDeclaration,
  context: NormalizeContext,
): Babel.types.ExportNamedDeclaration | null {
  const declaration = node.declaration;

  // CSF2 function declaration: `export function X() {…}` — already renderable.
  if (t.isFunctionDeclaration(declaration)) {
    return node;
  }

  if (!t.isVariableDeclaration(declaration) || declaration.declarations.length !== 1) {
    return null;
  }

  const declarator = declaration.declarations[0];
  if (!t.isIdentifier(declarator.id) || !declarator.init) {
    return null;
  }

  const id = declarator.id;
  const storyName = id.name;
  const init = unwrapExpression(t, declarator.init);

  // CSF2 function story: `export const X = () => <…/>` — already renderable.
  // Keep the original node so `retainLines` preserves its authored formatting;
  // only drop a story-type annotation whose type import gets pruned.
  if (t.isArrowFunctionExpression(init) || t.isFunctionExpression(init)) {
    if (id.typeAnnotation) {
      id.typeAnnotation = null;
    }
    return node;
  }

  // CSF3 object story.
  if (t.isObjectExpression(init)) {
    const flattened = flattenObjectExpression(t, init, context.objectConstsByName, new Set());
    const renderFn = getRenderFunction(t, flattened);
    const storyArgs = getObjectProperty(t, flattened, 'args');
    const mergedArgs = mergeArgs(t, context.metaArgs, t.isObjectExpression(storyArgs) ? storyArgs : undefined);

    if (renderFn) {
      const fn = buildRenderFunction(t, renderFn, mergedArgs);
      return buildFunctionStoryExport(t, storyName, fn);
    }

    // Render-less args-only story: synthesize `<Component {...args} />`.
    // Only do this for genuine story objects (empty, or containing only known
    // CSF fields) so arbitrary capitalized data exports are not turned into
    // fake stories.
    if (context.metaComponentName && isStoryShapedObject(t, flattened)) {
      const fn = buildSynthesizedFunction(t, context.metaComponentName, mergedArgs);
      return buildFunctionStoryExport(t, storyName, fn);
    }
  }

  return null;
}

/**
 * Known Component Story Format story-object fields. An object export is treated
 * as a story only if it is empty or every own property is one of these (or a
 * spread), avoiding false positives on capitalized data exports.
 */
const CSF_STORY_FIELDS = new Set([
  'render',
  'args',
  'argTypes',
  'play',
  'parameters',
  'decorators',
  'loaders',
  'tags',
  'name',
  'globals',
  'beforeEach',
  'story',
]);

/** Whether an object expression looks like a CSF story object (not arbitrary data). */
function isStoryShapedObject(t: typeof Babel.types, object: Babel.types.ObjectExpression): boolean {
  return object.properties.every(property => {
    if (t.isSpreadElement(property)) {
      return true;
    }
    if ((t.isObjectProperty(property) || t.isObjectMethod(property)) && !property.computed) {
      const key = property.key;
      const name = t.isIdentifier(key) ? key.name : t.isStringLiteral(key) ? key.value : undefined;
      return name !== undefined && CSF_STORY_FIELDS.has(name);
    }
    return false;
  });
}

/** Builds `export const <name> = <fn>;`. */
function buildFunctionStoryExport(
  t: typeof Babel.types,
  name: string,
  fn: Babel.types.ArrowFunctionExpression | Babel.types.FunctionExpression,
): Babel.types.ExportNamedDeclaration {
  const declarator = t.variableDeclarator(t.identifier(name), fn);
  return t.exportNamedDeclaration(t.variableDeclaration('const', [declarator]), []);
}

/**
 * Converts a story `render` function into a no-arg render function, re-declaring
 * the args parameter as a local `const` bound to the merged args object.
 */
function buildRenderFunction(
  t: typeof Babel.types,
  render: Babel.types.ArrowFunctionExpression | Babel.types.FunctionExpression,
  mergedArgs: Babel.types.ObjectExpression | undefined,
): Babel.types.ArrowFunctionExpression {
  const argsParam = render.params[0];
  const body = render.body;

  // No args parameter — keep the body as-is.
  if (!argsParam) {
    return t.arrowFunctionExpression([], body);
  }

  // Unwrap defaulted (`args = {}`) and rest (`...args`) params to a valid LVal;
  // using the raw node as a declarator id would emit invalid syntax
  // (`const args = {} = …` / `const ...args = …`).
  const argsId = t.isAssignmentPattern(argsParam)
    ? argsParam.left
    : t.isRestElement(argsParam)
    ? argsParam.argument
    : argsParam;

  // Precedence for the local `args`: merged meta/story args win; otherwise fall
  // back to the param's default (`args = <default>`) so the author's intended
  // sample value is preserved; otherwise an empty object.
  const argsDefault = t.isAssignmentPattern(argsParam) ? argsParam.right : undefined;
  const argsInit = mergedArgs ?? argsDefault ?? t.objectExpression([]);

  const argsDeclaration = t.variableDeclaration('const', [t.variableDeclarator(argsId as Babel.types.LVal, argsInit)]);

  const statements: Babel.types.Statement[] = [argsDeclaration];
  if (t.isBlockStatement(body)) {
    statements.push(...body.body);
  } else {
    statements.push(t.returnStatement(body));
  }

  return t.arrowFunctionExpression([], t.blockStatement(statements));
}

/** Builds `() => { const args = {…}; return <Component {...args} />; }`. */
function buildSynthesizedFunction(
  t: typeof Babel.types,
  componentName: string,
  mergedArgs: Babel.types.ObjectExpression | undefined,
): Babel.types.ArrowFunctionExpression {
  const jsx = t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(componentName), [t.jsxSpreadAttribute(t.identifier('args'))], true),
    null,
    [],
    true,
  );

  const argsDeclaration = t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier('args'), mergedArgs ?? t.objectExpression([])),
  ]);

  return t.arrowFunctionExpression([], t.blockStatement([argsDeclaration, t.returnStatement(jsx)]));
}

/** Merges meta args and story args into a single object expression (story wins, keys deduped). */
function mergeArgs(
  t: typeof Babel.types,
  metaArgs: Babel.types.ObjectExpression | undefined,
  storyArgs: Babel.types.ObjectExpression | undefined,
): Babel.types.ObjectExpression | undefined {
  if (!metaArgs && !storyArgs) {
    return undefined;
  }

  const byKey = new Map<string, Babel.types.ObjectExpression['properties'][number]>();
  const order: Array<
    { kind: 'key'; key: string } | { kind: 'raw'; node: Babel.types.ObjectExpression['properties'][number] }
  > = [];

  const add = (properties: Babel.types.ObjectExpression['properties']) => {
    for (const property of properties) {
      if (t.isObjectProperty(property) && !property.computed) {
        const key = t.isIdentifier(property.key)
          ? property.key.name
          : t.isStringLiteral(property.key)
          ? property.key.value
          : undefined;
        if (key !== undefined) {
          if (!byKey.has(key)) {
            order.push({ kind: 'key', key });
          }
          byKey.set(key, property);
          continue;
        }
      }
      order.push({ kind: 'raw', node: property });
    }
  };

  add(metaArgs?.properties ?? []);
  add(storyArgs?.properties ?? []);

  const properties = order.map(entry => (entry.kind === 'key' ? byKey.get(entry.key)! : entry.node));
  // Strip source locations so the synthesized object formats cleanly under
  // `retainLines` instead of inheriting the (mismatched) lines of merged props.
  return t.objectExpression(properties.map(property => t.cloneNode(property, true, true)));
}

/** Records `const X = {…}` / `export const X = {…}` initializers for spread resolution. */
function collectObjectConst(
  t: typeof Babel.types,
  statementPath: Babel.NodePath,
  target: Map<string, Babel.types.ObjectExpression>,
): void {
  const declaration = statementPath.isExportNamedDeclaration() ? statementPath.node.declaration : statementPath.node;
  if (!declaration || !t.isVariableDeclaration(declaration)) {
    return;
  }
  for (const declarator of declaration.declarations) {
    if (t.isIdentifier(declarator.id) && declarator.init) {
      const init = unwrapExpression(t, declarator.init);
      if (t.isObjectExpression(init)) {
        target.set(declarator.id.name, init);
      }
    }
  }
}

/** Records local `type`/`interface`/`enum` declarations by name for type-reference resolution. */
function collectTypeDecl(
  t: typeof Babel.types,
  statementPath: Babel.NodePath,
  target: Map<string, Babel.NodePath>,
): void {
  if (statementPath.isTSTypeAliasDeclaration() && t.isIdentifier(statementPath.node.id)) {
    target.set(statementPath.node.id.name, statementPath);
  } else if (statementPath.isTSInterfaceDeclaration() && t.isIdentifier(statementPath.node.id)) {
    target.set(statementPath.node.id.name, statementPath);
  } else if (statementPath.isTSEnumDeclaration() && t.isIdentifier(statementPath.node.id)) {
    target.set(statementPath.node.id.name, statementPath);
  }
}

/**
 * Expands `{ ...Base, … }` spread elements that reference module-level object
 * consts (e.g. sibling CSF3 stories), so the resulting object carries the
 * spread source's `render`/`args`. Later properties override earlier ones.
 */
function flattenObjectExpression(
  t: typeof Babel.types,
  object: Babel.types.ObjectExpression,
  objectConstsByName: Map<string, Babel.types.ObjectExpression>,
  seen: Set<string>,
): Babel.types.ObjectExpression {
  const properties: Babel.types.ObjectExpression['properties'] = [];

  for (const property of object.properties) {
    if (t.isSpreadElement(property) && t.isIdentifier(property.argument)) {
      const name = property.argument.name;
      const source = objectConstsByName.get(name);
      if (source && !seen.has(name)) {
        seen.add(name);
        const expanded = flattenObjectExpression(t, source, objectConstsByName, seen);
        properties.push(...expanded.properties);
        continue;
      }
    }
    properties.push(property);
  }

  return t.objectExpression(properties);
}

/**
 * Collects the set of module-level binding paths reachable from the target story
 * via identifier references, following declarations transitively (BFS).
 */
function collectReachableBindings(
  programPath: Babel.NodePath<Babel.types.Program>,
  targetPath: Babel.NodePath<Babel.types.ExportNamedDeclaration>,
  typeDeclsByName: Map<string, Babel.NodePath>,
): Set<Babel.NodePath> {
  const needed = new Set<Babel.NodePath>();
  const worklist: Array<Babel.NodePath> = [targetPath];

  const consider = (name: string, atPath: Babel.NodePath) => {
    const binding = atPath.scope.getBinding(name);
    // Prefer a module-level value/import binding; fall back to a local type decl
    // (type aliases/interfaces are not tracked by babel's scope bindings).
    let bindingPath: Babel.NodePath | undefined;
    if (binding && binding.scope === programPath.scope) {
      bindingPath = binding.path;
    } else if (!binding && typeDeclsByName.has(name)) {
      bindingPath = typeDeclsByName.get(name);
    }
    if (!bindingPath || needed.has(bindingPath)) {
      return;
    }
    needed.add(bindingPath);
    worklist.push(bindingPath);
  };

  // Resolve the leftmost identifier of a (possibly qualified) type name.
  const leftmostName = (node: Babel.types.Node | null | undefined): Babel.types.Identifier | undefined => {
    let current = node;
    while (current && current.type === 'TSQualifiedName') {
      current = (current as Babel.types.TSQualifiedName).left;
    }
    return current && current.type === 'Identifier' ? (current as Babel.types.Identifier) : undefined;
  };

  while (worklist.length > 0) {
    const current = worklist.pop()!;
    current.traverse({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ReferencedIdentifier(idPath) {
        consider(idPath.node.name, idPath);
      },
      // Follow type references (annotations, generics) so type aliases /
      // interfaces / `import type` used by reachable code are not pruned.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      TSTypeReference(typePath) {
        const id = leftmostName(typePath.node.typeName);
        if (id) {
          consider(id.name, typePath);
        }
      },
      // Follow `typeof X` type queries.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      TSTypeQuery(queryPath) {
        const id = leftmostName(queryPath.node.exprName as Babel.types.Node);
        if (id) {
          consider(id.name, queryPath);
        }
      },
    });
  }

  return needed;
}

/** Prunes unused specifiers from an import declaration, removing it if empty. */
function pruneImportDeclaration(
  t: typeof Babel.types,
  importPath: Babel.NodePath<Babel.types.ImportDeclaration>,
  needed: Set<Babel.NodePath>,
): void {
  const specifiers = importPath.get('specifiers');

  // React must remain in scope for classic-runtime JSX.
  if (importPath.node.source.value === 'react') {
    return;
  }

  // Side-effect import (`import './x.css'`) — always keep.
  if (specifiers.length === 0) {
    return;
  }

  let kept = 0;
  for (const specifierPath of specifiers) {
    if (needed.has(specifierPath)) {
      kept++;
    } else {
      specifierPath.remove();
    }
  }

  if (kept === 0) {
    importPath.remove();
  }
}

/** Whether the statement declares the given local identifier name. */
function isDeclarationOf(t: typeof Babel.types, statementPath: Babel.NodePath, name: string): boolean {
  if (statementPath.isVariableDeclaration()) {
    return statementPath.node.declarations.some(d => t.isIdentifier(d.id) && d.id.name === name);
  }
  return false;
}

/** Whether the statement is a module-level value/type declaration. */
function isModuleLevelDeclaration(t: typeof Babel.types, statementPath: Babel.NodePath): boolean {
  return (
    statementPath.isVariableDeclaration() ||
    statementPath.isFunctionDeclaration() ||
    statementPath.isClassDeclaration() ||
    statementPath.isTSTypeAliasDeclaration() ||
    statementPath.isTSInterfaceDeclaration() ||
    statementPath.isTSEnumDeclaration()
  );
}

/** Whether a module-level declaration is in the reachable set. */
function isDeclarationReachable(statementPath: Babel.NodePath, needed: Set<Babel.NodePath>): boolean {
  if (needed.has(statementPath)) {
    return true;
  }
  // Variable declarations register bindings on their declarators, not the statement.
  if (statementPath.isVariableDeclaration()) {
    return statementPath.get('declarations').some(declaratorPath => needed.has(declaratorPath));
  }
  return false;
}

/**
 * Whether the statement is a CSF2 story annotation assignment (`Story.x = …`).
 *
 * Only assignments to known CSF annotation fields on a component-like (story)
 * identifier match, so unrelated helper setup such as `Card.displayName = …` or
 * `config.foo = …` is preserved in the sliced example.
 */
function isStoryAnnotationAssignment(t: typeof Babel.types, statementPath: Babel.NodePath): boolean {
  if (!statementPath.isExpressionStatement()) {
    return false;
  }
  const expression = statementPath.node.expression;
  return (
    t.isAssignmentExpression(expression) &&
    t.isMemberExpression(expression.left) &&
    !expression.left.computed &&
    t.isIdentifier(expression.left.object) &&
    isComponentLikeName(expression.left.object.name) &&
    t.isIdentifier(expression.left.property) &&
    CSF_STORY_FIELDS.has(expression.left.property.name)
  );
}

/** Checks if the name is component-like (starts with an uppercase letter). */
function isComponentLikeName(name: string): boolean {
  return name.charAt(0) === name.charAt(0).toUpperCase();
}
