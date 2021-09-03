import _ from 'lodash'
import {useEffect} from 'react'
import { useLocalStorage } from '../hooks'

interface Props {
    facts: any
}

export const Fact: React.FC<Props> = ({facts}) => {
    const [factCounter, setFactCounter] = useLocalStorage('factCount', -1)

    useEffect(() => setFactCounter(oldState => oldState >= facts.length ? 0 : oldState + 1), [])
    
    return (
        <div className='fact-container'>
            On this day: In {_.get(facts, `[${factCounter}].year`, '')}, {_.get(facts, `[${factCounter}].description`, '')}
        </div>
    )
}
