import {Controller} from 'stimulus';

export default class BackController extends Controller {

    goBack() {
        this.element.dispatchEvent(new CustomEvent('goBack'));
    }
}