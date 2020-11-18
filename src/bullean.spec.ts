import Bullean from './bullean';

describe('new Bullean().parse()', () => {
  it('should parse a show if expression', () => {
    const bullean = new Bullean();
    const result = bullean.parse('hello=world');
    expect(result).toMatchObject({
      operator: '=',
      value: 'world',
      left: {
        name: 'hello',
        type: 'identifier'
      }
    });
  });

  it('should parse a complex show if expression', () => {
    const bullean = new Bullean();
    const result = bullean.parse('hello=world&&howdy=texas||foo=bar');
    expect(result).toMatchObject({
      op: 'or',
      predicates: [
        {
          op: 'and',
          predicates: [
            {
              left: {
                name: 'hello',
                type: 'identifier'
              },
              operator: '=',
              value: 'world'
            },
            {
              left: {
                name: 'howdy',
                type: 'identifier'
              },
              operator: '=',
              value: 'texas'
            }
          ]
        },
        {
          left: {
            name: 'foo',
            type: 'identifier'
          },
          operator: '=',
          value: 'bar'
        }
      ]
    });
  });

  it('should support order of operations', () => {
    const bullean = new Bullean();
    const result = bullean.parse('hello=world&&(howdy=texas||foo=bar)');
    expect(result).toMatchObject({
      op: 'and',
      predicates: [
        {
          left: {
            name: 'hello',
            type: 'identifier'
          },
          operator: '=',
          value: 'world'
        },
        {
          op: 'or',
          predicates: [
            {
              left: {
                name: 'howdy',
                type: 'identifier'
              },
              operator: '=',
              value: 'texas'
            },
            {
              left: {
                name: 'foo',
                type: 'identifier'
              },
              operator: '=',
              value: 'bar'
            }
          ]
        }
      ]
    });
  });
});
