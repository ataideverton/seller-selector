import React, { useState, FC } from 'react'

interface Props {
  onSimulateShipping: (a: string) => void
}

const SimulateShipping: FC<Props> = props => {
  const [postalCode, setPostalCode] = useState('')

  return (
    <div>
      <label htmlFor="postalcode">Postal Code</label>
      <input
        type="text"
        placeholder="Postal Code"
        onChange={(e: any) => {
          setPostalCode(e.target.value)
        }}
        value={postalCode}
        name="postalcode"
        id="postalcode"
      ></input>
      <input
        type="submit"
        onClick={() => props.onSimulateShipping(postalCode)}
        value="Buscar"
      />
    </div>
  )
}

export default SimulateShipping
