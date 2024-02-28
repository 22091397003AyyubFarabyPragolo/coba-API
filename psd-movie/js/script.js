// Function to search for movies using OMDB API
function searchMovie() {
    // Clear the movie list before making a new search
    $('#movie-list').html('');

    // Ajax request to the OMDB API
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '842f07b1',
            's': $('#search-input').val()
        },
        success: function (result) {
            // Check if the response is successful
            if (result.Response == "True") {
                // Extract the movies from the result
                let movies = result.Search;

                // Loop through each movie and display it in a card
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${data.Type}</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}"></a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                // Clear the search input after displaying results
                $('#search-input').val('');

            } else {
                // Display an error message if the response is not successful
                $('#movie-list').html(`<h1 class="text-center">${result.Error}</h1>`);
            }
        }
    });
}

// Event handler for the search button click
$('#search-button').on('click', function () {
    searchMovie();
});

// Event handler for pressing Enter key in the search input
$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});

// Event handler for clicking on the "See Detail" link in a movie card
$('#movie-list').on('click', '.see-detail', function () {
    // Ajax request to get details of a specific movie
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '842f07b1',
            'i': $(this).data('id')
        },
        success: function (movie) {
            // Check if the response is successful
            if (movie.Response === "True") {
                // Display details of the selected movie in a modal
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                </ul>                       
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});
