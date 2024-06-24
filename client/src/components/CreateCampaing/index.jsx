import React, { useState } from 'react';
import './styles.css';


const CreateCampaing = () => {


    return (
        <div id='create_campaing_conteiner'>
         
           <h1>Create campaing</h1>
           Name<input type="text" />
           Description
           <input type="text" />
           Hex Color
           <input type="color" />
           <button>Create</button>


           
        </div>
    );
};

export default CreateCampaing;
