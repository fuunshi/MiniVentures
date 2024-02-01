<?php

function create_database($servername, $username, $password) {
  $conn=mysqli_connect($servername,$username,$password);
  
  if(!$conn){
    
    die("Connection failed:");
  }
  
  $sql = "CREATE DATABASE if not exists weather";
  if ($conn->query($sql) !== TRUE) {
    echo "Error creating database: " . $conn->error;
  }
  $conn->close();
}

function create_table($servername, $username, $password, $dbName,$searchTerm) {

  $conn=mysqli_connect($servername,$username,$password,$dbName);
  
  if(!$conn){
    die("Connection failed:");
  }

  $sql = "CREATE TABLE if not exists api (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week VARCHAR(20),
    date_of_day VARCHAR(20),
    icon VARCHAR(10),
    temperature DOUBLE,
    city VARCHAR(40),
    `condition` VARCHAR(30),
    windspeed DOUBLE,
    pressure DOUBLE, 
    humidity DOUBLE
    )";
    
    if ($conn->query($sql) !== TRUE) {
      echo "Error creating table: " . $conn->error;
    }
    // $sql="SELECT * FROM api WHERE city='$searchTerm'";

    // // get the list of all the cities with search term and remove them 
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $sql="DELETE FROM api WHERE city='$searchTerm'";
    //     if($conn->query($sql)!==True){
    //         echo"Insertion failed";
    //     } 
    // }
    $conn->close();
  }

function insert_data($servername,$username,$password,$dbName,$searchTerm){
  $conn = mysqli_connect($servername, $username, $password, $dbName);

  // Check the connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }

  $apiKey = "a526bccdf1d0c87902b47665204e770b";

    // Loop through the past 7 days
    //for ($i = 6; $i >= 0; $i--) {
        // $date = date('M j, Y', strtotime("-$i days"));
        // $dayOfWeek = date('D', strtotime("-$i days"));

  $date = date('M j, Y');
  $dayOfWeek = date('D');

  $apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' . $searchTerm . '&APPID=' . $apiKey . '&units=metric';

  $apiData = file_get_contents($apiUrl);

        // Check if API request was successful
        //if ($apiData === FALSE) {
            //die("Failed to fetch API data");
        //}
      
      $apiData = json_decode($apiData, true);
      
  // Extracted values
  $icon = $apiData['weather'][0]['icon'];
  $temperature = $apiData['main']['temp'];
  $city = $apiData['name'];
  $condition = $apiData['weather'][0]['description'];
  $windSpeed = $apiData['wind']['speed'];
  $pressure = $apiData['main']['pressure'];
  $humidity = $apiData['main']['humidity'];
  
  // $existingDataQuery = "SELECT * FROM api WHERE day_of_week = '$dayOfWeek' AND date_of_day = '$date' AND city = '$city'";
  // $existingData = $conn->query($existingDataQuery);
  
  $existingDataQuery = "SELECT * FROM api WHERE day_of_week = '$dayOfWeek' AND city = '$city'";
  $existingData = $conn->query($existingDataQuery);
// 
  if ($existingData->num_rows === 0) {
    $sql = "INSERT INTO api (day_of_week, city) VALUES ('Sun', '$searchTerm'), ('Mon', '$searchTerm'), ('Tue', '$searchTerm'), ('Wed', '$searchTerm'), ('Thu', '$searchTerm'), ('Fri', '$searchTerm'), ('Sat', '$searchTerm')";

    if ($conn->query($sql) !== TRUE) {
      echo "Insertion failed for $date: " . $conn->error . "<br>";
    }
  }
        // if ($existingData->num_rows === 0) {
        //    $sql = "INSERT INTO api (day_of_week, date_of_day, icon, temperature, city, `condition`, windspeed, pressure, humidity)
        //             VALUES ('$dayOfWeek', '$date', '$icon', '$temperature', '$city', '$condition', '$windSpeed', '$pressure', '$humidity')";
        // if ($conn->query($sql) !== TRUE){
        //   echo "Fail";
        // }
        // } 
        // else {
  $sql = "UPDATE api
          SET
            icon = '$icon',
            temperature = '$temperature',
            city='$city',
            `condition`='$condition',
            windspeed='$windSpeed',
            pressure='$pressure',
            humidity='$humidity'
          WHERE day_of_week = '$dayOfWeek' AND city = '$city'";
        //}

  if ($conn->query($sql) !== TRUE) {
      echo "Insertion failed for $date: " . $conn->error . "<br>";
  }
    //}

  $conn->close();
}// this??

function display_data($servername,$username,$password,$dbName,$searchTerm){
    $conn=mysqli_connect($servername,$username,$password,$dbName);
    $sql="SELECT * FROM api where city='$searchTerm'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
    
        // Fetch each row and add it to the data array
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    
        // Close the database connection
        $conn->close();
    
        // Convert data to JSON format
        $json_data = json_encode($data);
    
        // Set headers to indicate JSON content
        header('Content-Type: application/json');
    
        // Output the JSON data
        echo $json_data;
        return $json_data;
    } else {
        // If no data is found, return an empty JSON array
        echo json_encode([]);
    }
}

function main(){
  $servername="localhost";
  $username="root";
  $password="";
  $dbName="weather";
  create_database($servername,$username,$password);
  $searchTerm=isset($_GET['search']) ? $_GET['search']: 'Aligarh'; 
  create_table($servername,$username,$password,$dbName,$searchTerm);

  insert_data($servername,$username,$password,$dbName,$searchTerm);

  display_data($servername,$username,$password,$dbName,$searchTerm);

}

echo main();

?>