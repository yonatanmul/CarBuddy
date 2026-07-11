<?php
    $host = "localhost";
    $user = "orelbe2_db_user";
    $pass = "DbUser123456!";
    $db = "orelbe2_carbuddy";
   
    $conn = new mysqli($host, $user, $pass, $db);
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }


   $fdate = $_POST['fdate'];
   $station = $_POST['station'];
   $ftype = $_POST['ftype'];
   $liters = $_POST['liters'];
   $perliter = $_POST['perliter'];
   $total = $_POST['total'];
   $odo = $_POST['odo'];


   $errors = [];


   if ($fdate === '') {
       $errors[] = "יש להזין תאריך";
   } elseif ($fdate > date('Y-m-d')) {
       $errors[] = "התאריך אינו יכול להיות עתידי";
   }


   if ($station === '') {
       $errors[] = "יש להזין תחנת דלק";
   } elseif (strlen($station) > 50) {
       $errors[] = "שם תחנת הדלק ארוך מדי (עד 50 תווים)";
   }


   if (!filter_var($liters, FILTER_VALIDATE_FLOAT) || $liters <= 0) {
       $errors[] = "כמות הליטרים חייבת להיות מספר גדול מאפס";
   }


   if (!filter_var($perliter, FILTER_VALIDATE_FLOAT) || $perliter <= 0) {
       $errors[] = "מחיר לליטר חייב להיות מספר גדול מאפס";
   }


   if (!filter_var($total, FILTER_VALIDATE_FLOAT) || $total <= 0) {
       $errors[] = "הסכום ששולם חייב להיות מספר גדול מאפס";
   }


   if (!filter_var($odo, FILTER_VALIDATE_INT) || $odo < 0) {
       $errors[] = "קילומטראז' חייב להיות מספר שלם חיובי";
   }


   if (!empty($errors)) {
       foreach ($errors as $error) {
           echo $error . "<br>";
       }
       exit;
   }


   $sql = "INSERT INTO fuel (fdate, station, ftype, liters, perliter, total, odo) VALUES (?, ?, ?, ?, ?, ?, ?)";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("sssdddi", $fdate, $station, $ftype, $liters, $perliter, $total, $odo);
   if ($stmt->execute() == FALSE) {
       echo "לא ניתן לשמור את התדלוק. שגיאה: " . $stmt->error;
       exit();
   }
?>
<!doctype html>
<html lang="he" dir="rtl">
 <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>חבר לרכב - התדלוק נשמר</title>
   <link rel="stylesheet" href="../CSS/style.css" />
 </head>
 <body>
   <header class="top">
     <h1 class="logo">חבר לרכב</h1>
   </header>


   <main>
     <section class="hero">
       <h2>התדלוק נשמר בהצלחה!</h2>
       <p>התדלוק ב<?php echo $station; ?> בתאריך <?php echo $fdate; ?> נשמר ביומן.</p>
       <p>
         <a href="fuel_log.html" class="btn">הוספת תדלוק נוסף</a>
         <a href="http://vmedu475.mtacloud.co.il:3000/" class="btn">חזרה לאתר</a>
       </p>
     </section>
   </main>
 </body>
</html>
