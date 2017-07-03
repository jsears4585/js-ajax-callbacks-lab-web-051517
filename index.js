$(document).ready(function() {

  $('#search').on('click', function(e) {
    e.preventDefault()
    $('#errors').empty()
    getUserRepos($('#searchTerms').val())
  })

  function returnCommitResults(commits) {
    commits.forEach(function(commit) {
      console.log(commit)
      $('#details').append(`<p style="width: 200px">${commit.commit.author.name}</p>`)
    })
  }

  function showCommits(url) {
    $.get(url, function(d) {
      returnCommitResults(d)
    }).fail(function() {
      displayError()
    })
  }

  function listRepos(repos) {
    $('#results').append('<ul>')
    repos.forEach(function(repo) {
      $('#results').append(`<li>
        ${repo.name} : <a href="${repo.url}">View Repo</a> :
        <a href="#" class="commit_link" data-abc="${repo.commits_url.slice(0, -6)}">Show Commits</a>
      </li>`)
    })
    $('#results').append('</ul>')
    $('.commit_link').on('click', function(e) {
      $('#details').empty()
      showCommits($(this).data('abc'))
    })
  }

  function appendProfile(owner) {
    $('#profile').append(`<h1><a href="${owner.html_url}">${owner.login}</a></h1>`)
    $('#profile').append(`<img src="${owner.avatar_url}" width="200" /><br><br>`)
  }

  function returnResults(repos) {
    listRepos(repos)
    appendProfile(repos[0].owner)
  }

  function displayError() {
    $('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>")
  }

  function getUserRepos(username) {
    $.get(`https://api.github.com/users/${username}/repos`, function(d) {
      returnResults(d)
    }).fail(function() {
      displayError()
    })
  }

});
