import { PrettierConfig } from './prettier.d';

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

interface PrettierEslintConfig {
  /**
     * The path of the file being formatted
     * can be used in lieu of `eslintConfig` (eslint will be used to find the
     * relevant config for the file). Will also be used to load the `text` if
     * `text` is not provided.
     */
  filePath?: string;
  /**
     * The text (JavaScript code) to format
     */
  text: string;
  /**
     * The path to the eslint module to use.
     * Will default to require.resolve('eslint')
     */
  eslintPath?: string;
  /**
     * The config to use for formatting
     * with ESLint.
     */
  eslintConfig?: object;
  /**
     * The options to pass for
     * formatting with `prettier`. If not provided, prettier-eslint will attempt
     * to create the options based on the eslintConfig
     */
  prettierOptions?: PrettierConfig;
  /**
     * The options to pass for
     * formatting with `prettier` if the given option is not inferrable from the
     * eslintConfig.
     */
  fallbackPrettierOptions?: PrettierConfig;
  /**
     * The level for the logs
     */
  logLevel?: LogLevel;
  /**
     * Run Prettier Last. Default false
     */
  prettierLast?: boolean;
}

/**
 * Format javascript code with prettier-eslint.
 *
 * @param {PrettierEslintConfig} options - Option bag for prettier-eslint.
 * @returns {string} the formatted code.
 */
export type PrettierEslint = (options: PrettierEslintConfig) => string;
