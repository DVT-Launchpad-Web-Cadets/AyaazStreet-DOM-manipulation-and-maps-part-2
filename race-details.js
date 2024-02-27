export default function showRaceDetails(data) {
  if (!(data?.trackName && data.driver && data.sessionName && data.date && data.time))
    console.error("Race details could not be fetched");
  else
	  document.querySelector("#race-details").innerHTML = `${data.trackName}: ${data.driver}'s ${data.sessionName} on ${data.date} ${data.time}`;
}
