import { useState } from 'react'

function Mike() {
    const [count, setCount] = useState(33)

    return (
        <>
            <div className='mikey'>Hello</div>
            <button onClick={() => setCount(55)}>
                count is {count}
            </button>
        </>
    )
}

export default Mike
