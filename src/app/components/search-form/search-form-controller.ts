import {Controller} from 'stimulus';
import SearchQuery from '../../core/models/search-query.model';

export default class SearchFormController extends Controller {
    [x: string]: any;
    static targets = ['name', 'repo', 'error'];
    searchQuery: SearchQuery;

    get name(): string {
        return this.nameTarget.value;
    }

    get repo(): string {
        return this.repoTarget.value;
    }

    get error(): HTMLElement {
        return this.errorTarget;
    }

    get isValidForm(): boolean {
        return !!(this.name && this.repo);
    }

    submit(e: Event) {
        e.preventDefault();

        if (!this.isValidForm) {
            this.error.textContent = 'Please, enter repo and user name';
            this.error.hidden = false;
            return;
        }

        this.searchQuery = {
            name: this.name,
            repo: this.repo
        }

        this.element.dispatchEvent(new CustomEvent('submit', {
            detail: this.searchQuery
        }));
    }

    clearError() {
        this.error.textContent = '';
        this.error.hidden = true;
    }
}