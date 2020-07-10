import {Controller} from 'stimulus';
import SearchQuery from '../../assets/models/search-query.model';

export default class SearchFormController extends Controller {
    [x: string]: any;
    static targets = ['name', 'repo'];
    searchQuery: SearchQuery;

    get name(): string {
        return this.nameTarget.value;
    }

    get repo(): string {
        return this.repoTarget.value;
    }

    submit(e: Event) {
        e.preventDefault();

        this.searchQuery = {
            name: this.name,
            repo: this.repo
        }
        
        this.element.dispatchEvent(new CustomEvent('submit', {
            detail: this.searchQuery
        }));
    }
}