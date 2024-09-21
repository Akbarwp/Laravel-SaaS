import Feature from '@/Components/Feature';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ feature, answer }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        'number1': '',
        'number2': '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('feature2.calculate'), {
            onSuccess() {
                reset();
            }
        });
    }

    return (
        <Feature feature={feature} answer={answer}>
            <form onSubmit={submit} method='post' encType='multipart/form-data' className='p-8 grid grid-cols-2 gap-3'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text dark:text-white">Number 1:</span>
                    </div>
                    <input type="number" min='0' name='number1' placeholder="Number 1" className="input input-bordered w-full dark:text-slate-700" value={data.number1} onChange={(e) => setData('number1', e.target.value)} required />
                    <div className="label">
                        <span className="label-text-alt">{errors.number1}</span>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text dark:text-white">Number 2:</span>
                    </div>
                    <input type="number" min='0' name='number2' placeholder="Number 2" className="input input-bordered w-full dark:text-slate-700" value={data.number2} onChange={(e) => setData('number2', e.target.value)} required />
                    <div className="label">
                        <span className="label-text-alt">{errors.number2}</span>
                    </div>
                </label>
                <div className='flex items-center justify-end mt-4 col-span-2'>
                    <button type='submit' className='btn btn-primary' disabled={processing}>Calculate</button>
                </div>
            </form>
        </Feature>
    );
}
