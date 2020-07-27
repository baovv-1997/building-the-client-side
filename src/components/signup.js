import NTask from "../ntask";
import Template from "../templates/signup";

class Signup extends NTask {
  constructor(body) {
    super();
    this.body = body;
  }
  render() {
    this.body.innerHTML = Template.render();
    this.body.querySelector("[data-name]").focus();
    this.addEventListener();
  }
  addEventListener() {
    this.formSubmit();
  }
  formSubmit() {
    const form = this.body.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[data-name]").value;
      const email = form.querySelector("[data-email]").value;
      const password = form.querySelector("[data-password]").value;
      console.log("@userValue" + name);
      const opts = {
        method: "POST",
        url: `${this.URL}/users`,
        json: true,
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      };
      this.request(opts, (err, resp, data) => {
        if (err || resp.status === 412) {
          this.emit("error", err);
        } else {
          this.emit("signup", data);
        }
      });
    });
  }
}

module.exports = Signup;
