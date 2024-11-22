// Event lestinners
console.log("ehyyyy")


// get all chambre
document.getElementById("getallForm").addEventListener("submit", async (e) => {e.preventDefault();
     // Prevent the default form submission behavior
  
    try {
        const response = await fetch(`http://localhost:3000/chambre`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        document.getElementById("getallResult").innerText = JSON.stringify(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        document.getElementById("getallResult").innerText = `Error: ${error.message}`;
    }
  });
//get id chambre
document.getElementById("getForm").addEventListener("submit", async (e) => {e.preventDefault();
    // Prevent the default form submission behavior
    const id =document.getElementById("roomNumber").value
 
   try {
       const response = await fetch(`http://localhost:3000/chambre/${id}`);
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
 
       const data = await response.json();
       document.getElementById("getResult").innerText = JSON.stringify(data);
   } catch (error) {
       console.error("Error fetching data:", error.message);
       document.getElementById("getResult").innerText = `Error: ${error.message}`;
   }
 });