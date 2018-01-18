
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
