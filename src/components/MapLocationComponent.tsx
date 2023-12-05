import {MapLocation} from "@/classes/map-location";

export function MapLocationComponent(location: MapLocation) {
  return <div key={location.id}>
    <p>{location.name}</p>
    <a href={location.googleMapsUrl}>{location.address}</a>
  </div>
}