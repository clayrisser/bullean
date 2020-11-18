export interface HashMap<T = any> {
  [key: string]: T;
}

export interface Predicate {
  left: Left;
  operator: PredicateOperator;
  value: string;
}

export interface Operation<T = Predicate> {
  operator: OperationOperator;
  predicates: T[];
}

export interface Left {
  name: string;
  type: LeftType;
}

export enum PredicateOperator {
  Equal = '=',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',
  NotEqual = '!='
}

export enum OperationOperator {
  And = 'and',
  Or = 'or'
}

export enum LeftType {
  Identifier = 'identifier'
}

export type AST = Operation | Predicate;
