import { manipulatorExtension } from './manipulatorExtension';
import { parseCommaDelimitedString } from '../../utils/parseCommaDelimitedString';

export const highlightOn = manipulatorExtension(
  'highlightOn',
  [parseCommaDelimitedString, (input) => `'${input}'`]
);

