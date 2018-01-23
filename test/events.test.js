
const expect = require('chai').expect;
const _ = require('yagni');
const dom = require('..');


describe('addEventListener()', function () {

  it('should return function to be called', function () {

    const spec = {
      event: 'click',
      handler: function () {}
    };
    const addClickHandler = dom.addListener(spec);

    expect(addClickHandler).to.be.a('function');

  });

  it('should attach event listener to target element', function () {

    const clickHandler = _.pipe([
      _.pick('target'),
      dom.addClass('was-clicked')
    ]);

    const hasWasClickedClass = dom.hasClass('was-clicked');

    const a = dom.h('a', {}, {}, []);
    const el = dom.hToDOM(a);
    const spec = {
      event: 'click',
      handler: clickHandler
    };
    const addClickHandler = dom.addListener(spec);

    const ret = addClickHandler(el);

    expect(ret).to.equal(el);
    expect(hasWasClickedClass(el)).to.be.false;

    el.click();

    expect(hasWasClickedClass(el)).to.be.true;

  });

});


describe('removeEventListener()', function () {

  it('should return function to be called', function () {

    const spec = {
      event: 'click',
      handler: function () {}
    };
    const removeClickHandler = dom.removeListener(spec);

    expect(removeClickHandler).to.be.a('function');

  });

  it('should remove event listener from target element', function () {

    let cnt = 0;

    function clickHandler() {
      cnt = cnt + 1;
    }

    const a = dom.h('a', {}, {}, []);
    const el = dom.hToDOM(a);
    const spec = {
      event: 'click',
      handler: clickHandler
    };
    const addClickHandler = dom.addListener(spec);
    const removeClickHandler = dom.removeListener(spec);

    addClickHandler(el);

    el.click();
    el.click();
    el.click();

    expect(cnt).to.equal(3);

    const ret = removeClickHandler(el);

    expect(ret).to.equal(el);

    el.click();
    el.click();
    el.click();

    expect(cnt).to.equal(3);

  });

});
