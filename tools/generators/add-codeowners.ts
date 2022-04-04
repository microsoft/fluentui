import { applyChangesToString, Tree } from '@nrwl/devkit';
import { joinPathFragments, StringChange, ChangeType } from '@nrwl/devkit';

import { getProjectConfig } from '../utils';

interface Options {
  packageName: string;
  owner: string;
}
export function addCodeowner(tree: Tree, options: Options) {
  const project = getProjectConfig(tree, options);
  processCodeowners(tree, { ...project, owner: options.owner });
}

function processCodeowners(tree: Tree, options: ReturnType<typeof getProjectConfig> & Pick<Options, 'owner'>) {
  const placeholder = '# <%= NX-CODEOWNER-PLACEHOLDER %>';
  const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');

  if (!tree.exists(codeownersPath)) {
    throw new Error(`CODEOWNERS doesn't exists`);
  }

  const codeownersContent = tree.read(codeownersPath, 'utf8') as string;
  const placeholderPosition = codeownersContent.indexOf(placeholder);

  if (placeholderPosition === -1) {
    throw new Error(`CODEOWNERS is missing '${placeholder}' placeholder`);
  }

  const changes: StringChange[] = [
    {
      type: ChangeType.Delete,
      start: placeholderPosition + 1,
      length: placeholder.length,
    },
    {
      index: placeholderPosition,
      type: ChangeType.Insert,
      text: `${options.projectConfig.root} ${options.owner}\n`,
    },
    {
      type: ChangeType.Insert,
      index: placeholderPosition + 1,
      text: placeholder + '\n',
    },
  ];

  const newContents = applyChangesToString(codeownersContent, changes);

  tree.write(codeownersPath, newContents);
}
