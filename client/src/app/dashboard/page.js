export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                username
                            </th>
                            <th>
                                email
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mike</td>
                            <td>mike@123.ca</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>dfdfdsf@123.ca</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}