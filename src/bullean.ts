import pegjs, { Parser } from 'pegjs';
import bulleanPegjs from './bullean.pegjs';

export default class Bullean {
  parser: Parser;

  constructor() {
    this.parser = pegjs.generate(bulleanPegjs);
  }

  parse(input: string) {
    return this.parser.parse(input);
  }
}
