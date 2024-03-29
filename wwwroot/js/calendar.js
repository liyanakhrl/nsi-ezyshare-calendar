let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
var event = @Html.Raw(Json.Serialize(Model.Expo));
var initSelection = true;
var changedSelection = false;
let existingPopup = null;
document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.getElementById("calendar-body");
  const prevMonthBtn = document.getElementById("prev-month-btn");
  const nextMonthBtn = document.getElementById("next-month-btn");
  const currentMonthYear = document.getElementById("current-month-year");
  const months = [{
    name: "January",
    theme: "New Year"
  }, {
    name: "February",
    theme: "Valentine's Day"
  }, {
    name: "March",
    theme: "St. Patrick's Day"
  }, {
    name: "April",
    theme: "Easter"
  }, {
    name: "May",
    theme: "Mother's Day"
  }, {
    name: "June",
    theme: "Father's Day"
  }, {
    name: "July",
    theme: "Independence Day"
  }, {
    name: "August",
    theme: "Back to School"
  }, {
    name: "September",
    theme: "Labor Day"
  }, {
    name: "October",
    theme: "Halloween"
  }, {
    name: "November",
    theme: "Thanksgiving"
  }, {
    name: "December",
    theme: "Christmas"
  }];

  function updateCalendar() {
    calendarBody.innerHTML = "";
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate(); // Total days of previous month
    currentMonthYear.textContent = `${months[currentMonth].name} ${currentYear}`;
    let date = 1;
    let nextMonthDays = 0;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        if (i === 0 && j < firstDay) {
          const prevMonthDate = prevMonthTotalDays - (firstDay - j) + 1;
          cell.textContent = prevMonthDate;
          cell.classList.add("prev-month");
        } else if (date > totalDays) {
          const nextMonthDate = date - totalDays + nextMonthDays;
          nextMonthDays++;
          cell.textContent = nextMonthDate;
          cell.classList.add("next-month");
        } else {
          const day = document.createElement("div");
          day.classList.add("day");
          day.textContent = date;
          cell.textContent = date;
          const eventTags = document.createElement("div");
          eventTags.classList.add("event-tags");
          const activityTags = document.createElement("div");
          activityTags.classList.add("activity-tags");

          // Find event for the current date
          const currentDate = new Date(currentYear, currentMonth, date);

          const eventList = event.find(p => {
            const fromDate = new Date(p.fromdate);
            const todate = new Date(p.todate);
            const isBetween = currentDate >= fromDate && currentDate <= todate;
            return fromDate.getMonth() === currentMonth && fromDate.getFullYear() === currentYear && (fromDate.getDate() === currentDate.getDate() || todate.getDate() === currentDate.getDate() || isBetween);
          });

          console.log(eventList)
          var isPast = false;
          if (eventList) {
            const currentDate = new Date();
            currentDate.setHours(23, 59, 0, 0); // Set time to 11:59 PM
            const eventDate = new Date(eventList.todate);
            eventDate.setHours(23, 59, 0, 0);
            isPast = eventDate < currentDate;
          }
          if (eventList) {
            cell.classList.add("has-events");
            const activityTag = document.createElement("span");
            activityTag.classList.add(isPast ? "activity-tag-past" : "activity-tag");
            const activityLink = document.createElement("a");
            activityLink.href = "https://ezyshare.online/ezyshare-expo/EventDetails?id=" + eventList.expocode; // Replace with your desired URL
            activityLink.textContent = eventList.exponame;
            activityLink.target = "_blank";
            activityTag.appendChild(activityLink);
            activityTags.appendChild(activityTag);
          }
          cell.appendChild(activityTags);
          row.appendChild(cell);
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }
  const calendarHeader = document.getElementById('current-month-year');
  calendarHeader.addEventListener('click', showPopup);

  // Function to show the popup
  function showPopup() {
    if (!existingPopup) {
      // Create a div element to represent the popup
      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.innerHTML = `

                                <label for="month">Select Month:</label>
                                <select id="month">
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <label for="year">Select Year:</label>
                          <ul id="tagList"></ul>
                                    <button id="select-btn">Select</button>
                                              `;
      // Add the popup to the body element
      document.body.appendChild(popup);
      existingPopup = popup;
      // Get the month and year elements from the popup
      const monthSelect = popup.querySelector('#month');


      const selectBtn = popup.querySelector('#select-btn');
      // Set the initial values to the current month and year in the header
      const [_currentYear, _currentMonth] = calendarHeader.textContent.trim().split(' ');
      monthSelect.value = _currentMonth;
      monthSelect.value = _currentYear;

      var yearTag_ = null;

      const __currentYear = new Date().getFullYear();
      const tagList = document.getElementById('tagList');

      for (let year = 2018; year <= __currentYear; year++) {
        const listItem = document.createElement('li');
        listItem.textContent = year;
        listItem.setAttribute('data-year', year);

        listItem.addEventListener('click', function () {
          initSelection = false;
          changedSelection = false;
          const clickedYear = this.getAttribute('data-year');
          console.log(`Clicked Year: ${clickedYear}`);
          yearTag_ = clickedYear
          // Remove the 'clicked' class from all list items
          const allListItems = document.querySelectorAll('li');
          allListItems.forEach(item => item.classList.remove('selected-tag'));

          // Add the 'clicked' class to the clicked list item
          this.classList.add('selected-tag');
        });



        tagList.appendChild(listItem);
      }


      // Default selected month  
      // Get the current date to set the default month and year
      if (initSelection) {
        const currentDate_ = new Date();
        const currentYear_ = currentDate_.getFullYear();
        const currentMonth_ = String(currentDate_.getMonth() + 1).padStart(2, '0'); // Zero-padding for single-digit months

        // Set the default value for the month select element
        const monthSelect_ = document.getElementById('month');
        monthSelect_.value = currentMonth_;
        // Default selected year
        const yearOptions = tagList.querySelectorAll('li');
        yearOptions.forEach((option) => {
          if (option.textContent === String(__currentYear)) {
            option.classList.add('selected-tag'); // Add a class to indicate the default selected option
          }
        });

      }
      else {
        const currentYear_ = yearTag_;
        const currentMonth_ = String(_currentMonth.getMonth() + 1).padStart(2, '0'); // Zero-padding for single-digit months

        // Set the default value for the month select element
        const monthSelect_ = document.getElementById('month');
        monthSelect_.value = currentMonth_;
        // Default selected year
        const yearOptions = tagList.querySelectorAll('li');
        yearOptions.forEach((option) => {
          if (option.textContent === String(__currentYear)) {
            option.classList.add('selected-tag'); // Add a class to indicate the default selected option
          }
        });


      }

      selectBtn.addEventListener('click', () => {
        const selectedMonth = parseInt(monthSelect.value) - 1; // Months are zero-based
        const selectedYear = parseInt(yearTag_) //parseInt(yearInput.value);
        calendarHeader.textContent = `${months[selectedMonth].name} ${selectedYear}`;

        currentMonth = selectedMonth;
        currentYear = selectedYear;
        updateCalendar();

        existingPopup = null;
        popup.remove();
      });

      // To remove the popup when clicking outside of it:
      document.addEventListener('click', function (event) {
        if (!popup.contains(event.target) && event.target !== calendarHeader) {
          existingPopup = null;
          popup.remove();
        }
      });
      updateCalendar();
    }
    else {
      // If the .popup element already exists, simply show it without creating a new one
      //  existingPopup.style.display = 'block';
    }
  }
  // end
  prevMonthBtn.addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    updateCalendar();
  });
  nextMonthBtn.addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    updateCalendar();
  });
  updateCalendar();
});
