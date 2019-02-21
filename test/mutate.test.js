
const expect = require('chai').expect;
const dom = require('..');


describe('append()', function () {

  it('should append element to target element', function () {

    const p = dom.createElement('p');
    const span = dom.createElement('span');

    const appendSpan = dom.append(span);

    expect(appendSpan).to.be.a('function');
    expect(dom.parent(span)).to.be.null;

    const ret = appendSpan(p);

    expect(ret).to.equal(p);
    expect(dom.parent(span)).to.equal(p);

  });

});


describe('appendTo()', function () {

  it('should append element to target element', function () {

    const p = dom.createElement('p');
    const span = dom.createElement('span');

    const appendToP = dom.appendTo(p);

    expect(appendToP).to.be.a('function');
    expect(dom.parent(span)).to.be.null;

    const ret = appendToP(span);

    expect(ret).to.equal(p);
    expect(dom.parent(span)).to.equal(p);

  });

});


describe('appendAfter()', function () {

  it('should append element after target element', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const li3 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li3);

    const addAfterLi1= dom.appendAfter(li1);

    expect(addAfterLi1).to.be.a('function');
    expect(dom.parent(li2)).to.be.null;

    const ret = addAfterLi1(li2);

    expect(ret).to.equal(li2);
    expect(dom.parent(li2)).to.equal(ul);
    expect(dom.prev(li2)).to.equal(li1);
    expect(dom.next(li2)).to.equal(li3);

  });

});


describe('prepend()', function () {

  it('should prepend element to target element', function () {

    const p = dom.createElement('p');
    const span1 = dom.createElement('span');
    const span2 = dom.createElement('span');

    p.appendChild(span2);
    expect(dom.parent(span2)).to.equal(p);
    expect(dom.firstChild(p)).to.equal(span2);

    const prependSpan1 = dom.prepend(span1);

    expect(prependSpan1).to.be.a('function');
    expect(dom.parent(span1)).to.be.null;

    const ret = prependSpan1(p);

    expect(ret).to.equal(p);
    expect(dom.parent(span1)).to.equal(p);
    expect(dom.firstChild(p)).to.equal(span1);

  });

});


describe('prependTo()', function () {

  it('should prepend element to target element', function () {

    const p = dom.createElement('p');
    const span1 = dom.createElement('span');
    const span2 = dom.createElement('span');

    p.appendChild(span2);

    const prependToP = dom.prependTo(p);

    expect(prependToP).to.be.a('function');
    expect(dom.parent(span1)).to.be.null;
    expect(dom.firstChild(p)).to.equal(span2);

    const ret = prependToP(span1);

    expect(ret).to.equal(p);
    expect(dom.parent(span1)).to.equal(p);
    expect(dom.firstChild(p)).to.equal(span1);

  });

});


describe('remove()', function () {

  it('should return same element if it has no parent', function () {

    const p = dom.createElement('p');

    expect(dom.remove(p)).to.equal(p);

  });

  it('should remove element and return it\'s parent element', function () {

    const ul = dom.createElement('ul');
    const li = dom.createElement('li');

    ul.appendChild(li);

    expect(dom.parent(li)).to.equal(ul);

    const ret = dom.remove(li);

    expect(ret).to.equal(ul);
    expect(dom.parent(li)).to.be.null;
    expect(dom.children(ul)).to.deep.equal([]);

  });

});


describe('removeChild()', function () {

  it('should remove child', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const li3 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    expect(dom.parent(li1)).to.equal(ul);
    expect(dom.parent(li2)).to.equal(ul);
    expect(dom.parent(li3)).to.equal(ul);

    const ret = dom.removeChild(ul, li2);

    expect(ret).to.equal(ul);

    expect(dom.parent(li1)).to.equal(ul);
    expect(dom.parent(li2)).to.be.null;
    expect(dom.parent(li3)).to.equal(ul);

  });

});


describe('removeChildren()', function () {

  it('should remove all children', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const li3 = dom.createElement('li');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    expect(dom.parent(li1)).to.equal(ul);
    expect(dom.parent(li2)).to.equal(ul);
    expect(dom.parent(li3)).to.equal(ul);

    const ret = dom.removeChildren(ul);

    expect(ret).to.equal(ul);

    expect(ret.firstChild).to.be.null;

    expect(dom.parent(li1)).to.be.null;
    expect(dom.parent(li2)).to.be.null;
    expect(dom.parent(li3)).to.be.null;

  });

});


describe('replace()', function () {

  it('should replace old element with new one', function () {

    const ul = dom.createElement('ul');
    const li1 = dom.createElement('li');
    const li2 = dom.createElement('li');
    const foo = dom.createText('foo');
    const baz = dom.createText('baz');

    const replaceLi1 = dom.replace(li1);

    expect(replaceLi1).to.be.a('function');

    li1.appendChild(foo);
    ul.appendChild(li1);

    li2.appendChild(baz);

    expect(dom.parent(li1)).to.equal(ul);
    expect(dom.textContent(ul)).to.equal('foo');
    expect(dom.parent(li2)).to.be.null;

    const ret = replaceLi1(li2);

    expect(ret).to.equal(li2);

    expect(dom.parent(ret)).to.equal(ul);
    expect(dom.textContent(ul)).to.equal('baz');
    expect(dom.parent(li1)).to.be.null;

  });

});
