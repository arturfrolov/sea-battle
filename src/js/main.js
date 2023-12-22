import 'bootstrap';
import '../sass/style.scss';
// import '../icons/sprite.svg';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import Field from './modules/field/field';
import Dock from './modules/dock/dock';


const newField = new Field(10, 10);
newField.generateTable();

const newDock = new Dock(newField);
