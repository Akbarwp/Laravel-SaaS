<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Xendit\Invoice\CreateInvoiceRequest;

class CreditController extends Controller
{
    public function index()
    {
        $packages = Package::all();
        $features = Feature::where('active', true)->get();
        return inertia('Credit/Index', [
            'packages' => $packages,
            'features' => $features,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function buyCredits(Package $package)
    {
        Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
        $user = Auth::user();
        $apiInstance = new InvoiceApi();
        $create_invoice_request = new CreateInvoiceRequest([
            'external_id' => 'order-' . Carbon::now()->format('His-dmY-') . $user->id,
            'payer_email' => $user->email,
            'should_send_email' => false,
            'description' => 'Payment for buying package ' . $package->name,
            'amount' => $package->price,
            'invoice_duration' => 172800,
            'currency' => 'IDR',
            'locale' => 'en',
            'reminder_time' => 1,
            'success_redirect_url' => route('credit.index'),
            'failure_redirect_url' => route('credit.index'),
        ]);

        try {
            $invoice = $apiInstance->createInvoice($create_invoice_request);
            $transaction = Transaction::create([
                'status' => "PENDING",
                'price' => $package->price,
                'credits' => $package->credits,
                'session_id' => $invoice['id'],
                'user_id' => $user->id,
                'package_id' => $package->id,
            ]);
            $create_invoice_request['success_redirect_url'] = $this->success($transaction->id);
            $create_invoice_request['failure_redirect_url'] = $this->success($transaction->id);
            return redirect()->away($invoice['invoice_url']);

        } catch (\Xendit\XenditSdkException $e) {
            // echo 'Exception when calling InvoiceApi->createInvoice: ', $e->getMessage(), PHP_EOL;
            // echo 'Full Error: ', json_encode($e->getFullError()), PHP_EOL;
            return to_route('credit.index')->with('error', 'There was an error purchasing credits.');
        }
    }

    public function success($transactionId)
    {
        $transaction = Transaction::where('id', $transactionId)->first();
        $transaction->update([
            'status' => "PAID",
        ]);
        User::where('id', Auth::user()->id)->update([
            'available_credits' => Auth::user()->available_credits + $transaction->credits,
        ]);
        return route('credit.index');
        // return to_route('credit.index')->with('success', 'Credits purchased successfully.');
    }

    public function cancel($message = null, $transactionId)
    {
        $transaction = Transaction::where('id', $transactionId)->first();
        $transaction->update([
            'status' => "CANCEL",
        ]);
        return route('credit.index');
        // return to_route('credit.index')->with('error', $message ?? 'There was an error purchasing credits.');
    }
}
