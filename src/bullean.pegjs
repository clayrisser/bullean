{}

start = or

or = head:and tail:('||'and)+ {
  const predicates = tail.reduce((predicates, [, item]) => {
    predicates.push(item);
    return predicates;
  }, [head]);
  return {
    op: 'or',
    predicates: predicates
  };
} /and

and = head:paren tail:('&&'paren)+ {
  const predicates = tail.reduce((predicates, [, item]) => {
    predicates.push(item);
    return predicates;
  }, [head]);
  return {
    op: 'and',
    predicates: predicates
  };
} /paren

paren = '(' expression:or ')' {
  return expression;
} /predicate

predicate = left:identifier operator:operator right:value? {
  return {
    operator: operator,
    left,
    value: right
  };
}

value = id:[a-zA-Z0-9'"\.\-_!@#$%^*]+ {
  return id.join('');
}

identifier = id:[a-zA-Z0-9\.\-_]+ {
  return {
    name: id.join(''),
    type: 'identifier'
  };
}

operator = '='/'!='/'>'/'>='/'<'/'<='
