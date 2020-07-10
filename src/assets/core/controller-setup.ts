import {Application} from 'stimulus'

import SearchFormController from '../../components/search-form/search-form-controller';
import IssueListController from '../../components/issue-list/issue-list-controller';
import ErrorController from '../../components/error/error-controller';

import SearchPageController from '../../pages/search-page/search-page-controller';

const application = Application.start();
const controllers = [
    {id: 'search-form', controller: SearchFormController},
    {id: 'search-page', controller: SearchPageController},
    {id: 'issue-list', controller: IssueListController},
    {id: 'error', controller: ErrorController}
]

controllers.forEach(({id, controller}) => {
    application.register(id, controller);
})

