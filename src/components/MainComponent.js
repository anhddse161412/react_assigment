import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Post from "./PostComponent";
import About from "./AboutComponent";
import News from "./NewsComponent";
import Contact from "./ContactComponent";
import { connect } from "react-redux";
import PostDetail from "./PostDetailComponent";
import Http from "./ApiComponent";

import { loading } from "../redux/ActionCreator";

const mapStateToProps = (state) => {
   return {
      stories: state.stories,
      posts: state.posts,
   };
};
class Main extends React.Component {
   // constructor(props) {
   //    super(props);
   //    this.state = {
   //       posts: [],
   //    };
   // }

   async componentWillMount() {
      // this.renderPost();
      this.props.dispatch(loading());
   }
   // renderPost = async () => {
   //    await Http.readPosts().then((value) => {
   //       this.setState({
   //          posts: value,
   //       });
   //    });
   // };

   render() {
      const PostWithId = ({ match }) => {
         // console.log(match);
         // let check = this.props.posts.filter(
         //    (post) => post.id === match.params.postId
         // )[0];
         // if (check === undefined) {
         //    this.renderPost();
         // }
         return (
            <PostDetail
               post={
                  this.props.posts.filter(
                     (post) => post.id === match.params.postId
                  )[0]
               }
            />
         );
      };
      return (
         <div>
            <Header />
            <div>
               <Switch>
                  <Route
                     path="/home"
                     component={() => <Home stories={this.props.stories} />}
                  />
                  <Route path="/aboutus" component={About} />
                  <Route
                     path="/news"
                     component={() => <News news={this.props.posts} />}
                  />
                  <Route
                     exact
                     path="/post"
                     component={() => <Post posts={this.props.posts} />}
                  />
                  Contact
                  <Route exact path="/contactus" component={Contact} />
                  <Route path="/post/:postId" component={PostWithId} />
                  <Redirect to="/home" />
               </Switch>
            </div>
            <Footer />
         </div>
      );
   }
}

export default withRouter(connect(mapStateToProps)(Main));
