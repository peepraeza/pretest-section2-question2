import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {

  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState([])

  useEffect(async () => {
    const result = await axios('https://api.publicapis.org/categories');

    setCategories(result.data.categories)
    setFilterCategory(result.data.categories)
  }, [])

  const searchCategory = (cateName) => {
    const searchCate = categories.filter(category => category.toLowerCase().match(cateName))
    setFilterCategory(searchCate)
  }

  return (
    <div className="app-container">
      <div className={'content'}>
        <input type={'text'} name={'typingCate'}
               className={'text-box'}
               placeholder={'search category..'}
               onChange={(e) => {
                 searchCategory(e.target.value)
               }}/>
        <TableCategory categories={filterCategory}/>
      </div>
    </div>
  );
}


const TableCategory = ({categories}) => {
  return (
    <table>
      <tbody>
      <tr>
        <th>Category</th>
      </tr>
      {categories.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default App;
