import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { CardMedia, GridList, GridListTile } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SvgIcon from "@material-ui/core/SvgIcon";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
  hr: {
    width: 200,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
  root1: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 2000,
    height: 320,
  },
}));

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

function FavoriteIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
       3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </SvgIcon>
  );
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userImages: [],
      imageInfo: [],
      imageInfo1: [],
      hashtags: ["#smile ", "#GoodDay "],
      hashtag1: ["#life ", "#EnjoyLife "],
      hashtag2: ["#Nature ", "#StayCloseToNature "],
      favClick: false,
      count: 0,
      addComment: [],
    };
  }

  imageCommentOnChangeChangeHandler = (e) => {
    this.setState({ imagecomment: e.target.value });
  };

  componentWillMount() {
    //Get user images
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

    let imageinfo1 = null;
    let xhrImageinfo1 = new XMLHttpRequest();
    xhrImageinfo1.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));

        that.setState({ imageInfo1: JSON.parse(this.responseText) });
      }
    });
    xhrImageinfo1.open(
      "GET",
      this.props.baseUrl +
        "18147435772077576?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXWV9CMXYyWlVYNlVjWW93ZAy03Y08zODBHMzlVQmFmRDZA6bUZA4ck9tWnJOeDZAwdUgzTWxHempqTmRtVnhBUjlrR3JMSHl1elpjd2hncTd4NFBlTk9FSkpLdlV0NlhSSDBZAX1FMRnBfaXk5MDAweUlaWDhPVDhBeG1V"
    );
    xhrImageinfo1.send(imageinfo1);
  }

  incrementMe = () => {
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount,
    });
  };

  onCommentChangeHandler = (event) => {
    var comment = {
      text: event.target.value,
    };
    this.setState({
      ...this.state,
      commentText: comment,
    });
  };

  onClickAddBtn = () => {
    alert("Hello");
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
      <div className={useStyles.root1}>
        <Header showSearchBox="true" />
        <br />

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
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <img
                        src={require("../../assets/masha.jpeg")}
                        width="50"
                        height="50"
                      ></img>
                    </Avatar>
                  }
                  title={tile.title}
                  subtitle={tile.author}
                />
                <CardContent>
                  <img
                    src={require("../../assets/" + tile.img)}
                    alt={tile.title}
                  />
                  <hr className={classes.hr} />
                  <h4 className="captionText">{this.state.hashtag1}</h4>
                  <div className="likes">
                    <button className="button" onClick={this.incrementMe}>
                      <FavoriteBorderIcon />
                    </button>
                    {this.state.count} likes
                  </div>
                  <FormControl className="formcontrol">
                    <InputLabel htmlFor="imagecomment">
                      Add a Comment
                    </InputLabel>
                    <Input
                      id="imagecomment"
                      type="text"
                      onChange={this.imageCommentOnChangeChangeHandler}
                    />
                  </FormControl>
                  <Button
                    id="addedcomment"
                    variant="contained"
                    color="primary"
                    onClick={this.addCommentOnClickHandler}
                  >
                    Add
                  </Button>
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home);
