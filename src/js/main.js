import ProductData from "./ProductData.mjs";
import Alert from "./Alert";

const dataSource = new ProductData("tents");

const alert = new Alert();
alert.init();
alert.createAlerts();
alert.displayAlerts();
