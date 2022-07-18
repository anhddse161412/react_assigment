import React from "react";
import { Card, CardImg, CardText } from "reactstrap";

class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         stories: this.props.stories,
      };
   }

   render() {
      if (this.props.stories != null) {
         const story = this.props.stories.map((story) => {
            return (
               <Card
                  className="col-6 col-md-4 mb-2 body-content"
                  inverse
                  style={{
                     backgroundColor: "#333",
                     borderColor: "#333",
                  }}
                  key={story.id}
               >
                  <CardImg
                     variant="top"
                     top
                     src={story.image}
                     alt={story.name}
                  />
                  <div>
                     <h3>{story.name}</h3>
                     <hr />
                     <CardText className="text-justify">
                        {story.description}
                     </CardText>
                  </div>
               </Card>
            );
         });
         return (
            <div className="container">
               <div className="row align-items-start">{story}</div>
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
export default Home;
