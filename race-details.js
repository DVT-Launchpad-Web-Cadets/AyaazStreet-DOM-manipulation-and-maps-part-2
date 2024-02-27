export default function showRaceDetails(data) {
  const raceDetailsElement = document.querySelector("#race-details");
  try {
    if (!raceDetailsElement) throw new Error("Race Details Element Not Found");
    if (!data) throw new Error("No Data Provided");
  } catch (error) {
    console.error(error);
    return;
  }
  let raceDetails = "";
  if (data?.trackName)
    raceDetails += `${data.trackName}: `;
  if (data?.driver)
    raceDetails += `${data.driver}'s `;
  if (data?.sessionName) 
    raceDetails += `${data.sessionName} on `;
  if (data?.date)
    raceDetails += `${data.date} `;
  if (data?.time)
    raceDetails += `${data.time}`;
	raceDetailsElement.innerHTML = raceDetails;
}
