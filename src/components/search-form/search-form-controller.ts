import {Controller} from 'stimulus';

export default class SearchFormController extends Controller {
    [x: string]: any;
    static targets = ['name', 'repo'];

    get name(): string {
        return this.nameTarget.value;
    }

    get repo(): string {
        return this.repoTarget.value;
    }

    submit(e: Event) {
        e.preventDefault();
        this.element.dispatchEvent(new CustomEvent('submit', {
            detail: {
                name: this.name,
                repo: this.repo
            }
        }));
    }
}