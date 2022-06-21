import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service dataService;
  async model() {
    await this.dataService.getData();
  }
}
