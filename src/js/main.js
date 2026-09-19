import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs"; 


loadHeaderFooter();


const alert = new Alert();
alert.init();
alert.createAlerts();
alert.displayAlerts();

