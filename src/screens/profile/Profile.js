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
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({});

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
    this.state.changedFullName === "" ? this.setState({reqFullName:"dispBlock"}): this.setState({reqFullName:"dispNone"});
    this.setState({fullName: this.state.changedFullName});
    this.closeModalHandler();
  }

  closeModalHandler = () => {
    this.setState({modalIsOpen: false});
  }

  onfullNameChangeHandler = (event) => {
    this.setState({changedFullName: event.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />

        <img
          className="avatar"
          src={require("./masha.jpeg")}
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
              cellHeight={350}
              cols={3}
              className={classes.gridListMain}
            >
              <GridListTile className="user-image-grid-item">
                <Card className="cardstyle">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <img
                          src={require("./masha.jpeg")}
                          width="50"
                          height="50"
                          margin="15"
                        ></img>
                      </Avatar>
                    }
                    title="urmila88"
                    subheader="10/12/2019 12:23:45"
                  />
                  <CardContent>
                    <img
                      src={require("./Beautiful-YourSelf-Quotes.jpg")}
                      width="500"
                      height="400"
                    ></img>
                    <hr className={classes.hr} />
                    <h4 className="captionText">{this.state.hashtags}</h4>
                  </CardContent>
                </Card>
              </GridListTile>
              <GridListTile className="user-image-grid-item">
                <div>
                  <Card className="cardstyle">
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          <img
                            src={require("./masha.jpeg")}
                            width="50"
                            height="50"
                          ></img>
                        </Avatar>
                      }
                      title="urmila88"
                      subheader="10/12/2019 12:23:45"
                    />
                    <CardContent>
                      <img
                        src={require("./life is your cresation.jpeg")}
                        width="500"
                        height="400"
                      ></img>
                      <hr className={classes.hr} />
                      <h4 className="captionText">{this.state.hashtag1}</h4>
                    </CardContent>
                  </Card>
                </div>
              </GridListTile>
              <GridListTile className="user-image-grid-item">
                <div>
                  <Card className="cardstyle">
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          <img
                            src={require("./masha.jpeg")}
                            width="50"
                            height="50"
                          ></img>
                        </Avatar>
                      }
                      title="urmila88"
                      subheader="10/12/2019 12:23:45"
                    />
                    <CardContent>
                      <img
                        src={require("./waterfall.jpg")}
                        width="500"
                        height="400"
                      ></img>
                      <hr className={classes.hr} />
                      <h4 className="captionText">{this.state.hashtag2}</h4>
                    </CardContent>
                  </Card>
                </div>
              </GridListTile>
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
