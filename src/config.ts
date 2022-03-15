import { workspace, TextDocument } from 'vscode';

import { PrettierConfig, PrettierVSCodeConfig } from './prettier.d';

let config: PrettierVSCodeConfig = workspace.getConfiguration(
  'prettier'
) as any;
let userConfig: PrettierConfig = extractUserVSConfig();
let activeLanguages: Array<string> = getActiveLanguages();

/**
 * Setting refresh handler and returns extension config
 */
export function getExtensionConfig(): PrettierVSCodeConfig {
  workspace.onDidChangeConfiguration(() => {
    config = workspace.getConfiguration('prettier') as any;
    userConfig = extractUserVSConfig();
    activeLanguages = getActiveLanguages();
  });

  return config;
}

/**
 * Returns active languages
 */
export function getActiveLanguages(): Array<string> {
  return [
    ...config.javascriptEnable,
    ...config.typescriptEnable,
    ...config.cssEnable,
    ...config.jsonEnable,
    ...config.graphqlEnable
  ];
}

/**
 * Returns false if language is not activated 
 * or gets Prettier options from config
 * 
 * @param {fileName, languageId}
 */
export function getPrettierOptions({
  fileName,
  languageId
}: TextDocument): PrettierConfig | false {
  const parser = selectParser(languageId);

  if (!parser) {
    return false;
  }

  return {
    ...{ parser, filepath: fileName },
    ...getUserVSConfig()
  };
}

/**
 * Select parser based on current file languageId
 * 
 * @param config 
 * @param languageId 
 */
export function selectParser(languageId: string): string | void {
  switch (true) {
    case config.javascriptEnable.includes(languageId):
      return 'babylon';
    case config.typescriptEnable.includes(languageId):
      return 'typescript';
    case config.cssEnable.includes(languageId):
      return 'postcss';
    case config.jsonEnable.includes(languageId):
      return 'json';
    case config.graphqlEnable.includes(languageId):
      return 'graphql';
  }
}

/**
 * @param parser 
 */
export function isESLintCompatibleParser(parser: string): boolean {
  return parser === 'babylon' || parser === 'typescript';
}

/**
 * Returns object with relevant properties from user VSCode config
 * for Prettier configuration
 * 
 */
export function extractUserVSConfig(): object {
  return Object.keys(config).reduce((res, key) => {
    const item = config[key];

    if (
      typeof item === 'boolean' ||
      typeof item === 'string' ||
      typeof item === 'number'
    ) {
      res[key] = item;
    }

    return res;
  }, {});
}

/**
 * Returns User VSCode config for extension
 */
function getUserVSConfig(): PrettierConfig {
  return userConfig as PrettierConfig;
}

/**
 * Check if provided languageID is activated
 * 
 * @param languageId 
 */
export function isLanguageActive(languageId: string): boolean {
  return activeLanguages.indexOf(languageId) > -1;
}
