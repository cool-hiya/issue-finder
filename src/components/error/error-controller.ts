import {Controller} from 'stimulus';

export default class ErrorController extends Controller {
    [x: string]: any;
    static targets = ['text'];

    setText(error: string) {
        this.textTarget.textContent = error;
    }
}