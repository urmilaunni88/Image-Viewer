import React, { Component } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import logo from "../../assets/logo.svg";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Profile from "../../screens/profile/Profile";
import Menu from "@material-ui/core/Menu";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { MenuList, Divider } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';


const styles = (theme => ({
  menuList: {
    width: 150,
    padding: 0,
    marginLeft: 7,
  },
}))

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuIsOpen: false,
      loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
      anchorEl: null,
    };
  }

  openMenuHandler = () => {
    this.setState({ menuIsOpen: true });
  };

  closeMenuHandler = () => {
    this.setState({ menuIsOpen: false });
  };

  logoutClickHandler = () => {
    sessionStorage.removeItem("access_token");
    this.setState({ loggedIn: false });
  };

  accountClickHandler = () => {
    ReactDOM.render(
      <Profile baseUrl={this.props.baseUrl} />,
      document.getElementById("root")
    );
  };

  onProfileIconClickHandler = (event) => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.openMenuHandler();
  };

  goToLoginPage = () => {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <header className="app-header">
          <a className="logo" href="/home">
            Image Viewer
          </a>
          {this.props.showSearchBox === "true" ? (
            <div className="searchBox">
              <img src={logo} className="app-logo" alt="Search Logo" />
              <FormControl className="formControl">
                <Input
                  className="searchText"
                  type="text"
                  placeholder="Search..."
                  disableUnderline={true}
                  onChange={this.props.searchChangeHandler}
                />
              </FormControl>
            </div>
          ) : (
            ""
          )}

         
            <span>
              <IconButton
                className="iconBtn"
                size="medium"
                onClick={(event) => this.onProfileIconClickHandler(event)}
              >
                <Avatar className="avatar">
                  <img
                    src={require("./masha.jpeg")}
                    className="profilePic"
                    alt="logged in user profile pic"
                  ></img>
                </Avatar>
              </IconButton>
              <Menu id="menu-appbar" 
                 
                  

                            >
                                <Link to='/profile'>
                                    <MenuItem >My Account</MenuItem></Link><hr />
                                <Link to='/'>
                                    <MenuItem onClick={this.logoutHandler}>Logout</MenuItem></Link>
                            </Menu>
            </span>
       
        </header>
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(Header);
