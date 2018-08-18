$(document).ready(function () {

    /*
        TODO: Load Google Charts
        [X] Load the Google Charts API into the browser memory so we can use it later.
    */



    var cleanLocalities = [];

    if (!localStorage.getItem("Suburbs")) {

        /*
            TODO: Retrieve just a list of suburbs from the dataset and clean it up.
            [X] Prepare SQL satement to retrieve suburbs from dataset
            [X] AJAX call to get data
            [X] Success method to process and store in local storage
            [X] Call Bloodhound Typeahead Initaliser
        */


    } else {

        /*
            Get the cleaned suburbs from local storage instead of from the API.
        */

        cleanLocalities = JSON.parse(localStorage.getItem("Suburbs"));

        /*
            TODO: Initalise autocomplete
            [X] Call Bloodhound Typeahead Initaliser
        */

    }

    /*
        Start the comparison when we click on the compare button.
    */

    $("#comparison-selector button").click(function (event) {

        /*
            Stop the button redirecting the page (on some browsers).
        */
        event.preventDefault();
        console.log("compare");

        var left = $("#suburb-select-left-input");
        var right = $("#suburb-select-right-input");

        var leftSuburb = left.val();
        var rightSuburb = right.val();

        console.log(cleanLocalities.indexOf(leftSuburb));

        /*
            Check to see if the suburbs are not empty and are in the suburb list.
            If they are not set the field to an error field to give feedback to the
            user.
            Only continue processing if both suburbs are correct.
        */

        if (leftSuburb == "" || cleanLocalities.indexOf(leftSuburb) < 0) {
            left.parent().parent().addClass("error");
        }

        if (rightSuburb == "" || cleanLocalities.indexOf(rightSuburb) < 0) {
            right.parent().parent().addClass("error");
        }

        console.log(leftSuburb + " : " + rightSuburb);

        if (leftSuburb != "" && rightSuburb != "") {

            /*
                Doing the same for both the left and the right suburbs.
                First check to see if we have a record of the suburb's data in local storage.
                If we do, output the display, otherwise get the data from the API and then 
                clean it, store it, and display it.
            */
            if (localStorage.getItem(leftSuburb)) {
                var leftRecords = JSON.parse(localStorage.getItem(leftSuburb));
                /*
                    Passing in the suburb data, the suburb name and the left compare article.
                */
                outputDisplay(leftRecords, leftSuburb, $("#compare-left"));
            } else {

                /*
                    TODO: Get data from API that is for the left selected suburb
                    [X] Construct SQL statement to retrieve all data for that suburb
                    [X] AJAX call to get the data
                    [X] Success function to process, store and present the data
                */

            }

            if (localStorage.getItem(rightSuburb)) {
                var rightRecords = JSON.parse(localStorage.getItem(rightSuburb));
                outputDisplay(rightRecords, rightSuburb, $("#compare-right"));
            } else {
                
                /*
                    TODO: Get data from API that is for the right selected suburb
                    [X] Construct SQL statement to retrieve all data for that suburb
                    [X] AJAX call to get the data
                    [X] Success function to process, store and present the data
                */

            }
        }


    });

    /*
        Remove error formatting from suburb fields when we type into them.
    */

    $("#suburb-select-left-input, #suburb-select-right-input").keyup(function () {
        $(this).parent().parent().removeClass("error");
    });

});

/* 
    TODO: Function to initalise the autocomplete functionality
    [X] Construct the engine behind the autocomplete
    [X] Attached engine to input fields
    [X] Set display options for the autocomplete
*/
function initaliseBloodhoundTypeAhead(suburbs) {

}

/*
    TODO: Function to clean, store and return records of a particular suburb.
    [X] Get just the records from the data
    [X] Store the records attached to the suburb into local storage
    [X] Return the records
*/
function cleanAndStore(data, suburb) {
   
}

/*
    Displaying the records for a suburb in a particular element.
    This can be the left or the right article. This will use the same
    function for both sides.
*/
function outputDisplay(records, suburb, parentElement) {


    /*
        TODO: Use SLQ Real Estate Dataset to retrieve a historial map of area
        [ ] Prepare SQL satement to retrieve single image from dataset that is in same suburb
        [ ] AJAX call to get data
        [ ] Success method to process and display image
    */

    /*
        Clear out the existing data and put the suburb as a title
    */
    parentElement.html("");
    parentElement.append("<h2>" + suburb + "</h2>");

    /*
        Initalise two arrays - one for storage running statistics for a
        suburb and another for storing the different dwelling types in 
        a particular suburb.
    */
    var suburbStats = [];
    var dwellingTypes = [];

    /*
        Go through each record in the data and add the statistics and dwelling
        types to the arrays. We will be using multidimension arrays to store
        the statistics so it will be like
        
        data -> month -> dwelling type -> [] -> weekly rent
    */
    records.forEach(function (item, index) {

        if ((item["Month"] in suburbStats) == false) {
            suburbStats[item["Month"]] = [];
        }

        if ((item["Dwelling Type"] in suburbStats[item["Month"]]) == false) {
            suburbStats[item["Month"]][item["Dwelling Type"]] = [];
        }

        if (dwellingTypes.indexOf(item["Dwelling Type"]) < 0) {
            dwellingTypes.push(item["Dwelling Type"]);
        }

        suburbStats[item["Month"]][item["Dwelling Type"]].push(parseInt(item["weekly-rent"]));
    });

    /*
        We are going to construct the data block that will be used by
        Google Charts to produce the graph. We want the graph to look like:

        Month       Apartment   House   Townhouse   Unit
        January     ####        ####    ####        ####
        Febuary     ####        ####    ####        ####
        March       ####        ####    ####        ####
    */
    var data = [];
    var line = [];
    line.push("Month");

    /*
        Sort the dwelling types into alphabetical order then add them to 
        the list to be added as the first line of the data block.
    */
    dwellingTypes.sort();
    var dwellingTypeAvg = [];
    dwellingTypes.forEach(function (item, index) {
        dwellingTypeAvg[item] = null;
        line.push(item);
    });
    data.push(line);

    /*
        Process the data for each of the months and display a tally before
        the chart
    */
    processAndDisplayMonth("January 2015", "1");
    processAndDisplayMonth("Febuary 2015", "2");
    processAndDisplayMonth("January 2015", "3");

    /*
        TODO: Convert array of data into Google Chart and display.
        [X] Convert the multidimension array we produced into a Google Chart
                data table.
        [X] Set up the chart options for how it will be displayed.
        [X] Place an empty div to use for the chart.
        [X] Get the empty div we created earlier and create the chart inside it.
        [X] Draw the chart with the data and the options we set.
    */

    /*
        A subfunction used for processing the data rather than duplicating the 
        code.
    */
    function processAndDisplayMonth(monthString, monthIndex) {
        parentElement.append("<h3>" + monthString + "</h3>");
        count = 0;

        /*
            Loop through each of the dwelling types in alphabetical order
            and generate the average rent for each of those types.
            Add that rent to the an array to use for the chart.
            
            Reduce is javascript function that is used on arrays to reduce an entire
            array to a single value using a function to handle how two elements
            are reduced left to right. We will use a simple function for this
            that just adds the elements together.
        */
        Object.keys(suburbStats[monthIndex]).sort().forEach(function (item, index) {
            var sum = suburbStats[monthIndex][item].reduce(getSum);
            var avg = sum / suburbStats[monthIndex][item].length;
            count += suburbStats[monthIndex][item].length;
            dwellingTypeAvg[item] = Math.round(avg);
        });
        /*
            Display a tally of how many rental agreements were signed during the month
        */
        parentElement.append("<h4>" + count + " rental bonds signed</h4>");
        /*
            Push the dwelling data to the data block.
        */
        line = [];
        line.push(monthString);
        dwellingTypes.forEach(function (item, index) {
            line.push(dwellingTypeAvg[item]);
            dwellingTypeAvg[item] = null;
        });
        data.push(line);
    }
}

/*
    The accumulator function used by the Reduce function. It simply adds the
    values together.
*/
function getSum(total, num) {
    return total + num;
}