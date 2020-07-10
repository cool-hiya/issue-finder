import {Controller} from 'stimulus';
import Issue from '../../assets/models/issue.model';
import IssueListController from '../../components/issue-list/issue-list-controller';

export default class SearchPageController extends Controller {
    [x: string]: any;
    static targets = ['issueList'];

    issues: Issue[];

    get issueListController(): IssueListController {
        return <IssueListController>this.application.getControllerForElementAndIdentifier(
            this.issueListTarget,
            'issue-list'
        );
    }

    async search(e: CustomEvent) {
        const {name, repo} = e.detail;

        const res = await fetch(`https://api.github.com/repos/${name}/${repo}/issues`);
        let result = await res.json();

        this.issues = result.map(({number, title, created_at}) => ({
            number,
            creationDate: created_at,
            title
        }));

        this.issueListController.updateIssues.next(this.issues);
    }
}


