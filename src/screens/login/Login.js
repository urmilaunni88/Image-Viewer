import React, { Component } from "react";
import "./Login.css";
import Home from "../../screens/home/Home";
import Header from "../../common/header/Header";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      reqUsername: "dispNone",
      reqPassword: "dispNone",
      error: "dispNone",
      loginSucess: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    };
  }

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  // Password Handler definitions to set the parameter value of input password entered by user

  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  loginButtonHandler = () => {
    this.state.username === ""
      ? this.setState({ reqUsername: "dispBlock" })
      : this.setState({ reqUsername: "dispNone" });
    this.state.password === ""
      ? this.setState({ reqPassword: "dispBlock" })
      : this.setState({ reqPassword: "dispNone" });
    let usernameCorrect = "unni";
    let passwordCorrect = "unni123";
    if (
      this.state.username === usernameCorrect &&
      this.state.password === passwordCorrect
    ) {
      // ReactDOM.render(<Home baseUrl={this.props.baseUrl} />, document.getElementById('root'));
      this.setState({ loggedIn: "true" });
      sessionStorage.setItem(
        "access_token",
        "IGQVJVQWxIWXQycE9jZAGNCbGpGQ0huMkplM1Y1ZAlBhZA0VsRGNxNFJzRU9PbXJ1aTZATUXRrSUxPR2JlUVF1VF9CQ3EzREFzU3RDR09BN0pubzZAfdFBGNURvazk3OHIwZA2dIa0FTcnJ4czF0b2FKbWoxSmlUSUtPbXhaWHRJ"
      );
      this.props.history.push({
        pathname: "/home",
        loggedIn: "true",
        showSearchTab: "true",
        baseUrl: this.props.baseUrl,
      });
    } else {
      if (this.state.username !== "" && this.state.password !== "")
        this.setState({ error: "dispBlock" });
    }
  };

  render() {
    return (
      <div>
        {this.state.loggedIn === true ? (
          <Redirect to="/home" />
        ) : (
          <div>
            <Header />
            <Card className="cardStyle">
              <CardContent>
                <Typography variant="h4">LOGIN</Typography> <br />
                <FormControl required className="formControl">
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    username={this.state.username}
                    onChange={this.inputUsernameChangeHandler}
                    value={this.state.username}
                  />
                  <FormHelperText className={this.state.reqPassword}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required className="formControl">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    password={this.state.password}
                    onChange={this.inputPasswordChangeHandler}
                  />
                  <FormHelperText className={this.state.reqPassword}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>{" "}
                <br />
                <br />
                <FormControl required className="formControl">
                  <FormHelperText className={this.state.error}>
                    <span className="red">
                      Incorrect username and/or password
                    </span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={this.loginButtonHandler}
                  color="primary"
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
