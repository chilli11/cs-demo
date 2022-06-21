import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | data-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:data-service');

    await render(hbs`<DataTable />`);
    service.getData();
    await settled();

    let list = [...document.querySelectorAll('.table .body .row')];
    assert.equal(list.length, 5);
    assert.equal(
      [...document.querySelectorAll('.table .body .row.disabled')].length,
      3
    );

    await click('.actions .checkbox-link');
    assert
      .dom('.actions .selected')
      .hasText('Selected 2', 'Selected text updates');
    assert.ok(
      document.querySelector('.actions input').indeterminate,
      'selected all checkbox updates'
    );
    await click('.actions .checkbox-link');
    assert
      .dom('.actions .selected')
      .hasText(
        'Selected 2',
        'does not deselect if all assets are not selected'
      );
  });
});
