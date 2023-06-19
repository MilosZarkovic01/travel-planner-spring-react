import React from 'react'
import { Link } from 'react-router-dom'


function CardItem(props) {
    const description = props.description;
    const firstSentence = description.split('. ')[0];

    return (
        <>
            <li className='cards__item'>
                <Link className='cards__item__link' to={props.path} state={props}>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__header'>{props.country}</h5>
                        <h5 className='cards__item__header'>{props.city}</h5>
                    </div>
                    <figure className='cards__item__pic-wrap' data-category={props.name}>
                        <img
                            className='cards__item__img'
                            alt='Travel'
                            src={require(`../images/card${props.destinationID}.jpg`)}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{firstSentence}.</h5>

                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;