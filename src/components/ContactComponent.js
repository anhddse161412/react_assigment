import React from "react";
import {
   Col,
   Button,
   Form,
   FormGroup,
   Label,
   Input,
   FormFeedback,
} from "reactstrap";

class Contact extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         firstName: "",
         lastName: "",
         telnum: "",
         email: "",
         agree: false,
         contactType: "Tel.",
         message: "",
         touched: {
            firstName: false,
            lastName: false,
            telnum: false,
            email: false,
         },
      };
   }

   handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value,
      });
   };

   handleSubmit = (event) => {
      alert("WE GOT YOUR FEEDBACK");
      this.setState({
         firstName: "",
         lastName: "",
         telnum: "",
         email: "",
         agree: false,
         contactType: "Tel.",
         message: "",
         touched: {
            firstName: false,
            lastName: false,
            telnum: false,
            email: false,
         },
      });
      event.preventDefault();
   };

   handleBlur = (field) => (event) => {
      this.setState({
         touched: { ...this.state.touched, [field]: true },
      });
   };

   validate(firstName, lastName, telnum, email) {
      const errors = {
         firstName: "",
         lastName: "",
         telnum: "",
         email: "",
      };

      if (this.state.touched.firstName && firstName.length < 3) {
         errors.firstName = "First Name must be at least 3 characters";
      } else if (this.state.touched.lastName && firstName.length > 10) {
         errors.firstName = "First Name must be less than 10 characters";
      }

      if (this.state.touched.lastName && lastName.length < 3) {
         errors.lastName = "Last Name must be at least 3 characters";
      } else if (this.state.touched.lastName && lastName.length > 10) {
         errors.lastName = "Last Name must be less than 10 characters";
      }

      const reg = /^\d+$/;

      if (this.state.touched.telnum && !reg.test(telnum)) {
         errors.telnum = "Tel. Number should contain only number";
      }

      if (
         this.state.touched.email &&
         email.split("").filter((x) => x === "@").length !== 1
      ) {
         errors.email = "email should contain a @";
      }
      return errors;
   }

   render() {
      const errors = this.validate(
         this.state.firstName,
         this.state.lastName,
         this.state.telnum,
         this.state.email
      );
      return (
         <div className="container">
            <div className="row row-content justify-content-center body-content">
               <div className="col-12 mb-2">
                  <h3>Send us your Feedback</h3>
               </div>
               <div className="col-12 col-md-10">
                  <Form onSubmit={this.handleSubmit}>
                     <FormGroup row>
                        <Label htmlFor="firstName" md={2}>
                           First Name
                        </Label>
                        <Col md={10}>
                           <Input
                              type="text"
                              id="firstName"
                              name="firstName"
                              placeholder="First Name"
                              value={this.state.firstName}
                              valid={errors.firstName === ""}
                              invalid={errors.firstName !== ""}
                              onChange={this.handleInputChange}
                              onBlur={this.handleBlur("firstName")}
                           />
                           <FormFeedback>{errors.firstName}</FormFeedback>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Label htmlFor="lastName" md={2}>
                           Last Name
                        </Label>
                        <Col md={10}>
                           <Input
                              type="text"
                              id="lastName"
                              name="lastName"
                              placeholder="Last Name"
                              value={this.state.lastName}
                              onChange={this.handleInputChange}
                              valid={errors.lastName === ""}
                              invalid={errors.lastName !== ""}
                              onBlur={this.handleBlur("lastName")}
                           />
                           <FormFeedback>{errors.lastName}</FormFeedback>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Label htmlFor="telnum" md={2}>
                           Contact Tel.
                        </Label>
                        <Col md={10}>
                           <Input
                              type="tel"
                              id="telnum"
                              name="telnum"
                              placeholder="Tel. number"
                              value={this.state.telnum}
                              onChange={this.handleInputChange}
                              valid={errors.telnum === ""}
                              invalid={errors.telnum !== ""}
                              onBlur={this.handleBlur("telnum")}
                           />
                           <FormFeedback>{errors.telnum}</FormFeedback>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Label htmlFor="email" md={2}>
                           Email
                        </Label>
                        <Col md={10}>
                           <Input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.handleInputChange}
                              valid={errors.email === ""}
                              invalid={errors.email !== ""}
                              onBlur={this.handleBlur("email")}
                           />
                           <FormFeedback>{errors.email}</FormFeedback>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col md={{ size: 6, offset: 2 }}>
                           <FormGroup check>
                              <Label check>
                                 <Input
                                    type="checkbox"
                                    name="agree"
                                    checked={this.state.agree}
                                    onChange={this.handleInputChange}
                                 />{" "}
                                 <strong>May we contact you?</strong>
                              </Label>
                           </FormGroup>
                        </Col>
                        <Col md={{ size: 3, offset: 1 }}>
                           <Input
                              type="select"
                              name="contactType"
                              value={this.state.contactType}
                              onChange={this.handleInputChange}
                           >
                              <option>Tel.</option>
                              <option>Email</option>
                           </Input>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Label htmlFor="message" md={2}>
                           Your Feedback
                        </Label>
                        <Col md={10} className="body-content">
                           <Input
                              type="textarea"
                              id="message"
                              name="message"
                              rows="12"
                              value={this.state.message}
                              onChange={this.handleInputChange}
                              placeholder="Your Feedback"
                           ></Input>
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col className="d-flex flex-row-reverse">
                           <Button type="submit" color="primary">
                              Send Feedback
                           </Button>
                        </Col>
                     </FormGroup>
                  </Form>
               </div>
            </div>
         </div>
      );
   }
}

export default Contact;
