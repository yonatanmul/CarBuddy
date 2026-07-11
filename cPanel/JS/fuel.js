function calcTotal() {
   var liters = parseFloat(document.getElementById("liters").value);
   var perliter = parseFloat(document.getElementById("perliter").value);
   if (!isNaN(liters) && !isNaN(perliter)) {
       document.getElementById("total").value = (liters * perliter).toFixed(2);
   }
}


function validateFuel() {
   var fdateField = document.getElementById("fdate");
   var litersField = document.getElementById("liters");
   var perliterField = document.getElementById("perliter");
   var totalField = document.getElementById("total");
   var odoField = document.getElementById("odo");
   var liters = parseFloat(litersField.value);
   var perliter = parseFloat(perliterField.value);
   var total = parseFloat(totalField.value);
   var odo = odoField.value;
   var today = new Date().toISOString().split("T")[0];
   var msg = document.getElementById("fuelError");
   msg.innerHTML = "";
   fdateField.classList.remove("invalid");
   litersField.classList.remove("invalid");
   perliterField.classList.remove("invalid");
   totalField.classList.remove("invalid");
   odoField.classList.remove("invalid");


   if (fdateField.value === "" || fdateField.value > today) {
       msg.innerHTML = "יש לבחור תאריך שאינו עתידי";
       fdateField.classList.add("invalid");
       return false;
   }
   if (isNaN(liters) || liters <= 0) {
       msg.innerHTML = "כמות הליטרים חייבת להיות מספר גדול מאפס";
       litersField.classList.add("invalid");
       return false;
   }
   if (isNaN(perliter) || perliter <= 0) {
       msg.innerHTML = "מחיר לליטר חייב להיות מספר גדול מאפס";
       perliterField.classList.add("invalid");
       return false;
   }
   if (isNaN(total) || total <= 0) {
       msg.innerHTML = "הסכום ששולם חייב להיות מספר גדול מאפס";
       totalField.classList.add("invalid");
       return false;
   }
   if (odo < 0) {
       msg.innerHTML = "קילומטראז' לא יכול להיות שלילי";
       odoField.classList.add("invalid");
       return false;
   }
   return true;
}


document.getElementById("fdate").max = new Date().toISOString().split("T")[0];



