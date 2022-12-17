
//fetch data from API
fetch('https://data.cityofnewyork.us/resource/8b6c-7uty.json')
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(err => console.error(err));


createCard = (data) => {
    const schoolList = document.querySelector('#school-list');
    data.forEach(element => {
        //create card and append to #school-list
        const card = document.createElement('div');
        card.setAttribute('class', 'card')
        schoolList.append(card)

        //create and append card header div
        const cardHeader = document.createElement('div');
        card.append(cardHeader);

        //create and append card body div
        const cardBody = document.createElement('div');
        cardBody.style.display = 'block'; //TODO: change to 'none' to hide
        card.append(cardBody);

        //create header text (school title)
        const schoolName = document.createElement('h1');
        schoolName.setAttribute('class', 'school-name');
        schoolName.innerText = element.school_name + ` (${element.dbn})`;
        cardHeader.append(schoolName);

        //create hide/show button in header

        //add address to body and link to google Maps
        const addressText = document.createElement('p');
        const addressLink = document.createElement('a');
        const searchQuery = element.school_name.replaceAll(" ", "+");
        addressText.innerText = `${element.primary_address_line_1},  ${element.city},  ${element.state_code}, ${element.postcode}`;
        addressLink.href = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
        addressLink.setAttribute('target', '_blank');
        addressLink.append(addressText)
        cardBody.append(addressLink);

        //add school site to body
        const siteText = document.createElement('p');
        const siteLink = document.createElement('a');

        //clean up url link
        let site = element.website;
        if (!site.includes('http')) {
            site = 'https://' + site;
        }

        //clean up displayed link
        let site2 = element.website;
        if (site2.includes('https://')) { site2 = site2.slice(8); }
        if (site2.includes('http://')) { site2 = site2.slice(7); }
        // if(site2.includes('www.')){site2 = site2.slice(4);}   //exclude www.
        if (!site2.includes('www.')) { site2 = 'www.' + site2 }; //include www.
        if (site2.charAt(site2.length - 1) === '/') { site2 = site2.substring(0, site2.length - 1); }

        //set display link for school site
        siteText.innerText = site2;
        siteLink.append(siteText);

        //set url path for school site
        siteLink.href = site;
        siteLink.setAttribute('target', '_blank');
        cardBody.append(siteLink);

        //add phone number
        const phoneNumber = document.createElement('p');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phoneNumber}`;
        phoneNumber.innerText = element.phone_number;
        phoneLink.append(phoneNumber)
        cardBody.append(phoneLink);

        //add school email
        const email = document.createElement('p');
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${element.school_email}`;
        email.innerText = element.school_email;
        emailLink.append(email);
        cardBody.append(emailLink);

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

        //add gradespan
        const gradespan = document.createElement('p');
        gradespan.innerText = `Grades ${element.gradespan}`;
        cardBody.append(gradespan);

        //add student population
        const studentPopulation = document.createElement('p');
        studentPopulation.innerText = `${element.total_students} students`;
        cardBody.append(studentPopulation);

        //add schedule
        const schedule = document.createElement('p');
        schedule.innerText = `${element.start_time} - ${element.end_time}`;
        cardBody.append(schedule);

        //add overview
        const overviewHeader = document.createElement('h1');
        const overviewText = document.createElement('p');
        overviewHeader.setAttribute('class','overview');
        overviewHeader.innerText = 'Overview';
        cardBody.append(overviewHeader);
        overviewText.innerText = element.overview_paragraph;
        cardBody.append(overviewText);

    });

}

