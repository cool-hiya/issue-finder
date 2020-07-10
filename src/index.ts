import './styles.scss';
import { Application } from 'stimulus'

import SearchFormController from './components/search-form/search-form-controller';
import IssueListController from './components/issue-list/issue-list-controller';
import ErrorController from './components/error/error-controller';

import SearchPageController from './pages/search-page/search-page-controller';

const application = Application.start();

application.register("search-form", SearchFormController);
application.register("search-page", SearchPageController);
application.register("issue-list", IssueListController);
application.register("error", ErrorController);
