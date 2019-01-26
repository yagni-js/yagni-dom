
const expect = require('chai').expect;
const _ = require('@yagni-js/yagni');
const dom = require('..');


describe('matches()', function () {

  it('returns true for matched selector', function () {

    const div = dom.createElement('div');
    const datas = {
      'foo': 'foo',
      'baz': 'baz'
    };
    const ops = _.pipe([
      dom.addClass('js-target'),
      dom.setDatas(datas)
    ]);

    const matchesFoo = dom.matches('[data-foo="foo"]');
    const hasBaz = dom.matches('[data-baz]');
    const isTarget = dom.matches('.js-target');

    const ret = ops(div);

    expect(ret).to.equal(div);

    expect(matchesFoo(div)).to.be.true;
    expect(hasBaz(div)).to.be.true;
    expect(isTarget(div)).to.be.true;

  });

  it('returns false for not matched selector', function () {

    const div = dom.createElement('div');
    const datas = {
      'foo': 'fo',
      'bar': 'bar'
    };
    const ops = _.pipe([
      dom.addClass('js-trgt'),
      dom.setDatas(datas)
    ]);

    const matchesFoo = dom.matches('[data-foo="foo"]');
    const hasBaz = dom.matches('[data-baz]');
    const isTarget = dom.matches('.js-target');

    const ret = ops(div);

    expect(ret).to.equal(div);

    expect(matchesFoo(div)).to.be.false;
    expect(hasBaz(div)).to.be.false;
    expect(isTarget(div)).to.be.false;

  });

});


describe('closest()', function () {

  it('returns proper closest element or null', function () {

    const div = dom.createElement('div');
    const ul = dom.createElement('ul');
    const li = dom.createElement('li');
    const a = dom.createElement('a');

    const setTarget = dom.addClass('js-target');
    const unsetTarget = dom.removeClass('js-target');
    const getTarget = dom.closest('.js-target');

    setTarget(li);
    setTarget(ul);
    setTarget(div);

    li.appendChild(a);
    ul.appendChild(li);
    div.appendChild(ul);

    expect(getTarget(a)).to.equal(li);

    unsetTarget(li);

    expect(getTarget(a)).to.equal(ul);

    unsetTarget(ul);

    expect(getTarget(a)).to.equal(div);

    unsetTarget(div);

    expect(getTarget(a)).to.be.null;

  });

});


describe('query()', function () {

  const root = window.document.body;
  const render = dom.render(root);

  before(function () {

    const tree = dom.h('div', {id: 'body'}, {}, [
      dom.h('div', {id: 'header'}, {}, ['Header']),
      dom.h('div', {id: 'content', 'class': 'foo baz bar'}, {}, ['Content']),
      dom.h('div', {id: 'footer', 'data-foo': '42'}, {}, ['Footer']),
      dom.h('div', {id: 'popup'}, {}, [
        dom.h('p', {}, {}, [
          dom.h('span', {}, {}, ['popup']),
          dom.h('span', {}, {}, ['popup'])
        ]),
      ])
    ]);

    const body = render(tree);

  });

  after(function () {

    dom.removeChildren(root);

  });

  it('should return proper element by id', function () {

    const getHeader = dom.query('#header');
    const header = getHeader(root);

    expect(header).to.be.a('htmldivelement');
    expect(dom.textContent(header)).to.equal('Header');

    expect(getHeader(header)).to.eql(header);

  });

  it('should return proper elements by single class', function () {

    const getId = dom.getProp('id');
    const getBaz = dom.query('.baz');
    const baz = getBaz(root);

    expect(baz).to.be.an('array');
    expect(baz).to.have.length(1);
    expect(baz[0]).to.be.a('htmldivelement');
    expect(dom.textContent(baz[0])).to.equal('Content');
    expect(getId(dom.parent(baz[0]))).to.equal('body');

  });

  it('should return proper elements by multiple classes', function () {

    const getId = dom.getProp('id');
    const getFooBazBar = dom.query('.foo.baz.bar');
    const fooBazBar = getFooBazBar(root);

    expect(fooBazBar).to.be.an('array');
    expect(fooBazBar).to.have.length(1);
    expect(fooBazBar[0]).to.be.a('htmldivelement');
    expect(dom.textContent(fooBazBar[0])).to.equal('Content');
    expect(getId(dom.parent(fooBazBar[0]))).to.equal('body');

  });

  it('should return proper elements by tag name', function () {

    const getSpan = dom.query('span');
    const getP = dom.query('p');

    const span = getSpan(root);
    const p = getP(root);

    expect(span).to.be.an('array');
    expect(span).to.have.length(2);
    expect(dom.textContent(span[0])).to.equal('popup');
    expect(dom.textContent(span[1])).to.equal('popup');

    expect(p).to.be.an('array');
    expect(p).to.have.length(1);
    expect(dom.textContent(p[0])).to.equal('popuppopup');

  });

  it('should return proper elements by attribute', function () {

    const getFoo = dom.query('[data-foo="42"]');
    const foo = getFoo(root);

    expect(foo).to.be.an('array');
    expect(foo).to.have.length(1);
    expect(foo[0]).to.be.a('htmldivelement');
    expect(dom.textContent(foo[0])).to.equal('Footer');

  });

});


describe('queryFirst()', function () {

  const root = window.document.body;
  const render = dom.render(root);

  before(function () {

    const tree = dom.h('div', {id: 'body'}, {}, [
        dom.h('p', {}, {}, [
          dom.h('span', {}, {}, ['foo']),
          dom.h('span', {}, {}, ['baz'])
      ])
    ]);

    const body = render(tree);

  });

  after(function () {

    dom.removeChildren(root);

  });

  it('should return first found element', function () {

    const getSpan = dom.queryFirst('span');

    const span = getSpan(root);

    expect(span).to.be.a('htmlspanelement');
    expect(dom.textContent(span)).to.equal('foo');

  });

  it('should return undefined for not found element', function () {

    const getLink = dom.queryFirst('a');

    const link = getLink(root);

    expect(link).to.be.undefined;

  });

  it('should return null for not found element queried by id', function () {

    const getLink = dom.queryFirst('#first');

    const link = getLink(root);

    expect(link).to.be.null;

  });

});
