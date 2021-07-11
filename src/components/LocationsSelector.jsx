import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LOCATIONS_DATA from './locations.static'

import Badge from 'react-bootstrap/Badge'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const initialState = {
  isLoaded: false,
  loading: false,
  data: [],
  selected: null,
  error: null
}

const LocationsSelector =({ onLocationSelect })=> {
  const [ locations, setLocations ] = useState(initialState)
  const { isLoaded, loading, data, selected } = locations

  useEffect(() => {
    if(!isLoaded && !loading) {
      setLocations({ ...initialState, loading: true })

      const failoverLocations =(error)=> {
        console.error(error.message)
        setLocations({ ...initialState, data: LOCATIONS_DATA, isLoaded: true, error: error.message })
      }

      axios.get('/locations').then(resp => {
        const { status } = resp.request
        if(status === 200) {
          setLocations({ ...initialState, data: resp.data, isLoaded: true })
          return
        }
        failoverLocations({message: `Backend status unexpected [status=${status}]`})
      }).catch(failoverLocations)
    }
  }, [isLoaded, loading])
  
  if(loading) return <div>please wait ...</div>
  
  return <DropdownButton title='Select Location' variant='success' style={{ marginTop: '100px'}}>
    {data.map(({id, type, place}) => (
      <Dropdown.Item key={id} data-id={id} onSelect={() => onLocationSelect(id)}>
        {place} <Badge pill variant="secondary">{type}</Badge>
      </Dropdown.Item>
    ))}
  </DropdownButton>
}

export default LocationsSelector
