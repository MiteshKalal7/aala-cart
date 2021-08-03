import React from 'react'

export default function ({ rdsList = [], serverList = [] }) {
  return (
    <>
      <div className="row">
        <div className="col-sm-3">
          <select className="form-control" name="rds">
            <option value="">All</option>
            {rdsList.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <small className="form-text text-muted">
            Filter by <b>RDS</b>
          </small>
        </div>
        <div className="col-sm-3">
          <select className="form-control" name="server">
            <option value="">All</option>
            {serverList.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
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
