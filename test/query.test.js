
const expect = require('chai').expect;
const _ = require('yagni');
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

  // FIXME jsdom does not support Element.closest yet
  it.skip('returns proper closest element or null', function () {

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
