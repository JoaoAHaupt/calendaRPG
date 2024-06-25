import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [campaigns, setCampaigns] = useState([]);
  const [sessions, setSessions] = useState([]);
  const userId = 1

 /*useEffect(() => {
    axios.get('http://localhost:5000/hello')
      .then(response => {
        const data = response.data;

        const userCampaigns = data.userCampaings.filter(uc => uc.idUser === userId);
        const userCampaignIds = userCampaigns.map(uc => uc.idCampaing);
        const userEvents = data.campaigns
          .filter(campaign => userCampaignIds.includes(campaign.id))
          .flatMap(campaign => campaign.events);
        
        setSessions(userEvents) ;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const formattedMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const startDay = new Date(year, currentDate.getMonth(), 1).getDay();

  const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const days = [...Array(startDay).fill(null), ...daysOfMonth];

  const weeks = [];
  let week = [];
  days.forEach((day, index) => {
    if (index > 0 && index % 7 === 0) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });
  weeks.push(week);

  return (
    <div className="calendar-container">
      <div className='calendar'>
        <header className='header_calendar'>
          <button className='button_calendar' onClick={handlePreviousMonth}>↢</button>
          <div style={{ minWidth: '20rem' }}>
            <h1>{formattedMonth}</h1>
            <h2>{year}</h2>
          </div>
          <button className='button_calendar' onClick={handleNextMonth}>↣</button>
        </header>
        <table className='calendar-content'>
          <thead>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const cellDate = new Date(year, currentDate.getMonth(), day);
                  const cellDateString = cellDate.toISOString().split('T')[0];

                  const isSessionDay = sessions.some(session => session.date === cellDateString);

                  return (
                    <td
                      key={dayIndex}
                      style={{
                        backgroundColor: isSessionDay ? '#b8860b' : (cellDateString === new Date().toISOString().split('T')[0] ? '#b8860b' : '#5700b353')
                      }}
                    >
                      {day}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
