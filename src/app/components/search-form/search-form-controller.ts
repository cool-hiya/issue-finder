import {Controller} from 'stimulus';
import SearchQuery from '../../core/models/search-query.model';

export default class SearchFormController extends Controller {
    [x: string]: any;
    static targets = ['name', 'repo', 'error', 'repoAutomplete'];
    searchQuery: SearchQuery;
    repos: string[] = [];
    state = {
        name: null
    }

    get name(): string {
        return this.nameTarget.value;
    }

    get repo(): string {
        return this.repoTarget.value;
    }

    set repo(value: string) {
        this.repoTarget.value = value;
    }

    get repoAutomplete(): HTMLElement {
        return this.repoAutompleteTarget;
    }

    get error(): HTMLElement {
        return this.errorTarget;
    }

    get isValidForm(): boolean {
        return !!(this.name && this.repo);
    }

    get hasRepos(): boolean {
        return !!this.repos.length;
    }

    submit(e: Event) {
        e.preventDefault();

        if (!this.isValidForm) {
            this.error.textContent = 'Please, enter repo and user name';
            this.error.hidden = false;
            return;
        }

        this.repoAutomplete.hidden = true;
        this.search();
    }

    search() {
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

    inputRepo() {
        const filteredRepos = this.repos.filter((repo: string) => repo.includes(this.repo));
        this.renderRepos(filteredRepos);
    }

    hideRepoAutocomplete() {
        this.repoAutomplete.hidden = true;
    }

    showRepoAutocomplete() {
        this.repoAutomplete.hidden = false;
    }

    focusNameInput() {
        this.clearError();
        this.hideRepoAutocomplete();
    }

    async focusRepoInput() {
        this.clearError();

        if (this.state.name === this.name && this.hasRepos) {
            this.showRepoAutocomplete();
            return;
        }

        this.state.name = this.name;

        this.repos = await this.fetchRepos();

        if (this.repos.length) {
            this.renderRepos(this.repos);
            this.showRepoAutocomplete();
        }
    }

    async fetchRepos() {

        if (!this.name) {
            return [];
        }

        const res = await fetch(`https://api.github.com/users/${this.name}/repos`);
        let result = await res.json();

        if (result.message) {
            return [];
        }

        return result.map(r => r.name);
    }

    renderRepos(repos: string[]) {

        this.repoAutomplete.innerHTML = '';

        repos.forEach((repo: string) => {
            const element = document.createElement('li');
            element.textContent = repo;

            element.addEventListener('click', () => {this.onRepoSelected(repo)});
            this.repoAutomplete.appendChild(element);
        })
    }

    onRepoSelected(repoName: string) {
        this.repo = repoName;
        this.search();
        this.hideRepoAutocomplete();
    }
}