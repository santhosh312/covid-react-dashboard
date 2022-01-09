import {MdSort} from 'react-icons/md'

import './index.css'

const StateWiseDataTable = props => {
  const {stateWiseData, sortList} = props

  const onClickAscSort = () => {
    sortList(1)
  }

  const onClickDescSort = () => {
    sortList(-1)
  }

  return (
    <div
      className="state-wise-data-table-container"
      testid="stateWiseCovidDataTable"
    >
      <ul className="table-container">
        <li className="table-header">
          <div className="state-ut-sort-container">
            <p className="states-ut-text">States/UT</p>
            <button
              testid="ascendingSort"
              onClick={onClickAscSort}
              className="sort-button"
              type="button"
            >
              <MdSort className="sort-icon flip" />
            </button>
            <button
              testid="descendingSort"
              onClick={onClickDescSort}
              className="sort-button"
              type="button"
            >
              <MdSort className="sort-icon" />
            </button>
          </div>
          <div className="table-header-title">
            <p>Confirmed</p>
          </div>
          <div className="table-header-title">
            <p>Active</p>
          </div>
          <div className="table-header-title">
            <p>Recovered</p>
          </div>
          <div className="table-header-title">
            <p>Deceased</p>
          </div>
          <div className="table-header-title">
            <p>Population</p>
          </div>
        </li>
        {stateWiseData.map(item => (
          <li key={item.stateCode} className="table-row">
            <div className="state-name">
              <p>{item.name}</p>
            </div>
            <div className="confirmed-cases-number confirmed-color">
              <p>{item.confirmed}</p>
            </div>
            <div className="confirmed-cases-number active-color">
              <p>{item.active}</p>
            </div>
            <div className="confirmed-cases-number recovered-color">
              <p>{item.recovered}</p>
            </div>
            <div className="confirmed-cases-number deceased-color">
              <p>{item.deceased}</p>
            </div>
            <div className="confirmed-cases-number population-color">
              <p>{item.population}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StateWiseDataTable
