
const expect = require('chai').expect;
const dom = require('..');


describe('getData()', function () {

  it('returns value for defined dataset property or undefined', function () {

    const div = dom.createElement('div');

    div.dataset.foo = 'foo';
    div.dataset.fooBaz = 'foo-baz';

    const getFoo = dom.getData('foo');
    const getFooBaz = dom.getData('fooBaz');
    const getFooBaz2 = dom.getData('foo-baz');
    const getBar = dom.getData('bar');

    expect(getFoo).to.be.a('function');
    expect(getFooBaz).to.be.a('function');
    expect(getFooBaz2).to.be.a('function');
    expect(getBar).to.be.a('function');

    expect(getFoo(div)).to.equal('foo');
    expect(getFooBaz(div)).to.equal('foo-baz');
    expect(getFooBaz2(div)).to.equal('foo-baz');
    expect(getBar(div)).to.be.undefined;

  });

});


describe('setData()', function () {

  it('sets dataset property value and returns element', function () {

    const div = dom.createElement('div');

    const setFooBaz = dom.setData('foo-baz', 'foo');

    expect(setFooBaz).to.be.a('function');
    expect(div.dataset.fooBaz).to.be.undefined;

    const ret = setFooBaz(div);

    expect(ret).to.equal(div);
    expect(div.dataset.fooBaz).to.equal('foo');

  });

});


describe('setDataTo()', function () {

  it('sets dataset property value and returns element', function () {

    const div = dom.createElement('div');

    const setDivData = dom.setDataTo(div);

    expect(setDivData).to.be.a('function');
    expect(div.dataset.fooBaz).to.be.undefined;

    const ret = setDivData('foo-baz', 'foo');

    expect(ret).to.equal(div);
    expect(div.dataset.fooBaz).to.equal('foo');

  });

});


describe('setDatas()', function () {

  it('sets dataset properties values in bulk and returns element', function () {

    const div = dom.createElement('div');
    const datas = {
      title: 'Foo',
      href: '/baz',
      'prev-page': '/prev',
      'next-page': '/next',
      'the-answer': 42,
      truthy: true,
      falsy: false
    };
    const datasSetter = dom.setDatas(datas);

    expect(datasSetter).to.be.a('function');

    const ret = datasSetter(div);

    expect(ret).to.equal(div);
    expect(div.dataset.title).to.equal(datas.title);
    expect(div.dataset.href).to.equal(datas.href);
    expect(div.dataset.prevPage).to.equal(datas['prev-page']);
    expect(div.dataset.nextPage).to.equal(datas['next-page']);
    expect(div.dataset.theAnswer).to.equal('42');
    expect(div.dataset.truthy).to.equal('true');
    expect(div.dataset.falsy).to.equal('false');

  });

});
