import React from "react";
import {
   Card,
   CardText,
   Breadcrumb,
   BreadcrumbItem,
   Form,
   FormGroup,
   Label,
   Input,
   CardImg,
} from "reactstrap";

import { Link } from "react-router-dom";

class News extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         news: this.props.news,
         search: "",
         value: "",
      };
   }
   handleSearch = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
         [name]: value,
      });
      let filterList = this.props.news.filter((post) => {
         return post.title.toLowerCase().includes(value.toLowerCase());
      });
      console.log(filterList);
      this.setState({
         news: filterList,
      });
   };

   handleSortByCategory = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
         [name]: value,
      });

      const sortList = this.props.news.filter((post) =>
         post.category.includes(value)
      );
      this.setState({
         news: sortList,
      });
   };

   render() {
      if (this.state.news != null) {
         // get category list from props
         const categoryList = [];
         this.props.news.map((post) => {
            return categoryList.push(post.category);
         });
         // remove duplicate category by using Set
         // and convert Set to array by using destructuring
         const uniqueCategoryList = [...new Set(categoryList)];

         const categoryListOption = uniqueCategoryList.map((category) => {
            return (
               <option value={category} key={category}>
                  {category}
               </option>
            );
         });

         const sortNewsListByDate = this.state.news.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
         });
         const news = sortNewsListByDate.map((post) => {
            return (
               <Card
                  className="col-6 col-md-4 mb-2 mt-2"
                  inverse
                  style={{
                     backgroundColor: "#333",
                     borderColor: "#f6f6f6",
                     color: "#f6f6f6",
                  }}
                  key={post.id}
               >
                  {/* <CardImg
                     variant="top"
                     top
                     src={post.image}
                     alt={post.title}
                  /> */}
                  <Link to={`/post/${post.id}`}>
                     <div className="body-content">
                        <h3
                           style={{
                              color: "#22bbff",
                              fontWeight: "bold",
                           }}
                        >
                           {post.title}
                        </h3>
                        <hr />
                        <CardText className="text-justify">
                           {post.description}
                        </CardText>
                        <CardText
                           className="text-justify"
                           style={{
                              color: "#b6c441",
                              fontWeight: "bold",
                           }}
                        >
                           {post.category}
                        </CardText>
                     </div>
                  </Link>
               </Card>
            );
         });
         return (
            <div className="container">
               <div className="row">
                  <Breadcrumb>
                     <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                     </BreadcrumbItem>
                     <BreadcrumbItem active>News</BreadcrumbItem>
                  </Breadcrumb>
               </div>
               <Form onSubmit={this.handleSearch} className="body-content m-5">
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

               <div className="body-content d-flex flex-row-reverse">
                  <select onChange={this.handleSortByCategory} name="value">
                     <option value="">All</option>
                     {categoryListOption}
                  </select>
                  <h3>Category : </h3>
               </div>

               <div className="row mb-3">{news}</div>
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
export default News;
