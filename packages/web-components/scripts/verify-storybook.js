#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const packageRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(packageRoot, 'src');
const customElementsPath = path.join(packageRoot, 'custom-elements.json');

const STORY_TAG_OVERRIDES = new Map([
  // Combobox is a dropdown variant story.
  ['src/combobox/combobox.stories.ts', 'fluent-dropdown'],
  // Split-button is a menu composition story.
  ['src/split-button/split-button.stories.ts', 'fluent-menu'],
]);

const SKIPPED_STORIES = new Map([
  // Utility/demo stories that are not single-component API docs.
  ['src/theme/set-theme.stories.ts', 'theme utility story with many components'],
  ['src/theme/theme.stories.ts', 'token demo story without a component contract'],
  // Tags currently not present in custom-elements.json.
  ['src/accordion-item/accordion-item.stories.ts', 'no fluent-accordion-item tagName in CEM'],
  ['src/anchor-button/anchor-button.stories.ts', 'no fluent-anchor-button tagName in CEM'],
]);

const STORY_CATEGORY_TO_CEM = new Map([
  ['attributes', 'attributes'],
  ['attribute', 'attributes'],
  ['slots', 'slots'],
  ['slot', 'slots'],
  ['csscustomproperties', 'cssProperties'],
  ['cssproperties', 'cssProperties'],
  ['cssvariables', 'cssProperties'],
  ['cssvars', 'cssProperties'],
  ['cssparts', 'cssParts'],
  ['parts', 'cssParts'],
  ['events', 'events'],
  ['event', 'events'],
  ['fires', 'events'],
  ['cssstates', 'cssStates'],
  ['states', 'cssStates'],
  ['methods', 'methods'],
  ['method', 'methods'],
  ['properties', 'properties'],
  ['property', 'properties'],
]);

const CATEGORY_LABELS = {
  attributes: 'attributes',
  slots: 'slots',
  cssProperties: 'css custom properties',
  cssParts: 'css parts',
  events: 'events',
  cssStates: 'css states',
  methods: 'methods',
  properties: 'properties',
};

const CORE_ALWAYS_VALIDATED_CATEGORIES = new Set(['attributes', 'slots']);

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

function walkStories(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkStories(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.stories.ts') && entry.name !== 'helpers.stories.ts') {
      files.push(fullPath);
    }
  }

  return files;
}

function getPropertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function getStringInitializer(property) {
  if (!property || !property.initializer) {
    return undefined;
  }

  if (ts.isStringLiteralLike(property.initializer)) {
    return property.initializer.text;
  }

  return undefined;
}

function getObjectProperty(objectLiteral, propertyName) {
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = getPropertyName(property.name);
    if (key === propertyName) {
      return property;
    }
  }

  return undefined;
}

function unwrapObjectLiteral(node) {
  if (!node) {
    return undefined;
  }

  if (ts.isObjectLiteralExpression(node)) {
    return node;
  }

  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
    return unwrapObjectLiteral(node.expression);
  }

  return undefined;
}

function parseStoryArgTypes(storyPath) {
  const sourceText = readFile(storyPath);
  const sourceFile = ts.createSourceFile(storyPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let exportedObject = undefined;

  for (const statement of sourceFile.statements) {
    if (ts.isExportAssignment(statement) && !statement.isExportEquals) {
      exportedObject = unwrapObjectLiteral(statement.expression);
      break;
    }
  }

  if (!exportedObject) {
    return {
      documented: {
        attributes: new Set(),
        slots: new Set(),
        cssProperties: new Set(),
        cssParts: new Set(),
        events: new Set(),
        cssStates: new Set(),
        methods: new Set(),
        properties: new Set(),
      },
      tagName: undefined,
      sourceText,
    };
  }

  const argTypesProperty = getObjectProperty(exportedObject, 'argTypes');
  const argTypesObject = unwrapObjectLiteral(argTypesProperty?.initializer);

  const documented = {
    attributes: new Set(),
    slots: new Set(),
    cssProperties: new Set(),
    cssParts: new Set(),
    events: new Set(),
    cssStates: new Set(),
    methods: new Set(),
    properties: new Set(),
  };

  if (argTypesObject) {
    for (const prop of argTypesObject.properties) {
      if (!ts.isPropertyAssignment(prop)) {
        continue;
      }

      const argTypeKey = getPropertyName(prop.name);
      if (!argTypeKey) {
        continue;
      }

      const argTypeConfig = unwrapObjectLiteral(prop.initializer);
      if (!argTypeConfig) {
        continue;
      }

      const topLevelCategory = getStringInitializer(getObjectProperty(argTypeConfig, 'category'));

      let tableCategory;
      const tableProp = getObjectProperty(argTypeConfig, 'table');
      const tableObject = unwrapObjectLiteral(tableProp?.initializer);
      if (tableObject) {
        tableCategory = getStringInitializer(getObjectProperty(tableObject, 'category'));
      }

      const category = tableCategory ?? topLevelCategory;
      const categoryKey = String(category ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      const mappedCategory = STORY_CATEGORY_TO_CEM.get(categoryKey);

      if (!mappedCategory) {
        continue;
      }

      const alias = getStringInitializer(getObjectProperty(argTypeConfig, 'name'));
      const documentedName = (alias ?? argTypeKey).trim();

      if (mappedCategory === 'slots') {
        documented.slots.add(documentedName);
      } else if (documentedName) {
        documented[mappedCategory].add(documentedName);
      }
    }
  }

  const fluentTagMatches = [...sourceText.matchAll(/<\s*(fluent-[a-z0-9-]+)/g)].map(match => match[1]);
  const componentName = path.basename(storyPath).replace(/\.stories\.ts$/, '');

  return {
    documented,
    componentName,
    tagCandidates: [...new Set(fluentTagMatches)],
    sourceText,
  };
}

function loadCustomElementsMap() {
  const cem = JSON.parse(readFile(customElementsPath));
  const byTag = new Map();

  for (const moduleDef of cem.modules ?? []) {
    for (const declaration of moduleDef.declarations ?? []) {
      if (!declaration || declaration.customElement !== true || typeof declaration.tagName !== 'string') {
        continue;
      }

      const attributes = new Set((declaration.attributes ?? []).map(attribute => attribute?.name).filter(Boolean));
      const slots = new Set((declaration.slots ?? []).map(slot => slot?.name ?? ''));
      const cssProperties = new Set((declaration.cssProperties ?? []).map(property => property?.name).filter(Boolean));
      const cssParts = new Set((declaration.cssParts ?? []).map(part => part?.name).filter(Boolean));
      const events = new Set((declaration.events ?? []).map(event => event?.name).filter(Boolean));
      const cssStates = new Set((declaration.cssStates ?? []).map(state => state?.name).filter(Boolean));

      const methods = new Set(
        (declaration.members ?? [])
          .filter(member => member?.kind === 'method' && member?.privacy !== 'private')
          .map(member => member?.name)
          .filter(Boolean),
      );

      const properties = new Set(
        (declaration.members ?? [])
          .filter(member => member?.kind === 'field' && member?.privacy !== 'private')
          .map(member => member?.name)
          .filter(Boolean),
      );

      byTag.set(declaration.tagName, {
        attributes,
        slots,
        cssProperties,
        cssParts,
        events,
        cssStates,
        methods,
        properties,
      });
    }
  }

  return byTag;
}

function toCanonicalName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function toCanonicalMap(values) {
  const map = new Map();

  for (const value of values) {
    const key = toCanonicalName(value);
    if (!key) {
      continue;
    }

    if (!map.has(key)) {
      map.set(key, new Set());
    }

    map.get(key).add(value);
  }

  return map;
}

function canonicalDifference(aValues, bValues) {
  const a = toCanonicalMap(aValues);
  const b = toCanonicalMap(bValues);

  const canonicalOnlyInA = [...a.keys()].filter(key => !b.has(key));
  const valuesOnlyInA = canonicalOnlyInA.flatMap(key => [...a.get(key)]).sort();

  return valuesOnlyInA;
}

function pickTagName({ tagCandidates, componentName, cemByTag }) {
  const componentKey = toCanonicalName(componentName);
  const knownCandidates = tagCandidates.filter(tag => cemByTag.has(tag));

  const exactMatch = knownCandidates.find(tag => toCanonicalName(tag.replace(/^fluent-/, '')) === componentKey);
  if (exactMatch) {
    return exactMatch;
  }

  const looseMatches = knownCandidates.filter(tag => {
    const tagKey = toCanonicalName(tag.replace(/^fluent-/, ''));
    return tagKey.includes(componentKey);
  });

  if (looseMatches.length === 1) {
    return looseMatches[0];
  }

  const allMatches = [...cemByTag.keys()].filter(tag => {
    const tagKey = toCanonicalName(tag.replace(/^fluent-/, ''));
    return tagKey.includes(componentKey);
  });

  if (allMatches.length === 1) {
    return allMatches[0];
  }

  return undefined;
}

function relativeFromPackage(filePath) {
  return path.relative(packageRoot, filePath).replaceAll(path.sep, '/');
}

function validate({ failOnMismatch = true } = {}) {
  const cemByTag = loadCustomElementsMap();
  const storyFiles = walkStories(srcDir);

  const errors = [];
  const warnings = [];
  const skipped = [];

  for (const storyFile of storyFiles) {
    const storyRelativePath = relativeFromPackage(storyFile);

    if (SKIPPED_STORIES.has(storyRelativePath)) {
      skipped.push(`${storyRelativePath}: ${SKIPPED_STORIES.get(storyRelativePath)}`);
      continue;
    }

    const { documented: storyDocumented, componentName, tagCandidates } = parseStoryArgTypes(storyFile);

    storyDocumented.slots = new Set([...storyDocumented.slots].filter(slot => slot !== ''));
    const overriddenTag = STORY_TAG_OVERRIDES.get(storyRelativePath);
    const tagName = overriddenTag ?? pickTagName({ tagCandidates, componentName, cemByTag });

    if (overriddenTag && !cemByTag.has(overriddenTag)) {
      warnings.push(`${storyRelativePath}: override tag ${overriddenTag} is not present in CEM; skipping.`);
      continue;
    }

    if (!tagName) {
      warnings.push(
        `${storyRelativePath}: unable to resolve primary tag from candidates [${tagCandidates.join(', ')}]; skipping.`,
      );
      continue;
    }

    const cemEntry = cemByTag.get(tagName);
    if (!cemEntry) {
      warnings.push(`${storyRelativePath}: tag ${tagName} not found in CEM; skipping.`);
      continue;
    }

    const normalizedCem = {
      ...cemEntry,
      slots: new Set([...cemEntry.slots].filter(slot => slot !== '')),
    };

    const categoriesToValidate = new Set(CORE_ALWAYS_VALIDATED_CATEGORIES);

    for (const category of Object.keys(storyDocumented)) {
      if (storyDocumented[category].size > 0) {
        categoriesToValidate.add(category);
      }
    }

    const categoryMismatches = [];

    for (const category of categoriesToValidate) {
      const storySet = storyDocumented[category] ?? new Set();
      const cemSet = normalizedCem[category] ?? new Set();
      const storyOnly = canonicalDifference(storySet, cemSet);
      const missingInStory = canonicalDifference(cemSet, storySet);

      if (storyOnly.length > 0 || missingInStory.length > 0) {
        categoryMismatches.push({
          category,
          storyOnly,
          missingInStory,
        });
      }
    }

    if (categoryMismatches.length > 0) {
      errors.push({
        file: storyRelativePath,
        tagName,
        categoryMismatches,
      });
    }
  }

  if (skipped.length > 0) {
    console.log('Skipped:');
    for (const entry of skipped) {
      console.log(`  - ${entry}`);
    }
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('Warnings:');
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
    console.log('');
  }

  console.log(
    `Checked ${storyFiles.length} story files. Skipped: ${skipped.length}. Warnings: ${warnings.length}. Mismatches: ${errors.length}.`,
  );

  if (errors.length === 0) {
    console.log(`Validated ${storyFiles.length} stories. No Storybook/custom-elements API mismatches found.`);
    return 0;
  }

  console.error(`Found ${errors.length} Storybook/custom-elements API mismatches:`);
  for (const error of errors) {
    console.error(`\n- ${error.file} (${error.tagName})`);

    for (const mismatch of error.categoryMismatches) {
      const categoryLabel = CATEGORY_LABELS[mismatch.category] ?? mismatch.category;

      if (mismatch.storyOnly.length > 0) {
        console.error(`  Storybook ${categoryLabel} not in CEM: ${mismatch.storyOnly.join(', ')}`);
      }

      if (mismatch.missingInStory.length > 0) {
        console.error(`  CEM ${categoryLabel} not documented in Storybook: ${mismatch.missingInStory.join(', ')}`);
      }
    }
  }

  if (!failOnMismatch) {
    console.warn('\nMismatches found, but continuing with exit code 0 because --no-fail was provided.');
    return 0;
  }

  return 1;
}

const args = new Set(process.argv.slice(2));
const failOnMismatch = !args.has('--no-fail');

process.exitCode = validate({ failOnMismatch });
