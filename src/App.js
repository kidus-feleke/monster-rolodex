import { useState, useEffect} from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


const App=()=>{
  const [searchfield,setSearchfield]=useState('');
  const [monsters,setMonsters]=useState([])
  const [filteredMonsters,setFilteredMonsters]=useState(monsters)
  const [error, seterror]=useState('')
  const [isLoading,setLoading]=useState(true)


  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
       .then((response)=>response.json())
       .then((users)=>{ setMonsters(users); setLoading(false)} )
       .catch(() => { setLoading(false); seterror('Failed to Fetch Data')});

  },[])

  useEffect(()=>{
    console.log('effect fired')
    const newfilteredMonsters=monsters.filter(
      (monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchfield)
        })
        setFilteredMonsters(newfilteredMonsters)
        console.log('effect fired')
  },[monsters,searchfield])

  const onSearchChange=(event)=>{
        const searchFieldstring=event.target.value.toLocaleLowerCase()
        setSearchfield(searchFieldstring)
      }
  
return(
  <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange}
      className='monsters-search-box'
        placeholder='Search Monsters'/>

      {   
        error?(
          <p>{error}</p>
        ):
        isLoading?(
          <p>Loading...</p>
        ) :
        ( filteredMonsters.length > 0 ?(
        <CardList monsters={filteredMonsters}/>):
        (
          <p className='no-result-text'>Sorry, Couldn't find any monsters with that name. Give it another shot!</p>
        ))
      }
              
  </div>
)
}

// class  App extends Component {
//   constructor(){
//     super();
//     this.state={
//      monsters:[  ],
//      searchField:'',
//      isLoading: true
//     }
//   }

//   componentDidMount(){

//    fetch('https://jsonplaceholder.typicode.com/users')
//    .then((response)=>response.json())
//    .then((users)=> this.setState(()=>{
//     return {monsters:users,isLoading:false};
//    })).catch(() => this.setState({ error: 'Failed to fetch data', isLoading: false }));

//   };
//   onSearchChange=(event)=>{
//     const searchField=event.target.value.toLocaleLowerCase()
//   this.setState(()=>{
//     return {searchField}
//   })
//   }


//   render(){
//     const {monsters, searchField,isLoading}=this.state;
//     const {onSearchChange}=this;


//     const filteredMonsters=monsters.filter(
//       (monster)=>{
//         return monster.name.toLocaleLowerCase().includes(searchField)
//        })

//   return (
//     <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} className='monsters-search-box' placeholder='Search Monsters'/>
//         {
//           this.state.error?(
//             <p>{this.state.error}</p>
//           ):
//           isLoading? (
//           <p>Loading...</p>

//         ):
//          ( filteredMonsters.length > 0 ?(
//         <CardList monsters={filteredMonsters}/>):
//        (
//           <p className='no-result-text'>Sorry, Couldn't find any monsters with that name. Give it another shot!</p>
//         ))}  </div>
//   );}
// }

export default App;
