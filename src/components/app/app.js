import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John S.', salary: 900, increase: false, like: true, id: 1},
        {name: 'Carl P.', salary: 1500, increase: true, like: false, id: 2},
        {name: 'Alex W.', salary: 2700, increase: false, like: false, id: 3},
      ],
      term: '',
      filter: 'all'
    }
  }

  deleteItem = id => {
    this.setState(({data}) => ({
        data: data.filter(item => item.id !== id)
    }))
  }

  addItem = (name, salary) => {
    this.setState(({data}) => {
      const newItem = {
        name,
        salary,
        increase: false,
        like: false,
        id: data[data.length - 1].id + 1
      }
      return {
        data: [...data, newItem]
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item
      })
    }))
  }

  onSearch = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onTermChange = (e) => {
    this.setState(() => ({
      term: e.target.value
    }))
  }

  filterEmployees = (items, filter) => {
    switch(filter) {
      case 'like':
        return items.filter(item => item.like);
      case 'salary':
        return items.filter(items => items.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }


  render() {
    const {data, term, filter} = this.state;
    const employees = data.length;
    const increased = data.filter(item => item.increase).length;
    const visibleData = this.filterEmployees(this.onSearch(data, term), filter);

    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased} />
  
          <div className="search-panel">
            <SearchPanel onTermChange={this.onTermChange} />
            <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp} />
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
