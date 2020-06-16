$(document).ready(function () {
  // AJAX File Upload Handler
  $("#trajectoryForm").submit(function () {
    $(this).ajaxSubmit({
      error: function (xhr) {
        console.log("Error: " + xhr.status);
      },
      success: function (response) {
        if (response.status == "success") {
          $("#fileStatus").html(
            "File upload successful : <u class='green-text'>" +
              response.fileName +
              "</u>"
          );
        }
      },
      error: function (response) {
        console.log("Hey");
        $("#fileStatus").html(
          "<span class='red-text'>File upload failed.</span>"
        );
      },
    });
    return false;
  });

  // Start Trajectory
  $("#startTrajectoryButton").click(() => {
    var interval = $("#intervalInput").val();
    var url = $("#urlInput").val();
    var query = "interval=" + interval + ",url=" + url;
    console.log(interval + " " + url);
    $.ajax({
      type: "GET",
      url: "/startTrajectory",
      data: query,
      success: function (data) {
        alert(data);
      },
    });
  });
});
