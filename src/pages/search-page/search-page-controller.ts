import {Controller} from 'stimulus';
import Issue from '../../assets/models/issue.model';

export default class SearchPageController extends Controller {
    issues: Issue[];

    async search(e: CustomEvent) {
        const {name, repo} = e.detail;

        const res = await fetch(`https://api.github.com/repos/${name}/${repo}/issues`);
        let result = await res.json();
        
        this.issues = result.map(({number, title, body, created_at}) => ({
            number,
            creationDate: created_at,
            title,
            description: body
        }));
    }
}


