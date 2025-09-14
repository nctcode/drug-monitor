let url = location.host; //so it works locally and online

$("table").rtResponsiveTables(); //for the responsive tables plugin

$("#add_drug").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    var request = {
        url: `${protocol}//${url}/api/drugs`,
        method: "POST",
        data: data
    };

    $.ajax(request).done(function(response) {
        alert(data.name + " sent successfully!");
        window.location.href = "/manage";
    }).fail(function(xhr) {
        let msg = "Error adding drug.";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            msg = xhr.responseJSON.message;
        }
        // Show error message so user can re-enter
        alert(msg);
    });
});



// $("#update_drug").submit(function(event) { // on clicking submit
//     event.preventDefault(); //prevent default submit behaviour

//     //var unindexed_array = $("#update_drug");
//     var unindexed_array = $(this).serializeArray(); //grab data from form
//     var data = {}

//     $.map(unindexed_array, function(n, i) { //assign keys and values from form data
//         data[n['name']] = n['value']
//     })


//     var request = { //use a put API request to use data from above to replace what's on database
//         "url": `https://${url}/api/drugs/${data.id}`,
//         "method": "PUT",
//         "data": data
//     }

//     $.ajax(request).done(function(response) {
//         alert(data.name + " Updated Successfully!");
//         window.location.href = "/manage"; //redirects to index after alert is closed
//     })

// })
$("#update_drug").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url": `${protocol}//${url}/api/drugs/${data.id}`, // dùng protocol động
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert(data.name + " Updated Successfully!");
        window.location.href = "/manage";
    }).fail(function(err) {
        alert("Error updating drug: " + err.responseText);
    });
})

// if (window.location.pathname == "/manage") { //since items are listed on manage
//     $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
//     $ondelete.click(function() { //add click event listener
//         let id = $(this).attr("data-id") // pick the value from the data-id

//         let request = { //save API request in variable
//             "url": `https://${url}/api/drugs/${id}`,
//             "method": "DELETE"
//         }

//         if (confirm("Do you really want to delete this drug?")) { // bring out confirm box
//             $.ajax(request).done(function(response) { // if confirmed, send API request
//                 alert("Drug deleted Successfully!"); //show an alert that it's done
//                 location.reload(); //reload the page
//             })
//         }

//     })
// }
let protocol = window.location.protocol; // http: hoặc https:

if (window.location.pathname == "/manage") {
    $ondelete = $("table tbody td a.delete");
    $ondelete.click(function() {
        let id = $(this).attr("data-id");

        let request = {
            "url": `${protocol}//${url}/api/drugs/${id}`, // dùng protocol động
            "method": "DELETE"
        };

        if (confirm("Do you really want to delete this drug?")) {
            $.ajax(request).done(function(response) {
                alert("Drug deleted Successfully!");
                location.reload();
            }).fail(function(err) {
                alert("Error deleting drug: " + err.responseText);
            });
        }
    });
}


if (window.location.pathname == "/purchase") {
    $("#purchase_table").hide();

    $("#drug_days").submit(function(event) {
        event.preventDefault();
        var days = +$("#days").val();
        if (!days || days <= 0) {
            alert("Please enter a valid number of days.");
            return;
        }
        $.ajax({
            url: `${protocol}//${url}/api/purchase?days=${days}`,
            method: "GET"
        }).done(function(response) {
            if (response.success) {
                var rows = response.drugs.map(function(drug, i) {
                    return `<tr><td>${i+1}</td><td>${drug.name}</td><td>${drug.cardsToBuy}</td><td>${drug.packsToBuy}</td></tr>`;
                }).join("");
                $("#purchase_table tbody").html(rows);
                $("#purchase_table").show();
            } else {
                alert(response.message || "Error calculating purchase.");
            }
        }).fail(function(xhr) {
            let msg = "Error calculating purchase.";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                msg = xhr.responseJSON.message;
            }
            alert(msg);
        });
    });

}