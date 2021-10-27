const eventsList = [
  {
    sport: "running",
    date: "02/19/2022",
    host: "ultrices",
    opponent: "China"
  },
  {
    sport: "javelin",
    date: "10/23/2022",
    host: "sociis",
    opponent: "Czech Republic"
  },
  {
    sport: "running",
    date: "03/22/2022",
    host: "quam",
    opponent: "China"
  },
  {
    sport: "running",
    date: "01/20/2022",
    host: "blandit",
    opponent: "Philippines"
  },
  {
    sport: "discus throw",
    date: "05/25/2022",
    host: "ultrices",
    opponent: "Macedonia"
  },
  {
    sport: "discus throw",
    date: "06/20/2022",
    host: "consequat",
    opponent: "United States"
  },
  {
    sport: "javelin",
    date: "02/14/2022",
    host: "laoreet",
    opponent: "Nigeria"
  },
  {
    sport: "running",
    date: "06/17/2022",
    host: "cursus",
    opponent: "Argentina"
  },
  {
    sport: "discus throw",
    date: "01/19/2022",
    host: "vivamus",
    opponent: "China"
  },
  {
    sport: "running",
    date: "02/28/2022",
    host: "accumsan",
    opponent: "Philippines"
  },
  {
    sport: "pentathlon",
    date: "06/08/2022",
    host: "ultrices",
    opponent: "Indonesia"
  },
  {
    sport: "archery",
    date: "08/27/2022",
    host: "primis",
    opponent: "Colombia"
  },
  {
    sport: "running",
    date: "04/21/2022",
    host: "luctus",
    opponent: "Indonesia"
  },
  {
    sport: "javelin",
    date: "06/06/2022",
    host: "iaculis",
    opponent: "Madagascar"
  },
  {
    sport: "pentathlon",
    date: "06/16/2022",
    host: "interdum",
    opponent: "Poland"
  },
  {
    sport: "running",
    date: "11/06/2022",
    host: "risus",
    opponent: "Poland"
  },
  {
    sport: "javelin",
    date: "05/11/2022",
    host: "nisl",
    opponent: "United States"
  },
  {
    sport: "archery",
    date: "07/17/2022",
    host: "vel",
    opponent: "Micronesia"
  },
  {
    sport: "running",
    date: "08/21/2022",
    host: "eu",
    opponent: "Portugal"
  },
  {
    sport: "javelin",
    date: "05/27/2022",
    host: "ante",
    opponent: "Mexico"
  },
  {
    sport: "pentathlon",
    date: "05/04/2022",
    host: "tristique",
    opponent: "Indonesia"
  },
  {
    sport: "discus throw",
    date: "01/03/2022",
    host: "in",
    opponent: "Russia"
  },
  {
    sport: "archery",
    date: "10/04/2022",
    host: "pede",
    opponent: "Somalia"
  },
  {
    sport: "discus throw",
    date: "12/28/2022",
    host: "lorem",
    opponent: "China"
  },
  {
    sport: "javelin",
    date: "02/03/2022",
    host: "etiam",
    opponent: "Albania"
  },
  {
    sport: "discus throw",
    date: "06/22/2022",
    host: "ut",
    opponent: "China"
  },
  {
    sport: "javelin",
    date: "05/24/2022",
    host: "eget",
    opponent: "China"
  },
  {
    sport: "running",
    date: "05/12/2022",
    host: "leo",
    opponent: "Colombia"
  },
  {
    sport: "running",
    date: "01/22/2022",
    host: "interdum",
    opponent: "Austria"
  },
  {
    sport: "archery",
    date: "12/13/2022",
    host: "ut",
    opponent: "Portugal"
  }
];

//function that retrieve events for a specific sport
const getSpecificEvents = (sport, events) => {
  return events.filter((event) => event.sport === sport);
};

//Sort events by sport type (and by date)
const getEventsSortBySport = (events) => {
  const sports = [
    "archery",
    "javelin",
    "running",
    "discus throw",
    "pentathlon"
  ];
  let sportsEvents = [];
  for (let sport of sports) {
    sportsEvents.push(
      getSpecificEvents(sport, eventsList).sort((a, b) =>
        new Date(a.date) > new Date(b.date) ? 1 : -1
      )
    );
  }
  return sportsEvents;
};

//function to generate an HTML table for a specific sport
const createSportTableHTML = (events) => {
  let tableHTML = document.createElement("table");
  tableHTML.setAttribute("class", "events-table");
  let tableCaption = document.createElement("caption");
  tableCaption.innerHTML = `This is the "${events[0].sport}" futur events list`;
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let headingRow = document.createElement("tr");
  headingRow.innerHTML =
    "<th>Date</th><th>Host city</th><th>Opponent Country</th><th>buy ticket</th>";
  thead.appendChild(headingRow);

  for (let event of events) {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${new Date(
      event["date"]
    ).toLocaleDateString()}</td><td>${event["host"]}</td><td>${
      event["opponent"]
    }</td>
    <td><a class="ticket" id="${event.host}-${
      event.opponent
    }" href="#"><i class="fas fa-ticket-alt"></i
    ></a></td>`;
    tbody.appendChild(row);
  }
  tableHTML.appendChild(tableCaption);
  tableHTML.appendChild(thead);
  tableHTML.appendChild(tbody);
  return tableHTML;
};

const findEvent = (date, sport) => {
  const eventsList = events;
  for (let events of eventsList) {
    for (let event of events) {
      let dateSplit = date.split("/");
      let dateArranged = new Date(
        `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`
      );
      if (
        (new Date(event.date).toLocaleString() ===
          dateArranged.toLocaleString()) &
        (event.sport === sport)
      ) {
        return event;
      }
    }
  }
  return -1;
};
//Generate new array of events sort by sport type and date
const events = getEventsSortBySport(eventsList);

//for each individual sport, display it on the page
for (let event of events) {
  document.getElementById("events").appendChild(createSportTableHTML(event));
}

const ticketLinks = document.getElementsByClassName("ticket");

for (let ticket of ticketLinks) {
  ticket.addEventListener("click", (event) => {
    event.preventDefault();

    const sport = event.srcElement
      .closest("table")
      .firstChild.innerHTML.split(" ")[3];
    const date = event.srcElement.closest("table").children[2].firstChild
      .firstChild.innerText;
    const sportEvent = findEvent(
      date,
      sport
        .split("")
        .slice(1, sport.length - 1)
        .join("")
    );

    const ticketDiv = document.getElementById("ticket");
    ticketDiv.classList.remove("hidden");
    const ticketForm = document.getElementById("ticket-form");
    document.getElementById("event-sport").innerHTML = sportEvent.sport;
    document.getElementById("event-host").innerHTML = sportEvent.host;
    document.getElementById("event-opponent").innerHTML = sportEvent.opponent;
    document.getElementById("event-date").innerHTML = new Date(
      sportEvent.date
    ).toLocaleDateString();
  });
}

document.getElementById("ticket-form").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("thank you for purchasing ticket, We see you soon at the event!");
  const ticketDiv = document.getElementById("ticket");
  ticketDiv.classList.add("hidden");
});
