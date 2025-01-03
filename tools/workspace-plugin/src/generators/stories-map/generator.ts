import * as tsquery from '@phenomnomnominal/tsquery';
import ts from 'typescript';
import * as path from 'node:path';
import { formatFiles, getProjects, ProjectConfiguration, Tree, visitNotIgnoredFiles, writeJson } from '@nx/devkit';
import { StoriesMapGeneratorSchema } from './schema';

type StoriesMetadata = Array<{
  title: string;
  storyFilePath: string;
  project: ProjectConfiguration;
  group:
    | {
        name: string;
        children: string[];
        githubLabel: string;
      }
    | undefined;
}>;

type GroupedList = { [group_name: string]: Array<{ children: string[]; project: string }> };
type AggregatedGroupedList = { [group_name: string]: { [project_name: string]: string[] } };

export async function storiesMapGenerator(tree: Tree, _options: StoriesMapGeneratorSchema) {
  const stories = getStoriesMetadata(tree);
  writeJson(tree, '/stories-map.json', stories);

  const list = generateIssuesOptionList(tree, stories);

  writeJson(tree, '/stories-list.json', list);

  const githubIssueOptions = createOptions(list);
  const yamlList = githubIssueOptions.map(item => `- ${item}`).join(`\n`);

  console.log(yamlList);

  await formatFiles(tree);
}

export default storiesMapGenerator;

function createOptions(groups: AggregatedGroupedList) {
  const list: string[] = [];
  const components = { stable: [] as string[], preview: [] as string[], compat: [] as string[] };

  for (const [group, entry] of Object.entries(groups)) {
    if (group === 'Utilities') {
      list.push(group);
      continue;
    }
    if (group === 'Icons') {
      list.push(group);
      continue;
    }
    if (group === 'Motion') {
      list.push(group);
      continue;
    }
    if (group === 'Theme') {
      list.push(`${group}/Tokens`);
      continue;
    }

    const entriesForList = Object.values(entry).flat();
    if (group === 'Migration Shims') {
      const item = entriesForList.filter(val => /^V\d/.exec(val));
      list.push(...item.map(val => `${group} ${val}`));
      continue;
    }
    if (group === 'Components') {
      const item = entriesForList.filter(val => val[0] === val[0].toUpperCase()).sort();
      components.stable.push(...item);
      continue;
    }
    if (group === 'Compat Components') {
      const item = entriesForList.sort().map(val => `${val} (Compat)`);
      components.compat.push(...item);
      continue;
    }
    if (group === 'Preview Components') {
      const item = entriesForList.sort().map(val => `${val} (Preview)`);
      components.preview.push(...item);
      continue;
    }
  }

  list.sort().unshift(...components.stable, ...components.preview, ...components.compat);
  list.push('Other...');

  return list;
}

function generateIssuesOptionList(tree: Tree, metadata: StoriesMetadata) {
  const groups: GroupedList = {};

  for (const entry of metadata) {
    if (!entry.group) {
      continue;
    }
    if (!groups[entry.group.name]) {
      groups[entry.group.name] = [];
    }
    groups[entry.group.name].push({ project: entry.project.name!, children: unique(entry.group.children) });
  }

  const aggregatedGroups = aggregateData(groups);

  return aggregatedGroups;

  function aggregateData(input: typeof groups): AggregatedGroupedList {
    const output = Object.entries(input).reduce((acc, [group, entry]) => {
      if (!acc[group]) {
        acc[group] = {};
      }
      entry.forEach(val => {
        if (!acc[group][val.project]) {
          acc[group][val.project] = [];
        }

        acc[group][val.project].push(...val.children);
        acc[group][val.project] = unique(acc[group][val.project]);
      });

      return acc;
    }, {} as { [group_name: string]: { [project_name: string]: string[] } });

    return output;
  }
}

function getStoriesMetadata(tree: Tree) {
  const v9projects: ProjectConfiguration[] = [];
  const projects = getProjects(tree);
  projects.forEach((projectConfig, _projectName) => {
    if (projectConfig.tags?.includes('vNext')) {
      v9projects.push(projectConfig);
    }
  });

  const titles: StoriesMetadata = [];

  v9projects.forEach(config => {
    visitNotIgnoredFiles(tree, config.root, filePath => {
      if (filePath.includes('index.stories.')) {
        const type = path.basename(filePath).split('.').at(-1) as 'tsx' | 'mdx';
        const content = tree.read(filePath, 'utf-8') as string;
        const title = getStoryTitle(content, type);

        if (!title) {
          console.warn(`No title found!: ${filePath}`);
          return;
        }

        titles.push({
          title,
          storyFilePath: filePath,
          project: config,
          group: getStoryGroup(tree, { title, project: config }),
        });
      }
    });
  });

  return titles;
}

function getStoryTitle(source: string, type: 'tsx' | 'ts' | 'mdx') {
  if (type === 'mdx') {
    const title = extractMetaTitleWithRegex(source);

    return title;
  }

  if (type === 'tsx' || type === 'ts') {
    const [exportAssigment] = tsquery.query<ts.ExportAssignment>(source, 'ExportAssignment');

    // default exporting variable eg: `const foo = {}; export default const;`
    if (exportAssigment.expression.kind === ts.SyntaxKind.Identifier) {
      const [exportIdentifierNode] = tsquery.match<ts.Identifier>(exportAssigment, 'Identifier');

      const exportIdentifierName = exportIdentifierNode.text;

      const [titleNode] = tsquery.query<ts.StringLiteral>(
        source,
        `Identifier[name="${exportIdentifierName}"] ~ ObjectLiteralExpression PropertyAssignment > Identifier[name="title"] ~ StringLiteral`,
      );

      return titleNode.text;
    }

    // default exporting expression eg: `export default {}`
    const [titleNode] = tsquery.match<ts.StringLiteral>(
      exportAssigment,
      'ObjectLiteralExpression PropertyAssignment > Identifier[name="title"] ~ StringLiteral',
    );

    if (!titleNode) {
      return null;
    }

    const title = titleNode.text;

    return title;
  }

  function extractMetaTitleWithRegex(content: string) {
    const regex = /<Meta[^>]*\btitle=["']([^"']+)["'][^>]*>/;
    const match = content.match(regex);
    return match ? match[1] : null;
  }
}

function getStoryGroup(
  tree: Tree,
  entry: {
    title: string;
    project: ProjectConfiguration;
  },
) {
  if (entry.title.startsWith('Concepts')) {
    return;
  }
  if (entry.project.name?.includes('react-charts')) {
    return;
  }
  if (entry.project.tags?.includes('tools')) {
    return;
  }
  if (entry.project.projectType === 'application' && entry.project.name !== 'public-docsite-v9') {
    return;
  }

  const titleTree = entry.title.split('/');
  const mainGroup = titleTree[0];
  const secondaryGroup = titleTree[1];

  return {
    name: mainGroup,
    children: titleTree.slice(1),
    githubLabel: secondaryGroup,
  };
}

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}
