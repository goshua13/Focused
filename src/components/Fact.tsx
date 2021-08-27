import _ from 'lodash'
import {useEffect} from 'react'
import { useLocalStorage } from '../hooks'

interface Props {
    facts: any
}

export const Fact: React.FC<Props> = ({facts}) => {
    const [factCounter, setFactCounter] = useLocalStorage('factCount', -1)

    useEffect(() => setFactCounter(oldState => oldState === facts.length - 1 ? oldState : oldState + 1), [])
    return (
        <div className='fact-container'>
            On this day: {_.get(facts, `[${factCounter}].description`, '')}
        </div>
    )
}
