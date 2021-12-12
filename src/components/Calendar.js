import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import { addMinutes, parseISO } from 'date-fns';

const getData = (setData) => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => {
        setData(data)
    })
    .catch(error => console.error(error))
}

const changeData = appointment => ({
    id: appointment.id,
    startDate: appointment.date,
    endDate: addMinutes(parseISO(appointment.date), appointment.duration),
    title: appointment.activity + " / " + (appointment.customer.firstname + " " + appointment.customer.lastname)
})

const initialState = {
    data: [],
    loading: false,
    currentDate: new Date(),
    currentViewName: 'Week',
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'setData':
            return { ...state, data: action.payload.map(changeData) };
        default:
            return state;
    }
}

export default function Calendar() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {data, currentDate} = state;
    const setData = React.useCallback(nextData => dispatch({
        type: 'setData', payload: nextData,
    }), [dispatch]);

    React.useEffect(() => {
        getData(setData)
    }, [setData]);

    return (
        <div style={{ backgroundColor:'white', paddingTop:'30px', height:'100%' }}>
            <Paper onLoad={changeData}>
                <Scheduler data={data}>
                    <ViewState
                            defaultCurrentDate={currentDate}
                            defaultCurrentViewName="Week"
                    />
                    <DayView
                        cellDuration={60}
                    />
                    <WeekView
                        cellDuration={60}
                    />
                    <MonthView />
                    <Toolbar />
                    <TodayButton />
                    <DateNavigator />
                    <ViewSwitcher />
                    <Appointments />
                    <CurrentTimeIndicator />
                </Scheduler>
            </Paper>
        </div>
    )
};
