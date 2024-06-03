import './styles.css';
import Header from '../../components/Header';
import Dices from '../../components/Dices';
import RegisterButton from '../../components/RegisterButton'
import D20 from '../../assets/images/d20.png';
import D100 from '../../assets/images/d100.png';
import D12 from '../../assets/images/d12.png';
import D6 from '../../assets/images/d6.png';
import D4 from '../../assets/images/d4.png';
import D8 from '../../assets/images/d8.png';



function MainPage() {

  return (
    <div className="lepo">
      <Header />

      
      <div className="align_div">

        <div className='dice_div'>
          <Dices image={D4} height={40}/>
          <Dices image={D100} height={50}/>
          <Dices image={D12} height={130}/>

          <Dices image={D20} height={110}/>
          <Dices image={D8} height={80}/>
        </div>


        <div className="entry_div">
            <span><u>CalendaRPG</u></span>
            <div className="description">
            

                CalendaRPG is your gateway to epic RPG adventures, seamlessly blending scheduling with storytelling. Dive into fantasy realms, organize game sessions, and craft unforgettable tales with ease. Join us and embark on a journey where every day is a new chapter in your epic saga
             
             
                <h3>Would you like to join us in this adventure?</h3>
                <RegisterButton />
            
            </div>
        </div>
        <div className='dice_div'>
          <Dices image={D4} height={140}/>

          <Dices image={D100} height={100} />

          <Dices image={D12} height={80} />
          <Dices image={D8} height={30} />

          <Dices image={D6} height={50}/>
        </div>
        

      </div>
    </div>
  );
}

export default MainPage;
