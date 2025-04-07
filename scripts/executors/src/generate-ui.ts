// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- cannot import .d.ts as that is causing failures within ts-node/register
/// <reference types="./enquirer-types.d.ts" />

import { spawnSync } from 'node:child_process';

import {
  ProjectsConfigurations,
  createProjectGraphAsync,
  output,
  readNxJson,
  readProjectsConfigurationFromProjectGraph,
  serializeJson,
  workspaceRoot,
} from '@nx/devkit';
import { AutoComplete, AutoCompleteOptions, type Choice, Confirm, Input, NumberPrompt, Select } from 'enquirer';
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
  const {
    choices: generatorFlagsChoices,
    state: flagsState,
    prompts: generatorFlagsPrompts,
  } = createGeneratorFlagsChoices(generator, projects.projects);
  let flagChoices = [executeCommand, ...generatorFlagsChoices];

  const generatorFlagsPromptOptions: AutoCompleteOptions = {
    name: 'flag',
    message: 'Execute command or Set flags',
    choices: flagChoices,
    limit: 5,
    suggest,
    footer: () => {
      return output.dim('(Scroll up and down to reveal more choices)');
    },
  };
  const generatorFlagsPrompt = new AutoComplete(generatorFlagsPromptOptions);

  let selectedFlag = await generatorFlagsPrompt.run();

  // ========
  // START FLAG PROMPTS until user chooses to EXECUTE
  // ========
  while (!selectedFlag.startsWith(executeCommand.value)) {
    const prompt = generatorFlagsPrompts[selectedFlag];
    const answer = await prompt();
    const flagValue = typeof answer === 'string' ? answer.trim() : answer;

    if (typeof flagValue === 'string' && flagValue.length === 0) {
      // go back by submitting empty choice
      selectedFlag = await new AutoComplete(generatorFlagsPromptOptions).run();
    } else {
      flagsState[selectedFlag] = flagValue;

      const flagCommand = serializeFlagState(flagsState);

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

// ====================================================================================================================

/**
 * TODO: adopt logic from https://github.com/nrwl/nx/blob/master/packages/nx/src/utils/params.ts
 *
 * @param generator
 * @param projects
 */
function createGeneratorFlagsChoices(
  generator: ReturnType<typeof parseGeneratorString>,
  projects: ProjectsConfigurations['projects'],
): {
  choices: Choice[];
  state: Record<string, unknown>;
  prompts: Record<string, () => Promise<unknown>>;
} {
  const generatorInfo = getGeneratorInformation(generator.collection, generator.generator, workspaceRoot, projects);

  /**
   * @see https://nx.dev/extending-nx/recipes/generator-options#all-configurable-schema-options
   */
  type SchemaProperty = {
    type: string;
    description: string;
    enum?: string[];
    'x-prompt'?: string;
    'x-priority'?: 'important';
    'x-deprecated'?: boolean;
  };
  const generatorSchema: {
    required?: string[];
    properties: {
      [key: string]: SchemaProperty;
    };
    id: string;
  } = generatorInfo.schema;
  const { properties, required } = generatorSchema;

  const genericProperties = {
    dryRun: {
      type: 'boolean',
      description: 'Enable dry-run mode?',
    },
  };
  Object.assign(properties, genericProperties);

  const { choices, state, prompts } = Object.entries(properties).reduce<{
    choices: Choice[];
    state: Record<string, unknown>;
    prompts: Record<string, () => Promise<unknown>>;
  }>(
    (acc, [key, value]) => {
      acc.choices.push({
        name: `${key}${required?.includes(key) ? output.dim('(required)') : ''} - ${value.description}`,
        value: key,
      });
      acc.state[key] = null;
      acc.prompts[key] = getPromptType(key, properties[key]);

      return acc;
    },
    { choices: [], state: {}, prompts: {} },
  );

  return { choices, state, prompts };

  function getPromptType(propName: string, propertyDef: SchemaProperty): () => Promise<unknown> {
    const footer = output.dim(`Press 'Enter' to confirm your input or 'Escape' to cancel (go back to flag selection).`);
    if (propertyDef.type === 'number') {
      return () => {
        let escPressed = false;

        return new NumberPrompt({
          name: 'number',
          message: `Enter number/amount for ${propName}`,
          footer,
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
          });
      };
    }

    if (propertyDef.type === 'boolean') {
      return () => new Confirm({ name: 'confirm', message: propName }).run();
    }

    if (propertyDef.type === 'string') {
      if (propName === 'project' && propertyDef['x-prompt']) {
        return () => {
          let escPressed = false;

          return new AutoComplete({
            name: 'project',
            message: 'Select Project',
            choices: Object.keys(projects),
            limit: 10,
            footer,
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
            });
        };
      }

      if (Array.isArray(propertyDef.enum)) {
        return () => {
          let escPressed = false;

          return new Select({ name: 'enum', message: `Pick ${propName}`, choices: propertyDef.enum!, footer })
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
            });
        };
      }

      return () => {
        let escPressed = false;

        return new Input({
          name: 'input',
          message: propName,
          footer,
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
          });
      };
    }

    throw new Error(`unknown prompt type from ${propName}:${serializeJson(propertyDef)}`);
  }
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

// ====================================================================================================================

function serializeFlagState(state: Record<string, unknown>) {
  return Object.entries(state)
    .reduce<string[]>((acc, [key, value]) => {
      // eslint-disable-next-line eqeqeq
      if (value == null) {
        return acc;
      }

      if (typeof value === 'boolean') {
        return value ? [...acc, `--${key}`] : acc;
      }

      return [...acc, `--${key}=${value}`];
    }, [])
    .join(' ');
}

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
