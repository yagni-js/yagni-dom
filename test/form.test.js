
const expect = require('chai').expect;
const dom = require('..');


describe('inputType()', function () {

  it('should return lowercased input type', function () {

    const factory = dom.h('input', {type: 'RADIO'}, {}, []);
    const el = factory();

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

    const factory = dom.h('input', {name: 'foo', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.be.an('object');

  });

  it('should return empty object for file input', function () {

    const factory = dom.h('input', {type: 'file', name: 'foo', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for disabled input', function () {

    const factory = dom.h('input', {type: 'text', name: 'foo', value: 'baz', disabled: 'disabled'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for not selected checkbox input', function () {

    const factory = dom.h('input', {type: 'checkbox', name: 'foo'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return empty object for not selected radio input', function () {

    const factory = dom.h('input', {type: 'radio', name: 'foo'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({});

  });

  it('should return serialized value for selected checkbox input', function () {

    const factory = dom.h('input', {type: 'checkbox', name: 'foo', checked: 'checked'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({foo: true});

  });

  it('should return serialized value for selected radio input', function () {

    const factory = dom.h('input', {type: 'radio', name: 'foo', checked: 'checked', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for text input', function () {

    const factory = dom.h('input', {type: 'text', name: 'foo', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for password input', function () {

    const factory = dom.h('input', {type: 'password', name: 'foo', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

  it('should return serialized value for hidden input', function () {

    const factory = dom.h('input', {type: 'hidden', name: 'foo', value: 'baz'}, {}, []);
    const el = factory();

    expect(dom.serializeInput(el)).to.deep.equal({foo: 'baz'});

  });

});


describe('serializeForm()', function () {

  it('should serialize all inputs with names', function () {

    const factory = dom.h('form', {}, {}, [
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
      dom.h('textarea', {name: 'kkk'}, {}, ['kkk']),
      dom.h('select', {name: 'lll'}, {}, [
        dom.h('option', {value: 'foo'}, {}, ['foo']),
        dom.h('option', {value: 'baz'}, {}, ['baz']),
        dom.h('option', {value: 'lll'}, {selected: true}, ['lll']),
        dom.h('option', {value: 'bar'}, {}, ['bar'])
      ])
    ]);
    const el = factory();
    const expected = {
      aaa: '',
      bbb: 'bbb',
      ccc: 'ccc',
      ddd: 'ddd',
      ggg: true,
      hhh: 'hhh',
      jjj: 'jjj',
      kkk: 'kkk',
      lll: 'lll'
    };

    expect(dom.serializeForm(el)).to.deep.equal(expected);

  });

});


describe('setInputDisabled()', function () {

  it('should make input disabled', function () {

    const factory = dom.h('input', {}, {disabled: false}, []);
    const el = factory();

    expect(el.disabled).to.be.false;

    const ret = dom.setInputDisabled(el);

    expect(ret).to.equal(el);
    expect(ret.disabled).to.be.true;

  });

});


describe('setInputEnabled()', function () {

  it('should make input enabled', function () {

    const factory = dom.h('input', {}, {disabled: true}, []);
    const el = factory();

    expect(el.disabled).to.be.true;

    const ret = dom.setInputEnabled(el);

    expect(ret).to.equal(el);
    expect(ret.disabled).to.be.false;

  });

});


describe('setInputReadonly()', function () {

  it('should make input readonly', function () {

    const factory = dom.h('input', {}, {}, []);
    const el = factory();

    expect(el.readOnly).to.be.false;

    const ret = dom.setInputReadonly(el);

    expect(ret).to.equal(el);
    expect(ret.readOnly).to.be.true;

  });

});


describe('setInputEditable()', function () {

  it('should make input editable', function () {

    const factory = dom.h('input', {}, {readOnly: true}, []);
    const el = factory();

    expect(el.readOnly).to.be.true;

    const ret = dom.setInputEditable(el);

    expect(ret).to.equal(el);
    expect(ret.readOnly).to.be.false;

  });

});


describe('isInputValid()', function () {

  it('should return true for valid value', function () {

    const factory = dom.h('input', {value: 'foo'}, {required: true}, []);
    const el = factory();

    expect(dom.isInputValid(el)).to.be.true;

  });

  it('should return false for invalid value', function () {

    const factory = dom.h('input', {}, {required: true}, []);
    const el = factory();

    expect(dom.isInputValid(el)).to.be.false;

  });

});
