
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


describe('setInputDisabled()', function () {

  it('should make input disabled', function () {

    const input = dom.h('input', {}, {disabled: false}, []);
    const el = dom.hToDOM(input);

    expect(el.disabled).to.be.false;

    const ret = dom.setInputDisabled(el);

    expect(ret).to.equal(el);
    expect(ret.disabled).to.be.true;

  });

});


describe('setInputEnabled()', function () {

  it('should make input enabled', function () {

    const input = dom.h('input', {}, {disabled: true}, []);
    const el = dom.hToDOM(input);

    expect(el.disabled).to.be.true;

    const ret = dom.setInputEnabled(el);

    expect(ret).to.equal(el);
    expect(ret.disabled).to.be.false;

  });

});


describe('setInputReadonly()', function () {

  it('should make input readonly', function () {

    const input = dom.h('input', {}, {}, []);
    const el = dom.hToDOM(input);

    expect(el.readOnly).to.be.false;

    const ret = dom.setInputReadonly(el);

    expect(ret).to.equal(el);
    expect(ret.readOnly).to.be.true;

  });

});


describe('setInputEditable()', function () {

  it('should make input editable', function () {

    const input = dom.h('input', {}, {readOnly: true}, []);
    const el = dom.hToDOM(input);

    expect(el.readOnly).to.be.true;

    const ret = dom.setInputEditable(el);

    expect(ret).to.equal(el);
    expect(ret.readOnly).to.be.false;

  });

});


describe('isInputValid()', function () {

  // FIXME jsdom does not support checkValidity yet
  // https://github.com/tmpvar/jsdom/issues/544
  it.skip('should return true for valid value', function () {

    const input = dom.h('input', {}, {min: 3, max: 5, value: 4}, []);
    const el = dom.hToDOM(input);

    expect(dom.isInputValid(el)).to.be.true;

  });

  it.skip('should return false for invalid value', function () {

    const input = dom.h('input', {}, {min: 3, max: 5, value: 1}, []);
    const el = dom.hToDOM(input);

    expect(dom.isInputValid(el)).to.be.true;

  });

});
