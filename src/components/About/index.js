import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {isLoading: false, faqData: []}

  componentDidMount() {
    this.getFaqData()
  }

  getFaqData = async () => {
    this.setState({isLoading: true})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()

    const {faq} = data
    this.setState({faqData: faq, isLoading: false})
  }

  render() {
    const {faqData, isLoading} = this.state
    console.log(faqData)
    return (
      <>
        <div className="frag-about">
          <Header />
          {isLoading && (
            <div className="loader-container" testid="aboutRouteLoader">
              <Loader type="Oval" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {!isLoading && (
            <div className="about-container">
              <h1 className="about-heading">About</h1>
              <p className="about-last-update">
                Last update on march 28th 2021
              </p>
              <p className="about-vaccine-dist">
                COVID-19 vaccines be ready for distribution
              </p>
              <ul className="faqs-container" testid="faqsUnorderedList">
                {faqData.map(item => (
                  <li key={item.qno}>
                    <p className="faq-question">{item.question}</p>
                    <p className="faq-answer">{item.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Footer />
        </div>
      </>
    )
  }
}

export default About
