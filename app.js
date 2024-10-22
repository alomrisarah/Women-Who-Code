async function fetchResources() {
 try {
  const response = await fetch("https://api.sampleapis.com/codingresources/codingResources")
  const resources = await response.json()
  displayResources(resources)
 } catch (error) {
  console.error("Error fetching resources:", error)
 }
}
function displayResources(resources) {
 const resourceContainer = document.getElementById("resourceCards")
 resourceContainer.innerHTML = ""

 resources.forEach((resource) => {
  const resourceCard = document.createElement("div")
  resourceCard.classList.add("col-lg-4", "col-md-6", "mb-4")
  resourceCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${resource.description}</h5>
                    <p class="card-text"><strong>URL:</strong> <a href="${resource.url}" target="_blank">${resource.url}</a></p>
                    <p class="card-text"><strong>Type:</strong> ${resource.types.join(", ")}</p>
                    <p class="card-text"><strong>Topics:</strong> ${resource.topics.join(", ")}</p>
                    <p class="card-text"><strong>Levels:</strong> ${resource.levels.join(", ")}</p>
                </div>
            </div>
        `
  resourceContainer.appendChild(resourceCard)
 })
}

// Function to search by topic
document.getElementById("searchButton").addEventListener("click", function () {
 const searchTerm = document.getElementById("searchInput").value.toLowerCase()

 fetch("https://api.sampleapis.com/codingresources/codingResources")
  .then((response) => response.json())
  .then((resources) => {
   const filteredResources = resources.filter((resource) => resource.topics.some((topic) => topic.toLowerCase().includes(searchTerm)))
   displayResources(filteredResources)
  })
  .catch((error) => console.error("Error filtering resources:", error))
})

window.onload = fetchResources
