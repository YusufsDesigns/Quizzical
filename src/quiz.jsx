import { useState } from 'react'
import './style.css'
import { nanoid } from 'nanoid'

export default function Quiz(props) {
    // const answers = props.answers
    const answerElements = props.answers.map(ans => {
        let id;
        if(props.checked){
            if(props.correct == ans){
                id = 'correct'
            } else if(props.selected == ans){
                id = 'in-correct'
            } else{
                id = 'not-selected'
            }
        }
        return(
            <button 
                key={nanoid()}
                id={id} 
                className={props.selected == ans ? 'ans-btn selected' : 'ans-btn'} 
                onClick={() => {props.handleClick(props.id, ans)}}>{ans}
            </button>
        ) 
    })       
    return(
        <div className="quiz">
                <h3>{props.question}</h3>
                <div className="ans-con">
                    {answerElements}
                </div>
        </div>
    )
}
