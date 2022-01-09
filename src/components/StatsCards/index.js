import './index.css'

const StatsCards = props => {
  const {
    confirmed,
    active,
    deceased,
    recovered,
    forStateDetails,
    activeTab,
    changeActiveTab,
  } = props

  const setActiveTabAsActive = () => {
    changeActiveTab('ACTIVE')
  }

  const setActiveTabAsConfirmed = () => {
    changeActiveTab('CONFIRMED')
  }

  const setActiveTabAsRecovered = () => {
    changeActiveTab('RECOVERED')
  }

  const setActiveTabAsDeceased = () => {
    changeActiveTab('DECEASED')
  }

  return (
    <div className="stats-card-container">
      <button
        onClick={setActiveTabAsConfirmed}
        type="button"
        className={`stats-card confirmed-color ${
          forStateDetails && activeTab === 'CONFIRMED' && 'confirmed-active'
        }`}
        testid="countryWideConfirmedCases"
      >
        <p className="stat-card-title">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157955/covid-dashboard-ccbp/check-mark_1_vey284.svg"
          alt="country wide confirmed cases pic"
        />
        <p className="stat-card-count">{confirmed}</p>
      </button>

      <button
        onClick={setActiveTabAsActive}
        type="button"
        className={`stats-card active-color ${
          forStateDetails && activeTab === 'ACTIVE' && 'active-active'
        }`}
        testid="countryWideActiveCases"
      >
        <p className="stat-card-title">Active</p>
        <img
          src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157951/covid-dashboard-ccbp/protection_1_gxobgm.svg"
          alt="country wide active cases pic"
        />
        <p className="stat-card-count">{active}</p>
      </button>

      <button
        onClick={setActiveTabAsRecovered}
        type="button"
        className={`stats-card recovered-color ${
          forStateDetails && activeTab === 'RECOVERED' && 'recovered-active'
        }`}
        testid="countryWideRecoveredCases"
      >
        <p className="stat-card-title">Recovered</p>
        <img
          src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157945/covid-dashboard-ccbp/recovered_1_aenxht.svg"
          alt="country wide recovered cases pic"
        />
        <p className="stat-card-count">{recovered}</p>
      </button>
      <button
        onClick={setActiveTabAsDeceased}
        type="button"
        className={`stats-card deceased-color ${
          forStateDetails && activeTab === 'DECEASED' && 'deceased-active'
        }`}
        testid="countryWideDeceasedCases"
      >
        <p className="stat-card-title">Deceased</p>
        <img
          src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157949/covid-dashboard-ccbp/breathing_1_mgwh7s.svg"
          alt="country wide deceased cases pic"
        />
        <p className="stat-card-count">{deceased}</p>
      </button>
    </div>
  )
}
export default StatsCards
