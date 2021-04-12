import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/loginAction";

const Header = () => {
  const dispatch = useDispatch();
  const userLogInfo = useSelector((state) => {
    return state.login;
  });
  const { userInfo } = userLogInfo;
  const logoutt = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>onlineShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart '></i>Cart{" "}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  {console.log(userInfo.type, "ali hesham from header")}
                  <LinkContainer to={"/profile/" + userInfo.id}>
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/userOrders/" + userInfo.id}>
                    <NavDropdown.Item>orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/"}>
                    <NavDropdown.Item onClick={logoutt}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.type && (
                <NavDropdown title='admin' id='adminnav'>
                  {console.log(userInfo.type, "ali hesham from header")}
                  <LinkContainer to={"/allusers"}>
                    <NavDropdown.Item>users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/allproducts"}>
                    <NavDropdown.Item>products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/allorders"}>
                    <NavDropdown.Item>orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
