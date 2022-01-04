import React from 'react'

function DrumGrid(props) {
    const colorSquares = (e) => {
        const [instrument, beat] = e.target.id.split(',')
        let filledCopy = {...props.filledSquares}
        let currentBeats = props.filledSquares[instrument].split('') // deconstruct beats into array
        currentBeats[beat] = (Number(currentBeats[beat]) ^ 1).toString() // flip appropriate bit
        filledCopy[instrument] = currentBeats.join('') // collapse new array
        props.setFilled(filledCopy)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>1.1</th>
                        <th>1.2</th>
                        <th>1.3</th>
                        <th>1.4</th>
                        <th>2.1</th>
                        <th>2.2</th>
                        <th>2.3</th>
                        <th>2.4</th>
                        <th>3.1</th>
                        <th>3.2</th>
                        <th>3.3</th>
                        <th>3.4</th>
                        <th>4.1</th>
                        <th>4.2</th>
                        <th>4.3</th>
                        <th>4.4</th>
                    </tr>
                </thead>
                <tbody>
                {Object.entries(props.filledSquares).map(([instrument, str], i) => {
                    return (
                        <tr key={i}>
                            <td>{instrument}</td>
                            {str.split('').map((val, j) =>
                                <td
                                    onClick = {colorSquares}
                                    id = {instrument.concat(',').concat(j.toString())}
                                    className = {val==='1' ? 'filled': 'empty'}
                                >
                                </td>
                            )}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default DrumGrid;