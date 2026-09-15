interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  keyExtractor: (row: T) => string;
}

export function DataTable<T>({ columns, rows, emptyMessage = "No data yet.", keyExtractor }: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="py-10 text-center text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            {columns.map((col) => (
              <th key={col.header} className="whitespace-nowrap py-2 pr-4 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={keyExtractor(row)} className="border-b border-gray-100 last:border-0">
              {columns.map((col) => (
                <td key={col.header} className="whitespace-nowrap py-3 pr-4">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
