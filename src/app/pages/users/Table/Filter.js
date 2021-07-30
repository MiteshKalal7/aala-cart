import React from 'react'

export default function () {
  return (
    <>
      <div className="row">
        <div className="col-sm-3">
          <select className="form-control" name="rds">
            <option value="">All</option>
            <option value="1">RDS 1</option>
            <option value="2">RDS 2</option>
          </select>
          <small className="form-text text-muted">
            Filter by <b>RDS</b>
          </small>
        </div>
        <div className="col-sm-3">
          <select className="form-control" name="server">
            <option value="">All</option>
            <option value="1">Server 1</option>
            <option value="2">Server 2</option>
          </select>
          <small className="form-text text-muted">
            Filter by <b>Server</b>
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
