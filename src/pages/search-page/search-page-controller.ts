import {Controller} from 'stimulus';
import Issue from '../../assets/models/issue.model';
import IssueListController from '../../components/issue-list/issue-list-controller';
import ErrorController from '../../components/error/error-controller';

export default class SearchPageController extends Controller {
    [x: string]: any;
    static targets = ['issueList', 'error'];

    issues: Issue[] = [];

    get issueListController(): IssueListController {
        return <IssueListController>this.application.getControllerForElementAndIdentifier(
            this.issueListTarget,
            'issue-list'
        );
    }

    get errorController(): ErrorController {
        return <ErrorController>this.application.getControllerForElementAndIdentifier(
            this.errorTarget,
            'error'
        );
    }

    async search(e: CustomEvent) {
        this.data.set('error', 'false');
        this.data.set('loading', 'true');

        const {name, repo} = e.detail;

        try {
            const res = await fetch(`https://api.github.com/repos/${name}/${repo}/issues`);
            let result = await res.json();

            console.log(result);

            if (result.message) {
                throw new Error(result.message);
            }

            this.issues = result.map(({number, title, created_at, user}) => ({
                number,
                creationDate: created_at,
                title,
                user: {
                    name: user.login,
                    avatar: user.avatar_url,
                    url: user.html_url
                }
            }));

            this.issueListController.updateIssues.next(this.issues);
            setTimeout(() => this.data.set('loading', 'false'), 100);

        } catch (e) {
            this.data.set('error', 'true');
            this.issueListController.updateIssues.next([]);
            this.data.set('loading', 'false');
            this.errorController.setText(e.message);
        }
    }
}


