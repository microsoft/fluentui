import * as Axe from 'axe-core';
import { SarifConverter } from './sarif-converter';
import { mas } from './mas';
import { ResultDecorator } from './result-decorator';
import { ruleMasConfiguration } from './mas-mappings';
import { DocumentUtils } from './document-utils';
import { MessageDecorator } from './message-decorator';
import { configuration } from './custom-rule-configurations';
import { CheckMessageTransformer } from './check-message-transformer';
import { ChiselHelpUrlGetter } from './chisel-help-url-getter';
import { ISarifLog } from './sarif/isarflog';

export function axeToSarif(axeResults: Axe.AxeResults): ISarifLog {
  // Setup
  const messageDecorator = new MessageDecorator(configuration, new CheckMessageTransformer());
  const chiselHelpUrlGetter = new ChiselHelpUrlGetter(configuration);
  const resultDecorator = new ResultDecorator(new DocumentUtils(), messageDecorator, ruleId =>
    chiselHelpUrlGetter.getChiselHelpUrl(ruleId)
  );
  resultDecorator.setMasConfiguration(ruleMasConfiguration);
  const sarifConverter = new SarifConverter(mas);

  // AxeResults -> IChiselResults
  const chiselResults = resultDecorator.decorateResults(axeResults);

  // IChiselResults -> ISarifLog
  return sarifConverter.convert(chiselResults, {}); // TODO - IChiselOptions w/ scanName, testCaseId, scanId
}
