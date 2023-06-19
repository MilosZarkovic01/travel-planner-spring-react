import React from 'react'
import '../App.css'
import { Button } from './Button'
import './IntroSection.css'


function IntroSection() {
    return (
        <div className='intro-container'>
            <h1>ADVENTURE AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className='intro-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    GET STARTED
                </Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                    NOW
                </Button>
            </div>
        </div>
    )
}

export default IntroSection