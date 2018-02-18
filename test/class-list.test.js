
const expect = require('chai').expect;
const dom = require('..');


describe('addClass()', function () {

  it('adds classname to element and returns element', function () {

    const div = dom.createElement('div');
    const addFoo = dom.addClass('foo');

    expect('' + div.classList).to.equal('');

    const ret = addFoo(div);

    expect(ret).to.equal(div);
    expect('' + ret.classList).to.equal('foo');
    expect(ret.classList.contains('foo')).to.be.true;

  });

});


describe('removeClass()', function () {

  it('removes classname from element and returns element', function () {

    const div = dom.createElement('div');
    const removeFoo = dom.removeClass('foo');

    div.className = 'foo bar';

    const ret = removeFoo(div);

    expect(ret).to.equal(div);
    expect('' + ret.classList).to.equal('bar');
    expect(ret.classList.contains('foo')).to.be.false;

  });

});


describe('toggleClass()', function () {

  it('adds classname to element if it does not have it and returns element', function () {

    const div = dom.createElement('div');
    const toggleFoo = dom.toggleClass('foo');

    div.className = 'baz';

    const ret = toggleFoo(div);

    expect(ret).to.equal(div);
    expect(ret.className).to.equal('baz foo');
    expect(ret.classList.contains('foo')).to.be.true;

  });

  it('removes classname from element if it has it and returns element', function () {

    const div = dom.createElement('div');
    const toggleFoo = dom.toggleClass('foo');

    div.className = 'foo baz';

    const ret = toggleFoo(div);

    expect(ret).to.equal(div);
    expect(ret.className).to.equal('baz');
    expect(ret.classList.contains('foo')).to.be.false;

  });

});


describe('hasClass()', function () {

  it('should return true if element has specified class', function () {

    const div = dom.createElement('div');
    const hasFoo = dom.hasClass('foo');

    div.className = 'bar foo';

    expect(hasFoo(div)).to.be.true;

  });

  it('should return false if element does not have specified class', function () {

    const div = dom.createElement('div');
    const hasFoo = dom.hasClass('foo');

    div.className = 'bar';

    expect(hasFoo(div)).to.be.false;

  });

});
