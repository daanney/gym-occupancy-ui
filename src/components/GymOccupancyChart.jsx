import { PieChart } from 'react-minimal-pie-chart'
import './GymOccupancyChart.css'

const stageColors = {
	good: '#02ac11',
	warning: '#000',
	danger: '#850000',
	estimation: '#7a7a7a'
}

const GymOccupancyChart =({ current, max, estimated })=> {
	const cap20p = max / 5    // 20% capacity
	const cap80p = cap20p * 4 // 80% capacity

	let color = stageColors.warning
	if(current <= cap20p)      color = stageColors.good
	else if(current >= cap80p) color = stageColors.danger
	
	// current === estimated
	let values = [{ value: current, color }]
	if(current > estimated) {
		values = [
			{ value: estimated, color: stageColors.estimation },
			{ value: current - estimated, color: stageColors.danger }
		]
	}else if(current < estimated) {
		const currentDelta = estimated - current
		values = [
			{ value: estimated - currentDelta, color: stageColors.good },
			{ value: currentDelta, color: stageColors.estimation }
		]
	}
  
	return <div id='OccupancyChart'>
		<PieChart
			data={values}
			totalValue={max}
			lineWidth={25}
			startAngle={-90}
			label={({dataIndex}) => dataIndex === 0 && `${current}/${max}`}
			labelStyle={{
				fontSize: '22px',
				fontFamily: 'sans-serif',
				fill: color,
			}}
			labelPosition={0}
		/>
	</div>
}

export default GymOccupancyChart