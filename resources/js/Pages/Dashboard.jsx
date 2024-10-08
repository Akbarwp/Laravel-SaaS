import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head } from '@inertiajs/react';

export default function Dashboard({ usedFeatured }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const currentPage = usedFeatured.current_page;
    const perPage = usedFeatured.per_page;
    const getNumbering = (index) => {
        return (currentPage - 1) * perPage + index + 1;
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto pb-5">
                            <table className="table">
                                <thead>
                                    <tr className="dark:text-slate-300">
                                        <th></th>
                                        <th>Feature</th>
                                        <th>Credits</th>
                                        <th>Date</th>
                                        <th>Additional Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usedFeatured.data.map((used, index) => (
                                        <tr key={used.id} className="dark:text-white">
                                            <td>{getNumbering(index)}</td>
                                            <td>{used.feature.name}</td>
                                            <td>{used.credits}</td>
                                            <td>{formatDate(used.created_at)}</td>
                                            <td>{JSON.stringify(used.data)}</td>
                                        </tr>
                                    ))}
                                    {!usedFeatured.data.length && (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                <i className="ri-error-warning-line mr-1"></i>
                                                You have not used any features.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination links={usedFeatured.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
