
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


describe('eventHandler()', function () {

  it('should return object with event and handler properties', function () {

    function handler(c) { return c + 1; }

    const clickHandler = dom.eventHandler('click', 'a.js-click', handler);

    expect(clickHandler).to.be.an('object');
    expect(clickHandler).to.have.property('event', 'click');
    expect(clickHandler).to.have.property('handler');
    expect(clickHandler.handler).to.not.equal(handler);

  });

  it('should call wrapped handler if target element matches selector and handler is attached to target element', function () {

    function handler(evt) { return {in: evt}; }
    const a = dom.h('a', {class: 'js-click'}, {}, []);
    const el = dom.hToDOM(a);
    const evt = {
      target: el
    };
    const clickHandler = dom.eventHandler('click', 'a.js-click', handler);

    const ret = clickHandler.handler(evt);

    expect(ret).to.be.an('object');
    expect(ret).to.have.deep.property('in');
    expect(ret.in).to.be.an('object');
    expect(ret.in).to.have.property('originalEvent', evt);
    expect(ret.in).to.have.property('matchedElement', el);

  });

  // FIXME jsdom does not support Element.closest yet
  // https://github.com/tmpvar/jsdom/pull/1951
  it.skip('should call wrapped handler if target element has closest element matched against selector', function () {

    function handler(evt) { return {in: evt}; }
    const a = dom.h('a', {class: 'js-click'}, {}, [
      dom.h('span', {}, {}, ['Foo'])
    ]);
    const el = dom.hToDOM(a);
    const evt = {
      target: dom.firstChild(el)
    };
    const clickHandler = dom.eventHandler('click', 'a.js-click', handler);

    const ret = clickHandler.handler(evt);

    expect(ret).to.be.an('object');
    expect(ret).to.have.deep.property('in');
    expect(ret.in).to.be.an('object');
    expect(ret.in).to.have.property('originalEvent', evt);
    expect(ret.in).to.have.property('matchedElement', el);

  });

  // FIXME jsdom does not support Element.closest yet
  // https://github.com/tmpvar/jsdom/pull/1951
  it.skip('should not call wrapped handler and should return original event if no element matches selector', function () {

    function handler(evt) { return {in: evt}; }
    const a = dom.h('a', {}, {}, [
      dom.h('span', {}, {}, ['Foo'])
    ]);
    const el = dom.hToDOM(a);
    const evt = {
      target: dom.firstChild(el)
    };
    const clickHandler = dom.eventHandler('click', 'a.js-click', handler);

    const ret = clickHandler.handler(evt);

    expect(ret).to.equal(evt);

  });

});


describe('preventDefault()', function () {

  it('should call preventDefault method of passed in event', function () {

    let cnt = 0;
    const evt = {
      preventDefault: function () { cnt = cnt + 1; }
    };

    const ret = dom.preventDefault(evt);

    expect(ret).to.equal(evt);
    expect(cnt).to.equal(1);

  });

  it('should call preventDefault method of event wrapped as originalEvent property of object', function () {

    let cnt = 0;
    const evt = {
      originalEvent: {
        preventDefault: function () { cnt = cnt + 1; }
      }
    };

    const ret = dom.preventDefault(evt);

    expect(ret).to.equal(evt);
    expect(cnt).to.equal(1);

  });

});


describe('stopPropagation()', function () {

  it('should call stopPropagation method of passed in event', function () {

    let cnt = 0;
    const evt = {
      stopPropagation: function () { cnt = cnt + 1; }
    };

    const ret = dom.stopPropagation(evt);

    expect(ret).to.equal(evt);
    expect(cnt).to.equal(1);

  });

  it('should call stopPropagation method of event wrapped as originalEvent property of object', function () {

    let cnt = 0;
    const evt = {
      originalEvent: {
        stopPropagation: function () { cnt = cnt + 1; }
      }
    };

    const ret = dom.stopPropagation(evt);

    expect(ret).to.equal(evt);
    expect(cnt).to.equal(1);

  });

});


describe('delegate()', function () {

  it('should return function to be called');

  it('should add event listeners to target element');

  it('should attach removers to target element as __yagni_undelegate property');

});


describe('undelegate()', function () {

  it('should remove event listeners from target element');

  it('should set target element __yagni_undelegate property value to false');

  it('should do nothing if __yagni_undelegate property value is not an array');

});
