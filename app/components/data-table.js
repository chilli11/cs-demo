import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DataTableComponent extends Component {
  @service dataService;
  get selectedCount() {
    return this.dataService.data.filter((item) => item.selected).length;
  }

  get allSelected() {
    return this.selectedCount === this.dataService.data.length;
  }

  get indeterminate() {
    return (
      this.selectedCount && this.selectedCount < this.dataService.data.length
    );
  }

  @action
  toggleAsset(item) {
    if (item.status === 'available') {
      set(item, 'selected', !item.selected);
    }
    this.dataService.refresh();
  }

  @action
  toggle() {
    if (this.allSelected) {
      this.dataService.deselectAll();
      return false;
    }
    this.dataService.selectAll();
    return false;
  }

  @action
  download() {
    let output = this.dataService.data
      .filter((item) => item.selected)
      .map((item) => `Device: ${item.device}, Path: "${item.path}"`);
    alert(output.length ? output.join(`\n`) : 'None selected');
  }
}
