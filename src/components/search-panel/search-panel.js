import './search-panel.css';

const SearchPanel = ({onTermChange}) => {
    return (
        <input type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                onChange={onTermChange}/>
    )
}

export default SearchPanel;