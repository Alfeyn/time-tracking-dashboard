// Remove hover effect from activity card when the cursor is on the image
// Add event delegation for hover effect removal
document.querySelector('.activity-container').addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'IMG' && event.target.classList.contains('menu')) {
      const card = event.target.closest('.activity-card');
      if (card) {
          card.classList.add('no-hover');
      }
  }
});

document.querySelector('.activity-container').addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'IMG' && event.target.classList.contains('menu')) {
      const card = event.target.closest('.activity-card');
      if (card) {
          card.classList.remove('no-hover');
      }
  }
});


// Fetch and display data
const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

const activityContainer = document.querySelector('.activity-container');

// Set the default to 'Daily'
dailyBtn.classList.add('active');

// Append activity card to the container
const appendItem = (item, timeframe) => {
    const div = document.createElement('div');
    div.classList.add('activity-card');
    div.classList.add(item.title); 
    div.innerHTML = `
      <div class="card-head">
        <span>${item.title}</span>
        <img src="./images/icon-ellipsis.svg" alt="menu" class="menu">
      </div>
      <div class="time">
        <h3 class="current-time">
          ${item.timeframes[timeframe].current}hrs
        </h3>
        <p class="previous-time">
          Last ${timeframe === 'daily' ? 'Day' : timeframe === 'weekly' ? 'Week' : 'Month'} - 
          <span>${item.timeframes[timeframe].previous}</span>hrs
        </p>
      </div>
    `;
    activityContainer.appendChild(div);
};

// Populate the DOM with data based on the selected timeframe
const populateDOM = (data, timeframe) => {
    activityContainer.innerHTML = ''; // Clear previous data
    data.forEach((item) => {
        appendItem(item, timeframe);
    });
};

// Handle button clicks and fetch data
fetch('./../data/data.json')
    .then((response) => {
        if (!response.ok) throw new Error('Oops! Something went wrong.');
        return response.json();
    })
    .then((data) => {
        // Default to 'Daily'
        populateDOM(data, 'daily');

        // Add event listeners for buttons
        const buttons = [dailyBtn, weeklyBtn, monthlyBtn];
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                buttons.forEach((button) => button.classList.remove('active'));
                // Add 'active' class to the clicked button
                btn.classList.add('active');

                // Determine the timeframe
                const timeframe = btn.id; // 'daily', 'weekly', or 'monthly'
                populateDOM(data, timeframe);
            });
        });
    })
    .catch((error) => console.error(error));
