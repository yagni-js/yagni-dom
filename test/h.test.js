
const expect = require('chai').expect;
const dom = require('..');


describe('h()', function () {

  const attrs = {};
  const props = {};
  const children = [];
  const div = dom.h('div', attrs, props, children);

  it('returns proper tag spec as object', function () {

    expect(div).to.be.an('object');
    expect(div).to.have.property('tagName', 'div');
    expect(div).to.have.property('attrs', attrs);
    expect(div).to.have.property('props', props);
    expect(div).to.have.property('children', children);

  });

});
