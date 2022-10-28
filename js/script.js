const baseUrl = "https://www.balldontlie.io/api/v1/";
const teamEndPoin = `${baseUrl}teams`;
const standingEndPoin=`${baseUrl}stats`;
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const matchEndPoin= `${baseUrl}games`


function getListTeams() {
    title.innerHTML = "NBA Teams Lists"
    fetch(teamEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let teams = "";
            resJson.data.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.city}" alt="" class="circle">
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick=(event)=>{
                    showTeamInfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function showTeamInfo(id){
    title.innerHTML = "Detail Tim"
    let url = baseUrl + "teams/" + id;
    fetch(url)
        .then(response => response.json())
        .then(resJson => {
            let detail = `
                <div class="row">
                    <div class="col s6">
                        <div class="card purple darken-3">
                            <div class="card-content white-text">
                                <span class="card-title" style="font-weight:bold;">${resJson.abbreviation}</span>
                                <span class="card-title" style="font-weight:bold;">${resJson.city}</span>
                                <br>
                                <p>Berdiri : ${resJson.conference}</p>
                                <br>
                                <p>Markas Utama : ${resJson.division}.</p>
                                <br>
                                <p>Warna Tim : ${resJson.full_name}</p>
                                <br>
                                <p class="left-align">Alamat : ${resJson.name}</p>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            let i = 1;
            let table = "";
            resJson.squad.forEach(squads => {
                table += `
                    <tr>
                        <td>${i++}</td>
                        <td>${squads.name}</td>
                        <td>${squads.position}</td>
                        <td>${squads.dateOfBirth}</td>
                        <td>${squads.nationality}</td>
                        <td>${squads.role}</td>
                    </tr>
                `;
            });
            contents.innerHTML = detail +
                `
                <div class="card purple darken-3">
                        <div class="card-content white-text">
                            <span class="card-title" style="font-weight:bold;">Daftar Pemain</span>
                            <table class="stripped responsive-table">
                                    <th>No.</th>
                                    <th>Nama Pemain</th>
                                    <th>Posisi</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Kebangsaan</th>
                                    <th>Role</th>
                                <tbody>
                                    ${table}
                                </tbody>
                            </table>
                        </div>
                    </div>
            `;
        }).catch(err => {
            console.error(err);
        })
    
}
function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data[0]);
            let teams = "";
            let i = 1;
            resJson.data.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}
function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}
function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        case "squads":
            showTeamInfo();
            break;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});