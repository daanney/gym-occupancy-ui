import GymOccupancyChart from './GymOccupancyChart'
import GymDetails from './GymDetails'

import './GymOccupancy.css'

const GymOccupancy =({ occupancy, forecast })=> {
	if(null == occupancy) return <></>

	const current = (forecast?.intervals || []).filter(group => group.status === 'current')[0] || {}

	const occupiedStats = { 
		current: occupancy?.current, 
		max: occupancy?.max_capacity,
		// remote only supplies pct used ...
		estimated: occupancy?.max_capacity / 100 * current.percentageUsed
	}

	return <div id='GymOccupancy'>
		<div className='occupancyChart'>
			<GymOccupancyChart {... occupiedStats} />
		</div>
		<div className='gymDetails'>
			<GymDetails place={occupancy?.place} type={occupancy?.type} forecast={forecast} />
		</div>
	</div>
}

export default GymOccupancy