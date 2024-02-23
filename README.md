# gds_swe_assignment
Take Home Assignment for GDS SWE Internship

This is my approach towards the take home assignment

Firstly, created an interface Person to initialise a person object with their id, appointment, team name and time created.

Then I created functions "parse_data" and "add_map" to parse the CSV data and to add it to a map object. I will use these map objects to look up data subsequently.

Next, I created functions "can_redeem" and "add_redepmtion" to check if a team has already redeemed their present and if not, redeem their present. 

Lastly, I parse data from the testing csv file and check to simulate how this redemption process will take place.

Reasons for using map objects as my primary data structure is due to their typical O(1) look up and update time as they are based on hash tables. This leads to faster time complexity of the algorithm.

Things that I could have improved on:
Added edge cases in my testing files such as wrong team names
Included more abstraction to handle parsing of data and adding to the map object.

