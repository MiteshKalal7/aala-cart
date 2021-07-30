import React from 'react'

export default function () {
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <select className="form-control" name="type">
            <option value="">All</option>
            <option value="0">TRUE</option>
            <option value="1">FALSE</option>
          </select>
          <small className="form-text text-muted">
            Filter by <b>Is Default</b>
          </small>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control"
            name="searchText"
            placeholder="Search"
          />
          <small className="form-text text-muted">
            <b>Search</b> in all fields
          </small>
        </div>
      </div>
    </>
  )
}
