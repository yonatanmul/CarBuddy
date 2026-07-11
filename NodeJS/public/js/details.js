function openDetails(path, id) {
   window.location = path + id;
}


function validateFinder() {
   var maxpriceField = document.getElementsByName("maxprice")[0];
   var seatsField = document.getElementsByName("seats")[0];
   var maxprice = parseFloat(maxpriceField.value);
   var seats = parseInt(seatsField.value);
   var msg = document.getElementById("finderError");
   msg.innerHTML = "";
   maxpriceField.classList.remove("invalid");
   seatsField.classList.remove("invalid");


   if (isNaN(maxprice) || maxprice <= 0) {
       msg.innerHTML = "יש להזין תקציב גדול מאפס";
       maxpriceField.classList.add("invalid");
       return false;
   }
   if (isNaN(seats) || seats < 1) {
       msg.innerHTML = "מספר המושבים חייב להיות לפחות 1";
       seatsField.classList.add("invalid");
       return false;
   }
   return true;
}



