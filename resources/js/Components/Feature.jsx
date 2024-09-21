import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Feature({ feature, answer, children }) {
    const { auth } = usePage().props;
    const availableCredits = auth.user.available_credits;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{feature.name}</h2>
            }
        >
            <Head title="Feature 1" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {answer !== null && (
                        <div role="alert" className="alert alert-success text-white mb-3">
                            <i className='ri-checkbox-circle-line text-2xl'></i>
                            <span>Result of Calculation: {answer}</span>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                        {availableCredits !== null && feature.required_credits > availableCredits && (
                            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center bg-white/70 gap-3">
                                <span>You don't have enough credits to use this feature. </span>
                                <Link href='#' className='link'>Buy more Credits</Link>
                            </div>
                        )}

                        <div className="p-8 border-b pb-4">
                            <p>{feature.description}</p>
                            <p className='text-sm italic text-left md:text-right'>
                                Requires {feature.required_credits} credits
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
