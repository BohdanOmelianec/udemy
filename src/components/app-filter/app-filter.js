import "./app-filter.css";

const AppFilter = ({filter, onFilterSelect}) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'like', label: 'На повышение'},
        {name: 'salary', label: 'З/П больше 1000$'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = filter === name;
        return (
            <button type="button"
                className= {active ? "btn btn-light" : "btn btn-outline-light"}
                key={name}
                onClick={() => onFilterSelect(name)}>
                {label}
            </button>
        )
    })
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;