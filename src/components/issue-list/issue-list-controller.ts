import {Controller} from 'stimulus';
import {Subject} from "rxjs";

import Issue from '../../assets/models/issue.model';

export default class IssueListController extends Controller {
    [x: string]: any;
    static targets = ['container', 'template'];
    updateIssues: Subject<Issue[]> = new Subject<Issue[]>();

    get container(): HTMLElement {
        return this.containerTarget;
    }

    get issueTemplate(): HTMLElement {
        return this.templateTarget.content;
    }

    initialize() {
        this.updateIssues.subscribe(r => this.render(r));
    }

    render(issues: Issue[]) {
        this.container.innerHTML = '';

        issues.forEach((data) => {
            const issue = <HTMLElement>this.issueTemplate.cloneNode(true);

            const title = issue.querySelector('.issue__title');
            const number = issue.querySelector('.issue__number');
            const date = issue.querySelector('.issue__date');

            title.textContent = data.title;
            number.textContent = data.number;
            date.textContent = new Date(Date.parse(data.creationDate)).toLocaleString();

            this.container.append(issue);
        });
    }
}