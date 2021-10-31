const getTeamsNames = (events) => {
  let teams = new Set();
  for(let event of events){
    teams.add(event.home);
  }
  return [...teams].sort((a,b) => a > b ? 1: -1);
}

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

const sortEventsByTeams = (events) => {
  let eventsByTeams = [];
  const teamsNames = getTeamsNames(events);
  for(let team of teamsNames){
    eventsByTeams.push({"name": team, "events": getEventsByTeam(team, events)})
  }
  return eventsByTeams;
}

async function getEventsFromApi(url) {
  const response = await fetch(url);
  const eventsResponse = await response.json();
  let events = []
  for (let event of eventsResponse.events) {
      events.push({"home": event.strHomeTeam, "away": event.strAwayTeam, "date": event.dateEvent});
  }
  return sortEventsByTeams(events);
}

const createSportTableHTML = (team) => {
  let tableHTML = document.createElement("table");
  tableHTML.setAttribute("class", "events-table");
  tableHTML.setAttribute("id", team.name.replace(" ", "-").toLowerCase());
  let tableCaption = document.createElement("caption");
  tableCaption.innerHTML = `${team.name}`;
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
  tableHTML.appendChild(tableCaption);
  tableHTML.appendChild(thead);
  tableHTML.appendChild(tbody);
  return tableHTML;
};

async function displayEventsOnPage() {
  const url = "https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4380&s=2021-2022";
  const events = await getEventsFromApi(url);

  document.getElementById("events").removeChild(document.getElementById("events-message"));

  for(let teamEvents of events){
    document.getElementById("events").appendChild(createSportTableHTML(teamEvents));
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

displayEventsOnPage()