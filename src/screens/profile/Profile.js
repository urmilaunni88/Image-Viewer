import React, { Component } from "react";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import "./Profile.css";
import Modal from "react-modal";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import { GridListTile } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = (theme) => ({});

function FavoriteBorderIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 
      2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 
      5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 
      5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
      />
    </SvgIcon>
  );
}

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

class Profile extends Component {
  state = {
    username: "urmila88",
    posts: "2",
    follows: "3",
    followedBy: "2",
    fullName: "Urmila Unni",
    modalIsOpen: false,
    changedFullName: "",
  };

  componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
        that.setState({ userImages: JSON.parse(this.responseText).data });
      }
    });
    xhr.open(
      "GET",
      this.props.baseUrl +
        "me/media?fields=id,caption&access_token=IGQVJXWV9CMXYyWlVYNlVjWW93ZAy03Y08zODBHMzlVQmFmRDZA6bUZA4ck9tWnJOeDZAwdUgzTWxHempqTmRtVnhBUjlrR3JMSHl1elpjd2hncTd4NFBlTk9FSkpLdlV0NlhSSDBZAX1FMRnBfaXk5MDAweUlaWDhPVDhBeG1V"
    );
    // xhr.open("GET",)
    xhr.send(data);

    //Second API Call
    let imageinfo = null;
    let xhrImageinfo = new XMLHttpRequest();
    xhrImageinfo.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
        that.setState({ imageInfo: JSON.parse(this.responseText) });
      }
    });

    xhrImageinfo.open(
      "GET",
      this.props.baseUrl +
        "17936454466396635?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXWV9CMXYyWlVYNlVjWW93ZAy03Y08zODBHMzlVQmFmRDZA6bUZA4ck9tWnJOeDZAwdUgzTWxHempqTmRtVnhBUjlrR3JMSHl1elpjd2hncTd4NFBlTk9FSkpLdlV0NlhSSDBZAX1FMRnBfaXk5MDAweUlaWDhPVDhBeG1V"
    );
    xhrImageinfo.send(imageinfo);
  }

  openModalHandler = () => {
    this.setState({ modalIsOpen: true });
  };

  updateFullNameHandler = () => {
    this.state.changedFullName === ""
      ? this.setState({ reqFullName: "dispBlock" })
      : this.setState({ reqFullName: "dispNone" });
    this.setState({ fullName: this.state.changedFullName });
    this.closeModalHandler();
  };

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  onfullNameChangeHandler = (event) => {
    this.setState({ changedFullName: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const tiledata = [
      {
        img: "masha.jpeg",
        title: "Life Quotes",
        author: "urmila88",
        date: "10/12/2019 12:23:45",
      },
      {
        img: "life is your cresation.jpeg",
        title: "Life Quotes",
        author: "urmila88",
        date: "10/12/2019 12:23:45",
      },
    ];
    return (
      <div>
        <Header />

        <img
          className="avatar"
          src={require("../../assets/masha.jpeg")}
          alt="logged in user profile pic"
        ></img>

        <span className="userFullName">{this.state.username}</span>
        <div className="maindiv">
          <div className="userdetails">
            <span>Posts: {this.state.posts}</span>
            <span className="followclass">Follows: {this.state.follows}</span>
            <span>Followed By: {this.state.followedBy}</span>
          </div>
          <p>
            {this.state.fullName}
            <span className="editIcon">
              <Fab color="secondary" aria-label="edit" className={classes.fab}>
                <EditIcon onClick={this.openModalHandler} />
              </Fab>
            </span>
          </p>
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            contentLabel="EditIcon"
            onRequestClose={this.closeModalHandler}
            style={styles}
          >
            <h2>Edit</h2>
            <br />
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <Input
                  id="fullName"
                  type="text"
                  fullName={this.state.fullName}
                  onChange={this.onfullNameChangeHandler}
                />
                <FormHelperText className={this.state.reqFullName}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
            </TabContainer>
            <br />
            <Button
              variant="contained"
              onClick={this.updateFullNameHandler}
              color="primary"
            >
              UPDATE
            </Button>
          </Modal>
        </div>

        <div className="flex-container">
          <div className="imagePosts">
          <GridList
          component="div"
          cellHeight={"auto"}
          cols={3}
          className="gridlistmain"
        >
          {tiledata.map((tile) => (
            <GridListTile
              component="div"
              className="user-image-grid-item"
              cols={tile.cols}
              rows={tile.rows}
              key={tile.img}
            >
              <Card className="cardstyle">
                
                <CardContent>
                  <img
                    src={require("../../assets/" + tile.img)}
                    alt={tile.title}
                  />
                 
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
