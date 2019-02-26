
const expect = require('chai').expect;
const dom = require('..');


describe('hSkip()', function () {

  it('is a function to call', function () {

    expect(dom.hSkip).to.be.a('function');

  });

  it('always returns string "SKIP"', function () {

      expect(dom.hSkip()).to.equal('SKIP');
      expect(dom.hSkip()).to.equal('SKIP');
      expect(dom.hSkip()).to.equal('SKIP');
      expect(dom.hSkip()).to.equal('SKIP');
      expect(dom.hSkip()).to.equal('SKIP');

  });

});

describe('h()', function () {

  it('returns factory function to create element', function () {

    const attrs = {};
    const props = {};
    const children = [];
    const div = dom.h('div', attrs, props, children);

    expect(div).to.be.a('function');

    const el = div();

    expect(el).to.be.a('htmldivelement');

  });

  it('should create proper dom tree when factory function gets called', function () {

    const p1 = dom.h('p', {}, {}, [dom.hText('Foo')]);
    const p2 = dom.h('p', {}, {}, [dom.hText('Baz')]);
    const text = dom.hText('Bar');
    const factory = dom.h(
      'div',
      {'class': 'is-active is-highlighted', 'data-bar': 42},
      {},
      [p1, [[text]], p2]
    );

    const div = factory();

    expect(div).to.be.a('htmldivelement');
    expect(div.classList.contains('is-active')).to.be.true;
    expect(div.classList.contains('is-highlighted')).to.be.true;
    expect(div.getAttribute('data-bar')).to.equal('42');
    expect(div.textContent).to.equal('FooBarBaz');

    expect(div.firstChild).to.be.a('htmlparagraphelement');
    expect(div.firstChild.textContent).to.equal('Foo');

    expect(div.firstChild.nextSibling).to.be.a('text');
    expect(div.firstChild.nextSibling.data).to.equal('Bar');

    expect(div.lastChild).to.be.a('htmlparagraphelement');
    expect(div.lastChild.textContent).to.equal('Baz');

  });

  it('creates empty text node for empty string', function () {

    const div = dom.h('div', {}, {}, [dom.hText('')]);
    const el = div();

    expect(el.firstChild).to.be.a('text');
    expect(el.firstChild.data).to.equal('');

  });

  it('does not create node for skip marker', function () {

    const div = dom.h('div', {}, {}, [dom.hSkip()]);
    const el = div();

    expect(el.firstChild).to.be.null;

  });

});


describe('hSVG()', function () {

  it('returns factory function to create element', function () {

    const attrs = {};
    const props = {};
    const children = [];
    const svg = dom.hSVG('svg', attrs, props, children);

    expect(svg).to.be.a('function');

    const el = svg();

    expect(el).to.be.a('svgsvgelement');

  });

  it('should create proper dom tree when factory function gets called', function () {

    const line1 = dom.hSVG('line', {x1: 0, y1: 0, x2: 1, y2: 1}, {}, []);
    const line2 = dom.hSVG('line', {x1: 1, y1: 1, x2: 2, y2: 2}, {}, []);
    const line3 = dom.hSVG('line', {x1: 2, y1: 2, x2: 3, y2: 3}, {}, []);
    const group = dom.hSVG('g', {}, {}, [line1, line2, line3]);
    const factory = dom.hSVG('svg', {}, {}, [group]);

    const svg = factory();

    expect(svg).to.be.a('svgsvgelement');
    expect(svg.namespaceURI).to.equal('http://www.w3.org/2000/svg');

    const g = svg.firstChild;

    expect(Array.prototype.slice.call(svg.children)).to.have.length(1);

    expect(g).to.be.a('svgelement');  // FIXME why not SVGGElement?
    expect(g.namespaceURI).to.equal('http://www.w3.org/2000/svg');

    const lines = Array.prototype.slice.call(g.children);

    expect(lines).to.have.length(3);

    expect(lines[0].getAttribute('x1')).to.equal('0');
    expect(lines[0].getAttribute('y1')).to.equal('0');
    expect(lines[0].getAttribute('x2')).to.equal('1');
    expect(lines[0].getAttribute('y2')).to.equal('1');

    expect(lines[1].getAttribute('x1')).to.equal('1');
    expect(lines[1].getAttribute('y1')).to.equal('1');
    expect(lines[1].getAttribute('x2')).to.equal('2');
    expect(lines[1].getAttribute('y2')).to.equal('2');

    expect(lines[2].getAttribute('x1')).to.equal('2');
    expect(lines[2].getAttribute('y1')).to.equal('2');
    expect(lines[2].getAttribute('x2')).to.equal('3');
    expect(lines[2].getAttribute('y2')).to.equal('3');

  });

});


describe('hText()', function () {

  it('should return function to be called', function () {

    const factory = dom.hText('Foo');

    expect(factory).to.be.a('function');

  });

  it('should create text node when factory function gets called', function () {

    const factory = dom.hText('Foo');

    const node = factory();

    expect(node).to.be.a('text');
    expect(node.data).to.equal('Foo');

  });

});


describe('render()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    expect(renderer).to.be.a('function');

  });

  it('should create dom element and append it to target element', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    const li1 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Foo')])]);
    const li2 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Baz')])]);
    const li3 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Bar')])]);
    const ul = dom.h('ul', {}, {}, [li1, li2, li3]);

    expect(dom.textContent(div)).to.equal('');

    const ret = renderer(ul);

    expect(ret).to.equal(div);
    expect(dom.textContent(div)).to.equal('FooBazBar');
    // TODO add more tests

  });

  it('should not support render of text node', function () {

    const div = dom.createElement('div');
    const renderToDiv = dom.render(div);

    function run() {
      const foo = dom.createText('Foo');
      return renderToDiv(foo);
    }

    expect(run).to.throw(TypeError);

  });

});


describe('renderAfter()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderAfter(div);

    expect(renderer).to.be.a('function');

  });

  it('should create dom element and append it after the target', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    const li1 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Foo')])]);
    const li2 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Baz')])]);
    const li3 = dom.h('li', {}, {}, [dom.h('span', {}, {}, [dom.hText('Bar')])]);
    const ul = dom.h('ul', {}, {}, [li1, li3]);

    expect(dom.textContent(div)).to.equal('');

    const ret = renderer(ul);

    expect(ret).to.equal(div);

    const li1El = div.firstChild.firstChild;

    expect(dom.textContent(li1El)).to.equal('Foo');
    expect(dom.textContent(div)).to.equal('FooBar');

    const appender = dom.renderAfter(li1El);

    const ret2 = appender(li2);

    expect(dom.prev(ret2)).to.equal(li1El);
    expect(dom.next(li1El)).to.equal(ret2);
    expect(dom.textContent(div)).to.equal('FooBazBar');

  });

  it('should not support render of text node', function () {

    const div = dom.h('div', {}, {}, [
      dom.h('span', {}, {}, [dom.hText('span1')]),
      dom.h('span', {}, {}, [dom.hText('span2')])
    ]);
    const el = div();
    const renderAfterSpan1 = dom.renderAfter(el.firstChild);

    function run() {
      const foo = dom.createText('Foo');
      return renderAfterSpan1(foo);
    }

    expect(run).to.throw(TypeError);

  });

});


describe('renderC()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderC(div);

    expect(renderer).to.be.a('function');

  });

  it('should clear children nodes from target, create dom element and append it to target', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderC(div);

    const p1 = dom.h('p', {}, {}, [dom.hText('Foo')]);
    const p2 = dom.h('p', {}, {}, [dom.hText('Baz')]);

    expect(dom.textContent(div)).to.equal('');

    const ret1 = renderer(p1);

    expect(ret1).to.equal(div);
    expect(dom.textContent(div)).to.equal('Foo');

    const ret2 = renderer(p2);

    expect(ret2).to.equal(div);
    expect(dom.textContent(div)).to.equal('Baz');

  });

  it('should not support render of text node', function () {

    const div = dom.h('div', {}, {}, [
      dom.h('span', {}, {}, [dom.hText('span1')]),
      dom.h('span', {}, {}, [dom.hText('span2')])
    ]);
    const el = div();

    const clearAndAppendToDiv = dom.renderC(el);

    function run() {
      const foo = dom.createText('Foo');
      return clearAndAppendToDiv(foo);
    }

    expect(run).to.throw(TypeError);

  });

});


describe('renderR()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderR(div);

    expect(renderer).to.be.a('function');

  });

  it('should create dom element and replace target with it', function () {

    const ul = dom.createElement('ul');

    const li1 = dom.h('li', {}, {}, [dom.hText('Foo')]);
    const li2 = dom.h('li', {}, {}, [dom.hText('Baz')]);

    const ret1 = dom.render(ul)(li1);

    expect(ret1).to.equal(ul);
    expect(dom.textContent(ul)).to.equal('Foo');

    const child1 = dom.firstChild(ul);
    const replaceLi1 = dom.renderR(child1);

    const ret2 = replaceLi1(li2);

    expect(dom.parent(child1)).to.be.null;
    expect(dom.parent(ret2)).to.equal(ul);
    expect(dom.textContent(ul)).to.equal('Baz');

  });

  it('should create text node and replace target with it', function () {

    const div = dom.h('div', {}, {}, [
      dom.h('span', {}, {}, [dom.hText('span')])
    ]);
    const el = div();

    expect(dom.textContent(el)).to.equal('span');

    const replaceSpan = dom.renderR(el.firstChild);

    function foo() {
      return dom.createText('Foo');
    }

    const res = replaceSpan(foo);
    expect(dom.textContent(el)).to.equal('Foo');
  });

});
