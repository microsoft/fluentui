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

  const executeCommandBase: Choice = {
    name: `Execute: nx g ${generatorCommand}`,
    value: generatorCommand,
    message: `Execute: nx g ${generatorCommand}`,
  };
  const executeCommand: Choice = {
    ...executeCommandBase,
  };
  const { choices: generatorFlagsChoices, state: flagsState } = createGeneratorFlagsChoices(
    generator,
    projects.projects,
  );
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
        message: 'Enable dry-run mode?',
      }).run();
    } else {
      let escPressed = false;

      flagValue = (
        await new Input({
          message: `${selectedFlag}`,
          hint: `--${selectedFlag}=`,
          footer: `Press 'Enter' to confirm your input or 'Escape' to cancel (go back to flag selection).`,
        })
          .on('keypress', async (_char, key) => {
            if (key.name === 'escape') {
              escPressed = true;
            }
          })
          .run()
          .catch(_ => {
            if (escPressed) {
              return '';
            }
          })
      ).trim();
    }

    if (typeof flagValue === 'string' && flagValue.length === 0) {
      // go back by submitting empty choice
      selectedFlag = await new AutoComplete(generatorFlagsPromptOptions).run();
    } else {
      flagsState[selectedFlag] = flagValue;

      const flagCommand = serializeFlagState(flagsState);

      console.log({ flagCommand });

      executeCommand.name = executeCommandBase.name + ' ' + flagCommand;
      executeCommand.value = executeCommandBase.value + ' ' + flagCommand;
      executeCommand.message = executeCommandBase.message + ' ' + flagCommand;

      // remove selected flags from menu ( not the best DX imo) - removing for now
      // generatorFlagsChoices = generatorFlagsChoices.filter(choice => choice.value !== selectedFlag);
      flagChoices = [executeCommand, ...generatorFlagsChoices];

      selectedFlag = await new AutoComplete({ ...generatorFlagsPromptOptions, choices: flagChoices }).run();
    }
  }

  output.logSingleLine(`Running: nx g ${executeCommand.value}`);

  runCommand('nx', ['g', executeCommand.value]);
}

function serializeFlagState(state: Record<string, unknown>) {
  return Object.entries(state)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `--${key}` : '';
      }
      return `--${key}=${value}`;
    })
    .filter(Boolean)
    .join(' ');
}

function createGeneratorFlagsChoices(
  generator: ReturnType<typeof parseGeneratorString>,
  projects: ProjectsConfigurations['projects'],
): {
  choices: Choice[];
  state: Record<string, unknown>;
} {
  const generatorInfo = getGeneratorInformation(generator.collection, generator.generator, workspaceRoot, projects);

  const generatorSchema: {
    required?: string[];
    properties: { [key: string]: { type: string; description: string; 'x-priority'?: 'important' } };
    id: string;
  } = generatorInfo.schema;
  const { properties, required } = generatorSchema;

  const { choices, state } = Object.entries(properties).reduce<{
    choices: Choice[];
    state: Record<string, unknown>;
  }>(
    (acc, [key, value]) => {
      acc.choices.push({
        name: `${key}${required?.includes(key) ? output.dim('(required)') : ''} - ${value.description}`,
        value: key,
      });
      acc.state[key] = null;

      return acc;
    },
    { choices: [], state: {} },
  );

  const dryRunChoice = {
    name: 'dry-run',
    value: 'dryRun',
  };
  choices.push(dryRunChoice);

  return { choices, state };
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
