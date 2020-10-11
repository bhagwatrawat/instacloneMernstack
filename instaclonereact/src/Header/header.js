import React, { useState,useContext } from 'react';
import {useHistory,Link} from 'react-router-dom'
import {UserContext} from '../reducer/reducer'
import './header.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Col

} from 'reactstrap';

const Header = (props) => {
  const [user,setUser]=useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const history=useHistory()

  const toggle = () => setIsOpen(!isOpen);

const logoutHandler=()=>{
  localStorage.clear()
  setUser(null)
  history.push('/')
}

  return (



        <div className="_topheader container-fluid  bg-white">

        <Navbar className="_header col-lg-8 offset-lg-2 pl-0 pr-0" color="white" light expand="md">

        <NavbarBrand className="_brand">  <Link to='/'>
            <img className="_logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram" />
          </Link></NavbarBrand>



        <Input className="_search" type="text" name="search" id="exampleEmail" placeholder="Search" />



          <Nav className="_links" navbar>
            <div className="d-flex ml-auto">
            <NavItem>
              <Link to="/"><NavLink>Home</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/profile"><NavLink>Profile</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to='/createpost'><NavLink>Add Post</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                <Link to='/subpost'><NavLink>my following</NavLink></Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink onClick={logoutHandler}>
                  LogOut

                </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          </Nav>
        </Navbar>

        </div>



  );
}

export default Header;
