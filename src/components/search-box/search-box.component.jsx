
import './search-box.styles.css'

const SearchBox=({onChangeHandler,className,placeholder})=>(
    <input className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
    onChange={onChangeHandler}
    />
    )
export default SearchBox;