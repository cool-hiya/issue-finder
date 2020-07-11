import {Application} from 'stimulus'

import SearchFormController from '../../components/search-form/search-form-controller';
import IssueListController from '../../components/issue-list/issue-list-controller';
import ErrorController from '../../components/error/error-controller';
import IssueDetailsController from '../../components/issue-details/issue-details-controller';

import AppController from '../../app/app-controller';

const application = Application.start();
const controllers = [
    {id: 'search-form', controller: SearchFormController},
    {id: 'app', controller: AppController},
    {id: 'issue-list', controller: IssueListController},
    {id: 'error', controller: ErrorController},
    {id: 'issue-details', controller: IssueDetailsController}
]

controllers.forEach(({id, controller}) => {
    application.register(id, controller);
})

