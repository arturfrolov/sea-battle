import 'bootstrap';
import '../sass/style.scss';
// import '../icons/sprite.svg';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import Field from './modules/field/field';


const newField = new Field();
newField.generateTable();
