import type { CommandModule } from 'yargs';

import {
  API_COMMAND_SPEC,
  DOCTOR_COMMAND_SPEC,
  MANIFEST_COMMAND_SPEC,
  METADATA_COMMAND_SPEC,
  REPORT_COMMAND_SPEC,
  type CliCommandSpec,
  INIT_COMMAND_SPEC,
} from '../utils/command-spec';
import apiCommand from './api';
import doctorCommand from './doctor';
import manifestCommand from './manifest';
import metadataCommand from './metadata';
import reportCommand from './report';
import initCommand from './init';

export interface RegisteredCommand {
  module: CommandModule;
  spec: CliCommandSpec;
}

export const REGISTERED_COMMANDS: readonly RegisteredCommand[] = [
  { module: reportCommand, spec: REPORT_COMMAND_SPEC },
  { module: metadataCommand, spec: METADATA_COMMAND_SPEC },
  { module: apiCommand, spec: API_COMMAND_SPEC },
  { module: doctorCommand, spec: DOCTOR_COMMAND_SPEC },
  { module: manifestCommand, spec: MANIFEST_COMMAND_SPEC },
  { module: initCommand, spec: INIT_COMMAND_SPEC },
];

export function getRegisteredCommandManifest(): { commands: CliCommandSpec[] } {
  return { commands: REGISTERED_COMMANDS.map(command => command.spec) };
}
