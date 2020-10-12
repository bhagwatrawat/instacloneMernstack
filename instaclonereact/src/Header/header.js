import React, { useState,useContext } from 'react';
import {useHistory,Link} from 'react-router-dom'
import {UserContext} from '../reducer/reducer'
import {FaHome} from 'react-icons/fa'
import {Avatar} from '@material-ui/core'
import {IoIosCamera} from 'react-icons/io'
import './header.css'
import { makeStyles } from '@material-ui/core/styles';
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
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
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
 const classes = useStyles();

  return (



        <div className="_topheader container-fluid  bg-white">

        <Navbar className="_header col-lg-8 offset-lg-2 pl-0 pr-0" color="white" light >

        <NavbarBrand className="_brand">  <Link to='/'>
            <img className="_logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram" />
          </Link></NavbarBrand>



        <Input className="_search" type="text" name="search" id="exampleEmail" placeholder="Search" />



          <Nav className="_links" navbar>
            <div className="d-flex ml-auto">
            <NavItem >
              <Link  to="/"><NavLink ><div className="_home mr-2">Home</div>
              <div className="_homeIcon mr-2" >
                <FaHome size={25}/></div>
              </NavLink>
             </Link>

            </NavItem>
            <NavItem>
            <Link to='/createpost'><NavLink><div className="_post mr-2">Add Post</div>
              <div className="_postIcon mr-2"><IoIosCamera size={32} /></div></NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Avatar className="_avatar" name={user.name} src={user.profileUrl} className={classes.small}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to="/profile"><NavLink>Profile</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                <Link to='/subpost'><NavLink>Following Posts</NavLink></Link>
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
