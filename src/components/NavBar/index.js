import {MdOutlineMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Component} from 'react'

import {Link} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  state = {isMenuVisible: false}

  onToggleMenu = () => {
    this.setState(prevState => ({isMenuVisible: !prevState.isMenuVisible}))
  }

  render() {
    const {isMenuVisible} = this.state
    return (
      <>
        <ul className="navbar-container">
          <Link className="logo-link" to="/">
            <li className="logo-name">
              COVID19<span className="color-blue">INDIA</span>
            </li>
          </Link>
          <ul className="navbar-menu-large">
            <li>
              <Link className="nav-link" to="/">
                <button type="button" className="menu-link-button">
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">
                <button type="button" className="menu-link-button">
                  About
                </button>
              </Link>
            </li>
          </ul>
          <div className="navbar-menu-small">
            <button
              onClick={this.onToggleMenu}
              type="button"
              className="menu-button"
            >
              <MdOutlineMenuOpen className="menu-icon" />
            </button>
          </div>
        </ul>
        {isMenuVisible && (
          <div className="toggle-menu-container">
            <div className="toggle-menu-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </div>
            <button
              onClick={this.onToggleMenu}
              type="button"
              className="menu-button"
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default NavBar
