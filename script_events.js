//List of teams in "events" and make a list of all teams => [teamName_teamId]
const getTeamsNames = (events) => {
  let teams = new Set();
  for(let event of events){
    teams.add(`${event.home}_${event.idHome}`);
  }
  return [...teams].sort((a,b) => a > b ? 1: -1);
}
//Get the list of the events for a specific team => [{adversary, date}]
const getEventsByTeam = (team, events) => {
  let teamEvents = [];
  for(let event of events) {
    if(event.home === team){
      teamEvents.push({"adversary": event.away, "date": event.date});
    }
    else if(event.away === team){
      teamEvents.push({"adversary": event.home, "date":event.date});
    }
  }
  return teamEvents;
}
//Sort all the events by teams => [{name, id, events: [], details: []}]
async function sortEventsByTeams(events) {
  let eventsByTeams = [];
  const teamsNames = getTeamsNames(events);
  for(let team of teamsNames){
    const details = await getTeamDetails(team.split("_")[1]);
    eventsByTeams.push({"name": team.split("_")[0], "id": team.split("_")[1], "events": getEventsByTeam(team.split("_")[0], events), "details": details})
  }
  return eventsByTeams;
}
//Make an API call to get details of the specific team with it Id => {logo, site, stadium, facebook, twitter}
async function getTeamDetails(teamId){
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`);
  const teamDetails = await response.json();
  const details = {"name": teamDetails.teams[0].strTeam, "logo": teamDetails.teams[0].strTeamLogo, "site": teamDetails.teams[0].strWebsite, "stadium": teamDetails.teams[0].strStadiumThumb, "facebook": teamDetails.teams[0].strFacebook, "twitter": teamDetails.teams[0].strTwitter};
  return details;
}
//Make an API call to get the 100 past events => [{home, away, date, idHome}]
async function getEventsFromApi(url) {
  const response = await fetch(url);
  const eventsResponse = await response.json();
  let events = []
  for (let event of eventsResponse.events) {
      events.push({"home": event.strHomeTeam, "away": event.strAwayTeam, "date": event.dateEvent, "idHome": event.idHomeTeam});
  }
  return sortEventsByTeams(events);
}
//Create a HTML Element to display to the page => HTMLElement
const createSportTableHTML = (team) => {
  let teamDiv = document.createElement("div");
  let divBanner = document.createElement("div");
  divBanner.setAttribute("class", "team-banner");
  //let divBannerHTML = `<img src="${team.details.logo}" class="teamLogo" /><div class="banner-info"><span class="team-name">${team.name}</span>`;
  //divBannerHTML += '<span class="social">';
  //team.details.facebook !== "" ? divBannerHTML += `<a href="http://${team.details.facebook}" target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>` : "";
  //team.details.twitter !== "" ? divBannerHTML += `<a href="http://${team.details.twitter}" target="_blank"><i class="fab fa-twitter-square fa-2x"></i></a>` : "";
  //divBannerHTML += "</span></div>";
  //divBanner.innerHTML = divBannerHTML;

  let tableHTML = document.createElement("table");
  tableHTML.setAttribute("class", "events-table");
  tableHTML.setAttribute("id", team.id);
  
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let headingRow = document.createElement("tr");
  headingRow.innerHTML =
    "<th>Adversary</th><th>Date of event</th><th>buy ticket</th>";
  thead.appendChild(headingRow);

  for (let event of team.events) {
    let row = document.createElement("tr");
    row.innerHTML = `<td class="adversary">${event.adversary}</td>
    <td class="date">${new Date(event.date).toLocaleDateString()}</td>
    <td><a class="ticket" id="${team.name}-${
      event.adversary
    }" href="#"><i class="fas fa-ticket-alt"></i
    ></a></td>`;
    tbody.appendChild(row);
  }
  teamDiv.appendChild(divBanner);
  tableHTML.appendChild(thead);
  tableHTML.appendChild(tbody);
  teamDiv.appendChild(tableHTML);
  return teamDiv;
};

const createElementBanner = (elt, details) => {
  let divBannerHTML = `<img src="${details.logo}" class="teamLogo" /><div class="banner-info"><span class="team-name">${details.name}</span>`;
  divBannerHTML += '<span class="social">';
  details.facebook !== "" ? divBannerHTML += `<a href="http://${details.facebook}" target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>` : "";
  details.twitter !== "" ? divBannerHTML += `<a href="http://${details.twitter}" target="_blank"><i class="fab fa-twitter-square fa-2x"></i></a>` : "";
  divBannerHTML += "</span></div>";
  
  elt.innerHTML = divBannerHTML;
  return elt;
}

async function checkHTMLScrollPosition(elt) {
  const screenHeight = window.innerHeight;
  const eltTopPosition = elt.getBoundingClientRect().top;
  
    if(elt.getElementsByClassName("team-banner")[0].innerHTML === ""){
      const eltId = elt.getElementsByTagName("table")[0].getAttribute("id");
      const details = await getTeamDetails(eltId);
      elt.insertBefore(createElementBanner(elt.getElementsByClassName("team-banner")[0], details), elt.getElementsByTagName("table")[0]);
    }
}

//Display the HTMLElement for each team, and configure other properties => DOM Manipulation 
async function displayEventsOnPage() {
  const url = "https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4380&s=2021-2022";
  const events = await getEventsFromApi(url);

  document.getElementById("events").removeChild(document.getElementById("events-message"));

  for(let teamEvents of events){
    document.getElementById("events").appendChild(createSportTableHTML(teamEvents));
  }
  const elts = document.getElementById("events").children;
  for(let elt of elts){
    if(elt.getBoundingClientRect().top < window.innerHeight && elt.getBoundingClientRect().top > 0){
      checkHTMLScrollPosition(elt);
    }
  }

  const ticketLinks = document.getElementsByClassName("ticket");
  for (let ticket of ticketLinks) {
    ticket.addEventListener("click", (event) => {
      event.preventDefault();

      const team = event.target.closest("table").getElementsByTagName("caption")[0].innerHTML;
      const parent = event.target.closest("tr");
      const adversary = parent.getElementsByClassName("adversary")[0].innerHTML;
      const date = parent.getElementsByClassName("date")[0].innerHTML;

      document.getElementById("ticket-message").classList.add("hidden");
      
      document.getElementById("ticket").classList.remove("hidden");
      document.getElementById("ticket-page").classList.remove("hidden");

      document.getElementById("event-team").innerHTML = team;
      document.getElementById("event-adversary").innerHTML = adversary;
      document.getElementById("event-date").innerHTML = date;
    });
  }

  document.getElementById("cancel-icon").addEventListener("click", (event) => {
    event.preventDefault();
    for(let elt of document.getElementsByClassName("ticket-input")){
      elt.getElementsByTagName('input')[0].value = "";
    }
    const ticketDiv = document.getElementById("ticket");
    ticketDiv.classList.add("hidden");
  });
  
  document.getElementById("ticket-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const ticketPage = document.getElementById("ticket-page");
    ticketPage.classList.add("hidden");
    const ticketMessage = document.getElementById("ticket-message");
    ticketMessage.classList.remove("hidden");
    setTimeout(() => {
      const ticketDiv = document.getElementById("ticket");
      ticketDiv.classList.add("hidden");
    },3000);
  });
}


window.addEventListener("scroll", () => {
  const elts = document.getElementById("events").children;
  for(let elt of elts){
    if(elt.getBoundingClientRect().top < window.innerHeight && elt.getBoundingClientRect().top > 0){
      checkHTMLScrollPosition(elt);
    }
  }
})
//Call to the main function of the script
displayEventsOnPage()