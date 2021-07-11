import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import LocationsSelector from './components/LocationsSelector.jsx'
import GymOccupancy from './components/GymOccupancy.jsx'
import Spinner from 'react-bootstrap/Spinner'

import { useState } from 'react'
import useGymDetails from './hooks'

import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const App =()=> {
  const location = useLocation()
  const [ showSelection, setShowSelection ] = useState(true)
  const [ selectedId, setSelected ] = useState(null)
  const [ isLoadingOccupancy, occupancy ] = useGymDetails('occupancy', selectedId)
  const [ isLoadingForecast, forecast ] = useGymDetails('forecast', selectedId)

  const onLocationSelect =(selectedId)=> {
    setSelected(selectedId)
    setShowSelection(false)
  }

  const args = queryString.parse(location.hash);
  console.log({args})

  return <>
    {isLoadingOccupancy && isLoadingForecast
    ?  <Spinner animation='grow' />
    :  <GymOccupancy {...{occupancy, forecast}} />}

    {showSelection
    ? <LocationsSelector onLocationSelect={onLocationSelect} />
    : <a className='changeLocation' href='#' onClick={(e) => setShowSelection(true)}>&raquo; change Gym</a>}
  </>
}

export default App