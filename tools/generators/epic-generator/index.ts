import { getProjects, stripIndents, Tree } from '@nrwl/devkit';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { EpicGeneratorSchema } from './schema';
import { isPackageConverged } from '../../utils';

function validateSchema(schema: EpicGeneratorSchema): Required<EpicGeneratorSchema> {
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
    repository: schema.repository || 'microsoft/fluentui',
    title: schema.title,
    message: schema.message || '*Description to be added*',
  };
}

const checkAuthentication = () => {
  let authStatus;

  try {
    authStatus = execSync('ghz auth status', { stdio: [] }).toString();
  } catch (e) {
    throw new Error(`Error calling GitHub CLI (gh). Please make sure it's installed correctly.\n${e.message}`);
  }

  if (authStatus.includes('You are not logged into any GitHub hosts')) {
    throw new Error('You are not logged into GitHub CLI (gh).');
  }
};

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

const getConvergedPackages = (tree: Tree) => {
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
  return packages.map(pkg => {
    const owners = ownerships.find(ownership => ownership.path === pkg.folder)?.owners || [];

    return {
      ...pkg,
      owners,
    };
  });
};

const getPackages = (tree: Tree) => {
  const packages = getConvergedPackages(tree);

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
  const title = `${templateTitle} - ${issue.assignee || 'ownerless'}`;
  const message = stripIndents`
    🚧 This is an auto-generated issue to individually track migration progress.

    ### Packages to migrate:
    ${issue.packages.map(pkg => `- ${pkg.name}`).join('\n')}
  `;

  const command = `gh issue create --repo "${repo}" --title "${title}" --body "${message}"`;

  const issueUrl = execSync(command).toString().trim();

  return issueUrl;
};

const generateIssues = (repo: string, templateTitle: string, packages: Package[]) => {
  const migrationIssues = packages.reduce<MigrationIssues>((acc, pkg) => {
    const teamOwner = pkg.owners.find(owner => owner.startsWith('@microsoft/'));
    const key = teamOwner || 'ownerless';

    if (key in acc) {
      acc[key].packages.push(pkg);
    } else {
      acc[key] = {
        assignee: teamOwner,
        packages: [pkg],
      };
    }

    return acc;
  }, {});

  Object.entries(migrationIssues).forEach(([key, issue]) => {
    migrationIssues[key].issueUrl = createIssue(repo, issue, templateTitle);
  });

  return migrationIssues;
};

const updateEpicWithIssues = (epicUrl: string, issueMap: MigrationIssues, message: string) => {
  const packageList = Object.values(issueMap)
    .map(issue => {
      return stripIndents`
    - [ ] ${issue.issueUrl}
    ${issue.packages.map(pkg => `  - ${pkg.name}`).join('\n')}
    `;
    })
    .join('\n');

  const updatedMessage = stripIndents`
  ${message}

  ### Packages that need migration:
  ${packageList}
`;

  const command = `gh issue edit ${epicUrl} --body "${updatedMessage}"`;

  execSync(command);
};

export default function (tree: Tree, schema: EpicGeneratorSchema) {
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
