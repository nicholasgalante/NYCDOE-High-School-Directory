fetch('https://data.cityofnewyork.us/resource/8b6c-7uty.json', {
    headers: {
        'Host': 'data.cityofnewyork.us',
        'Accept': 'application/json',
        'X-App-Token': 'b2elGMrYG0TWk0R13VZLqSJlE'
    }
})
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(err => console.log(err));

let numTotalResults = 0;
let numDisplayedResults = 0;
const numDisplayed = document.querySelector('#num-displayed');

//create school cards
createCard = (data) => {
    const schoolList = document.querySelector('#school-list');
    data.forEach(element => {
        //create card and append to #school-list
        const card = document.createElement('details');
        schoolList.append(card)

        //create and append card header div
        const cardHeader = document.createElement('summary');
        card.append(cardHeader);

        //create and append card body div
        const cardBody = document.createElement('div');
        cardBody.setAttribute('id','card');
        card.append(cardBody);

        //create header text (school title)
        const schoolName = document.createElement('h1');
        schoolName.setAttribute('class', 'school-name');
        schoolName.innerText = element.school_name + ` (${element.dbn})`;
        cardHeader.append(schoolName);

        // add neighborhood and borough
        const borough = document.createElement('p');
        borough.setAttribute('id', 'boroughID');
        let borocode = element.borocode;
        switch(borocode){
            case 'M' : borocode = "Manhattan"
                break;
            case "Q" : borocode = "Queens"
                break; 
            case "R" : borocode = "Staten Island"
                break;
            case "K" : borocode = "Brooklyn"
                break;
            case "X" : borocode = "Bronx"
                break;
        }
        borough.innerText = `${element.neighborhood}, ${borocode}`;
        cardBody.append(borough);

        // //add address to body and link to google Maps
        const addressDiv = document.createElement('div');
        const addressImg = document.createElement('img');
        addressDiv.setAttribute('class','info')
        addressImg.setAttribute('class','icon');
        addressImg.src = "Images/school-icon.png";

        const addressText = document.createElement('p');
        const addressLink = document.createElement('a');
        const searchQuery = element.school_name.replaceAll(" ", "+");
        addressText.innerText = `${element.primary_address_line_1},  ${element.city},  ${element.state_code}, ${element.postcode}`;
        addressLink.href = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
        addressLink.setAttribute('target', '_blank');
        addressLink.append(addressText);
        addressDiv.append(addressImg);
        addressDiv.append(addressLink)
        cardBody.append(addressDiv);

        //add school site to body
        const siteText = document.createElement('p');
        const siteLink = document.createElement('a');

        //crate school url link
        if (typeof element.website !== "undefined") {

            //reformat href 
            let site;
            if (!element.website.includes('http')) {
                site = 'https://' + element.website;
            } else {
                site = element.website;
            }
            
            //reformate display link
            let site2 = element.website;
            if (site2.includes('https')) { site2 = site2.slice(8); }
            if (site2.includes('http')) { site2 = site2.slice(7); }
            if(site2.includes('www.')){site2 = site2.slice(4);} 
            if (site2.charAt(site2.length - 1) === '/') { site2 = site2.substring(0, site2.length - 1); }

            //set url path for school site
            siteText.innerText = site2;
            siteLink.href = site;
            siteLink.setAttribute('target', '_blank');
            siteLink.append(siteText);
            cardBody.append(siteLink);
        }
        
        //add phone number
        const phoneNumber = document.createElement('p');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phoneNumber}`;
        phoneNumber.innerText = element.phone_number;
        phoneLink.append(phoneNumber)
        cardBody.append(phoneLink);

        //add school email
        const emailDiv = document.createElement('div');
        const email = document.createElement('p');
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${element.school_email}`;
        email.innerText = element.school_email;
        emailLink.append(email);
        cardBody.append(emailLink);

        //add gradespan
        const gradespan = document.createElement('p');
        gradespan.innerText = `Grades ${element.gradespan}`;
        cardBody.append(gradespan);

        //add student population
        const populationDiv = document.createElement('div');
        const populationImg = document.createElement('img');
        populationDiv.setAttribute('class','info')
        populationImg.setAttribute('class','icon');
        populationImg.src = "Images/population-icon.png";
        const studentPopulation = document.createElement('p');
        studentPopulation.innerText = `${element.total_students} students`;
        populationDiv.append(populationImg);
        populationDiv.append(studentPopulation);
        cardBody.append(populationDiv);

        //add schedule
        const schedule = document.createElement('p');
        schedule.innerText = `${element.start_time} - ${element.end_time}`;
        cardBody.append(schedule);

        //add subway info
        const subway = document.createElement('p');
        if (element.subway) { subway.innerHTML = `<h3>Subway</h3> ${element.subway}` }
        else { subway.innerHTML = ' ' };
        cardBody.append(subway);

        //add bus info
        const bus = document.createElement('p');
        if (element.bus) { bus.innerHTML = `<h3>Bus</h3> ${element.bus}` }
        else { bus.innerHTML = ' ' };
        cardBody.append(bus);

        //add overview header
        const overviewHeader = document.createElement('h1');
        const overviewText = document.createElement('p');
        overviewHeader.setAttribute('class', 'h3');
        overviewHeader.innerText = 'Overview';
        cardBody.append(overviewHeader);
        overviewText.innerText = element.overview_paragraph;
        cardBody.append(overviewText);

        //set total results
        numTotalResults++;
        const numResults = document.querySelector('#num-results');
        numResults.innerText = numTotalResults;

        //set displayed results
        numDisplayedResults++;
        numDisplayed.innerText = numDisplayedResults;

        //add performance div and header
        const performanceDiv = document.createElement('div');
        const performanceHeader = document.createElement('h1');
        performanceHeader.setAttribute('class', 'h3');
        performanceHeader.innerText = 'Performance';
        cardBody.append(performanceDiv);
        performanceDiv.append(performanceHeader);

        //add link for school quality report
        if(typeof element.sqr_website !== "undefined"){
            const qReport = document.createElement('p');
            const qReportLink = document.createElement('a');
            qReport.innerText = "See the School Quality Report";
            qReportLink.href = element.sqr_website.url;
            qReportLink.append(qReport);
            performanceDiv.append(qReportLink);
        }
  
    });
}

//set interval for live filter
let typingTimer;
let typeInterval = 300;
let searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
});

//live search function
liveSearch = () => {
    let cards = document.querySelectorAll('details');
    let search_query = document.getElementById("search").value;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
            cards[i].classList.remove("hidden-by-search");
        } else {
            cards[i].classList.add("hidden-by-search");
        }
    }
    updateResultCounter();
}

//filter by borough
const borough = document.querySelector('#borough-input');
borough.addEventListener('change', () => {
    let boroughIDs = document.querySelectorAll('#boroughID')
    boroughIDs.forEach(element => {
        console.log(element.innerHTML)
        if (element.innerHTML.includes(borough.value) || borough.value === 'BOROUGH') {
            element.parentElement.parentElement.classList.remove('hidden-by-borough');
        } else {
            element.parentElement.parentElement.classList.add('hidden-by-borough');
        }
    });
    updateResultCounter();
})

//expand button listener
const expand = document.querySelector('#expand');
expand.addEventListener('click', () => {
    let cards = document.querySelectorAll('details');
    if (expand.innerHTML === 'Expand All') {
        expand.innerHTML = 'Collapse All';
    } else if (expand.innerHTML === 'Collapse All') {
        expand.innerHTML = 'Expand All';
    }
    cards.forEach(el => {
        el.hasAttribute('open') ? el.removeAttribute('open') : el.setAttribute('open', true);
    })
});

//reset button listener
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    let cards = document.querySelectorAll('details');
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("hidden-by-search");
        cards[i].classList.remove("hidden-by-borough");
    }
    updateResultCounter();
    let form = document.querySelector('form');
    form.reset();
    document.querySelector('#borough-input').selectedIndex = 0;
})

//results and displayed counter
updateResultCounter = () => {
    let cards = document.querySelectorAll('details');
    numDisplayedResults = 0;
    cards.forEach(el => {
        if (!el.classList.contains('hidden-by-borough') && !el.classList.contains('hidden-by-search')) {
            numDisplayedResults += 1;
        }
    })
    numDisplayed.innerText = numDisplayedResults;
}






