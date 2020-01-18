import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Row, Input, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false,
          name: '',
          touched: {
            name: false,
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    validate(name) {

        const errors = {
            name: ''
        };

        if (this.state.touched.name) {
            if (name.length < 2) {
                errors.name = 'Name must be at least 2 characters.';
            } else if (name.length > 15) {
                errors.name = 'Name must be 15 or less characters.';
            }
        }

        return errors;
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    render() {

    const required = val => val && val.length;
    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

        return(

            <React.Fragment>

            <div className="col">
                <Button outline className="fa fa-pencil" onClick={this.toggleModal}> Submit Comment </Button>
            </div>

            
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <div className="form-group">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">           
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </Control.select>
                    </div>
                    <div className="form-group">
                            <Label htmlFor="name">Your Name</Label>
                        <Control.text 
                            model=".name" 
                            id="name" 
                            name="name"
                            placeholder="Your Name"
                            className="form-control"
                                validators={{
                                    required, 
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                        />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                        />
                    </div>
                    <div className="form-group">
                        <Label htmlFor="comment">Comment</Label>
                            <Control.textarea row="6" model=".comment" id="comment" name="comment"
                                        className="form-control">
                            </Control.textarea>
                    </div>
                    <Button type="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
        </React.Fragment>
        )
    }
}

function RenderCampsite({campsite}) { 
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

function RenderComments({comments}) {
        if(comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id}>
                                {comment.text}<br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </div>
                        )
                    })}
                    <CommentForm/>
                </div>
            )
        }
        return (
            <div></div>
        )
    }

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite}/>
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        )
    }
    return <div/>;
    }  

export default CampsiteInfo;