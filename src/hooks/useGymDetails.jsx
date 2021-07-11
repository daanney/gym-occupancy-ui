import { useState, useEffect } from 'react'
import axios from 'axios'

const endpoints = ['occupancy', 'forecast']

const REQ_STATUS = { 
	currentLocationId: false,
	isLoading: false,
	isLoaded: false,
	gymData: null,
	error: null
}

const useGymDetails =(type, locationId)=> {
	const [ details, setDetails ] = useState(REQ_STATUS)
	const { currentLocationId, isLoading, isLoaded, gymData } = details

	let shouldLoad = false
	if(locationId == null)
		shouldLoad = false
	else if(currentLocationId != locationId || (!isLoaded && !isLoading))
		shouldLoad = true

	useEffect(() => {
		if(shouldLoad) {
			setDetails({ ...REQ_STATUS, isLoading: true })

			axios.get(`/${type}/${locationId}`).then(resp => {
				const { status } = resp.request
				if(status === 200) {
					setDetails({ ...details, gymData: resp.data, isLoaded: true, isLoading: false, currentLocationId: locationId})
					return
				}
				// TODO: retry?
				const error = `Response has unexpected status code`
				setDetails({ ...details, isLoading: false, isLoaded: true, gymData: null, currentLocationId: locationId, error })
			}).catch(error => setDetails({ ...details, isLoading: false, isLoaded: true, currentLocationId: locationId, gymData: null, error: error.message }))
		}
	}, [locationId, shouldLoad, type])

	console.log(details)
	console.log('%cLoading Location done', 'color: green')
	return [ isLoading, gymData ]
}

export default useGymDetails