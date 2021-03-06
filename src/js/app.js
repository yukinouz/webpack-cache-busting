import { jqueryCode } from './module/jquery';

jqueryCode();
console.log('hello from app.js');

import { run } from "../app/app";
import "../scss/app.scss";
import { AlertService } from "../app/alert.service";
import { ComponentService } from "../app/component.service";
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);