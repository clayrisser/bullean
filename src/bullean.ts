import _get from 'lodash.get';
import pegjs, { Parser } from 'pegjs';
import bulleanPegjs from './bullean.pegjs';
import {
  AST,
  HashMap,
  LeftType,
  Operation,
  OperationOperator,
  Predicate,
  PredicateOperator
} from './types';

export default class Bullean {
  private parser: Parser;

  constructor(private data: HashMap = {}) {
    this.parser = pegjs.generate(bulleanPegjs);
  }

  eval(input: string): boolean {
    const ast = this.parse(input);
    return this.evalOperationOrPredicate(ast);
  }

  parse(input: string): AST {
    return this.parser.parse(input);
  }

  private evalPredicate(predicate: Predicate): boolean {
    const value = _get(this.data, predicate.left.name);
    switch (predicate.operator) {
      case PredicateOperator.Equal:
        return predicate.value === value.toString();
      case PredicateOperator.NotEqual:
        return predicate.value !== value.toString();
    }
    return false;
  }

  private evalOperationOrPredicate(predicate: Operation | Predicate): boolean {
    if ((predicate as Predicate)?.left?.type === LeftType.Identifier) {
      return this.evalPredicate(predicate as Predicate);
    }
    if (Array.isArray((predicate as Operation)?.predicates)) {
      return this.evalOperation(predicate as Operation);
    }
    return false;
  }

  private evalOperation(operation: Operation): boolean {
    switch (operation.operator) {
      case OperationOperator.And:
        return operation.predicates
          .map(this.evalOperationOrPredicate.bind(this))
          .reduce((result: boolean, b: boolean) => result && b, false);
      case OperationOperator.Or:
        return operation.predicates
          .map(this.evalOperationOrPredicate.bind(this))
          .reduce((result: boolean, b: boolean) => result || b, false);
    }
  }
}
