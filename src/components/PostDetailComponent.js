import React from "react";
import {
   Breadcrumb,
   BreadcrumbItem,
   Card,
   CardBody,
   CardText,
   Form,
   FormGroup,
   Label,
   Input,
   Button,
   CardImg,
} from "reactstrap";
import Http from "./ApiComponent";
import { Link } from "react-router-dom";

function RenderPost({ post }) {
   return (
      <div className="col-12">
         <Card
            className="text-justify"
            inverse
            style={{
               backgroundColor: "#333",
               borderColor: "#333",
            }}
         >
            {/* <CardImg variant="top" top src={post.image} alt={post.title} /> */}
            <CardBody>
               <CardText style={{ fontSize: "20px" }}>
                  {post.description}
               </CardText>
            </CardBody>
         </Card>
      </div>
   );
}

function RenderComment({ comments }) {
   const AllComment = comments.map((comment) => {
      return (
         <Card
            className="text-justify"
            inverse
            style={{
               backgroundColor: "#4d4d4d",
               borderColor: "#333",
            }}
            key={new Date(comment.date).toLocaleTimeString()}
         >
            {/* <CardImg variant="top" top src={post.image} alt={post.title} /> */}
            <CardBody>
               <CardText style={{ fontSize: "18px", color: "#08E6B3" }}>
                  Anonymous
               </CardText>
               <CardText style={{ fontSize: "15px" }}>
                  {comment.comment}
               </CardText>
               <CardText style={{ fontSize: "12px" }}>
                  --{new Date(comment.date).toLocaleString()}--
               </CardText>
            </CardBody>
         </Card>
      );
   });
   return <div className="col-12">{AllComment}</div>;
}

class PostDetail extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         post: this.props.post,
         comment: "",
         // comments: this.props.post.comments,
         comments: [],
      };
   }

   componentWillMount() {
      if (this.props.post != null)
         this.setState({
            comments: this.props.post.comments,
         });
   }

   handleInputChange = (e) => {
      const nameControl = e.target.name;
      const value = e.target.value;
      this.setState({
         [nameControl]: value,
      });
   };

   postComment = (event) => {
      event.preventDefault();

      const comment = this.state.comment;
      const date = new Date();
      const newComment = {
         comment: comment,
         date: date,
      };
      const newComments = this.state.comments;
      newComments.push(newComment);
      console.log(this.state.comments);

      const newListCommennt = { comments: newComments };
      // console.log(newListCommennt)
      // console.log(JSON.stringify(newListCommennt))
      Http.updatePost(this.state.post.id, newListCommennt).then((value) => {
         this.setState({
            comments: newComments,
            comment: "",
         });
      });
   };

   render() {
      if (this.state.post != null) {
         const post = this.state.post;
         return (
            <div className="container body-content">
               <div className="row">
                  <Breadcrumb>
                     <BreadcrumbItem>
                        <Link to="/news">News</Link>
                     </BreadcrumbItem>
                     <BreadcrumbItem active>{post.title}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                     <Card
                        className="col-12 body-content"
                        inverse
                        style={{
                           backgroundColor: "#333",
                           borderColor: "#333",
                        }}
                     >
                        <div>
                           <h3
                              style={{
                                 color: "#22bbff",
                                 fontWeight: "bold",
                              }}
                           >
                              {post.title}
                           </h3>
                           <div className="col-12">
                              <h3>
                                 created At:{" "}
                                 {new Date(post.createdAt).toLocaleString()}
                              </h3>
                           </div>
                           <CardText
                              className="text-justify"
                              style={{
                                 color: "#b6c441",
                                 fontWeight: "bold",
                              }}
                           >
                              {post.category}
                           </CardText>
                           <hr
                              style={{
                                 backgroundColor: "#f6f6f6",
                                 border: "2px solid #f6f6f6",
                              }}
                           />
                        </div>
                     </Card>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <RenderPost post={post} />
                  </div>

                  <div className="col-12">
                     <h4 className="text-justify mt-2">
                        {this.state.comments.length} COMMENT
                     </h4>
                     <RenderComment comments={this.state.comments} />
                  </div>

                  <div className="col-12">
                     <Form onSubmit={this.postComment} className="mt-2">
                        <FormGroup>
                           <Label for="comment">Add Comment</Label>
                           <div className="row">
                              <div className="col-12 ">
                                 <Input
                                    type="textarea"
                                    name="comment"
                                    id="comment"
                                    value={this.state.comment}
                                    placeholder="Add a comment"
                                    onChange={this.handleInputChange}
                                 />
                              </div>

                              <div className="col-12 mt-2 d-flex flex-row-reverse">
                                 <Button className="col-2 btn-info">
                                    post
                                 </Button>
                              </div>
                           </div>
                        </FormGroup>
                     </Form>
                  </div>
               </div>
            </div>
         );
      } else {
         return (
            <div className="container">
               <div className="m-5">
                  <img
                     src="/assets/images/loading.png"
                     alt=""
                     width={200}
                  ></img>
               </div>
            </div>
         );
      }
   }
}

export default PostDetail;
