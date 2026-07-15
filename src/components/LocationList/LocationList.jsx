import useFetch from "../../hooks/useFetch"

function LocationList() {
    const {data, isLoading} = useFetch("http://localhost:5000/hotels", "")

    if(isLoading)return <p>Loading...</p>

    return (
    <div className="nearbyLocation">
        <h2>Nearby Locations</h2>
        <div className="locationList">
            <p>this is out list</p>
        </div>
    </div>
  )
}

export default LocationList