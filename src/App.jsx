
import './App.css'
import { useEffect, useState, useRef } from 'react'
import useFetch from './hooks/useFetch'
import InfoLocation from './components/infoLocation'
import CardResident from './components/CardResident'


function App() {

  const [locationId, setLocationId] = useState(Math.floor(Math.random() * 126) + 1)

  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [location, getLocation, isLoading, hasError] = useFetch(url)


  useEffect(() => {
    getLocation()
  }, [locationId])

  const inputLocation = useRef()

  const handleLocation = e => {
    e.preventDefault()
    setLocationId(inputLocation.current.value.trim())
  }

  return (
    <div className='app'>
      <div className='app__banner'>
        <img className= 'app__img'src="banner.jpg" alt="" />
        <h1 className='app__title'>APP</h1>
      </div>
      <div className='app__formp'>
      <form className='app__form' onSubmit={handleLocation}>
        <input className='app__input'ref={inputLocation} type="text" />
        <button className='app__btn'>Search</button>
      </form>
      </div>
      {
        isLoading
        ? <h2>loading...</h2>
        :(
        hasError || locationId === '0'
          ? <h2>Hey! 1 to 126</h2>
          : (
            <>
              <InfoLocation location={location} />
              <div className='app__card-container'>
                {
                  location?.residents.map(url => (
                    <CardResident
                      key={url}
                      url={url}
                    />
          ))
        }
              </div>
            </>
          )
        )
      }
    </div>
  )
}




export default App
