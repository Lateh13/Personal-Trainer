import _ from "lodash";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";


export default function Statistics() {
    const [trainings, setTrainings] = React.useState([]);
    React.useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => console.error(error))
    }

    const data = _(trainings)
                    .groupBy(e => e.activity)
                    .map((value, key) => ({
                        name: key, 
                        pv: _.sumBy(value, 'duration')}))
                        .value()

    return(
        <div style={{ backgroundColor: 'white', height:'100%', width:'98.65%', padding:'10px' }}>
            <BarChart
                width={1480}
                height={700}
                data={data}
                margin={{
                    top: 70,
                    right: 50,
                    left: 20,
                    bottom: 30,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value:"Duration (min)", angle: -90, position: "insideLeft" }}/>
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
        </div>
    )
}