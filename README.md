# Wild Code School(WCS) TechChallenge 2021

## The Royal Kingdom of Colchis



This is a website made for the acceptance at the WCS in Toulouse.

Date of creation : October, 2021

---

The site has basic directives given by the school, to use html/css and javascript.
I try to implement more features to show skills I had at this time, like :
- Sass
- CSS animations
- Flex-box
- Getting data from an API and display it on a page
- Manipulating the DOM
- ...

---

### Landing page
This is a simple landing page, with some css animations.

---

### Family page
This page is about the Royal Family. I choosed to display family members within cards like styled elements. Adding animation on cards with CSS.

---

### Events page
Most of the work is done on this page. 

I first made an API call to "thesportsdb.com" website to get the last 100 events for the NHL league(2021-2022). 

Then, I retrieve all the teams name and id, to sort the events by teams, with their respectives events.

For each team, I injected on the page a Table with the events informations.

I added a link for each event to buy ticket (just simulating this functionnality).

And to reduce the loading time, because I need to make an API call for each team to get its details, I create a function that load data only if the "team" table is displayed on screen, and then load details for each team when the user scroll the page.

---

### Contact page
Just a contact form.