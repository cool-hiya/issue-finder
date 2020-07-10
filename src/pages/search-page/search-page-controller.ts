import {Controller} from 'stimulus';

export default class SearchPageController extends Controller {
    connect() {
        console.log(this.element);
    }

    search(e: CustomEvent) {
        console.log(e.detail);
    }
}