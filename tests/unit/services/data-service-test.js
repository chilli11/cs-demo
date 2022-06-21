import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | data-service', function (hooks) {
  setupTest(hooks);

  test('it works', async function (assert) {
    let service = this.owner.lookup('service:data-service');
    await service.getData();
    assert.equal(service.data.length, 5, 'populates data');
    assert.equal(
      service.data.filter((i) => Object.keys(i).includes('selected')).length,
      5,
      'transforms data'
    );
    service.selectAll();
    assert.equal(
      service.data.filter((i) => i.selected).length,
      2,
      'only selects available assets'
    );
    service.deselectAll();
    assert.equal(
      service.data.filter((i) => i.selected).length,
      0,
      'deselects all assets'
    );
  });
});
