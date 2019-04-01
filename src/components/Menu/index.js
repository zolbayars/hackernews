import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import { SearchedStoryList, RegularStoryList } from './../StoryList';
import UserDetail from "../User/UserDetail";
import ItemDetail from "../Item/ItemDetail";

import { Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button,
  Container,
  Row
 } from 'react-bootstrap';

import './index.css';

function getRegularStoryList() {
    return <RegularStoryList type="news"/>;
}

function getTopStoryList() {
    return <RegularStoryList type="top"/>;
}

function getBestStoryList() {
    return <RegularStoryList type="best"/>;
}

function getAskStoryList() {
    return <RegularStoryList type="ask"/>;
}

function getShowStoryList() {
    return <RegularStoryList type="show"/>;
}

function getJobStoryList() {
    return <RegularStoryList type="job"/>;
}

function getUserDetail({ match }) {
  return (
    <UserDetail id={match.params.id}/>
  );
}

function getItemDetail({ match }) {
  return (
    <ItemDetail id={match.params.id}/>
  );
}


class Menu extends Component {

  constructor(props){
    super(props); 

    this.state = {
      open: false,
      selectedIndex: 0,
    }
  }

  mainContentEl = React.createRef();
 
  onDrawerClose = () => {
    this.setState({open: false});
    // this.mainContentEl.current.querySelector('input, button').focus();
  }
 
  onListItemClick = () => this.onDrawerClose();

  // render(){
  //   return (
  //     <nav class="navbar navbar-light bg-light">
  //       <a class="navbar-brand" href="#">Navbar</a>
  //     </nav>

  //   );
  // }
  render(){
    return (
      
        <div>
          <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand href="/">Tech News</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/best">Best</Nav.Link>
                <Nav.Link href="/top">Top</Nav.Link>
                <Nav.Link href="/ask">Ask</Nav.Link>
                <Nav.Link href="/job">Job</Nav.Link>
                <Nav.Link href="/show">Show</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
            
          </Navbar>
          <div className="content-container">
            <Router>
              <Container fluid="true">
                <Row className="justify-content-lg-center">
                  <Route path="/" exact component={getRegularStoryList} />
                  <Route path="/search/" component={SearchedStoryList} />
                  <Route path="/best/" component={getBestStoryList} />
                  <Route path="/top/" component={getTopStoryList} />
                  <Route path="/job/" component={getJobStoryList} />
                  <Route path="/ask/" component={getAskStoryList} />
                  <Route path="/show/" component={getShowStoryList} />
                  <Route path="/user/:id" component={getUserDetail} />
                  <Route path="/item/:id" component={getItemDetail} />
                </Row>
              </Container>
            </Router>
          </div>
        </div>
    );
  }
  // render(){
  //   return (
  //     <Router>
  //       <div>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to="/">Home</Link>
  //             </li>
  //             <li>
  //               <Link to="/best">Best</Link>
  //             </li>
  //             <li>
  //               <Link to="/top">Top</Link>
  //             </li>
  //             <li>
  //               <Link to="/ask">Ask</Link>
  //             </li>
  //             <li>
  //               <Link to="/job">Job</Link>
  //             </li>
  //             <li>
  //               <Link to="/show">Show</Link>
  //             </li>
  //             <li>
  //               <Link to="/search/">Search</Link>
  //             </li>
  //           </ul>
  //         </nav>
  
          
  //       </div>
  //     </Router>
  //     );
  //   }
  }
  
  export default Menu;