import {
    createPaginatedRowModel,
    rowPaginationFeature,
    tableFeatures,
    useTable,
} from '@tanstack/react-table'
import { useState } from 'react'

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

export default function GadgetTable({
    activeGadget,
    gadgets,
    onSelectGadget,
    onShowForm,
    selectedGadgetIndex,
}) {
    const [roleFilter, setRoleFilter] = useState('All')

    function getFilteredGadgets() {
        if (roleFilter === 'All') {
            return gadgets
        }

        return gadgets.filter(function filterGadget(gadget) {
            return gadget.userRole === roleFilter
        })
    }

    const filteredGadgets = getFilteredGadgets()

    const table = useTable({
        features: features,
        data: filteredGadgets,
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

    function handleRoleFilterChange(event) {
        setRoleFilter(event.target.value)
        table.setPageIndex(0)
    }

    function getRowClassName(rowIndex) {
        if (rowIndex === selectedGadgetIndex) {
            return 'cursor-pointer border-b border-zinc-700 bg-zinc-700 text-white'
        }

        return 'cursor-pointer border-b border-zinc-800 text-zinc-300 hover:bg-zinc-800'
    }

    function renderActiveGadget() {
        if (activeGadget === null) {
            return (
                <p className="mt-3 text-zinc-400">
                    Select a table row to view its complete details.
                </p>
            )
        }

        return (
            <div className="mt-4 space-y-4">
                <div>
                    <p className="text-sm text-zinc-500">Gadget Name</p>
                    <p className="font-medium text-white">{activeGadget.gadgetName}</p>
                </div>

                <div>
                    <p className="text-sm text-zinc-500">Category</p>
                    <p className="text-zinc-200">{activeGadget.category}</p>
                </div>

                <div>
                    <p className="text-sm text-zinc-500">Manufacturer</p>
                    <p className="text-zinc-200">{activeGadget.manufacturer}</p>
                </div>

                <div>
                    <p className="text-sm text-zinc-500">Health Rating</p>
                    <p className="text-zinc-200">{activeGadget.healthRating}</p>
                </div>

                <div>
                    <p className="text-sm text-zinc-500">Tech Brand Name</p>
                    <p className="text-zinc-200">{activeGadget.techBrandName}</p>
                </div>

                <div>
                    <p className="text-sm text-zinc-500">User Role</p>
                    <span className="mt-1 inline-block rounded-full bg-cyan-400 px-3 py-1 text-sm font-medium text-zinc-950">
                        {activeGadget.userRole}
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900 px-4 py-8 text-zinc-100">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Gadget Registry
                        </h1>
                        <p className="mt-1 text-zinc-400">Submitted gadgets: {gadgets.length}</p>
                    </div>

                    <button
                        className="rounded bg-cyan-400 px-4 py-2 font-medium text-zinc-950 hover:bg-cyan-300"
                        type="button"
                        onClick={onShowForm}
                    >
                        Add Gadget
                    </button>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
                        <div className="mb-4 flex items-center gap-3">
                            <label className="font-medium text-zinc-200" htmlFor="roleFilter">
                                Filter by Role
                            </label>

                            <select
                                className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-400"
                                id="roleFilter"
                                value={roleFilter}
                                onChange={handleRoleFilterChange}
                            >
                                <option value="All">All Roles</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Tester">Tester</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-zinc-700 bg-zinc-800 text-zinc-200">
                                        <th className="px-3 py-3" scope="col">Gadget Name</th>
                                        <th className="px-3 py-3" scope="col">Category</th>
                                        <th className="px-3 py-3" scope="col">Manufacturer</th>
                                        <th className="px-3 py-3" scope="col">Health Rating</th>
                                        <th className="px-3 py-3" scope="col">Tech Brand Name</th>
                                        <th className="px-3 py-3" scope="col">User Role</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {table.getRowModel().rows.map(function renderRow(row) {
                                        const gadget = row.original
                                        const gadgetIndex = gadgets.indexOf(gadget)

                                        function handleRowClick() {
                                            onSelectGadget(gadgetIndex)
                                        }

                                        return (
                                            <tr
                                                className={getRowClassName(gadgetIndex)}
                                                key={row.id}
                                                onClick={handleRowClick}
                                            >
                                                <td className="px-3 py-3">{gadget.gadgetName}</td>
                                                <td className="px-3 py-3">{gadget.category}</td>
                                                <td className="px-3 py-3">{gadget.manufacturer}</td>
                                                <td className="px-3 py-3">{gadget.healthRating}</td>
                                                <td className="px-3 py-3">{gadget.techBrandName}</td>
                                                <td className="px-3 py-3">{gadget.userRole}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <button
                                className="rounded border border-zinc-700 px-3 py-2 text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                                type="button"
                                onClick={handlePreviousPage}
                                disabled={table.getCanPreviousPage() === false}
                            >
                                Previous
                            </button>

                            <span className="text-sm text-zinc-400">
                                Page {currentPage} of {pageCount}
                            </span>

                            <button
                                className="rounded border border-zinc-700 px-3 py-2 text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                                type="button"
                                onClick={handleNextPage}
                                disabled={table.getCanNextPage() === false}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Active Gadget</h2>
                        {renderActiveGadget()}
                    </div>
                </div>
            </div>
        </div>
    )
}
