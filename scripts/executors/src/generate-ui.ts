// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- cannot import .d.ts as that is causing failures within ts-node/register
/// <reference types="./enquirer-types.d.ts" />

import { spawnSync } from 'node:child_process';

import {
  ProjectsConfigurations,
  createProjectGraphAsync,
  output,
  readNxJson,
  readProjectsConfigurationFromProjectGraph,
  workspaceRoot,
} from '@nx/devkit';
import { AutoComplete, AutoCompleteOptions, type Choice, Confirm, Input } from 'enquirer';
import { getGeneratorInformation } from 'nx/src/command-line/generate/generator-utils';
import { getInstalledPluginsAndCapabilities, getLocalWorkspacePlugins } from 'nx/src/utils/plugins';
import { PluginCapabilities } from 'nx/src/utils/plugins/plugin-capabilities';

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

async function main() {
  const graph = await createProjectGraphAsync();
  const projects = readProjectsConfigurationFromProjectGraph(graph);
  // eslint-disable-next-line deprecation/deprecation
  const nxJson = readNxJson();
  if (!nxJson) {
    throw new Error('nx.json not found');
  }

  const localPlugins = await getLocalWorkspacePlugins(projects, nxJson);
  const installedPlugins = await getInstalledPluginsAndCapabilities(workspaceRoot, projects.projects);

  const pluginChoices = [createPluginChoices(localPlugins), createPluginChoices(installedPlugins)].flat();

  const generatorPromptOptions: AutoCompleteOptions = {
    name: 'generator',
    message: 'Select generator to run',
    choices: pluginChoices,
    limit: 10,
    suggest,
    // header,
    footer: () => {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  };
  const generatorPrompt = new AutoComplete(generatorPromptOptions);

  const generatorCommand = await generatorPrompt.run();
  const generator = parseGeneratorString(generatorCommand);

  const executeCommand: Choice = {
    name: `Execute: nx g ${generatorCommand}`,
    value: generatorCommand,
    message: `Execute: nx g ${generatorCommand}`,
  };
  let generatorFlagsChoices = createGeneratorFlagsChoices(generator, projects.projects);
  let flagChoices = [executeCommand, ...generatorFlagsChoices];

  const generatorFlagsPromptOptions: AutoCompleteOptions = {
    name: 'flag',
    message: 'Execute command or Set flags',
    choices: flagChoices,
    limit: 5,
    suggest,
    // header,
    footer: () => {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  };
  const generatorFlagsPrompt = new AutoComplete(generatorFlagsPromptOptions);

  let selectedFlag = await generatorFlagsPrompt.run();

  while (!selectedFlag.startsWith(executeCommand.value)) {
    let flagValue = '';
    if (selectedFlag === 'dryRun') {
      flagValue = await new Confirm({
        name: 'question',
        message: 'Want to answer?',
      }).run();
    } else {
      flagValue = (
        await new Input({
          message: `${selectedFlag}`,
          hint: `--${selectedFlag}=`,
          footer: `Press 'Enter' to confirm your input. Empty value will go back to flag selection.`,
        }).run()
      ).trim();
    }

    if (typeof flagValue === 'string' && flagValue.length === 0) {
      selectedFlag = await new AutoComplete(generatorFlagsPromptOptions).run();
    } else {
      const flagCommand = selectedFlag === 'dryRun' ? ' --dryRun' : ` --${selectedFlag}=${flagValue}`;

      executeCommand.name += flagCommand;
      executeCommand.value += flagCommand;
      executeCommand.message += flagCommand;

      generatorFlagsChoices = generatorFlagsChoices.filter(choice => choice.value !== selectedFlag);
      flagChoices = [executeCommand, ...generatorFlagsChoices];

      selectedFlag = await new AutoComplete({ ...generatorFlagsPromptOptions, choices: flagChoices }).run();
    }
  }

  output.logSingleLine(`Running: nx g ${executeCommand.value}`);

  runCommand('nx', ['g', executeCommand.value]);
}

function createGeneratorFlagsChoices(
  generator: ReturnType<typeof parseGeneratorString>,
  projects: ProjectsConfigurations['projects'],
): Choice[] {
  const generatorInfo = getGeneratorInformation(generator.collection, generator.generator, workspaceRoot, projects);

  const generatorSchema: {
    required?: string[];
    properties: { [key: string]: { type: string; description: string; 'x-priority'?: 'important' } };
    id: string;
  } = generatorInfo.schema;
  const { properties, required } = generatorSchema;

  const choices: Choice[] = Object.entries(properties).map(([key, value]) => {
    const item = {
      name: `${key}${required?.includes(key) ? output.dim('(required)') : ''} - ${value.description}`,
      value: key,
    };
    return item;
  });

  const dryRunChoice = {
    name: 'dry run mode',
    value: 'dryRun',
  };
  choices.push(dryRunChoice);

  return choices;
}

function createPluginChoices(plugins: Map<string, PluginCapabilities>): Array<Choice> {
  const choices: Array<Choice> = [];
  plugins.forEach(plugin => {
    choices.push(...createChoice(plugin));
  });

  return choices;

  function createChoice(plugin: PluginCapabilities) {
    const generators = plugin.generators ?? {};
    const items = Object.entries(generators).reduce<Array<Choice>>((acc, generatorMetadata) => {
      const [generatorName, generatorConfig] = generatorMetadata;
      if (generatorConfig.hidden) {
        return acc;
      }
      const item = {
        name: `${plugin.name} - ${generatorName} - ${generatorConfig.description}`,
        value: `${plugin.name}:${generatorName}`,
      };
      acc.push(item);
      return acc;
    }, []);

    return items;
  }
}

// ========================

function suggest(typed: string, choices: Array<Choice>) {
  const matches = choices.filter(choice => choice.value.includes(typed));
  return matches.length ? matches : [];
}

function runCommand(command: string, args: string[]) {
  spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
  });
}

function parseGeneratorString(value: string) {
  const separatorIndex = value.lastIndexOf(':');
  if (separatorIndex > 0) {
    return {
      collection: value.slice(0, separatorIndex),
      generator: value.slice(separatorIndex + 1),
    };
  }

  throw new Error(`Invalid generator string: ${value}`);
}
