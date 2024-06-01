import React from 'react';

export const Dices = ({ image, height }) => {
    let speed;
    let blur_value;
    let area = Math.floor(Math.random() * 700);

    if (height <= 50) {
        blur_value = height / 30;
        speed = 2;
    } else if (height <= 100) {
        blur_value = height / 100;
        speed = 1.5;
    }else if (height <= 130) {
            blur_value = height / 150;
            speed = 1.25;
    } else{
        blur_value = height / 250;
        speed = 1;
    }
    
    return (
        <div className={`dice-${height}-area`}>
            <img
                
                className={`dice-${height}`}
                src={image}
                alt="dice img"
                height={height}
            />
            <style>
                {`
                    .dice-${height} {
                        animation: moveUpDown ${speed}s infinite alternate ease-in-out;
                        filter: blur(${blur_value}px);

                    }

                    @keyframes moveUpDown {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-10px);
                            
                        }
                    }

                    .dice-${height}-area{
                        display:flex;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height:${area}px;
                    }
                `}
            </style>
        </div>
    );
}

export default Dices;
