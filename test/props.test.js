
const expect = require('chai').expect;
const dom = require('..');


describe('getProp()', function () {

  it('returns value for defined property or undefined', function () {

    const inp = dom.createElement('input');

    inp.type = 'text';
    inp.name = 'foo';

    const getName = dom.getProp('name');
    const getBaz = dom.getProp('baz');

    expect(getName).to.be.a('function');
    expect(getBaz).to.be.a('function');
    expect(getName(inp)).to.equal('foo');
    expect(getBaz(inp)).to.be.undefined;

  });

});


describe('setProp()', function () {

  it('sets property value and returns element', function () {

    const inp = dom.createElement('input');

    const setFooName = dom.setProp('name', 'foo');

    expect(setFooName).to.be.a('function');
    expect(inp.name).to.equal('');

    const ret = setFooName(inp);

    expect(ret).to.equal(inp);
    expect(inp.name).to.equal('foo');

  });

});


describe('setProps()', function () {

  it('sets properties values in bulk and returns element', function () {

    const inp = dom.createElement('input');
    const props = {
      name: 'foo',
      type: 'checkbox',
      checked: true
    };
    const propsSetter = dom.setProps(props);

    expect(propsSetter).to.be.a('function');

    const ret = propsSetter(inp);

    expect(ret).to.equal(inp);
    expect(inp.type).to.equal(props.type);
    expect(inp.name).to.equal(props.name);
    expect(inp.checked).to.equal(props.checked);

  });

});
