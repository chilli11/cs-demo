import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DataServiceService extends Service {
  @tracked data = [];

  async getData() {
    let response = await fetch(new Request('/data.json'));
    let json = await response.json();
    this.data = json.map((item) => {
      return { ...item, selected: false };
    });
    return this.data;
  }

  refresh() {
    this.data = [...this.data];
  }

  selectAll() {
    this.data = this.data.map((item) => {
      return { ...item, selected: item.status == 'available' };
    });
  }

  deselectAll() {
    this.data = this.data.map((item) => {
      return { ...item, selected: false };
    });
  }
}
