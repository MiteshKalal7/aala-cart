import React from 'react'

export default function () {
  return (
    <>
      <div className="row">
        <div className="col-sm-3">
          <select className="form-control" name="type">
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <small className="form-text text-muted">
            Filter by <b>Active/Inactive</b>
          </small>
        </div>
        <div className="col-sm-4">
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
