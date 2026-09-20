// Alert Class
// Creates an alert message for products

import ProductData from "./ExternalServices.mjs";

export default class Alert {
  constructor() {
    this.alerts = [];
    this.alertSec;
  }

  async init() {
    this.alerts = await new ProductData("alerts").getData();
  }

  async createAlerts() {
    await this.init();

    if (this.alerts.length > 0) {
      console.log(this.alerts);
      this.alertSec = document.createElement("section");
      this.alertSec.setAttribute("class", "alert-list");

      this.alerts.forEach((alert) => {
        let p = document.createElement("p");

        p.textContent = alert.message;
        console.log(alert.message);
        p.style.background = alert.background;
        p.style.color = alert.color;

        this.alertSec.appendChild(p);
      });

      return this.alertSec;
    }
  }

  async displayAlerts() {
    const alertsSection = await this.createAlerts();
    console.log(alertsSection);

    const main = document.querySelector("main");
    main.prepend(alertsSection);
  }
}
