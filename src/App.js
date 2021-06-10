import logo from './logo.svg';
import './App.css';
import CSVReader from 'react-csv-reader';
import React, { useState } from 'react';




const teamsNames = ["No tenemos ni idea", "Qué está pasando","La grieta, que es eso", "A mi me daban dos", "Dónde está mi support", "Rito please, stop nerfs", "Se masca la tragedia", "No encuentro el Nashor", "Poner wards es gratis", "La culpa siempre es del jungla", "El nexo está escondido", "Hacemos face check"]

function App() {
  const roles = ["Top", "Jungle", "Bottom", "Support", "Middle"];
  // let teams = []
  let [teams, setTeams] = useState([]);

  const shuffle = (array) =>{
    array.sort(() => Math.random() - 0.5);
  }
const generateTeams = (data, fileInfo) =>{
  console.dir(data, fileInfo);

  teams = [];
  if (data.length){
    
    const headers = data[0];
    data.shift();
    const maxNumberTeams = Math.floor(data.length / 5);
    console.log("maxNumberTeams", maxNumberTeams)
    shuffle(data);

    data = data.map(element =>{
      
      return {
        summoner: element[1], 
        1: element[2],
        2: element[3],
        3: element[4],
        4: element[5],
        5: element[6],
        
      }
    })

    

    teams = roles.reduce((accumulator, role,index)=>{
      const indexPreference = 1;
      
      
      const newAccumulator =  addSummonersToTeams(data, indexPreference, maxNumberTeams, role, accumulator);
      
      return [...newAccumulator]
    }, [])
    

  }

  console.log("teams", teams)
  
  setTeams(teams)

}

const addSummonersToTeams = (data, indexPreference, maxNumberTeams, role, accumulator) =>{
  const alreadyInTeamSummoners = accumulator.reduce((accumulator, team)=> {
    const summoners = team.map(summoner => summoner.summoner)
    return [...accumulator, ...summoners];
  }, [])
  
  const summonersWithThisRole = data.filter(summoner => summoner[indexPreference] === role && !alreadyInTeamSummoners.includes(summoner.summoner));
  shuffle(summonersWithThisRole);
  
  summonersWithThisRole.forEach(summoner=>{
    
    const teamsWithThisRole = accumulator.filter(team => team.some(summoner => summoner.role === role));
    
    if (teamsWithThisRole.length < maxNumberTeams){
      let indexTeam = 0;
      if (accumulator.length > 0){
        indexTeam = teamsWithThisRole.length
      }
      if (!accumulator[indexTeam]){
        accumulator[indexTeam] = [];
      }
      
    
      accumulator[indexTeam].push({summoner: summoner.summoner, role: summoner[indexPreference], preference: indexPreference })
    }
  })
  const teamsWithThisRole2 = accumulator.filter(team => team.some(summoner => summoner.role === role));
  if (teamsWithThisRole2.length < maxNumberTeams){
    accumulator = addSummonersToTeams(data, indexPreference + 1, maxNumberTeams, role, accumulator)
  }

  return accumulator;
  
}
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <CSVReader onFileLoaded={generateTeams} />
        {teams.length && (
          <section>
        {shuffle(teamsNames)}
          {teams.map((team, index) =>{
          
          const nameTeam = teamsNames[index];
          const headerName = (<tr><th colSpan="3">Team {index +1 }: "{nameTeam}"</th></tr>)
          const header = (<tr><th>Summoner</th><th>Role</th><th>Preference</th></tr>);
          const rows = team.map(summoner =>{
            return (<tr><td>{summoner.summoner}</td><td>{summoner.role}</td><td>{summoner.preference}</td></tr>)
          })
          rows.unshift(header)
          rows.unshift(headerName)
          return (<table class="teamTable">{rows}</table>);
        })}
        <br/>
        <br/>
        </section>)}
      </header>
      
    </div>
  );
}

export default App;
