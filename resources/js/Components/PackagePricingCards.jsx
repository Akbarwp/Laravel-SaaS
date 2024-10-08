import { usePage } from "@inertiajs/react"

export default function PackagePricingCards({ packages, features }) {
    const { csrf_token } = usePage().props;

    const priceFormat = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 mb-2">
                        <i className="ri-coin-fill mr-1"></i>
                        Buy Credits
                    </span>
                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Get More Done with Credits!</h1>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                        Enhance your experience by purchasing Credits and unlock access to exclusive features, services, and premium content. Whether you're looking to upgrade, explore new possibilities, or just get more done, Credits give you the flexibility you need.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {packages.map((p) => (
                        <div key={p.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                                <i className="ri-red-packet-fill mr-1"></i>
                                Package
                            </span>
                            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{p.name}</h2>
                            <h2 className="text-gray-900 dark:text-white text-3xl mb-4">{priceFormat(p.price)}</h2>
                            <ul role="list" className="mb-8 space-y-4 text-left text-lg font-normal text-gray-500 dark:text-gray-400">
                                {features.map((f) => (
                                    <li key={f.id} className="flex items-center space-x-3">
                                        <i className="ri-check-fill text-green-500 text-lg"></i>
                                        <span>{f.name}</span>
                                    </li>
                                ))}
                                <li className="flex items-center space-x-3">
                                    <i className="ri-check-fill text-green-500 text-lg"></i>
                                    <span>+{p.credits} credits</span>
                                </li>
                            </ul>
                            <form action={route('credit.buy', p)} method="post" className="w-full">
                                <input type="hidden" name="_token" value={csrf_token} autoComplete="off" hidden />
                                <button className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
                                    <i className="ri-arrow-right-line font-semibold"></i>
                                    Get Started
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
