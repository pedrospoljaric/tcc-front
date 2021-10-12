import * as React from 'react'
import { DataGrid, ptBR } from '@material-ui/data-grid'
import { useState, useEffect } from 'react'

// import request from 'utils/request'

// const requestData = ({
//     route, sorters, orderers, page, pageSize
// }) => ({ rows, rowCount })

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
        }`
    }
]

const data = [
    {
        id: 1, lastName: 'Snow', firstName: 'Jon', age: 35
    },
    {
        id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42
    },
    {
        id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45
    },
    {
        id: 4, lastName: 'Stark', firstName: 'Arya', age: 16
    },
    {
        id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null
    },
    {
        id: 6, lastName: 'Melisandre', firstName: null, age: 150
    },
    {
        id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44
    },
    {
        id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36
    },
    {
        id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65
    }
]

export default function DataTable() {
    const [rows, setRows] = useState(data.slice(0, 2))
    const pageSize = 2

    const onPageChange = (newPage) => {
        // console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
        const newRows = data.slice(pageSize * (newPage), pageSize * (newPage) + 2)
        // console.log('newPage', newPage, newRows)
        // console.log(pageSize * (newPage), pageSize * (newPage) + 2)
        // console.log(data)
        setRows(newRows)
    }

    const onSortModelChange = () => {
        // console.log(a)
    }

    useEffect(() => {
        const newRows = data.slice(0, 2)
        setRows(newRows)
    }, [])

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
                localeText={ptBR.props.MuiDataGrid.localeText}
                pagination
                disableSelectionOnClick
                rows={rows}
                rowCount={9}
                columns={columns}
                pageSize={pageSize}
                paginationMode="server"
                sortingMode="server"
                filterMode="server"
                onPageChange={onPageChange}
                onSortModelChange={onSortModelChange}
            />
        </div>
    )
}
