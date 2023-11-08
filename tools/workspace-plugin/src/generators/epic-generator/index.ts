import { getProjects, stripIndents, Tree } from '@nx/devkit';
import { execSync, spawnSync } from 'child_process';
import { EpicGenerator } from './schema';
import { isPackageConverged, workspacePaths } from '../../utils';

const placeholderMessage = '*Description to be added*';

function validateSchema(schema: EpicGenerator): Required<EpicGenerator> {
  if (schema.repository !== undefined && !schema.repository.match(/[A-z-]+\/[A-z-]+/)) {
    throw new Error(stripIndents`
     You provided "${schema.repository}", which is an invalid repository name.
     Please follow the format {owner}/{repositoryName}.
    `);
  }

  if (schema.title.trim().length === 0) {
    throw new Error('Must provide a title for the issue');
  }

  return {
    repository: schema.repository,
    title: schema.title,
  };
}

function checkAuthentication() {
  // `gh auth status` output is split accross multiple lines
  // so we use spawnSync to capture all lines and flatten the output
  const result = spawnSync('gh', ['auth', 'status']);

  if (result.error) {
    throw new Error(
      `Error calling GitHub CLI (gh). Please make sure it's installed correctly.\n${result.error.message}`,
    );
  }

  if (!result.output.join('').includes('Logged in to github.com')) {
    throw new Error('You are not logged into GitHub CLI (gh).');
  }
}

interface Package {
  name: string;
  folder: string;
  owners: string[];
}

interface Ownership {
  path: string;
  owners: string[];
}

interface MigrationIssue {
  issueUrl?: string;
  assignee?: string;
  packages: Package[];
}

type MigrationIssues = Record<string, MigrationIssue>;

function getConvergedPackages(tree: Tree) {
  const projects = getProjects(tree);

  const convergedPackages: Package[] = [];
  projects.forEach((project, key) => {
    if (project.projectType === 'library' && isPackageConverged(tree, project)) {
      convergedPackages.push({
        name: key,
        folder: project.root,
        owners: [],
      });
    }
  });

  return convergedPackages;
}

function getCodeowners(tree: Tree): Ownership[] {
  const codeownersContent = tree.read(workspacePaths.github.codeowners, 'utf8') || '';

  return codeownersContent.split('\n').map(line => {
    const [path, ...owners] = line.split(' ');

    return {
      path: path.replace(/\/+$/, ''),
      owners,
    };
  });
}

function mapOwnerships(packages: Package[], ownerships: Ownership[]): Package[] {
  return packages.map(pkg => {
    const owners = ownerships.find(ownership => ownership.path === pkg.folder)?.owners || [];

    return {
      ...pkg,
      owners,
    };
  });
}

function getPackages(tree: Tree) {
  const packages = getConvergedPackages(tree);

  const ownerships = getCodeowners(tree);

  return mapOwnerships(packages, ownerships);
}

function createEpic(repo: string, title: string) {
  const issueUrl = execSync(`gh issue create --repo "${repo}" --title "${title}" --body "${placeholderMessage}"`)
    .toString()
    .trim();

  return issueUrl;
}

function createIssue(repo: string, issue: MigrationIssue, templateTitle: string) {
  const title = `${templateTitle} - ${issue.assignee || 'ownerless'}`;
  const message = stripIndents`
    🚧 This is an auto-generated issue to individually track migration progress.

    ### Packages to migrate:
    ${issue.packages.map(pkg => `- ${pkg.name}`).join('\n')}
  `;

  const command = `gh issue create --repo "${repo}" --title "${title}" --body "${message}"`;

  const issueUrl = execSync(command).toString().trim();

  return issueUrl;
}

function generateIssues(repo: string, templateTitle: string, packages: Package[]) {
  const migrationIssues = packages.reduce<MigrationIssues>((acc, pkg) => {
    const teamOwner = pkg.owners.find(owner => owner.startsWith('@microsoft/'));
    const key = teamOwner || 'ownerless';

    if (acc[key]) {
      acc[key].packages.push(pkg);
      return acc;
    }

    acc[key] = {
      assignee: teamOwner,
      packages: [pkg],
    };

    return acc;
  }, {});

  Object.entries(migrationIssues).forEach(([key, issue]) => {
    migrationIssues[key].issueUrl = createIssue(repo, issue, templateTitle);
  });

  return migrationIssues;
}

function updateEpicWithIssues(epicUrl: string, issueMap: MigrationIssues) {
  const packageList = Object.values(issueMap)
    .map(issue => {
      return stripIndents`
    - [ ] ${issue.issueUrl}
    ${issue.packages.map(pkg => `  - ${pkg.name}`).join('\n')}
    `;
    })
    .join('\n');

  const updatedMessage = stripIndents`
  ${placeholderMessage}

  ### Packages that need migration:
  ${packageList}
`;

  const command = `gh issue edit ${epicUrl} --body "${updatedMessage}"`;

  execSync(command);
}

export default function (tree: Tree, schema: EpicGenerator) {
  const { title, repository } = validateSchema(schema);

  checkAuthentication();

  const packages = getPackages(tree);

  return () => {
    const epicUrl = createEpic(repository, title);

    const packagesWithIssue = generateIssues(repository, title, packages);

    updateEpicWithIssues(epicUrl, packagesWithIssue);

    console.log(stripIndents`Epic created on ${epicUrl}

    Please make sure to replace the placeholder message with context for the other teams.`);
  };
}
