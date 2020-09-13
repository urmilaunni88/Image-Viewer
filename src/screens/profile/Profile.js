import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import './Profile.css'


const styles = theme => ({

bigAvatar: {
    margin: '20px',
    width: '60px',
    height: '60px',
    float: 'center',
    display: 'flex'

},
large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
},

});

class Profile extends Component {
    state = { 
        username: "urmila88",
        posts: "2",
        follows: "3",
        followedBy: "2",
        fullName: "Urmila Unni",

     }

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
    render() { 
        const { classes } = this.props;
        return ( 
            <div>
                <Header />
                <div>
                <div className="profileInfoSection">
                <Avatar className={classes.large}>
                  <img
                    src={require("./masha.jpeg")}
                    
                    alt="logged in user profile pic"
                  ></img>
                </Avatar>
                <div className="right">
                <span className="username">{this.state.username}</span>
                <span className="userInfo"><span className="infoTabs">Posts: {this.state.posts}</span>
                <span className="infoTabs">Follows: {this.state.follows}</span>
                <span className="infoTabs">Followed By: {this.state.followedBy}</span></span>
                <p className="userFullName">{this.state.fullName}
                <span className="editIcon">
                     <Fab color="secondary" aria-label="edit" className={classes.fab}>
                        <EditIcon onClick={this.openModalHandler} />
                    </Fab>
                </span></p>
                </div>
                </div>
                </div>
            </div>
         );
    }
}

export default withStyles(styles)(Profile);