import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="not-found-pic"
      src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641401024/covid-dashboard-ccbp/Not_Found_zth91l.svg"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found
    </p>
    <p className="not-found-text">Please go back to the homepage</p>
    <button type="button" className="nf-home-button">
      <Link className="link-style" to="/">
        Home
      </Link>
    </button>
  </div>
)

export default NotFound
