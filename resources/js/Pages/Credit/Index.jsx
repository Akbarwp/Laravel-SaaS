import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PackagePricingCards from "@/Components/PackagePricingCards";

export default function Index({ auth, packages, features, success, error }) {
    const availableCredits = auth.user.available_credits;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Your Credits</h2>}
        >
            <Head title="Your Credits" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success &&
                        <div className="alert alert-success">{success}</div>
                    }
                    {error &&
                        <div className="alert alert-error">{error}</div>
                    }

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-3">
                        <div className="flex flex-col gap-3 items-center p-4">
                            <i className="ri-coin-line text-5xl text-yellow-400"></i>
                            <h3 className="dark:text-white text-2xl">You have {availableCredits} credits.</h3>
                        </div>
                    </div>
                    <PackagePricingCards packages={packages} features={features} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
