import { manipulatorExtensionGenerator } from './manipulatonExtensionGenerator';
import { parseCommaDelimitedString } from '../../utils/parseCommaDelimitedString';

export const highlightOn = manipulatorExtensionGenerator(
  'highlightOn',
  [parseCommaDelimitedString, (input) => `'${input}'`]
);
