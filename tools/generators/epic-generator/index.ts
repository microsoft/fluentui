import { getProjects, stripIndents, Tree } from '@nrwl/devkit';
import { access, readFileSync } from 'fs';
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import { EpicGeneratorSchema } from './schema';

function validateSchema(schema: EpicGeneratorSchema): Required<EpicGeneratorSchema> {
  if (schema.repository !== undefined && !schema.repository.match(/[A-z-]+\/[A-z-]+/)) {
    throw new Error('Must provide a valid repository for the issue');
  }

  if ((schema.title || '').trim() === '') {
    throw new Error('Must provide a valid title for the issue');
  }

  return {
    repository: schema.repository || 'microsoft/fluentui',
    title: schema.title,
    message: schema.message || '*Description to be added*',
  };
}

const checkAuthentication = async () => {
  const authStatus = execSync(`gh auth status`).toString();

  if (authStatus.search('You are not logged into any GitHub hosts') > 0) {
    throw new Error('You are not logged into GitHub CLI (gh).');
  }
};

interface Package {
  name: string;
  folder: string;
  owners?: string[];
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

interface MigrationIssueMap {
  [key: string]: MigrationIssue;
}

const getConvergencePackages = (tree: Tree) => {
  const projects = getProjects(tree);

  let convergencePackages: Package[] = [];
  projects.forEach((project, key) => {
    if (project.projectType === 'library' && project.tags?.some(tag => tag === 'vNext')) {
      convergencePackages.push({
        name: key,
        folder: project.root,
      });
    }
  });

  return convergencePackages;
};

const getCodeowners = (): Ownership[] => {
  const codeownersContent = readFileSync('.github/CODEOWNERS', 'utf8');

  return codeownersContent.split('\n').map(line => {
    const [path, ...owners] = line.split(' ');

    return {
      path: path.replace(/\/+$/, ''),
      owners,
    };
  });
};

const mapOwnerships = (packages: Package[], ownerships: Ownership[]): Package[] => {
  return packages.map(pckg => {
    const owners = ownerships.find(ownership => ownership.path === pckg.folder)?.owners || [];

    return {
      ...pckg,
      owners,
    };
  });
};

const getPackages = (tree: Tree) => {
  const packages = getConvergencePackages(tree);

  const ownerships = getCodeowners();

  return mapOwnerships(packages, ownerships);
};

const createEpic = (repo: string, title: string, message: string) => {
  const issueUrl = execSync(`gh issue create --repo "${repo}" --title "${title}" --body "${message}"`)
    .toString()
    .trim();

  return issueUrl;
};

const createIssue = (repo: string, issue: MigrationIssue, templateTitle: string) => {
  const title = `${templateTitle} - ${issue.assignee || 'unknown'}`;
  const message = stripIndents`
    🚧 This is an auto-generated issue to individually track migration progress.

    ### Packages to migrate:
    ${issue.packages.map(pckg => `- ${pckg.name}`).join('\n')}
  `;

  let command = `gh issue create --repo "${repo}" --title "${title}" --body "${message}"`;

  const issueUrl = execSync(command).toString().trim();

  return issueUrl;
};

const generateIssues = (repo: string, templateTitle: string, packages: Package[]) => {
  const migrationIssues = packages.reduce<MigrationIssueMap>((acc, pckg) => {
    const teamOwner = pckg.owners!.find(owner => owner.startsWith('@microsoft/'));
    const key = teamOwner || 'ownerless';

    if (key in acc) {
      acc[key].packages.push(pckg);
    } else {
      acc[key] = {
        assignee: teamOwner,
        packages: [pckg],
      };
    }

    return acc;
  }, {});

  Object.entries(migrationIssues).forEach(([key, issue]) => {
    migrationIssues[key].issueUrl = createIssue(repo, issue, templateTitle);
  });

  return migrationIssues;
};

const updateEpicWithIssues = (epicUrl: string, issueMap: MigrationIssueMap, message: string) => {
  const packageList = Object.values(issueMap)
    .map(issue => {
      return stripIndents`
    - [ ] ${issue.issueUrl}
    ${issue.packages.map(pckg => `  - ${pckg.name}`).join('\n')}
    `;
    })
    .join('\n');

  const updatedMessage = stripIndents`
  ${message}

  ### Packages that need migration:
  ${packageList}
`;

  let command = `gh issue edit ${epicUrl} --body "${updatedMessage}"`;

  execSync(command);
};

export default async function (tree: Tree, schema: EpicGeneratorSchema) {
  const { title, message, repository } = validateSchema(schema);

  checkAuthentication();

  const packages = getPackages(tree);

  return () => {
    const epicUrl = createEpic(repository, title, message);

    const packagesWithIssue = generateIssues(repository, title, packages);

    updateEpicWithIssues(epicUrl, packagesWithIssue, message);

    console.log(`Epic created on ${epicUrl}`);
  };
}
