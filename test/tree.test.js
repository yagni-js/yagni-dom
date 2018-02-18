
const expect = require('chai').expect;
const dom = require('..');


describe('parent()', function () {

  it('returns node parent', function () {

    const div = dom.createElement('div');
    const p = dom.createElement('p');

    div.appendChild(p);

    expect(dom.parent(p)).to.equal(div);
    expect(dom.parent(div)).to.be.null;

  });

});


describe('children()', function () {

  it('returns array of children nodes', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const li3 = dom.createElement('li');
    const li4 = dom.createElement('li');
    const li5 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);

    const children = dom.children(ul);

    expect(children).to.be.an('array');
    expect(children).to.deep.equal([li1, li2, li3, li4, li5]);

  });

});


describe('siblings()', function () {

  it('returns array of siblings according to selector', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const li3 = dom.createElement('li');
    const li4 = dom.createElement('li');
    const li5 = dom.createElement('li');

    const setActive = dom.addClass('is-active');
    const active = dom.siblings('.is-active');
    const others = dom.siblings('li');

    setActive(li3);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);

    expect(others(li1)).to.deep.equal([li2, li3, li4, li5]);
    expect(others(li2)).to.deep.equal([li1, li3, li4, li5]);
    expect(others(li3)).to.deep.equal([li1, li2, li4, li5]);
    expect(active(li3)).to.deep.equal([]);
    expect(others(li4)).to.deep.equal([li1, li2, li3, li5]);
    expect(others(li5)).to.deep.equal([li1, li2, li3, li4]);
    expect(active(li5)).to.deep.equal([li3]);

  });

});


describe('next()', function () {

  it('should return next element or null, skipping text nodes', function () {

    const p = dom.createElement('p');
    const foo = dom.createText('Foo');
    const baz = dom.createText('Baz');
    const bar = dom.createText('Bar');
    const a = dom.createElement('a');
    const span = dom.createElement('span');

    p.appendChild(foo);
    p.appendChild(a);
    p.appendChild(baz);
    p.appendChild(span);
    p.appendChild(bar);

    expect(dom.next(a)).to.equal(span);
    expect(dom.next(span)).to.be.null;

  });

});


describe('prev()', function () {

  it('should return previous element or null, skipping text nodes', function () {

    const p = dom.createElement('p');
    const foo = dom.createText('Foo');
    const baz = dom.createText('Baz');
    const bar = dom.createText('Bar');
    const a = dom.createElement('a');
    const span = dom.createElement('span');

    p.appendChild(foo);
    p.appendChild(a);
    p.appendChild(baz);
    p.appendChild(span);
    p.appendChild(bar);

    expect(dom.prev(a)).to.be.null;
    expect(dom.prev(span)).to.equal(a);

  });

});


describe('firstChild()', function () {

  it('should return first child element', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li2);

    expect(dom.firstChild(ul)).to.equal(li1);

  });

  it('should return null if node has no children', function () {

    const ul = dom.createElement('ul');

    expect(dom.firstChild(ul)).to.be.null;

  });

});


describe('lastChild()', function () {

  it('should return last child element', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li2);

    expect(dom.lastChild(ul)).to.equal(li2);

  });

  it('should return null if node has no children', function () {

    const ul = dom.createElement('ul');

    expect(dom.lastChild(ul)).to.be.null;

  });

});
