import {Controller} from 'stimulus';
import Issue from './core/models/issue.model';
import IssueListController from './components/issue-list/issue-list-controller';
import ErrorController from './components/error/error-controller';
import IssueDetailsController from './components/issue-details/issue-details-controller';

export default class AppController extends Controller {
    [x: string]: any;
    static targets = ['issueList', 'error', 'issueDetails'];

    issues: Issue[] = [];

    get issueListController(): IssueListController {
        return <IssueListController>this.application.getControllerForElementAndIdentifier(
            this.issueListTarget,
            'issue-list'
        );
    }

    get issueDetailsController(): IssueDetailsController {
        return <IssueDetailsController>this.application.getControllerForElementAndIdentifier(
            this.issueDetailsTarget,
            'issue-details'
        );
    }

    initialize() {
        this.data.set('mode', 'default');
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

            if (result.message) {
                throw new Error(result.message);
            }

            if (!result.length) {
                throw new Error('No issues found');
            }

            this.issues = result.map(({id, number, title, created_at, user, body, state, assignee}) => ({
                id,
                number,
                creationDate: created_at,
                title,
                user: {
                    name: user.login,
                    avatar: user.avatar_url,
                    url: user.html_url
                },
                content: body,
                status: state,
                assignee
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

    showIssueDetails(e: CustomEvent) {
        const {id} = e.detail;
        const issue = this.issues.find(issue => issue.id === id);

        if (!issue) {
            return;
        }

        this.issueDetailsController.updateData(issue);
        this.data.set('mode', 'details');
    }

    goBack() {
        this.data.set('mode', 'default');
    }
}


