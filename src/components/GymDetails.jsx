import './GymDetails.css'

import Badge from 'react-bootstrap/Badge'

const GymDetails =({ place, type, forecast })=> {
	return <>
		<p className='gymName'>{place}</p>
		<p className='gymType'>{type}</p>
		<div className='forecast'>
		{(forecast?.intervals||[]).map(({ name, percentageUsed, status }) => (
			<div key={name} className={`timeGroup ${status}`}>
				<div className='free' style={{ height: `${100 - percentageUsed}%` }}>
					{parseInt(percentageUsed) || 0}%
				</div>
				<div className='busy' style={{ height: `${percentageUsed}%` }}></div>
				<Badge pill variant="secondary">{name}</Badge>
			</div>
		))}
		</div>
	</>
}

export default GymDetails