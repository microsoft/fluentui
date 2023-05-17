import * as path from 'path';
import * as fs from 'fs-extra';
import { Tree, formatFiles, installPackagesTask, generateFiles, offsetFromRoot } from '@nrwl/devkit';
import { RecipeGeneratorGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: RecipeGeneratorGeneratorSchema) {
  const validatedSchema = validateSchema(tree, schema);

  const normalizedOptions = normalizeOptions(tree, validatedSchema);

  generateFiles(tree, path.join(__dirname, 'files'), normalizedOptions.recipesRoot, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

function normalizeOptions(tree: Tree, schema: RecipeGeneratorGeneratorSchema) {
  if (schema.recipeName.length === 0) {
    throw new Error('name is required');
  }

  const recipePath = 'apps/recipes-react-components/src/recipes';
  const fileName = schema.recipeName.replace(' ', '');
  const packageName = schema.recipeName.toLowerCase().replace(' ', '-');
  const recipesRoot = path.resolve(offsetFromRoot(recipePath), recipePath);

  if (fs.existsSync(path.join(recipesRoot, packageName))) {
    throw new Error(`The recipe ${schema.recipeName} already exists`);
  }

  return { ...schema, fileName, packageName, recipesRoot, tmpl: '' };
}

function validateSchema(tree: Tree, schema: RecipeGeneratorGeneratorSchema) {
  const newSchema = { ...schema };

  if (
    !newSchema.recipeName.match(/^[A-Z][a-z]+$/) &&
    !newSchema.recipeName.match(/^([A-Z][a-z]+)([\ ][A-Z][a-z]+)+$/m)
  ) {
    throw new Error(`Must enter a Capitalized per word recipe name (ex: My Recipe Name)`);
  }

  return newSchema;
}
