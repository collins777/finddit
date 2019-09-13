import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

////////////////////////////////////////////////////////////
// Form event listener
////////////////////////////////////////////////////////////

searchForm.addEventListener("submit", e => {
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort value...from radio button
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get search limit from select element field
  const searchLimit = document.getElementById("limit").value;

  // Check input field
  if (searchTerm === "") {
    // Show an error message
    showMessage("Please add a search term.", "alert-danger");
  }

  // Clear input field
  searchInput.value = "";

  // Search reddit api

  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    // Use this console.log to test the returned data in  your console
    //console.log(results);

    // Injecting results into UI
    let output = '<div class="card-columns">';

    // loop through posts
    results.forEach(post => {
      // Check if post object contains images for singular post
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.searchenginejournal.com/wp-content/uploads/2015/11/2015-11-11_10-15-49.jpg";

      // Output bootstrap card
      output += `
        <div class="card">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            }" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${
              post.subreddit
            }</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
        `;
    });

    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault(); // prevents form from actually submitting to a file
});

////////////////////////////////////////////////////////////
// Show error message function
////////////////////////////////////////////////////////////

function showMessage(message, className) {
  // Create opening div to inject into html file
  const div = document.createElement("div");
  // Add classes to div to display error message in red
  div.className = `alert ${className}`;
  // Add message from above argument
  div.appendChild(document.createTextNode(message));
  // Get parent container
  const searchContainer = document.getElementById("search-container");
  // Get search
  const search = document.getElementById("search");
  // Insert div before our search element
  searchContainer.insertBefore(div, search);
  // Remove div from UI after 3 seconds ..."timeout alert"
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

////////////////////////////////////////////////////////////
// Truncate text function
// "Only display certain number of characters"
////////////////////////////////////////////////////////////

// pass in text and limit the amount of characters
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
