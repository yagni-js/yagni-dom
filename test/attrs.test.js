
const expect = require('chai').expect;
const dom = require('..');


describe('getAttr()', function () {

  it('returns value for defined attribute or null for undefined attribute', function () {

    const a = dom.createElement('a');

    a.setAttribute('title', 'Foo');

    const getTitle = dom.getAttr('title');
    const getHref = dom.getAttr('href');

    expect(getTitle).to.be.a('function');
    expect(getHref).to.be.a('function');
    expect(getTitle(a)).to.equal('Foo');
    expect(getHref(a)).to.be.null;

  });

});


describe('setAttr()', function () {

  it('sets attribute value and returns element', function () {

    const a = dom.createElement('a');
    const setFooTitle = dom.setAttr('title', 'Foo');

    expect(setFooTitle).to.be.a('function');

    const ret = setFooTitle(a);

    expect(ret).to.equal(a);
    expect(a.getAttribute('title')).to.equal('Foo');

  });

});


describe('setAttrs()', function () {

  it('sets attributes values in bulk and returns element', function () {

    const a = dom.createElement('a');
    const attrs = {
      title: 'Foo',
      href: '/baz',
      target: void 0
    };
    const attrsSetter = dom.setAttrs(attrs);

    expect(attrsSetter).to.be.a('function');

    const ret = attrsSetter(a);

    expect(ret).to.equal(a);
    expect(a.getAttribute('title')).to.equal('Foo');
    expect(a.getAttribute('href')).to.equal('/baz');
    expect(a.hasAttribute('target')).to.be.false;

  });

});


describe('removeAttr()', function () {

  it('removes attribute from element and returns element', function () {

    const a = dom.createElement('a');

    a.setAttribute('title', 'Foo');

    const removeTitle = dom.removeAttr('title');

    expect(removeTitle).to.be.a('function');
    expect(a.hasAttribute('title')).to.be.true;

    const ret = removeTitle(a);

    expect(ret).to.equal(a);
    expect(a.hasAttribute('title')).to.be.false;

  });

});
