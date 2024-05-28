import { joinPathFragments, type ProjectConfiguration, type Tree } from '@nx/devkit';

export const isSplitProject = (tree: Tree, project: ProjectConfiguration) =>
  tree.exists(joinPathFragments(project.root, '../stories/project.json'));

export function assertStoriesProject(tree: Tree, options: { isSplitProject: boolean; project: ProjectConfiguration }) {
  if (options.isSplitProject && options.project.name?.endsWith('-stories')) {
    throw new Error(
      `This generator can be invoked only against library project. Please run it against "${options.project.name.replace(
        '-stories',
        '',
      )}" library project.`,
    );
  }
}
