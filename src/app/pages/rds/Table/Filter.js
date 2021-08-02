import React, { useEffect, useState } from 'react'

export default function (props) {
  // const [searchString, setSearchString] = useState('')

  // useEffect(() => {

  // }, [searchString])

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <select
            className="form-control"
            onChange={(e) => {
              props.setFilterValue(e.target.value)
            }}
          >
            <option value="" selected={props.filterValue == 'all' && true}>
              All
            </option>
            <option value="1" selected={props.filterValue == '1' && true}>
              TRUE
            </option>
            <option value="0" selected={props.filterValue == '0' && true}>
              FALSE
            </option>
          </select>
          <small className="form-text text-muted">
            Filter by <b>Is Default</b>
          </small>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={props.searchString}
            onChange={(e) => {
              props.setSearchString(e.target.value)
            }}
          />
          <small className="form-text text-muted">
            <b>Search</b> in all fields
          </small>
        </div>
      </div>
    </>
  )
}
