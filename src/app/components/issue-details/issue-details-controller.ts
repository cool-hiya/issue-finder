import {Controller} from 'stimulus';
import marked from 'marked';
import Issue from '../../core/models/issue.model';

export default class IssueDetailsController extends Controller {
    [x: string]: any;
    static targets = ['title', 'status', 'content'];

    get title(): HTMLElement {
        return this.titleTarget;
    }

    get status(): HTMLElement {
        return this.statusTarget;
    }

    get content(): HTMLElement {
        return this.contentTarget;
    }

    updateData(data: Issue) {
        const {title, status, content} = data;

        this.title.textContent = title;
        this.status.textContent = status;
        this.content.innerHTML = marked(content);
    }
}