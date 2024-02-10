import React from 'react'

export default function SearchPage() {
  return (
    <>{searchList && (
        <div className="displaysearch">
          <div className="searchdisplay">
            <List tren={searchList} putindb={putindb} series={series} series1={series} sendcompletedidtodb={sendcompletedidtodb}/>
          </div>
        </div>
      )}
  </>
  )
}
