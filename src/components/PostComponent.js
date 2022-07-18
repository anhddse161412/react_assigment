import Http from "./ApiComponent";
import React from "react";
import {
   Form,
   FormGroup,
   Label,
   Input,
   Button,
   FormFeedback,
   Breadcrumb,
   BreadcrumbItem,
   Card,
   Modal,
   ModalHeader,
   ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         description: "",
         category: "",
         isEdit: false,
         idEdit: "",
         modalOpen: false,
         idDelete: "",
         error: {
            title: "",
            description: "",
            category: "",
         },
         Posts: this.props.posts,
      };
   }
   // async componentDidMount() {
   //    this.renderPost();
   // }

   renderPost = async () => {
      window.location.reload();
      await Http.readPosts().then((value) => {
         this.setState({ Posts: value });
      });
   };

   toggle = () => {
      this.setState({
         modal: !this.state.modal,
      });
   };

   toggleModelDelete = (deleteId) => {
      this.setState({
         modal: !this.state.modal,
         idDelete: deleteId,
      });
   };

   confirmDelete = () => {
      this.deletePost(this.state.idDelete);
   };

   deletePost = async (PostId) => {
      await Http.deletePost(PostId).then((value) => {
         alert("Delete Success");
         this.renderPost();
      });
   };

   editPost = async (PostId) => {
      window.scrollTo({ top: 260, behavior: "smooth" });
      const PostEdit = await Http.readPost(PostId);
      this.setState({
         title: PostEdit.title,
         description: PostEdit.description,
         category: PostEdit.category,
         isEdit: true,
         idEdit: PostId,
      });
   };

   cancelEditPost = () => {
      this.setState({
         isEdit: false,
         title: "",
         description: "",
         category: "",
      });
   };

   clearForm = () => {
      this.setState({ title: "", description: "", category: "" });
   };

   // form input

   handleInputChange = (e) => {
      const nameControl = e.target.name;
      const value = e.target.value;
      this.setState({
         [nameControl]: value,
      });
   };

   handleInputBlur = (e) => {
      const nameControl = e.target.name;
      const value = e.target.value;

      if (nameControl === "title" && value.length < 5) {
         this.setState({
            error: { ...this.state.error, title: "Title is too short" },
         });
      } else if (nameControl === "description" && value.length < 5) {
         this.setState({
            error: {
               ...this.state.error,
               description: "description is too short",
            },
         });
      } else if (nameControl === "category" && value.length < 3) {
         this.setState({
            error: {
               ...this.state.error,
               category: "category is too short",
            },
         });
      } else {
         this.setState({
            error: {
               ...this.state.error,
               title: "",
               category: "",
               description: "",
            },
         });
      }
   };

   handleSubmit = (e) => {
      e.preventDefault();

      const title = this.state.title;
      const description = this.state.description;
      const category = this.state.category;
      if (
         title.trim() === "" ||
         description.trim() === "" ||
         category.trim() === ""
      ) {
         alert("title or description cannot be empty");
         return;
      }

      const newPost = { title, description, category };

      if (this.state.isEdit) {
         Http.updatePost(this.state.idEdit, newPost).then((value) => {
            alert(`Edited ${value.title}`);
            this.setState({
               isEdit: false,
            });
            this.renderPost();
            this.clearForm();
         });
      } else {
         Http.createPost(newPost).then((value) => {
            alert(`created ${value.title}`);
            this.renderPost();
            this.clearForm();
         });
      }
   };

   handleSearch = (event) => {
      const value = event.target.value;
      const filterList = this.props.posts.filter((post) => {
         return post.title.toLowerCase().includes(value.toLowerCase());
      });
      console.log(filterList);
      this.setState({
         Posts: filterList,
      });
   };

   render() {
      if (this.state.Posts != null) {
         const sortPostListByDate = this.state.Posts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
         });
         const posts = sortPostListByDate.map((post) => {
            return (
               <Card
                  className="col-12 col-md-6 mb-2"
                  inverse
                  style={{
                     backgroundColor: "#333",
                     borderColor: "#898989",
                  }}
                  key={post.id}
               >
                  <Link to={`/post/${post.id}`}>
                     <div className=" text-justify body-content">
                        <h3 style={{ color: "#22bbff" }}>
                           <strong>{post.title}</strong>
                        </h3>
                        <p>{post.description}</p>
                        <p
                           style={{
                              color: "#b6c441",
                              fontWeight: "bold",
                           }}
                        >
                           {post.category}
                        </p>
                     </div>
                  </Link>
                  <div className=" body-content">
                     <button
                        onClick={() => this.editPost(post.id)}
                        className="btn btn-info btn-edit mr-2"
                        data-id={post.id}
                     >
                        Edit
                     </button>
                     <button
                        // onClick={() => this.deletePost(post.id)}
                        onClick={() => this.toggleModelDelete(post.id)}
                        className="btn btn-danger btn-remove mr-2"
                        data-id={post.id}
                     >
                        Remove
                     </button>
                  </div>

                  <hr />
               </Card>
            );
         });
         return (
            //
            <div className="body-content mb-2">
               <div className="container">
                  <div className="row">
                     <Breadcrumb>
                        <BreadcrumbItem>
                           <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Post</BreadcrumbItem>
                     </Breadcrumb>
                  </div>
                  <div className="row row-content">
                     <Form onSubmit={this.handleSubmit} className="col-12">
                        <FormGroup>
                           <Label for="title">
                              <h3 className="text-justify"> Title</h3>
                           </Label>
                           <Input
                              type="text"
                              name="title"
                              id="title"
                              value={this.state.title}
                              valid={this.state.error.title === ""}
                              invalid={this.state.error.title !== ""}
                              onChange={this.handleInputChange}
                              onBlur={this.handleInputBlur}
                              className="body-content"
                           />
                           <FormFeedback>{this.state.error.title}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                           <Label for="category">
                              <h3 className="text-justify"> category</h3>
                           </Label>
                           <Input
                              type="text"
                              name="category"
                              id="category"
                              value={this.state.category}
                              valid={this.state.error.category === ""}
                              invalid={this.state.error.category !== ""}
                              onChange={this.handleInputChange}
                              onBlur={this.handleInputBlur}
                              className="body-content"
                           />
                           <FormFeedback>
                              {this.state.error.category}
                           </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                           <Label for="description">
                              <h4 className="text-justify"> Description</h4>
                           </Label>
                           <Input
                              type="textarea"
                              name="description"
                              id="description"
                              valid={this.state.error.description === ""}
                              invalid={this.state.error.description !== ""}
                              value={this.state.description}
                              onChange={this.handleInputChange}
                              onBlur={this.handleInputBlur}
                              className="body-content"
                           />
                           <FormFeedback>
                              {this.state.error.description}
                           </FormFeedback>
                        </FormGroup>
                        <div className="d-flex"></div>
                        {this.state.isEdit ? (
                           <Button type="submit" className="m-2 btn-info">
                              EDIT
                           </Button>
                        ) : (
                           <Button type="submit" className="m-2 btn-success">
                              ADD
                           </Button>
                        )}

                        {this.state.isEdit ? (
                           <Button
                              onClick={this.cancelEditPost}
                              className="m-2"
                           >
                              BACK
                           </Button>
                        ) : (
                           <></>
                        )}
                     </Form>
                     <Form
                        onSubmit={this.handleSearch}
                        className="body-content col-12 mt-2"
                     >
                        <FormGroup>
                           <Label>
                              <h3>Search:</h3>
                           </Label>
                           <Input
                              type="text"
                              name="search"
                              onChange={this.handleSearch}
                           />
                        </FormGroup>
                     </Form>
                  </div>
               </div>
               <div className="container">
                  <div className="row">{posts}</div>
               </div>
               <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className="body-content"
               >
                  <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
                  <ModalBody>
                     <div>
                        <h2>Are you sure you want to delete this post?</h2>
                     </div>

                     <div className="float-right">
                        <Button color="danger" onClick={this.confirmDelete}>
                           Confirm
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                           Cancel
                        </Button>
                     </div>
                  </ModalBody>
               </Modal>
            </div>
         );
      } else {
         return (
            <div className="container">
               <img src="assets/images/loading.png" alt="" width={200}></img>
            </div>
         );
      }
   }
}

export default Post;
