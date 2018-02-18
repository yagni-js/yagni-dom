
const expect = require('chai').expect;
const dom = require('..');


describe('h()', function () {

  it('returns proper tag spec as object', function () {

    const attrs = {};
    const props = {};
    const children = [];
    const div = dom.h('div', attrs, props, children);

    expect(div).to.be.an('object');
    expect(div).to.have.property('tagName', 'div');
    expect(div).to.have.property('attrs', attrs);
    expect(div).to.have.property('props', props);
    expect(div).to.have.property('children');

  });

  it('flattens children', function () {

    const attrs = {};
    const props = {};
    const children = [
      ['foo', 'baz'],
      'bar',
      [
        [
          [42]
        ]
      ]
    ];

    const div = dom.h('div', attrs, props, children);

    expect(div).to.have.property('children');
    expect(div.children).to.deep.equal(['foo', 'baz', 'bar', 42]);

  });

});


describe('hSVG()', function () {

  it('returns proper tag spec as object', function () {

    const attrs = {};
    const props = {};
    const children = [];
    const svg = dom.hSVG('svg', attrs, props, children);

    expect(svg).to.be.an('object');
    expect(svg).to.have.property('isSVG', true);
    expect(svg).to.have.property('tagName', 'svg');
    expect(svg).to.have.property('attrs', attrs);
    expect(svg).to.have.property('props', props);
    expect(svg).to.have.property('children');

  });

});


describe('hToDOM()', function () {

  it('should return text node if string is passed in', function () {

    const foo = dom.hToDOM('Foo');

    expect(foo).to.be.a('text');
    expect(foo.data).to.equal('Foo');

  });

  it('should return div node if div spec is passed in', function () {

    const p1 = dom.h('p', {}, {}, ['Foo']);
    const p2 = dom.h('p', {}, {}, ['Baz']);
    const div = dom.h('div', {'class': 'is-active is-highlighted', 'data-bar': 42}, {}, [p1, p2]);

    const ret = dom.hToDOM(div);

    expect(ret).to.be.a('htmldivelement');
    expect(ret.classList.contains('is-active')).to.be.true;
    expect(ret.classList.contains('is-highlighted')).to.be.true;
    expect(ret.getAttribute('data-bar')).to.equal('42');
    expect(ret.textContent).to.equal('FooBaz');

    expect(ret.firstChild).to.be.a('htmlparagraphelement');
    expect(ret.firstChild.textContent).to.equal('Foo');

    expect(ret.lastChild).to.be.a('htmlparagraphelement');
    expect(ret.lastChild.textContent).to.equal('Baz');

  });

  it('should return svg node if svg spec is passed in', function () {

    const line1 = dom.hSVG('line', {x1: 0, y1: 0, x2: 1, y2: 1}, {}, []);
    const line2 = dom.hSVG('line', {x1: 1, y1: 1, x2: 2, y2: 2}, {}, []);
    const line3 = dom.hSVG('line', {x1: 2, y1: 2, x2: 3, y2: 3}, {}, []);
    const group = dom.hSVG('g', {}, {}, [line1, line2, line3]);
    const svg = dom.hSVG('svg', {}, {}, [group]);

    const ret = dom.hToDOM(svg);

    expect(ret).to.be.a('svgsvgelement');
    expect(ret.namespaceURI).to.equal('http://www.w3.org/2000/svg');

    const g = ret.firstChild;

    expect(Array.prototype.slice.call(ret.children)).to.have.length(1);

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


describe('render()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    expect(renderer).to.be.a('function');

  });

  it('should render spec by creating dom tree from spec and appending it to target', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    const li1 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Foo'])]);
    const li2 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Baz'])]);
    const li3 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Bar'])]);
    const ul = dom.h('ul', {}, {}, [li1, li2, li3]);

    expect(dom.textContent(div)).to.equal('');

    const ret = renderer(ul);

    expect(ret).to.equal(div);
    expect(dom.textContent(div)).to.equal('FooBazBar');
    // TODO add more tests

  });

});


describe('renderAfter()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderAfter(div);

    expect(renderer).to.be.a('function');

  });

  it('should render spec by creating dom tree from spec and appending it after the target', function () {

    const div = dom.createElement('div');
    const renderer = dom.render(div);

    const li1 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Foo'])]);
    const li2 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Baz'])]);
    const li3 = dom.h('li', {}, {}, [dom.h('span', {}, {}, ['Bar'])]);
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

});


describe('renderC()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderC(div);

    expect(renderer).to.be.a('function');

  });

  it('should render spec by clearing children nodes from target, creating dom tree from spec and appending it after the target', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderC(div);

    const p1 = dom.h('p', {}, {}, ['Foo']);
    const p2 = dom.h('p', {}, {}, ['Baz']);

    expect(dom.textContent(div)).to.equal('');

    const ret1 = renderer(p1);

    expect(ret1).to.equal(div);
    expect(dom.textContent(div)).to.equal('Foo');

    const ret2 = renderer(p2);

    expect(ret2).to.equal(div);
    expect(dom.textContent(div)).to.equal('Baz');

  });

});


describe('renderR()', function () {

  it('should return function to be called', function () {

    const div = dom.createElement('div');
    const renderer = dom.renderR(div);

    expect(renderer).to.be.a('function');

  });

  it('should render spec by replacing target', function () {

    const ul = dom.createElement('ul');

    const li1 = dom.h('li', {}, {}, ['Foo']);
    const li2 = dom.h('li', {}, {}, ['Baz']);

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

});
