import React, { Component } from 'react';
import './Game.css'
import triangle from '../../Images/triangle.png'
import circle from '../../Images/circle.png'
import xShape from '../../Images/x.png'
import square from '../../Images/square.png'


export default class HowToPlay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameTimer: 45,
            leftColor: { background: '#7CA5B8' },
            // leftColor: { background: '#6add19' },
            rightColor: { background: '#E5E7E6' },
            leftShape: xShape,
            rightShape: circle,
            whiteCircle: { top: '4px', left: '586px' },
            blackCircle: { top: '222px', left: '222px' },
        }
        this.stop = false
        this.timerIDs = [0]

        this.decreaseGameTimer = this.decreaseGameTimer.bind(this)
        this.moveWhiteCircle = this.moveWhiteCircle.bind(this)
        this.moveBlackCircle = this.moveBlackCircle.bind(this)
        // this.moveWhiteCircle.stopTimer = this.moveWhiteCircle.stopTimer.bind(this)
    }

    componentDidMount() {
        this.gameTimerID = window.setInterval(this.decreaseGameTimer, 1000)
        // this.moveWhiteCircle()
        // this.moveBlackCircle()
    }

    decreaseGameTimer() {
        this.setState({ gameTimer: this.state.gameTimer - 1 })
    }

    moveWhiteCircle() {
        var { stop, timerIDs, moveWhiteCircle } = this
        if (stop) {
            for (let i = 0; i < timerIDs.length; i++) {
                clearTimeout(moveWhiteCircle, timerIDs[i])
            }
        }
        else {
            this.setState({ whiteCircle: {top: `${Math.floor(Math.random() * 423 + 4)}px`, left: `${Math.floor(Math.random() * 583 + 4)}px` }})
            let id = setTimeout(moveWhiteCircle, Math.random() * 1000 + 300)
            timerIDs.push(id)
        }
        return {
            stopTimer() {
                stop = true
            }
        }
    }

    moveBlackCircle() {
        var { stop, timerIDs, moveBlackCircle} = this
        if (stop) {
            for (let i = 0; i < timerIDs.length; i++) {
                clearTimeout(moveBlackCircle, timerIDs[i])
            }
        }
        else {
            this.setState({ blackCircle: {top: `${Math.floor(Math.random() * 423 + 4)}px`, left: `${Math.floor(Math.random() * 583 + 4)}px` }})
            let id = setTimeout(moveBlackCircle, Math.random() * 1000 + 300)
            timerIDs.push(id)
        }
        return {
            stopTimer() {
                stop = true
            }
        }
    }

    render() {
        const { gameTimer, leftColor, rightColor, leftShape, rightShape, whiteCircle, blackCircle } = this.state
        const { correct, incorrect } = this.props

        return (
            <div className='game'>
                <section className='shapeShift'>
                    <div className='gameCountDown'>{/*{gameTimer}*/}45</div>
                    <div className='circle' id='whiteCircle' style={whiteCircle}></div>
                    <div className='circle' id='blackCircle' style={blackCircle}></div>

                    <div className='gameButtons' id='colorButton' onClick={() => this.setState({ leftShape: square })}>Color</div>
                    <div className='gameButtons' id='shapeButton' onClick={() => this.moveWhiteCircle.stopTimer()}>Shape</div>
                    <div className='gameButtons' id='circleButton'>Circle</div>

                    <div className='colorDiv' id='leftColor' style={leftColor}>
                        <div className='shapeContainer' id='leftShape'>
                            <img className='openShapes' src={leftShape} alt="openTriangle" />
                        </div>
                    </div>
                    <div className='colorDiv' id='rightColor' style={rightColor}>
                        <div className='shapeContainer' id='rightShape'>
                            <img className='openShapes' src={rightShape} alt="openCircle" />
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}