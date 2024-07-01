import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';

const CreateSession = ({ userId }) => {
  const [campaign_id, setCampaign_id] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_campaigns_user', {
            params: { dm_id: userId }
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const submitCreateSession = async () => {
    try {
      await axios.post('http://localhost:5000/create_session', {
        date: date,
        description: description,
        campaign_id: campaign_id
      });
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  return (
    <div id='create_session_conteiner'>
      <h1>Create session</h1>
      <label>Campaign:</label>
      <select 
        name="campaigns" 
        id="campaigns" 
        value={campaign_id} 
        onChange={(ev) => setCampaign_id(ev.target.value)}
        
      >
        {campaigns.map((campaign, i) => (
          <option key={i} value={campaign.id}>{campaign.name}</option>
        ))}
      </select>
      <br />
      <label>Description:</label>
      <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      <br />
      <label>Date:</label>
      <input type="date" value={date} onChange={(ev) => setDate(ev.target.value)} />
      <br />
      <button onClick={submitCreateSession}>Create</button>
    </div>
  );
};

export default CreateSession;