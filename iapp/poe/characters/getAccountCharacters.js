//Make ajax request to poe api if account name is valid.
function httpAPIRequest()
{
  var characterName = document.getElementById("characterField").value;
  if (characterName === "" || characterName === " ")
  {
      printResponse("Invalid account name.", true);
      return;
  }

	var xmlhttp = new XMLHttpRequest();
	var url = "https://www.pathofexile.com/character-window/get-characters?accountName=" + characterName;

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			printResponse(myArr, false);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//Prints response from poe api or error text.
function printResponse(data, error)
{
  var div = document.getElementById("characterDiv");

  if (error)
  {
    div.innerHTML = data;
  }
  else if (data === false)
  {
    div.innerHTML = "Could not find account with that name";
  }
  else
  {
    div.innerHTML = "";
    for (var character in data)
    {
      div.innerHTML += "Name: " + data[character].name + " " +
                       "Class: " + data[character].class + " " +
                       "Level: " + data[character].level + " " +
                       "League: " + data[character].league + '<br>';
    }
  }
}
