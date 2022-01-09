import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Line,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import StatsCards from '../StatsCards'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const tabDetails = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateSpecificDetails extends Component {
  state = {
    caseDetails: null,
    activeTab: tabDetails.confirmed,
    timelineDetails: null,
    isLoading: false,
  }

  componentDidMount() {
    this.getStateSpecificData()
  }

  getStateSpecificData = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data/',
    )
    const data = await response.json()

    const stateData = data[id]

    const timelineResponse = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${id}`,
    )
    const timelineData = await timelineResponse.json()
    console.log(timelineData)
    this.setState({
      caseDetails: stateData,
      timelineDetails: timelineData,
      isLoading: false,
    })
  }

  changeActiveTab = val => {
    this.setState({activeTab: val})
  }

  renderStateMetaDetails = id => {
    const {caseDetails} = this.state

    if (caseDetails === null) {
      return null
    }
    const {meta, total} = caseDetails
    const lastUpdated = new Date(meta.last_updated)
    const {tested} = total
    const stateName = statesList.find(item => item.state_code === id).state_name
    return (
      <div className="state-meta-container">
        <div className="state-updated-data">
          <p className="state-heading">{stateName}</p>
          <p className="last-update">{`Last update on ${lastUpdated.toDateString()}`}</p>
        </div>
        <div className="tested-stats-container">
          <p className="tested-title">Tested</p>
          <p className="tested-stats">{tested}</p>
        </div>
      </div>
    )
  }

  renderStateStatistics = () => {
    const {caseDetails, activeTab} = this.state
    if (caseDetails === null) {
      return null
    }
    const {total} = caseDetails
    const {confirmed, deceased, recovered} = total
    return (
      <div className="stateDetailsLoader">
        <StatsCards
          confirmed={confirmed}
          deceased={deceased}
          recovered={recovered}
          active={confirmed - (deceased + recovered)}
          activeTab={activeTab}
          forStateDetails
          changeActiveTab={this.changeActiveTab}
        />
      </div>
    )
  }

  renderTopDistrictsData = () => {
    const {activeTab, caseDetails} = this.state
    const districtDetails = []
    const confirmedDistrictData = []
    const activeDistrictData = []
    const recoveredDistrictData = []
    const deceasedDistrictData = []

    if (caseDetails === null) {
      return null
    }
    const {districts} = caseDetails
    const districtNames = Object.keys(districts)
    districtNames.forEach(keyName => {
      const districtName = keyName
      const districtWiseStats = districts[keyName].total

      districtDetails.push({districtName, districtWiseStats})
    })

    districtNames.forEach(keyName => {
      const districtName = keyName
      const confirmedCases = districts[keyName].total.confirmed
      const recoveredCases = districts[keyName].total.recovered
      const deceasedCases = districts[keyName].total.deceased
      const activeCases = confirmedCases - (recoveredCases + deceasedCases)

      confirmedDistrictData.push({
        districtName,
        confirmedCases,
      })

      recoveredDistrictData.push({
        districtName,
        recoveredCases,
      })

      deceasedDistrictData.push({
        districtName,
        deceasedCases,
      })

      activeDistrictData.push({
        districtName,
        activeCases,
      })
    })

    confirmedDistrictData.sort((a, b) => b.confirmedCases - a.confirmedCases)
    activeDistrictData.sort((a, b) => b.activeCases - a.activeCases)
    deceasedDistrictData.sort((a, b) => b.deceasedCases - a.deceasedCases)
    recoveredDistrictData.sort((a, b) => b.recoveredCases - a.recoveredCases)

    return (
      <div className="top-districts-container">
        <h1 className="top-districts-heading">Top Districts</h1>
        {activeTab === tabDetails.confirmed && (
          <ul
            className="top-districts-list-container"
            testid="topDistrictsUnorderedList"
          >
            {confirmedDistrictData.map(item => (
              <li key={item.districtName} className="district-list-item">
                <p className="district-name">{item.districtName}</p>
                <p className="district-stats-count">
                  {item.confirmedCases || 'NA'}
                </p>
              </li>
            ))}
          </ul>
        )}

        {activeTab === tabDetails.active && (
          <ul className="top-districts-list-container">
            {activeDistrictData.map(item => (
              <li key={item.districtName} className="district-list-item">
                <p className="district-name">{item.districtName}</p>
                <p className="district-stats-count">
                  {item.activeCases || 'NA'}
                </p>
              </li>
            ))}
          </ul>
        )}

        {activeTab === tabDetails.deceased && (
          <ul className="top-districts-list-container">
            {deceasedDistrictData.map(item => (
              <li key={item.districtName} className="district-list-item">
                <p className="district-name">{item.districtName}</p>
                <p className="district-stats-count">
                  {item.deceasedCases || 'NA'}
                </p>
              </li>
            ))}
          </ul>
        )}

        {activeTab === tabDetails.recovered && (
          <ul className="top-districts-list-container">
            {recoveredDistrictData.map(item => (
              <li key={item.districtName} className="district-list-item">
                <p className="district-name">{item.districtName}</p>
                <p className="district-stats-count">
                  {item.recoveredCases || 'NA'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLastTenDaysBarGraph = () => {
    const {timelineDetails, activeTab} = this.state
    if (timelineDetails === null) {
      return null
    }
    const key = Object.keys(timelineDetails)
    const {dates} = timelineDetails[key[0]]
    const datesArray = Object.keys(dates)
    datesArray.sort((a, b) => new Date(b) - new Date(a))
    const recentTenDays = datesArray.slice(0, 10)

    const lastTenDaysData = []

    recentTenDays.forEach(date => {
      lastTenDaysData.push({date, ...dates[date].total})
    })

    const confirmedDataArray = []
    const activeDataArray = []
    const recoveredDataArray = []
    const deceasedDataArray = []

    lastTenDaysData.forEach(item => {
      confirmedDataArray.push({date: item.date, confirmed: item.confirmed})
      recoveredDataArray.push({date: item.date, recovered: item.recovered})
      deceasedDataArray.push({date: item.date, deceased: item.deceased})
      activeDataArray.push({
        date: item.date,
        active: item.confirmed - (item.deceased + item.recovered),
      })
    })

    const barGraphStylesandData = {
      CONFIRMED: {
        data: confirmedDataArray,
        color: '#9A0E31',
        dataKey: 'confirmed',
      },
      ACTIVE: {
        data: activeDataArray,
        color: '#0A4FA0',
        dataKey: 'active',
      },
      RECOVERED: {
        data: recoveredDataArray,
        color: '#216837',
        dataKey: 'recovered',
      },
      DECEASED: {
        data: deceasedDataArray,
        color: '#474C57',
        dataKey: 'deceased',
      },
    }

    return (
      <div className="bar-chart-state-container">
        <ResponsiveContainer className="bar-chart-component">
          <BarChart
            data={barGraphStylesandData[activeTab].data}
            margin={{top: 30, bottom: 30, left: 20, right: 20}}
          >
            <Bar
              dataKey={barGraphStylesandData[activeTab].dataKey}
              fill={barGraphStylesandData[activeTab].color}
            >
              <LabelList
                dataKey={barGraphStylesandData[activeTab].dataKey}
                position="top"
                fill={barGraphStylesandData[activeTab].color}
                formatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  return `${(item / 1000).toFixed(2)}K`
                }}
              />
              <LabelList
                style={{fontSize: '14px', fontWeight: '600'}}
                fill={barGraphStylesandData[activeTab].color}
                dataKey="date"
                position="bottom"
                formatter={item => {
                  const dateObj = new Date(item)
                  const options = {day: 'numeric', month: 'short'}
                  return dateObj.toLocaleString('en-GB', options)
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderTimelineCharts = () => {
    const {timelineDetails} = this.state
    if (timelineDetails === null) {
      return null
    }
    const key = Object.keys(timelineDetails)
    const {dates} = timelineDetails[key[0]]
    const datesArray = Object.keys(dates)

    const timelineDataArray = []

    datesArray.forEach(item => {
      timelineDataArray.push({
        date: item,
        confirmed: dates[item].total.confirmed,
        deceased: dates[item].total.deceased,
        recovered: dates[item].total.recovered,
        tested: dates[item].total.tested,
        active:
          dates[item].total.confirmed -
          (dates[item].total.deceased + dates[item].total.recovered),
      })
    })

    console.log(timelineDataArray)

    return (
      <div
        className="timeline-charts-parent-container"
        testid="lineChartsContainer"
      >
        <h1 className="daily-trends-heading">Daily Spread Trends</h1>
        <div className="timeline-charts-container confirmed-bg-color">
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#FF073A"
                dataKey="date"
                interval={10}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin-(dataMin+dataMax)/2', 'dataMax']}
                strokeWidth={2}
                stroke="#FF073A"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${item / 100000}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF073A"
                dot={{fill: '#FF073A'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container active-bg-color">
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#007BFF"
                dataKey="date"
                interval={10}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#007BFF"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${item / 100000}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${item / 1000}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                dot={{fill: '#007BFF'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container recovered-bg-color">
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#27A243"
                dataKey="date"
                interval={10}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#27A243"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${item / 100000}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${item / 1000}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#27A243"
                dot={{fill: '#27A243'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container deceased-bg-color">
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#6C757D"
                dataKey="date"
                interval={10}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#6C757D"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${item / 100000}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${item / 1000}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="deceased"
                stroke="#6C757D"
                dot={{fill: '#6C757D'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container tested-bg-color">
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#9673B9"
                dataKey="date"
                interval={10}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#9673B9"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${item / 100000}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${item / 1000}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tested"
                stroke="#9673B9"
                dot={{fill: '#9673B9'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="state-loader-container">
      <Loader type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {isLoading} = this.state

    return (
      <div className="state-specific-container">
        <Header />
        {isLoading && this.renderLoader()}
        {!isLoading && this.renderStateMetaDetails(id)}
        {!isLoading && this.renderStateStatistics()}
        {!isLoading && this.renderTopDistrictsData()}
        {!isLoading && (
          <div testid="timelineDataLoader">
            {this.renderLastTenDaysBarGraph()}
            {this.renderTimelineCharts()}
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default StateSpecificDetails
