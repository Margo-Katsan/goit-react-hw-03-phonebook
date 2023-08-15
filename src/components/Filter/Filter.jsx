import css from "./Filter.module.css"

export const Filter = ({ nameFilter, onChange }) => {
  return (
    <label className={css.filter}>
      Find contacts by name
      <input type="text" value={nameFilter} onChange={event => {onChange(event.target.value)}} />
    </label>
  )
}