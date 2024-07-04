import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

const CreateCampaing = ({dm_id}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [hexcolor, setHexcolor] = useState('#ffffff'); 

    const handleClickCampaign = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create_campaign', {
                name,
                description,
                hexcolor,
                dm_id
            });
            console.log('Campaign created:', response.data); 
            
        } catch (error) {
            console.error('Failed to create campaign:', error);
        }
    }


    return (
        <div id='create_campaign_conteiner'>
            <h1>Create campaign</h1>
            <label>Name:</label>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
            <br />
            <label>Description:</label>
            <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)} />
            <br />
            <label>Hex Color:</label>
            <input type="text" value={hexcolor} onChange={(ev) => setHexcolor(ev.target.value)} />
            <br />
            <button onClick={handleClickCampaign}>Create</button>
        </div>
    );
};

export default CreateCampaing;
