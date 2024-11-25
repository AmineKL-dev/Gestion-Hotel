

// Event lestinners
console.log("ehyyyy")

// get all chambre
document.getElementById("getallForm").addEventListener("submit", async (e) => {e.preventDefault();
     // Prevent the default form submission behavior
    axios.get(`http://localhost:3000/chambre`)
    .then((response)=>{
        console.log(typeof(response.data))
        document.getElementById("getallResult").innerText = JSON.stringify(response.data);
    })
    .catch((error)=>{
        console.log(error)
    })
     

     
  
   
  });
//get id chambre
document.getElementById("getForm").addEventListener("submit", async (e) => {e.preventDefault();
    // Prevent the default form submission behavior
    const id =document.getElementById("roomNumber").value
    axios.get(`http://localhost:3000/chambre/${id}`)
    .then((response)=>{
        document.getElementById("getResult").innerText = JSON.stringify(response.data);
    })
    .catch((error)=>{
        console.log(error)
    })
 
 });
// Make the POST request

document.getElementById("addForm").addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Capture input values
    const Nchambre = document.getElementById("Nchambre").value;
    const type = document.getElementById("type").value;
    const prix = document.getElementById("prix").value;
    console.log("Data to send:", { Nchambre, type, prix });

    // Log data for debugging


    try {
        // Make the POST request
        const response = await axios.post("http://localhost:3000/chambre", {
            Nchambre: Nchambre,
            type: type,
            prix: prix,
        });
        console.log("Server Response:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
});

// DELETE request
document.getElementById("deleteForm").addEventListener("submit",async(e)=>{e.preventDefault()
    const id=document.getElementById("DroomNumber").value
    console.log(id)
    axios.delete(`http://localhost:3000/chambre/${id}`)
    .then((response)=>{
        document.getElementById("DeleteResult").innerText = JSON.stringify(response.data);
    })
    .catch((error)=>{
        console.log(error)
    })
})


