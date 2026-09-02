import {
    createPaginatedRowModel,
    rowPaginationFeature,
    tableFeatures,
    useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
})

const columns = [
    {
        accessorKey: 'gadgetName',
        header: 'Gadget Name',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'manufacturer',
        header: 'Manufacturer',
    },
    {
        accessorKey: 'healthRating',
        header: 'Health Rating',
    },
    {
        accessorKey: 'techBrandName',
        header: 'Tech Brand Name',
    },
    {
        accessorKey: 'userRole',
        header: 'User Role',
    },
]

export default function GadgetTable({ gadgets, onShowForm }) {
    const table = useTable({
        features: features,
        data: gadgets,
        columns: columns,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 4,
            },
        },
    })

  const currentPage = table.state.pagination.pageIndex + 1
    const pageCount = table.getPageCount()

    function handlePreviousPage() {
        table.previousPage()
    }

    function handleNextPage() {
        table.nextPage()
    }

    return (
        <div>
            <h1>Gadget Registry</h1>

            <button type="button" onClick={onShowForm}>
                Add Another Gadget
            </button>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Gadget Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Health Rating</th>
                        <th scope="col">Tech Brand Name</th>
                        <th scope="col">User Role</th>
                    </tr>
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(function renderRow(row) {
                        const gadget = row.original

                        return (
                            <tr key={row.id}>
                                <td>{gadget.gadgetName}</td>
                                <td>{gadget.category}</td>
                                <td>{gadget.manufacturer}</td>
                                <td>{gadget.healthRating}</td>
                                <td>{gadget.techBrandName}</td>
                                <td>{gadget.userRole}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div>
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={table.getCanPreviousPage() === false}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {pageCount}
                </span>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={table.getCanNextPage() === false}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
