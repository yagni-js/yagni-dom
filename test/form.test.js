
const expect = require('chai').expect;
const dom = require('..');


describe('inputType()', function () {

  it('should return lowercased input type', function () {

    const input = dom.h('input', {type: 'RADIO'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.inputType(el)).to.equal('radio');

  });

  it('should return text as input type if element type is not defined', function () {

    const el = dom.createElement('input');

    expect(el.getAttribute('type')).to.be.null;
    expect(dom.inputType(el)).to.equal('text');

  });

});


describe('serializeInput()', function () {

  it('should return object', function () {

    const input = dom.h('input', {name: 'foo', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.be.an('object');

  });

  it('should return empty object for file input', function () {

    const input = dom.h('input', {type: 'file', name: 'foo', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for disabled input', function () {

    const input = dom.h('input', {type: 'text', name: 'foo', value: 'baz', disabled: 'disabled'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for not selected checkbox input', function () {

    const input = dom.h('input', {type: 'checkbox', name: 'foo'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for not selected radio input', function () {

    const input = dom.h('input', {type: 'radio', name: 'foo'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return serialized value for selected checkbox input', function () {

    const input = dom.h('input', {type: 'checkbox', name: 'foo', checked: 'checked'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({foo: true});

  });

  it('should return serialized value for selected radio input', function () {

    const input = dom.h('input', {type: 'radio', name: 'foo', checked: 'checked', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for text input', function () {

    const input = dom.h('input', {type: 'text', name: 'foo', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for password input', function () {

    const input = dom.h('input', {type: 'password', name: 'foo', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for hidden input', function () {

    const input = dom.h('input', {type: 'hidden', name: 'foo', value: 'baz'}, {}, []);
    const el = dom.hToDOM(input);

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

});


describe('serializeForm()', function () {

  it('should serialize all inputs with names', function () {

    const tree = dom.h('form', {}, {}, [
      dom.h('input', {type: 'text', name: 'aaa', value: ''}, {}, []),
      dom.h('input', {type: 'text', name: 'bbb', value: 'bbb'}, {}, []),
      dom.h('input', {type: 'password', name: 'ccc', value: 'ccc'}, {}, []),
      dom.h('input', {type: 'hidden', name: 'ddd', value: 'ddd'}, {}, []),
      dom.h('input', {type: 'file', name: 'eee', value: 'eee'}, {}, []),
      dom.h('input', {type: 'checkbox', name: 'fff'}, {}, []),
      dom.h('input', {type: 'checkbox', name: 'ggg', checked: 'checked'}, {}, []),
      dom.h('input', {type: 'radio', name: 'hhh', value: 'h'}, {}, []),
      dom.h('input', {type: 'radio', name: 'hhh', value: 'hh'}, {}, []),
      dom.h('input', {type: 'radio', name: 'hhh', checked: 'checked', value: 'hhh'}, {}, []),
      dom.h('input', {type: 'text', name: 'iii', value: 'iii', disabled: 'disabled'}, {}, []),
      dom.h('input', {name: 'jjj', value: 'jjj'}, {}, []),
    ]);
    const el = dom.hToDOM(tree);
    const expected = {
      aaa: '',
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      ggg: true,
      hhh: 'hhh',
      jjj: 'jjj'
    };

    expect(dom.serializeForm(el)).to.deep.equal(expected);

  });

});
